export const useSelectedLanguage = (): Ref<Language> => {
    return ref<Language>(
        { name: 'English', code: 'ENG' },
    );
};