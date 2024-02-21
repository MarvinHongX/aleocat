
import { computed } from 'vue';
const { layoutConfig } = useLayout();

export const useCommonComputed = () => {
    
    const logoUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-light' : 'logo-dark'}.svg`;
    });

    const darkModeUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'dark-mode-light' : 'dark-mode'}.svg`;
    });

    const lightModeUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'light-mode-light' : 'light-mode'}.svg`;
    });

    return {
        logoUrl,
        darkModeUrl,
        lightModeUrl,
    };
};
