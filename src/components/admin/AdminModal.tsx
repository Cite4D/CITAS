import React, { useState } from 'react';
import { useConference } from '../../context/ConferenceContext';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Calendar,
  Layers,
  FileText,
  MapPin,
  CreditCard,
  Settings,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ImportantDate, ScopeCategory, RegistrationTier } from '../../types/conference';

export const AdminModal: React.FC = () => {
  const {
    config,
    isAdminOpen,
    setIsAdminOpen,
    updateGeneralInfo,
    updateNoticeBanner,
    updateImportantDates,
    updateScopeCategories,
    updateSubmission,
    updateRegistrationTiers,
    updateVenue,
    resetToDefault,
    exportConfigAsJSON,
    importConfigFromJSON,
  } = useConference();

  const [activeTab, setActiveTab] = useState<'general' | 'timeline' | 'scope' | 'submission' | 'registration' | 'venue' | 'backup'>('general');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Local draft states
  const [generalDraft, setGeneralDraft] = useState({
    acronym: config.acronym,
    fullName: config.fullName,
    datesText: config.datesText,
    mainConferenceDate: config.mainConferenceDate,
    venueBrief: config.venueBrief,
    introText: config.introductionParagraphs.join('\n\n'),
    aimsText: config.aimsParagraphs.join('\n\n'),
    contactEmail: config.contactEmail,
    emergencyContact: config.emergencyContact || '',
    noticeEnabled: config.noticeBanner?.enabled ?? true,
    noticeText: config.noticeBanner?.text || '',
  });

  const [datesDraft, setDatesDraft] = useState<ImportantDate[]>([...config.importantDates]);
  const [scopeDraft, setScopeDraft] = useState<ScopeCategory[]>([...config.scopeCategories]);
  const [submissionDraft, setSubmissionDraft] = useState({ ...config.submission });
  const [tiersDraft, setTiersDraft] = useState<RegistrationTier[]>([...config.registrationTiers]);
  const [venueDraft, setVenueDraft] = useState({
    campus: config.venueFull.campus,
    building: config.venueFull.building,
    address: config.venueFull.address,
    city: config.venueFull.city,
    lat: config.venueFull.coordinates.lat,
    lng: config.venueFull.coordinates.lng,
    airport: config.venueFull.directionsGuide.airport,
    transit: config.venueFull.directionsGuide.transit,
    landmarks: config.venueFull.directionsGuide.landmarks,
    mapEmbedUrl: config.venueFull.mapEmbedUrl,
    venueBrief: config.venueBrief
  });

  // Track if changes are pending
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  const showSaveSuccess = (sectionName: string) => {
    setFeedbackMsg(`${sectionName} saved successfully!`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  // 1. Save General
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeneralInfo({
      acronym: generalDraft.acronym,
      fullName: generalDraft.fullName,
      datesText: generalDraft.datesText,
      mainConferenceDate: generalDraft.mainConferenceDate,
      venueBrief: generalDraft.venueBrief,
      introductionParagraphs: generalDraft.introText.split('\n\n').filter(Boolean),
      aimsParagraphs: generalDraft.aimsText.split('\n\n').filter(Boolean),
      contactEmail: generalDraft.contactEmail,
      emergencyContact: generalDraft.emergencyContact,
    });
    updateNoticeBanner({
      enabled: generalDraft.noticeEnabled,
      text: generalDraft.noticeText,
      type: 'info'
    });
    showSaveSuccess('General Details');
  };

  // 2. Timeline Helpers
  const handleAddDate = () => {
    const newDate: ImportantDate = {
      id: `date-${Date.now()}`,
      dateStr: 'TBA 2027',
      title: 'New Important Milestone',
      description: 'Milestone description here.',
      status: 'upcoming',
      iconType: 'calendar'
    };
    const updated = [...datesDraft, newDate];
    setDatesDraft(updated);
    updateImportantDates(updated);
  };

  const handleUpdateDateItem = (id: string, field: keyof ImportantDate, value: any) => {
    const updated = datesDraft.map((d) => (d.id === id ? { ...d, [field]: value } : d));
    setDatesDraft(updated);
    updateImportantDates(updated);
  };

  const handleDeleteDate = (id: string) => {
    const updated = datesDraft.filter((d) => d.id !== id);
    setDatesDraft(updated);
    updateImportantDates(updated);
  };

  // 3. Scope Helpers
  const [newTopicCategory, setNewTopicCategory] = useState<string>(scopeDraft[0]?.id || '');
  const [newTopicText, setNewTopicText] = useState<string>('');

  const handleAddTopic = () => {
    if (!newTopicText.trim()) return;
    const updated = scopeDraft.map((cat) => {
      if (cat.id === newTopicCategory) {
        return { ...cat, topics: [...cat.topics, newTopicText.trim()] };
      }
      return cat;
    });
    setScopeDraft(updated);
    updateScopeCategories(updated);
    setNewTopicText('');
    showSaveSuccess('New research topic added');
  };

  const handleDeleteTopic = (categoryId: string, topicIndex: number) => {
    const updated = scopeDraft.map((cat) => {
      if (cat.id === categoryId) {
        return { ...cat, topics: cat.topics.filter((_, idx) => idx !== topicIndex) };
      }
      return cat;
    });
    setScopeDraft(updated);
    updateScopeCategories(updated);
  };

  // 4. Submission Save
  const handleSaveSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    updateSubmission(submissionDraft);
    showSaveSuccess('Submission details');
  };

  // 5. Registration Helpers
  const handleUpdateTier = (id: string, field: keyof RegistrationTier, val: any) => {
    const updated = tiersDraft.map((t) => (t.id === id ? { ...t, [field]: val } : t));
    setTiersDraft(updated);
    updateRegistrationTiers(updated);
  };

  // 6. Venue Save
  const handleSaveVenue = (e: React.FormEvent) => {
    e.preventDefault();
    updateVenue(
      {
        campus: venueDraft.campus,
        building: venueDraft.building,
        address: venueDraft.address,
        city: venueDraft.city,
        coordinates: { lat: Number(venueDraft.lat), lng: Number(venueDraft.lng) },
        directionsGuide: {
          airport: venueDraft.airport,
          transit: venueDraft.transit,
          landmarks: venueDraft.landmarks
        },
        mapEmbedUrl: venueDraft.mapEmbedUrl
      },
      venueDraft.venueBrief
    );
    showSaveSuccess('Venue details');
  };

  // 7. File Import
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await importConfigFromJSON(file);
      setImportStatus(res);
      if (res.success) {
        // reload drafts
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-dlsu-900 text-white px-6 py-4 flex items-center justify-between border-b border-dlsu-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-dlsu-800 text-emerald-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                CITAS 2027 Admin Portal & Content CMS
              </h2>
              <p className="text-xs text-dlsu-200">
                Modify conference details, deadlines, EasyChair link, scope topics, and venue information.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {feedbackMsg && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {feedbackMsg}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-lg text-dlsu-200 hover:text-white hover:bg-dlsu-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto flex-shrink-0 py-2">
          {[
            { id: 'general', label: 'General & Hero', icon: Settings },
            { id: 'timeline', label: 'Important Dates', icon: Calendar },
            { id: 'scope', label: 'Scope & Topics', icon: Layers },
            { id: 'submission', label: 'Paper Submission & EasyChair', icon: FileText },
            { id: 'registration', label: 'Registration Fees', icon: CreditCard },
            { id: 'venue', label: 'Venue & Transit', icon: MapPin },
            { id: 'backup', label: 'Export / Import (JSON)', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-white text-dlsu-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-dlsu-800' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Conference Acronym
                  </label>
                  <input
                    type="text"
                    value={generalDraft.acronym}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, acronym: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Conference Dates String
                  </label>
                  <input
                    type="text"
                    value={generalDraft.datesText}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, datesText: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                    placeholder="February 16 to 18, 2027"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Conference Title
                </label>
                <input
                  type="text"
                  value={generalDraft.fullName}
                  onChange={(e) => setGeneralDraft({ ...generalDraft, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Main Conference Date Spotlight
                  </label>
                  <input
                    type="text"
                    value={generalDraft.mainConferenceDate}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, mainConferenceDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                    placeholder="Wednesday, February 17, 2027"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Venue Brief Location
                  </label>
                  <input
                    type="text"
                    value={generalDraft.venueBrief}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, venueBrief: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                    placeholder="De La Salle University, Manila, Philippines"
                  />
                </div>
              </div>

              {/* Notice Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span>Top Announcement Banner</span>
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={generalDraft.noticeEnabled}
                      onChange={(e) => setGeneralDraft({ ...generalDraft, noticeEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dlsu-800"></div>
                  </label>
                </div>
                {generalDraft.noticeEnabled && (
                  <input
                    type="text"
                    value={generalDraft.noticeText}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, noticeText: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                    placeholder="Call for Papers is now open! Initial submissions are due on November 20, 2026."
                  />
                )}
              </div>

              {/* Intro & Aims Paragraphs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Conference Introduction Paragraphs (Separate paragraphs with double enter)
                  </label>
                  <textarea
                    rows={4}
                    value={generalDraft.introText}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, introText: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Conference Aims & Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={generalDraft.aimsText}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, aimsText: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800 leading-relaxed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Secretariat Contact Email
                  </label>
                  <input
                    type="email"
                    value={generalDraft.contactEmail}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Telephone / Hotline
                  </label>
                  <input
                    type="text"
                    value={generalDraft.emergencyContact}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-dlsu-800"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-dlsu-800 hover:bg-dlsu-900 text-white font-semibold text-sm shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save General Information</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TIMELINE & IMPORTANT DATES */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Important Dates & Milestones</h3>
                  <p className="text-xs text-slate-500">Edit existing milestone dates, titles, descriptions, and visual badges.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddDate}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-dlsu-800 hover:bg-dlsu-900 text-white text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {datesDraft.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-4">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Date String
                        </label>
                        <input
                          type="text"
                          value={item.dateStr}
                          onChange={(e) => handleUpdateDateItem(item.id, 'dateStr', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 font-medium"
                          placeholder="November 20, 2026"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Milestone Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateDateItem(item.id, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 font-semibold"
                          placeholder="Submission Deadline"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Status Style
                        </label>
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateDateItem(item.id, 'status', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 bg-white"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="active">Active (Green pulse)</option>
                          <option value="highlighted">Key Milestone (Amber/Red)</option>
                          <option value="passed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => handleUpdateDateItem(item.id, 'description', e.target.value)}
                        placeholder="Optional brief description or note for authors..."
                        className="flex-1 px-3 py-1 text-xs rounded border border-slate-200 text-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteDate(item.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SCOPE & RESEARCH TOPICS */}
          {activeTab === 'scope' && (
            <div className="space-y-6">
              {/* Add Topic Bar */}
              <div className="p-4 rounded-xl bg-dlsu-50 border border-dlsu-200/80 flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-1/3">
                  <label className="block text-[11px] font-bold text-dlsu-900 uppercase mb-1">
                    Select Cluster Category
                  </label>
                  <select
                    value={newTopicCategory}
                    onChange={(e) => setNewTopicCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-dlsu-300 bg-white font-medium"
                  >
                    {scopeDraft.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:flex-1">
                  <label className="block text-[11px] font-bold text-dlsu-900 uppercase mb-1">
                    New Topic Title
                  </label>
                  <input
                    type="text"
                    value={newTopicText}
                    onChange={(e) => setNewTopicText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTopic();
                      }
                    }}
                    placeholder="e.g. LLM Reasoning, Cyber-Physical Digital Twins..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-dlsu-300 bg-white"
                  />
                </div>

                <div className="sm:pt-5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleAddTopic}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-dlsu-800 text-white text-xs font-bold hover:bg-dlsu-900 shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Topic</span>
                  </button>
                </div>
              </div>

              {/* Categorized Topic Lists */}
              <div className="space-y-6">
                {scopeDraft.map((cat) => (
                  <div key={cat.id} className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div>
                        <h4 className="font-serif font-bold text-dlsu-900 text-base">{cat.name}</h4>
                        <p className="text-xs text-slate-500">{cat.description}</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {cat.topics.length} topics
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteTopic(cat.id, idx)}
                            className="text-slate-400 hover:text-red-500 ml-0.5"
                            title="Remove topic"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAPER SUBMISSION & EASYCHAIR */}
          {activeTab === 'submission' && (
            <form onSubmit={handleSaveSubmission} className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Update the EasyChair submission link below anytime your conference account, track identifier, or CFP link changes.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  EasyChair Conference Submission URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={submissionDraft.submissionPortalUrl}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, submissionPortalUrl: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono text-dlsu-900"
                    placeholder="https://easychair.org/conferences/?conf=ailric2027"
                    required
                  />
                  <a
                    href={submissionDraft.submissionPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-dlsu-800 bg-slate-100 rounded-lg border border-slate-200"
                    title="Test Open URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    LaTeX Template Repository URL (GitHub)
                  </label>
                  <input
                    type="url"
                    value={submissionDraft.templateLatexUrl}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, templateLatexUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Microsoft Word (.docx) Template URL
                  </label>
                  <input
                    type="url"
                    value={submissionDraft.templateDocxUrl}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, templateDocxUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Format Specification Name
                  </label>
                  <input
                    type="text"
                    value={submissionDraft.formatName}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, formatName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Page Limit Specification
                  </label>
                  <input
                    type="text"
                    value={submissionDraft.pageLimit}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, pageLimit: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Double-Blind Review Requirements
                </label>
                <textarea
                  rows={3}
                  value={submissionDraft.blindReviewNotes}
                  onChange={(e) => setSubmissionDraft({ ...submissionDraft, blindReviewNotes: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Presentation & Proceedings Statement
                </label>
                <textarea
                  rows={2}
                  value={submissionDraft.presentationNotes}
                  onChange={(e) => setSubmissionDraft({ ...submissionDraft, presentationNotes: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-dlsu-800 hover:bg-dlsu-900 text-white font-semibold text-sm shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Submission Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: REGISTRATION FEES */}
          {activeTab === 'registration' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Registration Tiers & Pricing</h3>
                <p className="text-xs text-slate-500">Update rates, currencies, and inclusions for authors and participants.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tiersDraft.map((tier) => (
                  <div key={tier.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-dlsu-800 uppercase tracking-wide">
                        {tier.category}
                      </span>
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tier.isPopular || false}
                          onChange={(e) => handleUpdateTier(tier.id, 'isPopular', e.target.checked)}
                          className="rounded text-dlsu-800"
                        />
                        <span>Featured</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Tier Name
                      </label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => handleUpdateTier(tier.id, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Early Bird Rate
                        </label>
                        <input
                          type="text"
                          value={tier.earlyBirdRate}
                          onChange={(e) => handleUpdateTier(tier.id, 'earlyBirdRate', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Regular Rate
                        </label>
                        <input
                          type="text"
                          value={tier.regularRate}
                          onChange={(e) => handleUpdateTier(tier.id, 'regularRate', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: VENUE & TRANSIT */}
          {activeTab === 'venue' && (
            <form onSubmit={handleSaveVenue} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Campus Name
                  </label>
                  <input
                    type="text"
                    value={venueDraft.campus}
                    onChange={(e) => setVenueDraft({ ...venueDraft, campus: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Building / Hall
                  </label>
                  <input
                    type="text"
                    value={venueDraft.building}
                    onChange={(e) => setVenueDraft({ ...venueDraft, building: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Street Address
                </label>
                <input
                  type="text"
                  value={venueDraft.address}
                  onChange={(e) => setVenueDraft({ ...venueDraft, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Directions from Airport (NAIA)
                  </label>
                  <textarea
                    rows={2}
                    value={venueDraft.airport}
                    onChange={(e) => setVenueDraft({ ...venueDraft, airport: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Public Transit / LRT-1 Directions
                  </label>
                  <textarea
                    rows={2}
                    value={venueDraft.transit}
                    onChange={(e) => setVenueDraft({ ...venueDraft, transit: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Google Map Embed iframe URL
                </label>
                <input
                  type="text"
                  value={venueDraft.mapEmbedUrl}
                  onChange={(e) => setVenueDraft({ ...venueDraft, mapEmbedUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-600"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-dlsu-800 hover:bg-dlsu-900 text-white font-semibold text-sm shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Venue Information</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: BACKUP & EXPORT / IMPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-dlsu-100 text-dlsu-800">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Export Configuration as JSON</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Download your current conference settings (dates, scope, submission links, venue, and texts) as a standalone JSON file. You can commit this file or share it with the team.
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={exportConfigAsJSON}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-dlsu-800 text-white font-semibold text-xs hover:bg-dlsu-900 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download citas-config.json</span>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Import Configuration from JSON</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Restore or load previously saved conference settings from a JSON file.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Select JSON File to Upload</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {importStatus && (
                  <div
                    className={`p-3 rounded-lg text-xs font-medium ${
                      importStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {importStatus.message}
                  </div>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-100 text-red-700">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900 text-base">Reset to Default DLSU Settings</h4>
                    <p className="text-xs text-red-700 leading-relaxed">
                      Reverts all conference details, topics, and dates back to the original draft data. All custom edits in your browser storage will be reset.
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={resetToDefault}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-red-300 text-red-700 text-xs font-bold hover:bg-red-50 shadow-2xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Details to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Changes persist automatically in your browser (LocalStorage)</span>
          </div>
          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 text-xs"
          >
            Close Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};
