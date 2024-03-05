const { layoutConfig } = useLayout();

export const useSelectedLanguage = () => {  
    return useState('selectedLanguage', () => layoutConfig.language.value);
};