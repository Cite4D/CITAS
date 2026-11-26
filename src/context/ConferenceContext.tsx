import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConferenceConfig, ImportantDate, ScopeCategory, SubmissionDetails, RegistrationTier } from '../types/conference';
import { defaultConferenceData } from '../data/defaultConferenceData';

const STORAGE_KEY = 'CITAS_2027_CONFERENCE_CONFIG_V1';

interface ConferenceContextType {
  config: ConferenceConfig;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  saveNotice: string | null;
  updateGeneralInfo: (info: Partial<ConferenceConfig>) => void;
  updateNoticeBanner: (banner: ConferenceConfig['noticeBanner']) => void;
  updateImportantDates: (dates: ImportantDate[]) => void;
  updateScopeCategories: (categories: ScopeCategory[]) => void;
  updateSubmission: (submission: SubmissionDetails) => void;
  updateRegistrationTiers: (tiers: RegistrationTier[]) => void;
  updateVenue: (venue: ConferenceConfig['venueFull'], venueBrief: string) => void;
  resetToDefault: () => void;
  exportConfigAsJSON: () => void;
  importConfigFromJSON: (file: File) => Promise<{ success: boolean; message: string }>;
}

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConferenceConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure schema compatibility
        return { ...defaultConferenceData, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read saved CITAS configuration from localStorage', e);
    }
    return defaultConferenceData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const saveConfig = (newConfig: ConferenceConfig, noticeMessage = 'Changes saved') => {
    const updated = {
      ...newConfig,
      lastUpdated: new Date().toISOString()
    };
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveNotice(noticeMessage);
      setTimeout(() => setSaveNotice(null), 3500);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      setSaveNotice('Failed to persist to browser storage');
    }
  };

  const updateGeneralInfo = (info: Partial<ConferenceConfig>) => {
    saveConfig({ ...config, ...info }, 'Conference details updated');
  };

  const updateNoticeBanner = (banner: ConferenceConfig['noticeBanner']) => {
    saveConfig({ ...config, noticeBanner: banner }, 'Banner settings updated');
  };

  const updateImportantDates = (importantDates: ImportantDate[]) => {
    saveConfig({ ...config, importantDates }, 'Timeline dates updated');
  };

  const updateScopeCategories = (scopeCategories: ScopeCategory[]) => {
    saveConfig({ ...config, scopeCategories }, 'Scope and tracks updated');
  };

  const updateSubmission = (submission: SubmissionDetails) => {
    saveConfig({ ...config, submission }, 'Submission guidelines updated');
  };

  const updateRegistrationTiers = (registrationTiers: RegistrationTier[]) => {
    saveConfig({ ...config, registrationTiers }, 'Registration tiers updated');
  };

  const updateVenue = (venueFull: ConferenceConfig['venueFull'], venueBrief: string) => {
    saveConfig({ ...config, venueFull, venueBrief }, 'Venue information updated');
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all details back to the original default CITAS 2027 data? All local custom edits will be replaced.')) {
      localStorage.removeItem(STORAGE_KEY);
      setConfig(defaultConferenceData);
      setSaveNotice('Restored default conference configuration');
      setTimeout(() => setSaveNotice(null), 3500);
    }
  };

  const exportConfigAsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `citas-2027-config-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSaveNotice('Conference configuration exported as JSON');
    setTimeout(() => setSaveNotice(null), 3500);
  };

  const importConfigFromJSON = async (file: File): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const contents = e.target?.result as string;
          const parsed = JSON.parse(contents);
          if (!parsed.acronym && !parsed.fullName) {
            resolve({ success: false, message: 'Invalid config file: missing conference name or acronym.' });
            return;
          }
          saveConfig({ ...defaultConferenceData, ...parsed }, 'Imported configuration successfully');
          resolve({ success: true, message: 'Configuration loaded successfully.' });
        } catch (err) {
          resolve({ success: false, message: 'JSON parsing error: file is corrupted or not valid JSON.' });
        }
      };
      reader.onerror = () => {
        resolve({ success: false, message: 'Failed to read uploaded file.' });
      };
      reader.readAsText(file);
    });
  };

  return (
    <ConferenceContext.Provider
      value={{
        config,
        isAdminOpen,
        setIsAdminOpen,
        saveNotice,
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
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConference = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConference must be used within a ConferenceProvider');
  }
  return context;
};
