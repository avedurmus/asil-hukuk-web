/**
 * Asil Hukuk – Randevu sistemi Google köprüsü (Google Apps Script) · sürüm 2
 *
 * Bu kod avukatın kendi Google hesabında çalışır. Web sitesindeki randevu
 * sistemi (randevu sayfası, sohbet asistanı, WhatsApp asistanı) buraya istek
 * göndererek:
 *   - "busy":   aşağıdaki takvimlerdeki dolu saatleri öğrenir,
 *   - "create": randevuyu Google Takvim'e etkinlik olarak yazar,
 *   - "delete": iptal edilen / ertelenen randevunun etkinliğini siler,
 *   - "notify": randevu bildirimini Gmail ile avukata gönderir,
 *   - "ping":   bağlantıyı sınar.
 *
 * Kurulum adımları: docs/randevu-sistemi.md → "Google Takvim ve Gmail bağlantısı".
 * SECRET değeri Vercel'deki APPS_SCRIPT_SECRET ile aynı olmalıdır; kimseyle
 * paylaşmayın ve bu dosyanın doldurulmuş hâlini depoya eklemeyin.
 */

const VERSION = 2;

const SECRET = '__APPS_SCRIPT_SECRET__';

/** Randevuların yazılacağı takvim. */
const MAIN_CALENDAR_ID = 'av.edurmus@gmail.com';

/** Doluluğu dikkate alınacak takvimler (ana takvim dahil). */
const BUSY_CALENDAR_IDS = [
  MAIN_CALENDAR_ID,
  'h5mj2f0q93c5fnhk6j5icctogg@group.calendar.google.com', // Emre's iPhone
];

/** Randevu bildirimlerinin gönderileceği Gmail adresi. */
const NOTIFY_EMAIL = MAIN_CALENDAR_ID;

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    if (req.secret !== SECRET) return reply_({ error: 'unauthorized' });
    if (req.action === 'ping') return reply_({ ok: true, version: VERSION });
    if (req.action === 'busy') return reply_({ busy: busy_(req.timeMin, req.timeMax) });
    if (req.action === 'create') return reply_({ id: create_(req.event) });
    if (req.action === 'delete') return reply_({ deleted: delete_(req.id) });
    if (req.action === 'notify') return reply_({ sent: notify_(req) });
    return reply_({ error: 'unknown_action' });
  } catch (err) {
    return reply_({ error: String((err && err.message) || err) });
  }
}

/** Adres tarayıcıda açıldığında köprünün yayında olduğunu gösterir (gizli bilgi içermez). */
function doGet() {
  return reply_({ ok: true, service: 'asil-hukuk-randevu', version: VERSION });
}

/**
 * Takvimlerdeki dolu aralıkları döner; erişilemeyen takvim olursa hata verir.
 * Google Takvim'deki varsayılana uygun olarak tüm gün etkinlikler ve
 * reddettiğiniz davetler dolu sayılmaz.
 */
function busy_(timeMin, timeMax) {
  const start = new Date(timeMin);
  const end = new Date(timeMax);
  const out = [];
  BUSY_CALENDAR_IDS.forEach(function (id) {
    const cal = CalendarApp.getCalendarById(id);
    if (!cal) throw new Error('Takvim okunamadı: ' + id);
    cal.getEvents(start, end).forEach(function (ev) {
      if (ev.isAllDayEvent()) return;
      if (ev.getMyStatus() === CalendarApp.GuestStatus.NO) return;
      out.push({ start: ev.getStartTime().toISOString(), end: ev.getEndTime().toISOString() });
    });
  });
  return out;
}

/** Saat hâlâ boşsa randevuyu ana takvime yazar. Aynı anda gelen talepler sıraya alınır. */
function create_(ev) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (busy_(ev.start, ev.end).length > 0) return failBusy_();
    const event = CalendarApp.getCalendarById(MAIN_CALENDAR_ID).createEvent(
      ev.summary,
      new Date(ev.start),
      new Date(ev.end),
      { description: ev.description || '', location: ev.location || '' }
    );
    // Görüşmeden 1 gün ve 1 saat önce hatırlatma.
    event.addPopupReminder(60);
    event.addPopupReminder(24 * 60);
    return event.getId();
  } finally {
    lock.releaseLock();
  }
}

/** Etkinliği siler; zaten silinmişse de başarılı sayılır. */
function delete_(id) {
  const event = CalendarApp.getCalendarById(MAIN_CALENDAR_ID).getEventById(id);
  if (event) event.deleteEvent();
  return true;
}

/** Randevu bildirimini Gmail ile gönderir. rows: [[etiket, değer], ...] */
function notify_(req) {
  const rows = (req.rows || []).filter(function (r) { return r && r[1]; });
  const text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a2942">' +
    '<h2 style="font-size:17px;margin:0 0 12px">' + esc_(req.subject) + '</h2>' +
    '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">' +
    rows.map(function (r) {
      return '<tr>' +
        '<td style="padding:6px 14px 6px 0;color:#5b6a80;vertical-align:top;white-space:nowrap">' + esc_(r[0]) + '</td>' +
        '<td style="padding:6px 0;vertical-align:top">' + link_(r[1]) + '</td>' +
        '</tr>';
    }).join('') +
    '</table></div>';
  const options = { htmlBody: html, name: 'Asil Hukuk Randevu' };
  if (req.replyTo) options.replyTo = req.replyTo;
  MailApp.sendEmail(NOTIFY_EMAIL, String(req.subject || 'Randevu bildirimi'), text, options);
  return true;
}

function esc_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Değer bir bağlantıysa tıklanabilir yapar; değilse satır sonlarını korur. */
function link_(value) {
  const safe = esc_(value);
  if (/^https?:\/\/\S+$/.test(String(value))) return '<a href="' + safe + '">' + safe + '</a>';
  return safe.replace(/\n/g, '<br>');
}

function failBusy_() {
  throw new Error('slot_busy');
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Kurulumdan (ve bu kod her güncellendiğinde) bir kez çalıştırın: Google
 * izinleri ister (Takvim ve e-posta gönderme), önümüzdeki 7 günün dolu
 * saatlerini "Yürütme günlüğü"ne yazar ve size bir deneme e-postası gönderir.
 */
function test() {
  const now = new Date();
  const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  Logger.log(JSON.stringify(busy_(now.toISOString(), week.toISOString()), null, 2));
  notify_({
    subject: 'Asil Hukuk randevu köprüsü: deneme e-postası',
    rows: [['Durum', 'Takvim okundu ve Gmail bildirimi çalışıyor.'], ['Sürüm', String(VERSION)]],
  });
  Logger.log('Deneme e-postası gönderildi: ' + NOTIFY_EMAIL);
}
