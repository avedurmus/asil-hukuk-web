"use client";

import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CaseManager from './components/CaseManager';
import PrecedentSearch from './components/PrecedentSearch';
import Settings from './components/Settings';
import { seedDecisions } from './data/seedDecisions';
import { hasApiKey } from './services/gemini';
import { CaseFile, Decision } from './types';
import './asistan.css';

export default function AsistanClient() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState<CaseFile[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [isApiActive, setIsApiActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // State for Add Case form triggered from Dashboard
  const [showGlobalAddCaseModal, setShowGlobalAddCaseModal] = useState(false);
  const [globalCase, setGlobalCase] = useState({
    title: '',
    court: '',
    caseNumber: '',
    client: '',
    subject: '',
    details: ''
  });

  // Ensure window is available (client-side only execution)
  useEffect(() => {
    setMounted(true);
    const storedCases = localStorage.getItem('yargi_asistan_cases');
    const storedDecisions = localStorage.getItem('yargi_asistan_decisions');
    
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }

    if (storedDecisions) {
      setDecisions(JSON.parse(storedDecisions));
    } else {
      setDecisions(seedDecisions);
      localStorage.setItem('yargi_asistan_decisions', JSON.stringify(seedDecisions));
    }

    setIsApiActive(hasApiKey());
  }, []);

  // Listen to LocalStorage key changes to dynamically update status badge
  useEffect(() => {
    if (!mounted) return;
    const handleStorageChange = () => {
      setIsApiActive(hasApiKey());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

  // Sync cases helper
  const syncCases = (updatedCases: CaseFile[]) => {
    setCases(updatedCases);
    localStorage.setItem('yargi_asistan_cases', JSON.stringify(updatedCases));
  };

  // Add a case
  const handleAddCase = (caseObj: CaseFile) => {
    const updated = [...cases, caseObj];
    syncCases(updated);
    setSelectedCaseId(caseObj.id);
  };

  // Update a case
  const handleUpdateCase = (updatedCase: CaseFile) => {
    const updated = cases.map(c => c.id === updatedCase.id ? updatedCase : c);
    syncCases(updated);
  };

  // Delete a case
  const handleDeleteCase = (id: string) => {
    const updated = cases.filter(c => c.id !== id);
    syncCases(updated);
    if (selectedCaseId === id) {
      setSelectedCaseId('');
    }
  };

  // Link a precedent decision to a case
  const handleLinkDecision = (caseId: string, decision: Decision, justification: string) => {
    const targetCase = cases.find(c => c.id === caseId);
    if (!targetCase) return;

    // Check if already linked
    const alreadyLinked = targetCase.matchedDecisions?.some(d => d.id === decision.id);
    if (alreadyLinked) {
      alert('Bu emsal karar bu davaya zaten eklenmiş.');
      return;
    }

    const decisionLink: Decision = {
      ...decision,
      justification
    };

    const updatedCase = {
      ...targetCase,
      matchedDecisions: [...(targetCase.matchedDecisions || []), decisionLink]
    };

    handleUpdateCase(updatedCase);
  };

  // Add custom precedent decision to kütüphane
  const handleAddCustomDecision = (decision: Decision) => {
    const updated = [...decisions, decision];
    setDecisions(updated);
    localStorage.setItem('yargi_asistan_decisions', JSON.stringify(updated));
  };

  // Settings: Reset all data
  const handleResetData = () => {
    if (confirm('Tüm dava dosyalarını, eklediğiniz kararları ve ayarlarınızı silmek istediğinize emin misiniz?')) {
      localStorage.clear();
      setCases([]);
      setDecisions(seedDecisions);
      localStorage.setItem('yargi_asistan_decisions', JSON.stringify(seedDecisions));
      setIsApiActive(false);
      alert('Sistem başarıyla sıfırlandı.');
      setActiveTab('dashboard');
    }
  };

  // Settings: Export JSON data
  const handleExportData = () => {
    const dataStr = JSON.stringify({ cases, decisions });
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `yargiasistan-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Settings: Import JSON data
  const handleImportData = (importedData: { cases: any[]; decisions: any[] }) => {
    if (importedData.cases) {
      syncCases(importedData.cases);
    }
    if (importedData.decisions) {
      setDecisions(importedData.decisions);
      localStorage.setItem('yargi_asistan_decisions', JSON.stringify(importedData.decisions));
    }
  };

  // Navigate helper
  const handleNavigate = (tab: string, caseId: string = '') => {
    setActiveTab(tab);
    if (caseId) {
      setSelectedCaseId(caseId);
    }
  };

  const handleGlobalCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalCase.title || !globalCase.court || !globalCase.subject || !globalCase.details) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    const caseToAdd: CaseFile = {
      ...globalCase,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('tr-TR'),
      matchedDecisions: [],
      chatHistory: [],
      aiAnalysis: ''
    };
    handleAddCase(caseToAdd);
    setShowGlobalAddCaseModal(false);
    setGlobalCase({
      title: '',
      court: '',
      caseNumber: '',
      client: '',
      subject: '',
      details: ''
    });
    setActiveTab('cases');
  };

  // Return null or loading state on server-side rendering to avoid hydration mismatch
  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0f1d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner spinner-large"></div>
      </div>
    );
  }

  return (
    <div className="asistan-body">
      <div className="app-container">
        {/* Sidebar navigation */}
        <aside className="sidebar">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zM12 17h.01M12 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="logo-text">Alfa<span>Asistan</span></span>
          </div>

          <ul className="nav-links">
            <li>
              <div 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavigate('dashboard')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                Genel Panel
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeTab === 'cases' ? 'active' : ''}`}
                onClick={() => handleNavigate('cases')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Dava Dosyalarım
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => handleNavigate('search')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Emsal Karar Ara
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => handleNavigate('settings')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Ayarlar
              </div>
            </li>
          </ul>

          <div className="sidebar-footer">
            <div className="api-status">
              <span className={`status-indicator ${isApiActive ? 'active' : 'inactive'}`}></span>
              <span>Gemini Yapay Zeka: <strong>{isApiActive ? 'Aktif' : 'Demo (Pasif)'}</strong></span>
            </div>
          </div>
        </aside>

        {/* Main workspace section */}
        <main className="main-content">
          {activeTab === 'dashboard' && (
            <Dashboard 
              cases={cases} 
              decisions={decisions} 
              onNavigate={handleNavigate} 
              onAddCaseClick={() => setShowGlobalAddCaseModal(true)}
            />
          )}
          
          {activeTab === 'cases' && (
            <CaseManager 
              cases={cases}
              onAddCase={handleAddCase}
              onDeleteCase={handleDeleteCase}
              onUpdateCase={handleUpdateCase}
              selectedCaseId={selectedCaseId}
              setSelectedCaseId={setSelectedCaseId}
            />
          )}

          {activeTab === 'search' && (
            <PrecedentSearch 
              decisions={decisions} 
              cases={cases}
              onLinkDecision={handleLinkDecision}
              onAddCustomDecision={handleAddCustomDecision}
            />
          )}

          {activeTab === 'settings' && (
            <Settings 
              onResetData={handleResetData}
              onExportData={handleExportData}
              onImportData={handleImportData}
            />
          )}
        </main>

        {/* Global Add Case Modal */}
        {showGlobalAddCaseModal && (
          <div className="modal-overlay" onClick={() => setShowGlobalAddCaseModal(false)}>
            <div className="modal-content" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowGlobalAddCaseModal(false)}>&times;</button>
              <h3 className="card-title">Yeni Dava Dosyası Başlat</h3>
              
              <form onSubmit={handleGlobalCaseSubmit}>
                <div className="form-group">
                  <label>Dava Başlığı (Dostane/Kısa İsim) *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: Ahmet Yılmaz Değer Kaybı Davası" 
                    value={globalCase.title}
                    onChange={(e) => setGlobalCase({...globalCase, title: e.target.value})}
                    required 
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label>Görevli/Yetkili Mahkeme *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Örn: Adana 2. Asliye Ticaret Mahkemesi" 
                      value={globalCase.court}
                      onChange={(e) => setGlobalCase({...globalCase, court: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Dosya / Esas Numarası (Varsa)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Örn: 2025/799 Esas" 
                      value={globalCase.caseNumber}
                      onChange={(e) => setGlobalCase({...globalCase, caseNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label>Müvekkil / Taraf Adı</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Örn: Ahmet Yılmaz" 
                      value={globalCase.client}
                      onChange={(e) => setGlobalCase({...globalCase, client: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dava Konusu *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Örn: Maddi hasarlı kazadan değer kaybı tazminatı" 
                      value={globalCase.subject}
                      onChange={(e) => setGlobalCase({...globalCase, subject: e.target.value})}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Olay Detayları ve Açıklamaları (Yapay zekanın analiz edeceği ana metin) *</label>
                  <textarea 
                    className="form-control" 
                    style={{ minHeight: '180px' }}
                    placeholder="Olayın özetini ve tüm detaylarını buraya ekleyin..."
                    value={globalCase.details}
                    onChange={(e) => setGlobalCase({...globalCase, details: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowGlobalAddCaseModal(false)}>İptal</button>
                  <button type="submit" className="btn btn-primary">Dava Dosyasını Başlat</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
