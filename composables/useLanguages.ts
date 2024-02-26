export const useLanguages = ():Ref<Language[]> => {
    return ref<Language[]>([
        { name: 'English', code: 'ENG' },
        { name: '한국어', code: 'KOR' },
    ]);
};
