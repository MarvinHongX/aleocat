import { toRefs, reactive, computed } from 'vue';

const { LAYOUT_CONFIG_KEY } = useCommonConstant();
    
const layoutConfig = reactive<LayoutConfig>({
    darkTheme: false,
    language: {
        code: 'ENG',
        name: 'English',
    },
    menuMode: 'overlay',
    theme: 'md-light-indigo',
    scale: 14,
    activeMenuItem: '',
    isLoading: true,
});

const layoutState = reactive<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
});


export const useLayout = () => {
    const saveLayoutConfigToLocalStorage = (config: LayoutConfig): void => {
        if (layoutConfig.isLoading !== true) {
            localStorage.setItem(LAYOUT_CONFIG_KEY, JSON.stringify(config));
        }
    };

    const setTheme = (theme: string, darkTheme: boolean): void => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const setLanguage = (language: Language): void => {
        layoutConfig.language = language;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const setLoaded = (): void => {
        layoutConfig.isLoading = false;
        saveLayoutConfigToLocalStorage(layoutConfig);
    }

    const setScale = (scale: number): void => {
        layoutConfig.scale = scale;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const setActiveMenuItem = (key: string): void => {
        layoutConfig.activeMenuItem = key;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const onMenuToggle = (): void => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return {
        layoutConfig: toRefs(layoutConfig),
        layoutState: toRefs(layoutState),
        setTheme,
        setLanguage,
        setLoaded,
        setScale,
        onMenuToggle,
        isSidebarActive,
        isDarkTheme,
        setActiveMenuItem,
    };
}
