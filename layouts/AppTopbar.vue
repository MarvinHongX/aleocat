<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { getAleoPrice, getLatestBlockAndSaveToLocalStorage, getLatestBlockFromLocalStorage } from '@/commons/commonService';
import { useToast } from "primevue/usetoast";

const { layoutConfig, setActiveMenuItem } = useLayout();
const toast = useToast();

const intervalCount = ref<number>(0);
const intervalId = ref<string | number | NodeJS.Timeout | undefined>(undefined);
const loading1 = ref<boolean>(true);
const loading12 = ref<boolean>(true);
const latestBlock = ref<Block | null>(null);

const aleoPrice = ref<number>(0);
const aleoPriceChangePercentage = ref<number>(0);
const searchValue = ref<string>('');

const selectedLanguage = useSelectedLanguage();
const languages = useLanguages();
const menuItems = useMenuItems();
const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();
const toastMessage = useToastMessage();
const elapsedTime = useLatestBlockElapsedTime();

const { logoUrl, darkModeUrl, lightModeUrl } = useCommonComputed();
const { LATEST_BLOCK_KEY, INTERVAL_THRESHOLD, LOADING_THRESHOLD } = useCommonConstant();

const handleSearch = () => {
    search(searchValue, toast, toastMessage);
};

const handleMenuItemClick = (key: string | undefined) => {
    setActiveMenuItem(key ?? '');
};

watch(selectedLanguage, () => {
    onChangeLanguage(selectedLanguage);
});


const intervalAction = () => {
    intervalCount.value++;
    if (loading1.value || (intervalCount.value > LOADING_THRESHOLD)){
        getLatestBlockAndSaveToLocalStorage(LATEST_BLOCK_KEY);
        
        intervalCount.value = 0;
    }
    getLatestBlockFromLocalStorage(latestBlock, loading1, LATEST_BLOCK_KEY);
    updateElapsedTime(latestBlock, elapsedTime);
    if (loading12.value){
        getAleoPrice(aleoPrice, aleoPriceChangePercentage, loading12);
    }
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
                        <span class="text-green-500 font-medium" v-if="!loading12"
                            >${{ aleoPrice.toLocaleString() }}
                        </span>
                        <span :class="{ 'text-blue-500': aleoPriceChangePercentage > 0, 'text-red-500': aleoPriceChangePercentage < 0 }" v-if="!loading12"
                            >&nbsp;{{ aleoPriceChangePercentage > 0 ? '+' : '' }}{{ aleoPriceChangePercentage.toLocaleString() }}%
                        </span>                        
                    </div>
                    <div class="flex flex-row">
                        <span class="text-900" v-if="!loadingState">{{ labels.blockHeight }}:&nbsp;&nbsp;</span>
                        <span class="text-blue-500 font-medium"  v-if="!loading1"
                            >{{ latestBlock?.header.metadata.height.toLocaleString() }}
                        </span>
                        <span class="text-gray-500 font-medium" v-if="!loading1"
                            >&nbsp;&nbsp;&nbsp;{{ elapsedTime }}
                        </span>
                    </div>
                </div>  
                <div class="layout-topbar-top-setting">
                    <div class="flex flex-row">
                        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-light-indigo', false)">
                            <img :src="lightModeUrl" class="w-2rem h-2rem" alt="Material Light Indigo" />
                        </button>
                    </div>
                    <div class="flex flex-row">
                        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-dark-indigo', true)">
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
                            <a v-ripple class="flex align-items-center" :href="href" v-bind="props.action" @click="handleMenuItemClick(item.key)">
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
