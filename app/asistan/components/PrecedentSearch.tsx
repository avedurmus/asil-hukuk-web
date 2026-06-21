import React, { useState, useEffect } from 'react';
import { Decision, CaseFile } from '../types';

interface PrecedentSearchProps {
  decisions: Decision[];
  cases: CaseFile[];
  onLinkDecision: (caseId: string, decision: Decision, justification: string) => void;
  onAddCustomDecision: (decision: Decision) => void;
}

// Custom simple markdown formatter
function renderMarkdown(content: string) {
  if (!content) return null;
  return content.split('\n\n').map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('# ')) {
      return <h1 key={index} className="legal-title" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>{trimmed.substring(2)}</h1>;
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={index} style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>{trimmed.substring(3)}</h2>;
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={index} style={{ fontSize: '1.1rem', marginTop: '1.2rem', marginBottom: '0.5rem' }}>{trimmed.substring(4)}</h3>;
    }
    if (trimmed.startsWith('> ')) {
      return <blockquote key={index} style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '1rem', marginLeft: 0, color: 'var(--text-secondary)', backgroundColor: 'rgba(255, 255, 255, 0.02)', paddingTop: '0.5rem', paddingBottom: '0.5rem', borderRadius: '0 6px 6px 0', marginBottom: '1rem' }}>{trimmed.substring(2)}</blockquote>;
    }
    return <p key={index} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{block}</p>;
  });
}

