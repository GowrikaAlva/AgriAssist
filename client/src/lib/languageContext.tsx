'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'English' | 'Hindi' | 'Kannada' | 'Tamil' | 'Telugu';

interface Translations {
    [key: string]: {
        [key in Language]: string;
    };
}

const translations: Translations = {
    dashboard: {
        English: 'Dashboard',
        Hindi: 'डैशबोर्ड',
        Kannada: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        Tamil: 'டாஷ்போர்டு',
        Telugu: 'డ్యాష్‌బోర్డ్',
    },
    marketInsights: {
        English: 'Market Insights',
        Hindi: 'बाजार अंतर्दृष्टि',
        Kannada: 'ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು',
        Tamil: 'சந்தை நுண்ணறிவு',
        Telugu: 'మార్కెట్ ఇన్‌సైట్స్',
    },
    cropHealth: {
        English: 'Crop Health',
        Hindi: 'फसल स्वास्थ्य',
        Kannada: 'ಬೆಳೆ ಆರೋಗ್ಯ',
        Tamil: 'பயிர் ஆரோக்கியம்',
        Telugu: 'పంట ఆరోగ్యం',
    },
    aiChatbot: {
        English: 'AI Chatbot',
        Hindi: 'एआई चैटबॉट',
        Kannada: 'ಎಐ ಚಾಟ್‌ಬಾಟ್',
        Tamil: 'எஐ சாட்பாட்',
        Telugu: 'ఎఐ చాట్‌బాట్',
    },
    chatHistory: {
        English: 'Chat History',
        Hindi: 'चैट इतिहास',
        Kannada: 'ಚಾಟ್ ಇತಿಹಾಸ',
        Tamil: 'சாட் வரலாறு',
        Telugu: 'చాట్ చరిత్ర',
    },
    newChat: {
        English: 'New Chat',
        Hindi: 'नई चैट',
        Kannada: 'ಹೊಸ ಚಾಟ್',
        Tamil: 'புதிய சாட்',
        Telugu: 'కొత్త చాట్',
    },
    agriAssistAI: {
        English: 'AgriAssist AI',
        Hindi: 'एग्रीअसिस्ट एआई',
        Kannada: 'ಅಗ್ರಿಅಸಿಸ್ಟ್ ಎಐ',
        Tamil: 'அக்ரிஅசிஸ்ட் ஏஐ',
        Telugu: 'అగ్రిఅసిస్ట్ ఎఐ',
    },
    helloAssistant: {
        English: 'Hello! I\'m AgriAssist, your AI farming assistant. How can I help you today?',
        Hindi: 'नमस्ते! मैं एग्रीअसिस्ट हूं, आपका एआई कृषि सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?',
        Kannada: 'ನಮಸ್ಕಾರ! ನಾನು ಅಗ್ರಿಅಸಿಸ್ಟ್, ನಿಮ್ಮ ಎಐ ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
        Tamil: 'வணக்கம்! நான் அக்ரிஅசிஸ்ட், உங்கள் ஏஐ விவசாய உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
        Telugu: 'హలో! నేను అగ్రిఅసిస్ట్, మీ ఎఐ వ్యవసాయ సహాయకుడు. నేటి నేను మీకు ఎలా సహాయం చేయగలను?',
    },
    askAboutFarming: {
        English: 'Ask about farming...',
        Hindi: 'कृषि के बारे में पूछें...',
        Kannada: 'ಕೃಷಿ ಬಗ್ಗೆ ಕೇಳಿ...',
        Tamil: 'விவசாயத்தைப் பற்றி கேளுங்கள்...',
        Telugu: 'వ్యవసాయం గురించి అడగండి...',
    },
    noChatHistory: {
        English: 'No chat history yet',
        Hindi: 'अभी तक कोई चैट इतिहास नहीं',
        Kannada: 'ಇನ್ನೂ ಯಾವುದೇ ಚಾಟ್ ಇತಿಹಾಸವಿಲ್ಲ',
        Tamil: 'இன்னும் சாட் வரலாறு இல்லை',
        Telugu: 'ఇంకా చాట్ చరిత్ర లేదు',
    },
    language: {
        English: 'Language',
        Hindi: 'भाषा',
        Kannada: 'ಭಾಷೆ',
        Tamil: 'மொழி',
        Telugu: 'భాష',
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('English');

    useEffect(() => {
        // Load language from localStorage
        const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
        if (savedLanguage && ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'].includes(savedLanguage)) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('selectedLanguage', lang);
    };

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
