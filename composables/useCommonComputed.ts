const { layoutConfig } = useLayout();

export const useCommonComputed = () => {
    const darkTheme = computed(() => {
        return layoutConfig.darkTheme.value ? true : false;
    });
    
    const logoUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-color.png' : 'logo-light.svg'}`;
    });

    const lightLogoUrl = computed(() => {
        return `/layout/images/logo-light.svg`;
    });

    const darkModeUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'dark-mode' : 'dark-mode-light'}.svg`;
    });

    const lightModeUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'light-mode' : 'light-mode-light'}.svg`;
    });

    const skyzoneUrl = computed(() => {
        return `/layout/images/skyzone.svg`;
    });

    return {
        darkTheme,
        logoUrl,
        lightLogoUrl,
        darkModeUrl,
        lightModeUrl,
        skyzoneUrl,
    };
};
