import React from 'react';
import { CaseFile, Decision } from '../types';

interface DashboardProps {
  cases: CaseFile[];
  decisions: Decision[];
  onNavigate: (tab: string, caseId?: string) => void;
  onAddCaseClick: () => void;
}

export default function Dashboard({ cases, decisions, onNavigate, onAddCaseClick }: DashboardProps) {
  const matchedPrecedentsCount = cases.reduce((acc, c) => acc + (c.matchedDecisions?.length || 0), 0);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-title">
          <h1 className="legal-title">YargıAsistan Dashboard</h1>
          <p>Yapay zeka destekli hukuk asistanı platformuna hoş geldiniz.</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={onAddCaseClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Yeni Dava Dosyası
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{cases.length}</span>
            <span className="stat-label">Toplam Dava Dosyası</span>
          </div>
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{matchedPrecedentsCount}</span>
            <span className="stat-label">Eşleşen Emsal Karar</span>
          </div>
          <div className="stat-icon" style={{ color: 'var(--accent-blue)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{decisions.length}</span>
            <span className="stat-label">Sistemdeki Emsal Havuzu</span>
          </div>
          <div className="stat-icon" style={{ color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
        </div>
      </div>

      <div className="grid-layout">
        {/* Recent Cases */}
        <div className="card">
          <h3 className="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><polyline points="12 6 12 12 16 14"></polyline></svg>
            Son İşlem Gören Davalar
          </h3>
          {cases.length === 0 ? (
            <div className="empty-state">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <p>Henüz aktif dava dosyası bulunmuyor.</p>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={onAddCaseClick}>İlk Davayı Oluştur</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {cases.slice(-3).reverse().map((c) => (
                <div key={c.id} className="case-item" onClick={() => onNavigate('cases', c.id)}>
                  <div className="case-meta">
                    <span className="case-item-title">{c.title}</span>
                    <span className="case-item-sub">{c.court} | {c.caseNumber || 'Esas Girilmedi'}</span>
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {c.matchedDecisions?.length || 0} Emsal
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tips & News */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card-glass">
            <h3 className="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Yargıtay İçtihat İpucu
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong>Trafik Kazası Değer Kaybı:</strong> Adana Bölge Adliye Mahkemesi 3. Hukuk Dairesi'nin güncel kararına göre, araç değer kaybı davalarının <strong>belirsiz alacak davası</strong> olarak açılmasında hukuki yarar bulunmaktadır. KTK Md. 97'deki sigortacıya başvuru şartına dikkat edilmelidir.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Yapay Zeka Nasıl Kullanılır?</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              1. <strong>Dava Ekle:</strong> Dava detaylarını yapıştırın.<br/>
              2. <strong>Emsal Bul:</strong> Karar Arama sekmesinden ilgili kararları bulup davanızla eşleştirin.<br/>
              3. <strong>Analiz Al & Dilekçe Yaz:</strong> Davaya girip AI Analizini başlatın ve saniyeler içinde dilekçe taslağınızı oluşturun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
