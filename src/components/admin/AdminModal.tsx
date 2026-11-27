import React, { useState } from 'react';
import { useConference } from '../../context/ConferenceContext';
import { ImportantDate, RegistrationFee } from '../../types/conference';

export const AdminModal: React.FC = () => {
  const {
    config,
    isAdminOpen,
    setIsAdminOpen,
    updateConfig,
    resetToDefault,
    exportConfigAsJSON,
    importConfigFromJSON,
  } = useConference();

  const [activeTab, setActiveTab] = useState<'general' | 'dates' | 'program' | 'topics' | 'submission' | 'fees' | 'committee' | 'backup'>('general');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Local draft states
  const [generalDraft, setGeneralDraft] = useState({
    acronym: config.acronym,
    fullName: config.fullName,
    datesText: config.datesText,
    venueBrief: config.venueBrief,
    venueDetailed: config.venueDetailed,
    backgroundText: config.backgroundText.join('\n\n'),
    objectivesText: config.objectives.join('\n'),
    publicationNote: config.publicationNote,
  });

  const [datesDraft, setDatesDraft] = useState<ImportantDate[]>([...config.importantDates]);
  const [topicsDraft, setTopicsDraft] = useState<string[]>([...config.topics]);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [submissionDraft, setSubmissionDraft] = useState({ ...config.submissionGuidelines });
  const [feesDraft, setFeesDraft] = useState<RegistrationFee[]>([...config.registrationFees]);
  const [registrationNoteDraft, setRegistrationNoteDraft] = useState(config.registrationNote);
  const [contactDraft, setContactDraft] = useState({ ...config.contactPerson });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  const showSaved = (msg: string) => {
    setStatusMessage(`${msg} saved.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // 1. General save
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      acronym: generalDraft.acronym,
      fullName: generalDraft.fullName,
      datesText: generalDraft.datesText,
      venueBrief: generalDraft.venueBrief,
      venueDetailed: generalDraft.venueDetailed,
      backgroundText: generalDraft.backgroundText.split('\n\n').filter(Boolean),
      objectives: generalDraft.objectivesText.split('\n').filter(Boolean),
      publicationNote: generalDraft.publicationNote,
    }, 'General details updated');
    showSaved('General details');
  };

  // 2. Dates helpers
  const handleUpdateDate = (id: string, field: keyof ImportantDate, val: any) => {
    const updated = datesDraft.map((d) => (d.id === id ? { ...d, [field]: val } : d));
    setDatesDraft(updated);
    updateConfig({ importantDates: updated }, 'Dates updated');
  };

  const handleAddDate = () => {
    const newDate: ImportantDate = {
      id: `date-${Date.now()}`,
      dateStr: 'TBA',
      title: 'New Milestone',
      notes: ''
    };
    const updated = [...datesDraft, newDate];
    setDatesDraft(updated);
    updateConfig({ importantDates: updated }, 'Milestone added');
  };

  const handleDeleteDate = (id: string) => {
    const updated = datesDraft.filter((d) => d.id !== id);
    setDatesDraft(updated);
    updateConfig({ importantDates: updated }, 'Milestone removed');
  };

  // 3. Topics helpers
  const handleAddTopic = () => {
    if (!newTopicInput.trim()) return;
    const updated = [...topicsDraft, newTopicInput.trim()];
    setTopicsDraft(updated);
    updateConfig({ topics: updated }, 'Topic added');
    setNewTopicInput('');
    showSaved('New topic added');
  };

  const handleDeleteTopic = (idx: number) => {
    const updated = topicsDraft.filter((_, i) => i !== idx);
    setTopicsDraft(updated);
    updateConfig({ topics: updated }, 'Topic removed');
  };

  // 4. Submission save
  const handleSaveSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({ submissionGuidelines: submissionDraft }, 'Submission settings updated');
    showSaved('Submission guidelines');
  };

  // 5. Fees save
  const handleUpdateFee = (idx: number, field: keyof RegistrationFee, val: string) => {
    const updated = feesDraft.map((f, i) => (i === idx ? { ...f, [field]: val } : f));
    setFeesDraft(updated);
    updateConfig({ registrationFees: updated, registrationNote: registrationNoteDraft }, 'Fees updated');
  };

  const handleSaveFees = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({ registrationFees: feesDraft, registrationNote: registrationNoteDraft }, 'Fees updated');
    showSaved('Registration fees');
  };

  // 6. Contact save
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({ contactPerson: contactDraft }, 'Contact info updated');
    showSaved('Contact information');
  };

  // 7. File import
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await importConfigFromJSON(file);
      setImportStatus(res);
      if (res.success) {
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex justify-center p-3 sm:p-6 font-sans">
      <div className="bg-white w-full max-w-4xl border-2 border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="bg-dlsu-800 text-white px-5 py-3.5 flex items-center justify-between border-b border-dlsu-900">
          <div>
            <h2 className="font-bold text-base tracking-wide uppercase">
              CITAS 2027 Conference Content Manager (Admin)
            </h2>
            <p className="text-xs text-emerald-100">
              Update dates, program schedule, topics of interest, fees, and contact details.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {statusMessage && (
              <span className="text-xs font-bold text-emerald-300">
                {statusMessage}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="px-2.5 py-1 bg-dlsu-900 text-white text-xs font-bold border border-slate-600 hover:bg-black"
            >
              Close [X]
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Plain Rectangular Academic Tabs) */}
        <div className="bg-slate-100 border-b border-slate-300 px-4 py-2 flex flex-wrap gap-1">
          {[
            { id: 'general', label: 'General Info' },
            { id: 'dates', label: 'Important Dates' },
            { id: 'topics', label: 'Topics of Interest' },
            { id: 'submission', label: 'Paper Submission' },
            { id: 'fees', label: 'Registration Fees' },
            { id: 'committee', label: 'Contact & Venue' },
            { id: 'backup', label: 'Backup / JSON' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-dlsu-800 border-slate-400'
                  : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-sm text-slate-900">
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Conference Acronym
                  </label>
                  <input
                    type="text"
                    value={generalDraft.acronym}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, acronym: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Conference Dates
                  </label>
                  <input
                    type="text"
                    value={generalDraft.datesText}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, datesText: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Full Conference Title
                </label>
                <input
                  type="text"
                  value={generalDraft.fullName}
                  onChange={(e) => setGeneralDraft({ ...generalDraft, fullName: e.target.value })}
                  className="w-full p-2 border border-slate-300 text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Venue Brief
                  </label>
                  <input
                    type="text"
                    value={generalDraft.venueBrief}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, venueBrief: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Publication Note
                  </label>
                  <input
                    type="text"
                    value={generalDraft.publicationNote}
                    onChange={(e) => setGeneralDraft({ ...generalDraft, publicationNote: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Event Background (Double enter between paragraphs)
                </label>
                <textarea
                  rows={4}
                  value={generalDraft.backgroundText}
                  onChange={(e) => setGeneralDraft({ ...generalDraft, backgroundText: e.target.value })}
                  className="w-full p-2 border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Objectives (One per line)
                </label>
                <textarea
                  rows={4}
                  value={generalDraft.objectivesText}
                  onChange={(e) => setGeneralDraft({ ...generalDraft, objectivesText: e.target.value })}
                  className="w-full p-2 border border-slate-300 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-dlsu-800 text-white font-bold text-xs uppercase hover:bg-dlsu-900"
                >
                  Save General Details
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: IMPORTANT DATES */}
          {activeTab === 'dates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-800 uppercase text-xs">
                  Conference Milestones & Deadlines
                </div>
                <button
                  type="button"
                  onClick={handleAddDate}
                  className="px-3 py-1 bg-slate-200 border border-slate-400 font-bold text-xs hover:bg-slate-300"
                >
                  + Add Milestone
                </button>
              </div>

              <div className="space-y-3">
                {datesDraft.map((item) => (
                  <div key={item.id} className="p-3 border border-slate-300 bg-slate-50 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-5">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Date String
                        </label>
                        <input
                          type="text"
                          value={item.dateStr}
                          onChange={(e) => handleUpdateDate(item.id, 'dateStr', e.target.value)}
                          className="w-full p-1.5 border border-slate-300 text-xs font-semibold"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateDate(item.id, 'title', e.target.value)}
                          className="w-full p-1.5 border border-slate-300 text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-end">
                        <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer mb-1">
                          <input
                            type="checkbox"
                            checked={item.isHighlight || false}
                            onChange={(e) => handleUpdateDate(item.id, 'isHighlight', e.target.checked)}
                          />
                          <span>Highlight</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.notes || ''}
                        onChange={(e) => handleUpdateDate(item.id, 'notes', e.target.value)}
                        placeholder="Optional notes..."
                        className="flex-1 p-1.5 border border-slate-300 text-xs text-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteDate(item.id)}
                        className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold hover:bg-red-200 border border-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TOPICS OF INTEREST */}
          {activeTab === 'topics' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTopicInput}
                  onChange={(e) => setNewTopicInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTopic();
                    }
                  }}
                  placeholder="Enter new research topic..."
                  className="flex-1 p-2 border border-slate-300 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddTopic}
                  className="px-4 py-2 bg-dlsu-800 text-white text-xs font-bold uppercase hover:bg-dlsu-900"
                >
                  Add Topic
                </button>
              </div>

              <div className="border border-slate-300 divide-y divide-slate-200">
                {topicsDraft.map((t, idx) => (
                  <div key={idx} className="p-2 flex items-center justify-between text-xs hover:bg-slate-50">
                    <span className="font-medium text-slate-800">{idx + 1}. {t}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTopic(idx)}
                      className="text-red-700 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAPER SUBMISSION */}
          {activeTab === 'submission' && (
            <form onSubmit={handleSaveSubmission} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Online Submission Form URL (Google Forms)
                </label>
                <input
                  type="url"
                  value={submissionDraft.portalUrl}
                  onChange={(e) => setSubmissionDraft({ ...submissionDraft, portalUrl: e.target.value })}
                  className="w-full p-2 border border-slate-300 text-xs font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    LaTeX Template URL
                  </label>
                  <input
                    type="url"
                    value={submissionDraft.templateLatexUrl}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, templateLatexUrl: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Word (.docx) Template URL
                  </label>
                  <input
                    type="url"
                    value={submissionDraft.templateDocxUrl}
                    onChange={(e) => setSubmissionDraft({ ...submissionDraft, templateDocxUrl: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Submission Summary
                </label>
                <textarea
                  rows={3}
                  value={submissionDraft.summary}
                  onChange={(e) => setSubmissionDraft({ ...submissionDraft, summary: e.target.value })}
                  className="w-full p-2 border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-dlsu-800 text-white font-bold text-xs uppercase hover:bg-dlsu-900"
                >
                  Save Submission Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: REGISTRATION FEES */}
          {activeTab === 'fees' && (
            <form onSubmit={handleSaveFees} className="space-y-4">
              <div className="space-y-3">
                {feesDraft.map((fee, idx) => (
                  <div key={idx} className="p-3 border border-slate-300 bg-slate-50 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-7">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Participant Type
                        </label>
                        <input
                          type="text"
                          value={fee.participantType}
                          onChange={(e) => handleUpdateFee(idx, 'participantType', e.target.value)}
                          className="w-full p-1.5 border border-slate-300 text-xs font-bold"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Amount
                        </label>
                        <input
                          type="text"
                          value={fee.amount}
                          onChange={(e) => handleUpdateFee(idx, 'amount', e.target.value)}
                          className="w-full p-1.5 border border-slate-300 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Registration Note / Free Attendance Policy
                </label>
                <input
                  type="text"
                  value={registrationNoteDraft}
                  onChange={(e) => setRegistrationNoteDraft(e.target.value)}
                  className="w-full p-2 border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-dlsu-800 text-white font-bold text-xs uppercase hover:bg-dlsu-900"
                >
                  Save Registration Fees
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: CONTACT & VENUE */}
          {activeTab === 'committee' && (
            <form onSubmit={handleSaveContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={contactDraft.name}
                    onChange={(e) => setContactDraft({ ...contactDraft, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Phone / Contact Number
                  </label>
                  <input
                    type="text"
                    value={contactDraft.phone}
                    onChange={(e) => setContactDraft({ ...contactDraft, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactDraft.email}
                    onChange={(e) => setContactDraft({ ...contactDraft, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={contactDraft.department}
                    onChange={(e) => setContactDraft({ ...contactDraft, department: e.target.value })}
                    className="w-full p-2 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-dlsu-800 text-white font-bold text-xs uppercase hover:bg-dlsu-900"
                >
                  Save Contact Info
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: BACKUP & JSON */}
          {activeTab === 'backup' && (
            <div className="space-y-5">
              <div className="p-4 border border-slate-300 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-900 uppercase text-xs">
                  Export Configuration (JSON)
                </div>
                <p className="text-xs text-slate-700">
                  Download the current conference details as a JSON file to share or keep as a backup.
                </p>
                <button
                  type="button"
                  onClick={exportConfigAsJSON}
                  className="px-4 py-2 bg-dlsu-800 text-white font-bold text-xs uppercase hover:bg-dlsu-900"
                >
                  Download citas-2027-config.json
                </button>
              </div>

              <div className="p-4 border border-slate-300 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-900 uppercase text-xs">
                  Import Configuration (JSON)
                </div>
                <p className="text-xs text-slate-700">
                  Upload an existing configuration JSON file to load saved updates.
                </p>
                <label className="inline-block px-4 py-2 bg-slate-200 border border-slate-400 text-slate-800 font-bold text-xs uppercase cursor-pointer hover:bg-slate-300">
                  Choose JSON File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {importStatus && (
                  <div className="text-xs font-bold text-slate-800 pt-1">
                    {importStatus.message}
                  </div>
                )}
              </div>

              <div className="p-4 border border-red-300 bg-red-50 space-y-2">
                <div className="font-bold text-red-900 uppercase text-xs">
                  Reset to Official Proposal Defaults
                </div>
                <p className="text-xs text-red-800">
                  Revert all text, deadlines, program schedule, and fees back to the verified PDF proposal.
                </p>
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="px-4 py-2 bg-white text-red-800 border border-red-400 font-bold text-xs uppercase hover:bg-red-100"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-300 px-5 py-3 flex items-center justify-between text-xs text-slate-600">
          <span>Edits are automatically saved to browser storage.</span>
          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="px-3 py-1 bg-white border border-slate-400 text-slate-800 font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
