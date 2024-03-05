<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { getLatestTransactions, getLatestBlockFromLocalStorage } from '@/commons/commonService';

const filters = ref<any>(null);
const loading1 = ref<boolean>(true);
const loading3 = ref<boolean>(true);
const latestBlock = ref<Block | null>(null); 
const transactions = ref<Transaction[]>([]);

const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();

const { LOCAL_STORAGE_KEY } = useCommonConstant();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "transactionId":  { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
};


onMounted(() => {
    if (getLatestBlockFromLocalStorage(latestBlock, loading1, LOCAL_STORAGE_KEY)) {
        getLatestTransactions(latestBlock, loading3, transactions);
    }
});
initFilters();

const clearFilter = () => {
    initFilters();
};

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.latestTransactions }} </h5>
                <DataTable
                    v-model:filters="filters"
                    :value="transactions"
                    paginator
                    showGridlines
                    :rows="50"
                    dataKey="transactionId"
                    filterDisplay="menu"
                    :sortField="'sortNo'"
                    :sortOrder="-1" 
                    :loading="loading3"
                    :globalFilterFields="['transactionId']"
                >
                    <template #header>
                        <div class="flex justify-content-between" v-if="!loadingState">
                            <Button type="button" icon="pi pi-filter-slash" :label="labels.clear" outlined @click="clearFilter()" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" :sentence="sentences.keywordSearch" />
                            </span>
                        </div>
                    </template>
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column filterField="transactionId" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }">
                        <template #header v-if="!loadingState"> {{ labels.transactionId }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <NuxtLink v-if="data.transactionId" :to="'/transaction/' + data.transactionId" rel="noopener">
                                    <div class="data-non-shorten-950">
                                        {{ data.transactionId }}
                                    </div>
                                    <div class="data-shorten-950">
                                        {{ shortenStr(data.transactionId,7,1) }}
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="fee" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.fee }} </template>
                        <template #body="{ data }">
                            {{ toAleoScale(data.fee) }}
                        </template>
                    </Column>
                    <Column filterField="blockHeight" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.blockHeight.toLocaleString() }}
                        </template>
                    </Column>
                    <Column filterField="timestamp" dataType="datetime">
                        <template #header v-if="!loadingState"> {{ labels.timestamp }} </template>
                        <template #body="{ data }">
                            {{ formatTimestamp(data.timestamp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

:deep(.p-datatable-loading-overlay) {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>
