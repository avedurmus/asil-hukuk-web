/**
 * Asil Hukuk – Sohbet asistanı takvim köprüsü (Google Apps Script)
 *
 * Bu kod avukatın kendi Google hesabında çalışır. Web sitesindeki asistan
 * buraya istek göndererek:
 *   - "busy":   aşağıdaki takvimlerdeki dolu saatleri öğrenir,
 *   - "create": onaylanan randevuyu ana takvime etkinlik olarak yazar.
 *
 * Kurulum adımları: docs/sohbet-asistani.md → "Google Takvim'i bağlamak".
 * SECRET değeri Vercel'deki APPS_SCRIPT_SECRET ile aynı olmalıdır; kimseyle
 * paylaşmayın ve bu dosyanın doldurulmuş hâlini depoya eklemeyin.
 */

const SECRET = '__APPS_SCRIPT_SECRET__';

/** Randevuların yazılacağı takvim. */
const MAIN_CALENDAR_ID = 'av.edurmus@gmail.com';

/** Doluluğu dikkate alınacak takvimler (ana takvim dahil). */
const BUSY_CALENDAR_IDS = [
  MAIN_CALENDAR_ID,
  'h5mj2f0q93c5fnhk6j5icctogg@group.calendar.google.com', // Emre's iPhone
];

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    if (req.secret !== SECRET) return reply_({ error: 'unauthorized' });
    if (req.action === 'busy') return reply_({ busy: busy_(req.timeMin, req.timeMax) });
    if (req.action === 'create') return reply_({ id: create_(req.event) });
    return reply_({ error: 'unknown_action' });
  } catch (err) {
    return reply_({ error: String((err && err.message) || err) });
  }
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
    return event.getId();
  } finally {
    lock.releaseLock();
  }
}

function failBusy_() {
  throw new Error('slot_busy');
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Kurulumdan sonra bir kez çalıştırın: Google izinleri ister ve önümüzdeki
 * 7 günün dolu saatlerini "Yürütme günlüğü"ne yazar.
 */
function test() {
  const now = new Date();
  const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  Logger.log(JSON.stringify(busy_(now.toISOString(), week.toISOString()), null, 2));
}
