import logoLightUrl from '/assets/images/logo-light.svg';
import logoColorUrl from '/assets/images/logo-color.webp';
import darkModeUrl from '/assets/images/dark-mode-light.svg';
import lightModeUrl from '/assets/images/light-mode.svg';
import skyzoneUrl from '/assets/images/skyzone.svg';
import aleoLogoUrl from '/assets/images/aleoLogo.webp';

const { layoutConfig } = useLayout();

export const useCommonComputed = () => {
  const darkTheme = computed(() => layoutConfig.darkTheme.value === true);

  const logoUrl = computed(() => (darkTheme.value ? logoLightUrl : logoColorUrl));

  return {
    darkTheme,
    logoUrl,
    lightLogoUrl: logoLightUrl,
    darkModeUrl,
    lightModeUrl,
    skyzoneUrl,
    aleoLogoUrl,
  };
};
