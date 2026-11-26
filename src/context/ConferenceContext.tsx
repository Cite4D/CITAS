import React, { createContext, useContext, useState } from 'react';
import { ConferenceConfig } from '../types/conference';
import { defaultConferenceData } from '../data/defaultConferenceData';

const STORAGE_KEY = 'CITAS_2027_SIBR_CONFIG_V3';

interface ConferenceContextType {
  config: ConferenceConfig;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  saveNotice: string | null;
  updateConfig: (updated: Partial<ConferenceConfig>, msg?: string) => void;
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
        if (parsed.version === 3) {
          return { ...defaultConferenceData, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Could not read saved config', e);
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

  const updateConfig = (updated: Partial<ConferenceConfig>, msg = 'Conference details updated') => {
    saveConfig({ ...config, ...updated }, msg);
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all details back to the official CITAS 2027 proposal defaults?')) {
      localStorage.removeItem(STORAGE_KEY);
      setConfig(defaultConferenceData);
      setSaveNotice('Restored official conference defaults');
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
          saveConfig({ ...defaultConferenceData, ...parsed, version: 2 }, 'Configuration loaded successfully');
          resolve({ success: true, message: 'Configuration loaded successfully.' });
        } catch (err) {
          resolve({ success: false, message: 'JSON parsing error: file is invalid or corrupted.' });
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
        updateConfig,
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
