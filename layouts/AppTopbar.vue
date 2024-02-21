<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { isLatestBlock, fetchDataAndSaveToLocalStorage, getLatestBlockFromLocalStorage } from '@/commons/commonService';
import { useToast } from "primevue/usetoast";

const { layoutConfig } = useLayout();
const toast = useToast();

const intervalCount = ref(0);
const intervalId = ref(null);
const loading1 = ref(true);
const latestBlock = ref(null);
const elapsedTime = ref(null);
const aleoPrice = ref(1049.76);
const aleoPriceChangePercentage = ref(32.4);
const searchValue = ref('');
const selectedLanguage = useSelectedLanguage();
const languages = useLanguages();

const menuItems = useMenuItems();
const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();
const toastMessage = useToastMessage();

const { logoUrl, darkModeUrl, lightModeUrl } = useCommonComputed();
const { LOCAL_STORAGE_KEY, INTERVAL_THRESHOLD, LOADING_THRESHOLD } = useCommonConstant();

const handleSearch = () => {
    search(searchValue, toast, toastMessage);
};

watch(selectedLanguage, () => {
    onChangeLanguage(selectedLanguage);
});


const intervalAction = () => {
    intervalCount.value++;
    if (loading1 || (intervalCount.value > LOADING_THRESHOLD)){
        if (!isLatestBlock(latestBlock)) {
            fetchDataAndSaveToLocalStorage(LOCAL_STORAGE_KEY)
            getLatestBlockFromLocalStorage(latestBlock, loading1, LOCAL_STORAGE_KEY);
        }
    }
    updateElapsedTime(latestBlock, elapsedTime);
}

onMounted(() => {
    selectedLanguage.value = layoutConfig.language.value;

    onChangeLanguage(selectedLanguage);
    intervalAction();
    intervalId.value = setInterval(intervalAction, INTERVAL_THRESHOLD);
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value);
});


</script>

<template>
    <div class="layout-topbar">
        <div class="flex flex-column">
            <div class="layout-topbar-top">
                <div class="layout-topbar-top-logo">
                    <router-link to="/" class="layout-topbar-logo">
                        <img :src="logoUrl" alt="logo" />
                        <span class="layout-topbar-logo-name">Aleo Cat</span>
                    </router-link>
                </div>
                <div class="layout-topbar-top-info">
                    <div class="flex flex-row">
                        <span class="text-900" v-if="!loadingState">{{ labels.aleoPrice }}:&nbsp;&nbsp;</span>
                        <span class="text-green-500 font-medium" v-if="!loading1"
                            >${{ aleoPrice.toLocaleString() }}
                        </span>
                        <span :class="{ 'text-blue-500': aleoPriceChangePercentage > 0, 'text-red-500': aleoPriceChangePercentage < 0 }" v-if="!loading1"
                            >&nbsp;{{ aleoPriceChangePercentage > 0 ? '+' : '' }}{{ aleoPriceChangePercentage.toLocaleString() }}%
                        </span>                        
                    </div>
                    <div class="flex flex-row">
                        <span class="text-900" v-if="!loadingState">{{ labels.blockHeight }}:&nbsp;&nbsp;</span>
                        <span class="text-blue-500 font-medium"  v-if="!loading1"
                            >{{ latestBlock.header.metadata.height.toLocaleString() }}
                        </span>
                        <span class="text-gray-500 font-medium" v-if="!loading1"
                            >&nbsp;&nbsp;&nbsp;{{ elapsedTime }}
                        </span>
                    </div>
                </div>  
                <div class="layout-topbar-top-setting">
                    <div class="flex flex-row">
                        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-light-indigo', 'light')">
                            <img :src="lightModeUrl" class="w-2rem h-2rem" alt="Material Light Indigo" />
                        </button>
                    </div>
                    <div class="flex flex-row">
                        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-dark-indigo', 'dark')">
                            <img :src="darkModeUrl" class="w-2rem h-2rem" alt="Material Dark Indigo" />
                        </button>
                    </div>
                    <div class="flex flex-row">
                        <Dropdown v-model="selectedLanguage" :options="languages" optionLabel="name" />
                    </div>
                </div>
            </div>
            <div class="layout-topbar-body">
                <Menubar class="layout-topbar-body-menubar" :model="menuItems" v-if="!loadingState">
                    <template #start>
                        <router-link to="/" class="layout-topbar-logo">
                            <img :src="logoUrl" alt="logo" />
                            <span class="layout-topbar-logo-name">Aleo Cat</span>
                        </router-link>
                    </template>
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a v-ripple class="flex align-items-center" :href="href" v-bind="props.action" @click="navigate">
                                <span class="ml-2"> {{ item.label }} </span>
                            </a>
                        </router-link>
                        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </template>
                    <template class="layout-topbar-body-menubar-end" #end>
                        <div class="layout-topbar-body-search" v-if="!loadingState">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" @click="handleSearch" />
                                <InputText 
                                    v-model="searchValue" 
                                    type="text" 
                                    :placeholder="sentences.searchBy"
                                    @keypress.enter="handleSearch()"
                                />
                            </span>
                        </div>
                    </template>
                </Menubar> 
                <Toast />
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped></style>
