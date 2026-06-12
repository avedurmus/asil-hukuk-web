import React, { useState, useEffect } from 'react';
import { getApiKey, saveApiKey, getPreferredModel, savePreferredModel } from '../services/gemini';

interface SettingsProps {
  onResetData: () => void;
  onExportData: () => void;
  onImportData: (data: { cases: any[]; decisions: any[] }) => void;
}

interface StatusMessage {
  type: 'success' | 'danger';
  text: string;
}

export default function Settings({ onResetData, onExportData, onImportData }: SettingsProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [model, setModel] = useState('gemini-1.5-flash');
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  useEffect(() => {
    setApiKey(getApiKey());
    setModel(getPreferredModel());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKey(apiKey);
    savePreferredModel(model);
    setStatusMessage({ type: 'success', text: 'Ayarlar başarıyla kaydedildi.' });
    setTimeout(() => setStatusMessage(null), 3000);
    // Trigger custom event to notify parent of key change
    window.dispatchEvent(new Event('storage'));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        onImportData(data);
        setStatusMessage({ type: 'success', text: 'Veriler başarıyla içe aktarıdı.' });
        setTimeout(() => setStatusMessage(null), 3000);
      } catch (err) {
        setStatusMessage({ type: 'danger', text: 'Geçersiz dosya formatı. Lütfen geçerli bir JSON yedeği yükleyin.' });
        setTimeout(() => setStatusMessage(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-title">
          <h1 className="legal-title">Sistem Ayarları</h1>
          <p>Yapay zeka modellerini ve sistem yedeklerini yönetin.</p>
        </div>
      </div>

      {statusMessage && (
        <div className={`toast`} style={{ position: 'relative', margin: '0 0 1.5rem 0', bottom: 0, right: 0, borderLeft: `4px solid ${statusMessage.type === 'success' ? '#10b981' : '#ef4444'}` }}>
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="grid-layout">
        {/* API Settings */}
        <div className="card">
          <h3 className="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Yapay Zeka Yapılandırması (Gemini)
          </h3>
          
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Google Gemini API Anahtarı (API Key)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type={showKey ? 'text' : 'password'}
                  className="form-control"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowKey(!showKey)}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {showKey ? 'Gizle' : 'Göster'}
                </button>
              </div>
              <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem', fontSize: '0.78rem' }}>
                Gemini API anahtarınızı <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }}>Google AI Studio</a> üzerinden ücretsiz alabilirsiniz. Anahtarınız tarayıcınızda (LocalŞifreleme) yerel olarak saklanır.
              </small>
            </div>

            <div className="form-group">
              <label>Model Tercihi</label>
              <select
                className="form-control select-control"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Hızlı &amp; Verimli - Önerilen)</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Daha Detaylı Analiz &amp; Muhakeme)</option>
                <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash Experimental</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Ayarları Kaydet
            </button>
          </form>
        </div>

        {/* System & Backup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 className="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Veri Yedekleme &amp; Aktarım
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.4' }}>
              Eklediğiniz dava dosyalarını ve özel emsal kararlarınızı JSON dosyası olarak yedekleyebilir veya başka bir cihaza aktarabilirsiniz.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={onExportData} style={{ justifyContent: 'flex-start' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Verileri Dışa Aktar (Yedekle)
              </button>
              
              <label className="btn btn-secondary" style={{ justifyContent: 'flex-start', cursor: 'pointer', margin: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Yedekten İçe Aktar (Restore)
                <input type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <div className="card" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <h3 className="card-title" style={{ color: '#f87171', borderBottomColor: 'rgba(239, 68, 68, 0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Tehlikeli Alan
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.4' }}>
              Sistemdeki tüm kayıtlı dava dosyalarını ve ayarları sıfırlayarak varsayılan emsal kararları yeniden yükler. Bu işlem geri alınamaz!
            </p>
            <button className="btn btn-danger" onClick={onResetData} style={{ width: '100%' }}>
              Tüm Verileri Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
