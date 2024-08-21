const { layoutConfig } = useLayout();

export const useCommonComputed = () => {
    const darkTheme = computed(() => {
        return layoutConfig.darkTheme.value !== true ? false : true;
    });
    
    const logoUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value && (layoutConfig.darkTheme.value === true) ? 'logo-light.svg' : 'logo-color.png'}`;
    });

    const lightLogoUrl = computed(() => {
        return `/layout/images/logo-light.svg`;
    });

    const darkModeUrl = computed(() => {
        return `/layout/images/dark-mode-light.svg`;
    });

    const lightModeUrl = computed(() => {
        return `/layout/images/light-mode.svg`;
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
