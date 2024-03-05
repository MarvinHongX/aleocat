const { layoutConfig } = useLayout();

export const useSelectedLanguage = () => {  
    return useState('selectedLanguage', (): Language => layoutConfig.language.value);
};