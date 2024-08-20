<script setup lang="ts">
import { usePrimeVue } from 'primevue/config';
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';

const $primevue = usePrimeVue();
const { layoutConfig, layoutState } = useLayout();
const { LAYOUT_CONFIG_KEY } = useCommonConstant();


onMounted(() => {
    updateLayoutConfigFromLocalStorage(LAYOUT_CONFIG_KEY);
});


const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === true,
        'layout-theme-dark': layoutConfig.darkTheme.value === true,
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': $primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': $primevue.config.ripple === true
    };
});

</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <div class="layout-main-container">
            <div class="layout-main">
                <NuxtPage />
            </div>
        </div>
        <app-footer></app-footer>
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss" scoped></style>
