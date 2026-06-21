import React, { useState, useEffect, useRef } from 'react';
import { CaseFile, Decision, Message } from '../types';
import { analyzeCase, chatWithCase, generatePetition, hasApiKey } from '../services/gemini';

interface CaseManagerProps {
  cases: CaseFile[];
  onAddCase: (caseObj: CaseFile) => void;
  onDeleteCase: (id: string) => void;
  onUpdateCase: (updatedCase: CaseFile) => void;
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
}

export default function CaseManager({ 
  cases, 
  onAddCase, 
  onDeleteCase, 
  onUpdateCase,
  selectedCaseId, 
  setSelectedCaseId 
}: CaseManagerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states for creating a case
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCase, setNewCase] = useState({
    title: '',
    court: '',
    caseNumber: '',
    client: '',
    subject: '',
    details: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/parse-document", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP Hata ${res.status}`);
      }
      const data = await res.json();
      const meta = data.metadata || {};
      const fileTitle = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      
      setNewCase({
        title: meta.court && meta.caseNumber ? `${meta.court} - ${meta.caseNumber}` : fileTitle,
        court: meta.court || '',
        caseNumber: meta.caseNumber || '',
        client: meta.client || '',
        subject: meta.subject || '',
        details: data.text || ''
      });
    } catch (err: any) {
      setUploadError(err.message || 'Dosya çözümlenirken bilinmeyen bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  // Chat states
  const [chatMessage, setChatMessage] = useState('');
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Petition states
  const [petitionType, setPetitionType] = useState('Dava Dilekçesi');
  const [customNotes, setCustomNotes] = useState('');
  const [generatedPetitionText, setGeneratedPetitionText] = useState('');

  // Selected Case Object
  const activeCase = cases.find(c => c.id === selectedCaseId);

  // Auto-scroll chat to bottom when messages update
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeCase?.chatHistory]);

  const handleAddCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.title || !newCase.court || !newCase.subject || !newCase.details) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    
    const caseToAdd: CaseFile = {
      ...newCase,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('tr-TR'),
      matchedDecisions: [],
      chatHistory: [],
      aiAnalysis: ''
    };

    onAddCase(caseToAdd);
    setShowAddModal(false);
    setNewCase({
      title: '',
      court: '',
      caseNumber: '',
      client: '',
      subject: '',
      details: ''
    });
  };

  // Run AI Analysis
  const handleAnalyze = async () => {
    if (!activeCase) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await analyzeCase(activeCase);
      const updatedCase: CaseFile = { ...activeCase, aiAnalysis: result };
      onUpdateCase(updatedCase);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chat Message submit
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !activeCase) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatMessage,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = activeCase.chatHistory || [];
    const updatedHistoryWithUser = [...currentHistory, userMsg];
    
    // Temporarily save user message in state to render instantly
    const caseWithUserMsg = { ...activeCase, chatHistory: updatedHistoryWithUser };
    onUpdateCase(caseWithUserMsg);
    setChatMessage('');
    setLoading(true);

    try {
      const aiReplyText = await chatWithCase(activeCase, currentHistory, userMsg.text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: aiReplyText,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      
      const caseWithAiReply = {
        ...activeCase,
        chatHistory: [...updatedHistoryWithUser, aiMsg]
      };
      onUpdateCase(caseWithAiReply);
    } catch (err: any) {
      alert(`Sohbet yanıtı alınamadı: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create Petition Draft
  const handleCreatePetition = async () => {
    if (!activeCase) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await generatePetition(
        activeCase, 
        activeCase.matchedDecisions || [], 
        petitionType, 
        customNotes
      );
      setGeneratedPetitionText(result);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPetition = () => {
    navigator.clipboard.writeText(generatedPetitionText);
    alert('Dilekçe taslağı panoya kopyalandı.');
  };

  const handleUnlinkDecision = (decId: string) => {
    if (!activeCase) return;
    const updatedMatched = activeCase.matchedDecisions.filter(d => d.id !== decId);
    onUpdateCase({
      ...activeCase,
      matchedDecisions: updatedMatched
    });
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-title">
          <h1 className="legal-title">Dava Dosyalarım</h1>
          <p>Dava dosyalarınızı düzenleyin, analizler yapın ve dilekçeler hazırlayın.</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Dava Ekle
          </button>
        </div>
      </div>

      <div className="grid-layout-reverse">
        {/* Left Side: Case Files List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Aktif Dosyalar ({cases.length})</h3>
          {cases.length === 0 ? (
            <div className="card">
              <div className="empty-state">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                <p>Kayıtlı dava dosyası bulunmuyor.</p>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={() => setShowAddModal(true)}>Hemen Dava Ekle</button>
              </div>
            </div>
          ) : (
            <div className="case-list">
              {cases.map(c => (
                <div 
                  key={c.id} 
                  className={`case-item ${selectedCaseId === c.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCaseId(c.id);
                    setActiveTab('overview');
                    setGeneratedPetitionText('');
                  }}
                >
                  <div className="case-meta">
                    <span className="case-item-title">{c.title}</span>
                    <span className="case-item-sub">{c.court}</span>
                    <span className="case-item-sub" style={{ fontSize: '0.8rem', opacity: 0.8 }}>Esas: {c.caseNumber || 'Belirtilmedi'}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                      {c.matchedDecisions?.length || 0} Emsal
                    </span>
                    <button 
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.2rem 0.4rem', color: '#f87171', borderColor: 'transparent', background: 'transparent' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Bu dava dosyasını silmek istediğinize emin misiniz?')) {
                          onDeleteCase(c.id);
                        }
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Active Case Detail & Work Area */}
        <div>
          {!activeCase ? (
            <div className="card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 12 12 16 14"></polyline></svg>
                <p style={{ fontSize: '1.1rem' }}>Detayları görüntülemek için sol menüden bir dava seçin.</p>
              </div>
            </div>
          ) : (
            <div className="card">
              {/* Case Summary Top Header */}
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h2 className="legal-title" style={{ fontSize: '1.45rem', color: 'var(--text-primary)' }}>{activeCase.title}</h2>
                  <span className="badge badge-blue">{activeCase.createdAt}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <span><strong>Mahkeme:</strong> {activeCase.court}</span>
                  <span>•</span>
                  <span><strong>Müvekkil:</strong> {activeCase.client || 'Belirtilmedi'}</span>
                  {activeCase.caseNumber && (
                    <>
                      <span>•</span>
                      <span><strong>Esas No:</strong> {activeCase.caseNumber}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Tabs Nav */}
              <div className="tabs">
                <div className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Genel Bilgiler</div>
                <div className={`tab ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>AI Analiz Raporu</div>
                <div className={`tab ${activeTab === 'precedents' ? 'active' : ''}`} onClick={() => setActiveTab('precedents')}>Eşleşen Emsaller ({activeCase.matchedDecisions?.length || 0})</div>
                <div className={`tab ${activeTab === 'petition' ? 'active' : ''}`} onClick={() => setActiveTab('petition')}>Dilekçe Hazırlayıcı</div>
                <div className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>Dava Sohbeti (AI)</div>
              </div>

              {/* Tab Contents */}
              <div className="tab-container">
                
                {/* 1. Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Dava Konusu</h4>
                      <p style={{ fontSize: '0.95rem', fontWeight: '500' }}>{activeCase.subject}</p>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Olaylar ve Dosya Detayları</h4>
                      <div style={{ 
                        backgroundColor: 'var(--bg-tertiary)', 
                        padding: '1.25rem', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem', 
                        lineHeight: '1.6', 
                        whiteSpace: 'pre-wrap',
                        border: '1px solid var(--border-light)' 
                      }}>
                        {activeCase.details}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. AI Analysis Tab */}
                {activeTab === 'analysis' && (
                  <div className="fade-in">
                    {!activeCase.aiAnalysis && !loading && (
                      <div className="empty-state" style={{ padding: '2rem' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                        <p>Bu dava dosyası için henüz yapay zeka analizi oluşturulmamış.</p>
                        {!hasApiKey() && (
                          <p style={{ fontSize: '0.82rem', color: '#fbbf24', marginTop: '0.5rem' }}>
                            ⚠️ Gemini API anahtarınız girilmediği için yerel şablon analiz uygulanacaktır.
                          </p>
                        )}
                        <button className="btn btn-primary" style={{ marginTop: '1.25rem' }} onClick={handleAnalyze}>
                          Analizi Başlat
                        </button>
                      </div>
                    )}

                    {loading && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
                        <div className="spinner spinner-large"></div>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Yapay zeka dava dosyasını ve emsalleri inceliyor...</p>
                      </div>
                    )}

                    {errorMsg && (
                      <div className="badge badge-danger" style={{ display: 'block', padding: '1rem', textTransform: 'none', borderRadius: '10px', marginBottom: '1rem' }}>
                        {errorMsg}
                      </div>
                    )}

                    {activeCase.aiAnalysis && !loading && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                          <span className="badge badge-gold">AI Analiz Sonucu</span>
                          <button className="btn btn-secondary btn-sm" onClick={handleAnalyze}>Analizi Yenile</button>
                        </div>
                        <div className="document-viewer" style={{ whiteSpace: 'pre-wrap' }}>
                          {activeCase.aiAnalysis}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Matched Precedents Tab */}
                {activeTab === 'precedents' && (
                  <div className="fade-in">
                    {(!activeCase.matchedDecisions || activeCase.matchedDecisions.length === 0) ? (
                      <div className="empty-state" style={{ padding: '2rem' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path></svg>
                        <p>Bu dava dosyası ile henüz eşleştirilmiş emsal karar bulunmuyor.</p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Emsal Karar Arama sekmesinden kararları bulup "Dava ile Eşleştir" butonu ile ekleyebilirsiniz.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {activeCase.matchedDecisions.map(dec => (
                          <div key={dec.id} className="decision-card" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                            <div className="decision-header">
                              <div>
                                <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{dec.daire}</span>
                                <span className="decision-nums" style={{ marginTop: '0.25rem', fontSize: '0.78rem' }}>
                                  Esas: {dec.esasNo} | Karar: {dec.kararNo}
                                </span>
                              </div>
                              <button 
                                className="btn btn-danger btn-sm" 
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                                onClick={() => handleUnlinkDecision(dec.id)}
                              >
                                Eşleşmeyi Kaldır
                              </button>
                            </div>
                            <h5 style={{ fontWeight: '600', fontSize: '0.95rem' }}>{dec.konu}</h5>
                            
                            <div style={{ 
                              backgroundColor: 'rgba(217, 119, 6, 0.05)', 
                              borderLeft: '3px solid var(--accent-gold)', 
                              padding: '0.75rem 1rem', 
                              borderRadius: '4px',
                              fontSize: '0.88rem',
                              color: 'var(--text-primary)'
                            }}>
                              <strong>Davadaki Hukuki Gerekçemiz:</strong> {dec.justification}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Petition Assistant Tab */}
                {activeTab === 'petition' && (
                  <div className="fade-in">
                    {!generatedPetitionText && !loading && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="grid-2">
                          <div className="form-group">
                            <label>Dilekçe Türü</label>
                            <select 
                              className="form-control select-control"
                              value={petitionType}
                              onChange={(e) => setPetitionType(e.target.value)}
                            >
                              <option value="Dava Dilekçesi">Dava Dilekçesi (Giriş / Başlangıç)</option>
                              <option value="Cevap Dilekçesi">Cevap Dilekçesi (Savunma)</option>
                              <option value="Beyan Dilekçesi">Beyan Dilekçesi (Açıklama / Delil Sunma)</option>
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label>Eklenecek Emsaller</label>
                            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', fontSize: '0.85rem', border: '1px solid var(--border-light)' }}>
                              {activeCase.matchedDecisions?.length || 0} adet emsal karar dilekçe gerekçesinde kullanılacaktır.
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Özel İstekler / Talepler veya Dilekçe Notları</label>
                          <textarea 
                            className="form-control" 
                            placeholder="Örn: Yasal faiz başlangıcı başvuru tarihinden itibaren olsun. Islah hakkımızı saklı tutalım. Arabuluculuk belgesi ektedir yazalım."
                            value={customNotes}
                            onChange={(e) => setCustomNotes(e.target.value)}
                          ></textarea>
                        </div>

                        {!hasApiKey() && (
                          <div className="badge badge-gold" style={{ display: 'block', padding: '0.75rem', textTransform: 'none', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                            ⚠️ Gemini API anahtarı ayarlanmadığı için yerel şablon dilekçe oluşturulacaktır. Real AI için API anahtarı ekleyin.
                          </div>
                        )}

                        <button className="btn btn-primary" onClick={handleCreatePetition} style={{ width: '100%' }}>
                          Dilekçe Taslağını Yapay Zekayla Yazdır
                        </button>
                      </div>
                    )}

                    {loading && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
                        <div className="spinner spinner-large"></div>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Yapay zeka dilekçe formatını hazırlıyor, emsalleri gerekçelendiriyor...</p>
                      </div>
                    )}

                    {generatedPetitionText && !loading && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="badge badge-success">Oluşturulan Dilekçe Taslağı</span>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => setGeneratedPetitionText('')}>Düzenlemeyi Sıfırla</button>
                            <button className="btn btn-primary btn-sm" onClick={handleCopyPetition}>Dilekçeyi Kopyala</button>
                          </div>
                        </div>
                        <textarea
                          className="form-control"
                          style={{ minHeight: '400px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5', backgroundColor: 'var(--bg-tertiary)' }}
                          value={generatedPetitionText}
                          onChange={(e) => setGeneratedPetitionText(e.target.value)}
                        ></textarea>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Case Chat Tab */}
                {activeTab === 'chat' && (
                  <div className="fade-in">
                    <div className="chat-container">
                      <div className="chat-messages">
                        {(!activeCase.chatHistory || activeCase.chatHistory.length === 0) ? (
                          <div className="empty-state" style={{ height: '100%', padding: '2rem' }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            <p style={{ fontSize: '0.9rem' }}>Bu dava dosyası hakkında sormak istediğiniz soruları sorabilirsiniz.</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Örn: "Karşı tarafın itirazını çürütmek için hangi kanun maddelerini öne sürmeliyim?"</p>
                          </div>
                        ) : (
                          activeCase.chatHistory.map(msg => (
                            <div key={msg.id} className={`chat-message ${msg.sender}`}>
                              <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                              <span className="chat-message-meta">{msg.time}</span>
                            </div>
                          ))
                        )}
                        {loading && (
                          <div className="chat-message assistant" style={{ padding: '0.5rem 1rem' }}>
                            <div className="spinner"></div>
                          </div>
                        )}
                        <div ref={chatMessagesEndRef} />
                      </div>
                      
                      <form onSubmit={handleSendChatMessage} className="chat-input-area">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Dava hakkında hukuki soru sorun..." 
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          disabled={loading}
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading || !chatMessage.trim()}>
                          Gönder
                        </button>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Case Modal Form */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>&times;</button>
            <h3 className="card-title">Yeni Dava Dosyası Başlat</h3>
            
            <form onSubmit={handleAddCaseSubmit}>
              <div className="form-group" style={{ border: '2px dashed var(--border-light)', padding: '1.25rem', borderRadius: '10px', textAlign: 'center', marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
                <label style={{ cursor: 'pointer', display: 'block', margin: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 0.5rem auto', color: 'var(--accent-gold)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>UYAP UDF veya PDF Dosyası Yükle</span>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Dava verileri otomatik çözümlenip doldurulacaktır.</span>
                  <input type="file" accept=".udf,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
                {uploading && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div className="spinner"></div>
                    <span>Belge çözümleniyor, lütfen bekleyin...</span>
                  </div>
                )}
                {uploadError && (
                  <div style={{ marginTop: '0.75rem', color: '#f87171', fontSize: '0.85rem' }}>
                    ⚠️ {uploadError}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Dava Başlığı (Dostane/Kısa İsim) *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Örn: Ahmet Yılmaz Değer Kaybı Davası" 
                  value={newCase.title}
                  onChange={(e) => setNewCase({...newCase, title: e.target.value})}
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
                    value={newCase.court}
                    onChange={(e) => setNewCase({...newCase, court: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Dosya / Esas Numarası (Varsa)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: 2025/799 Esas" 
                    value={newCase.caseNumber}
                    onChange={(e) => setNewCase({...newCase, caseNumber: e.target.value})}
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
                    value={newCase.client}
                    onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Dava Konusu *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: Maddi hasarlı kazadan değer kaybı tazminatı" 
                    value={newCase.subject}
                    onChange={(e) => setNewCase({...newCase, subject: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Olay Detayları ve Açıklamaları (Yapay zekanın analiz edeceği ana metin) *</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '180px' }}
                  placeholder="Kaza nasıl oldu? Karşı tarafın kusuru neydi? Ne kadarlık zarar oluştu? Olayın özetini ve tüm detaylarını buraya ekleyin..."
                  value={newCase.details}
                  onChange={(e) => setNewCase({...newCase, details: e.target.value})}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>İptal</button>
                <button type="submit" className="btn btn-primary">Dava Dosyasını Başlat</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