export default function PrecedentSearch({ decisions, cases, onLinkDecision, onAddCustomDecision }: PrecedentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourt, setFilterCourt] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  
  // Live MCP Search States
  const [isLiveSearch, setIsLiveSearch] = useState(true);
  const [searchResults, setSearchResults] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingDocId, setLoadingDocId] = useState<string | null>(null);
  const [copiedDecId, setCopiedDecId] = useState<string | null>(null);

  const handleCopyCitation = (dec: Decision) => {
    const daireName = dec.daire;
    const dateStr = dec.kararTarihi ? `, T. ${dec.kararTarihi}` : '';
    const citation = `${daireName}, E. ${dec.esasNo} K. ${dec.kararNo}${dateStr}`;
    
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedDecId(dec.id);
      setTimeout(() => {
        setCopiedDecId(null);
      }, 2000);
    });
  };

  // Link Modal States
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [justification, setJustification] = useState('');

  // Add Decision Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDecision, setNewDecision] = useState({
    daire: '',
    esasNo: '',
    kararNo: '',
    kararTarihi: '',
    durum: 'KESİNLEŞTİ',
    konu: '',
    özet: '',
    markdown_content: ''
  });

  // Local/Offline filtering
  const filteredOfflineDecisions = decisions.filter(dec => {
    const matchesQuery = 
      dec.konu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dec.özet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dec.markdown_content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dec.esasNo.includes(searchQuery) ||
      dec.kararNo.includes(searchQuery) ||
      (dec.arananKelime && dec.arananKelime.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCourt = 
      filterCourt === 'all' || 
      (filterCourt === 'yargitay' && dec.daire.toLowerCase().includes('yargıtay')) ||
      (filterCourt === 'bam' && dec.daire.toLowerCase().includes('bölge adliye')) ||
      (filterCourt === 'yerel' && !dec.daire.toLowerCase().includes('yargıtay') && !dec.daire.toLowerCase().includes('bölge adliye'));

    const matchesStatus = 
      filterStatus === 'all' || 
      dec.durum.toUpperCase() === filterStatus.toUpperCase();

    return matchesQuery && matchesCourt && matchesStatus;
  });

  const displayedDecisions = isLiveSearch ? searchResults : filteredOfflineDecisions;

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLiveSearch) return; // Local filtering applies automatically via filteredOfflineDecisions
    if (!searchQuery.trim()) {
      alert('Lütfen arama yapmak için bir terim yazın.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/search-precedents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, court: filterCourt })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Arama sırasında hata oluştu (HTTP ${res.status})`);
      }

      const data = await res.json();
      setSearchResults(data.decisions || []);
    } catch (err: any) {
      console.error("Arama hatası:", err);
      setError(err.message || 'Emsal kararlar aranırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDecision = async (dec: Decision) => {
    setSelectedDecision(dec);

    // Lazily fetch document content from API if missing (only for live search results)
    if (!dec.markdown_content && isLiveSearch) {
      setLoadingDocId(dec.id);
      try {
        const res = await fetch('/api/fetch-precedent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: dec.id })
        });

        if (!res.ok) {
          throw new Error('Karar metni devlet arşivlerinden alınamadı.');
        }

        const data = await res.json();
        const updatedDec = { ...dec, markdown_content: data.markdown_content };
        
        setSelectedDecision(updatedDec);
        setSearchResults(prev => prev.map(d => d.id === dec.id ? updatedDec : d));
      } catch (err: any) {
        console.error("Karar getirme hatası:", err);
        alert(err.message || 'Karar metni yüklenirken bir hata oluştu.');
      } finally {
        setLoadingDocId(null);
      }
    }
  };

  const handleOpenLinkModal = (dec: Decision) => {
    setSelectedDecision(dec);
    setShowLinkModal(true);
    if (cases.length > 0) {
      setSelectedCaseId(cases[0].id);
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseId || !selectedDecision) return;
    onLinkDecision(selectedCaseId, selectedDecision, justification);
    setShowLinkModal(false);
    setJustification('');
    alert('Karar başarıyla davaya eklendi.');
  };

  const handleAddDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecision.daire || !newDecision.esasNo || !newDecision.kararNo || !newDecision.markdown_content) {
      alert('Lütfen zorunlu alanları doldurun (Daire, Esas/Karar No, Karar Metni).');
      return;
    }
    
    const id = Date.now().toString();
    const decisionToAdd: Decision = {
      ...newDecision,
      id,
      arananKelime: newDecision.konu,
    };

    onAddCustomDecision(decisionToAdd);
    setShowAddModal(false);
    setNewDecision({
      daire: '',
      esasNo: '',
      kararNo: '',
      kararTarihi: '',
      durum: 'KESİNLEŞTİ',
      konu: '',
      özet: '',
      markdown_content: ''
    });
    alert('Özel emsal karar başarıyla kütüphaneye eklendi.');
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-title">
          <h1 className="legal-title">Emsal Karar Arama</h1>
          <p>Yargıtay, BAM ve yerel mahkeme kararlarında arama yapın ve davalarınızla eşleştirin.</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Kütüphaneye Karar Ekle
          </button>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div className="search-input-wrapper" style={{ flex: 1, margin: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                className="form-control" 
                placeholder={isLiveSearch ? "Arama yapmak istediğiniz hukuki kavramları veya kanun maddesini yazın..." : "Çevrimdışı kütüphanede kelime veya dosya no ile arayın..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {isLiveSearch && (
              <button type="submit" className="btn btn-primary" style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={loading}>
                {loading && <div className="spinner"></div>}
                {loading ? 'Aranıyor...' : 'Ara'}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <select 
                className="form-control select-control" 
                value={filterCourt}
                onChange={(e) => setFilterCourt(e.target.value)}
              >
                <option value="all">Tüm Mahkeme Seviyeleri</option>
                <option value="yargitay">Yargıtay Kararları</option>
                <option value="bam">Bölge Adliye Mahkemesi (BAM)</option>
                <option value="yerel">İlk Derece Mahkemeleri</option>
              </select>
            </div>

            {!isLiveSearch && (
              <div style={{ flex: 1, minWidth: '200px' }}>
                <select 
                  className="form-control select-control" 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tüm Kesinlik Durumları</option>
                  <option value="kesinleşti">Kesinleşmiş Kararlar</option>
                  <option value="kesinleşmedi">Kesinleşmemiş Kararlar</option>
                </select>
              </div>
            )}

            {/* Toggle live / offline search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', userSelect: 'none', cursor: 'pointer' }} onClick={() => setIsLiveSearch(!isLiveSearch)}>
              <div style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: isLiveSearch ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '2px',
                  left: isLiveSearch ? '22px' : '2px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Canlı Arama (MCP)
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="card" style={{ borderLeft: '4px solid #f87171', marginBottom: '1.5rem', backgroundColor: 'rgba(248, 113, 113, 0.05)' }}>
          <p style={{ color: '#f87171', margin: 0, fontWeight: '500' }}>⚠️ Hata: {error}</p>
        </div>
      )}

      {/* Search Results */}
      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Bulunan Kararlar ({displayedDecisions.length})</h3>
      
      {loading ? (
        <div className="card" style={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="spinner spinner-large"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Emsal kararlar Yargıtay ve Danıştay veritabanlarında aranıyor...</p>
        </div>
      ) : displayedDecisions.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <p>{isLiveSearch ? 'Arama yapmak için yukarıya anahtar kelime yazıp "Ara" düğmesine basın.' : 'Aradığınız kriterlere uygun emsal karar bulunamadı.'}</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{isLiveSearch ? 'Örn: "kentsel dönüşüm kira yardımı", "kat karşılığı inşaat gecikme tazminatı"' : 'Farklı anahtar kelimeler deneyebilir veya yukarıdaki buton yardımıyla kütüphanenize yeni bir karar kaydedebilirsiniz.'}</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {displayedDecisions.map(dec => (
            <div key={dec.id} className="decision-card">
              <div className="decision-header">
                <div>
                  <span className="badge badge-gold" style={{ marginRight: '0.5rem' }}>{dec.daire}</span>
                  <span className={`badge ${dec.durum === 'KESİNLEŞTİ' ? 'badge-success' : 'badge-blue'}`}>{dec.durum}</span>
                  <div className="decision-nums" style={{ marginTop: '0.4rem' }}>
                    <span>Esas: {dec.esasNo}</span>
                    <span>•</span>
                    <span>Karar: {dec.kararNo}</span>
                  </div>
                </div>
                <span className="decision-date">{dec.kararTarihi}</span>
              </div>
              <h4 className="decision-title">{dec.konu}</h4>
              <p className="decision-summary">{dec.özet}</p>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleViewDecision(dec)}>
                  Görüntüle (Oku)
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => handleOpenLinkModal(dec)}>
                  Dava ile Eşleştir
                </button>
                <button 
                  className="btn btn-secondary btn-sm" 
                  style={{ 
                    borderColor: copiedDecId === dec.id ? '#10b981' : 'var(--border-light)',
                    color: copiedDecId === dec.id ? '#10b981' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }} 
                  onClick={() => handleCopyCitation(dec)}
                >
                  {copiedDecId === dec.id ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      Künyeyi Kopyala
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decision Viewer Modal */}
      {selectedDecision && !showLinkModal && (
        <div className="modal-overlay" onClick={() => setSelectedDecision(null)}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDecision(null)}>&times;</button>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-gold">{selectedDecision.daire}</span>
              <span className={`badge ${selectedDecision.durum === 'KESİNLEŞTİ' ? 'badge-success' : 'badge-blue'}`} style={{ marginLeft: '0.5rem' }}>{selectedDecision.durum}</span>
              <h2 className="legal-title" style={{ marginTop: '1rem', fontSize: '1.5rem' }}>{selectedDecision.konu}</h2>
              <div className="decision-nums" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <span>Esas: {selectedDecision.esasNo}</span>
                <span>Karar: {selectedDecision.kararNo}</span>
                <span>Tarih: {selectedDecision.kararTarihi}</span>
              </div>
            </div>
            
            <div className="document-viewer" style={{ minHeight: '300px' }}>
              {loadingDocId === selectedDecision.id ? (
                <div style={{ display: 'flex', height: '100%', minHeight: '200px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                  <div className="spinner spinner-large"></div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Gerekçeli karar metni devlet arşivlerinden canlı alınıyor...</p>
                </div>
              ) : (
                renderMarkdown(selectedDecision.markdown_content) || (
                  <p style={{ color: 'var(--text-secondary)' }}>Karar metni boş.</p>
                )
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedDecision(null)}>Kapat</button>
              <button className="btn btn-primary" onClick={() => {
                const dec = selectedDecision;
                setSelectedDecision(null);
                setTimeout(() => handleOpenLinkModal(dec), 100);
              }} disabled={loadingDocId === selectedDecision.id}>
                Dava Dosyasına Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link to Case Modal */}
      {showLinkModal && selectedDecision && (
        <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLinkModal(false)}>&times;</button>
            <h3 className="card-title">Emsal Kararı Davayla Eşleştir</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Seçilen Karar: <strong>{selectedDecision.daire} - {selectedDecision.esasNo} Esas</strong>
            </p>

            {cases.length === 0 ? (
              <div className="empty-state">
                <p>Eşleştirme yapabileceğiniz aktif bir dava dosyası bulunmuyor. Lütfen önce bir dava ekleyin.</p>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={() => setShowLinkModal(false)}>Kapat</button>
              </div>
            ) : (
              <form onSubmit={handleLinkSubmit}>
                <div className="form-group">
                  <label>Hedef Dava Dosyası</label>
                  <select 
                    className="form-control select-control" 
                    value={selectedCaseId} 
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                  >
                    {cases.map(c => (
                      <option key={c.id} value={c.id}>{c.title} ({c.court})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Dava İle İlişkisi ve Hukuki Gerekçe (Nasıl kullanılacağı)</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Örn: Bu karar, davalı sigorta şirketinin değer kaybı talebimizdeki belirsiz alacak davası itirazına karşı hukuki yararımızın bulunduğunu kanıtlamak için dilekçemizde kullanılacaktır."
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowLinkModal(false)}>Vazgeç</button>
                  <button type="submit" className="btn btn-primary">Davaya Ekle</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Custom Decision Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>&times;</button>
            <h3 className="card-title">Kütüphaneye Emsal Karar Ekle</h3>
            
            <form onSubmit={handleAddDecisionSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Mahkeme / Daire *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: Yargıtay 9. Hukuk Dairesi"
                    value={newDecision.daire}
                    onChange={(e) => setNewDecision({...newDecision, daire: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Karar Tarihi</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: 22.10.2025"
                    value={newDecision.kararTarihi}
                    onChange={(e) => setNewDecision({...newDecision, kararTarihi: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Esas No *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: 2025/3412"
                    value={newDecision.esasNo}
                    onChange={(e) => setNewDecision({...newDecision, esasNo: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Karar No *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Örn: 2025/8920"
                    value={newDecision.kararNo}
                    onChange={(e) => setNewDecision({...newDecision, kararNo: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kesinlik Durumu</label>
                  <select 
                    className="form-control select-control"
                    value={newDecision.durum}
                    onChange={(e) => setNewDecision({...newDecision, durum: e.target.value})}
                  >
                    <option value="KESİNLEŞTİ">KESİNLEŞTİ</option>
                    <option value="KESİNLEŞMEDİ">KESİNLEŞMEDİ</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Karar Başlığı / Konusu *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Örn: İşçi Alacakları - Fazla Çalışma Alacağının İspatı"
                  value={newDecision.konu}
                  onChange={(e) => setNewDecision({...newDecision, konu: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Karar Özeti (Kısa Öz / Kısa Bilgi) *</label>
                <textarea 
                  className="form-control" 
                  placeholder="Kararın getirdiği temel hukuki prensibi 1-2 cümleyle özetleyin."
                  value={newDecision.özet}
                  onChange={(e) => setNewDecision({...newDecision, özet: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Karar Metni (Full Text / Markdown) *</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '180px' }}
                  placeholder="Gerekçeli kararın metnini buraya yapıştırın."
                  value={newDecision.markdown_content}
                  onChange={(e) => setNewDecision({...newDecision, markdown_content: e.target.value})}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>İptal</button>
                <button type="submit" className="btn btn-primary">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
