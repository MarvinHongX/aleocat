<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { getLatestTransactions, getLatestBlockFromLocalStorage } from '@/commons/commonService';

const filters = ref(null);
const loading1 = ref(true);
const loading3 = ref(true);
const latestBlock = ref(null); 
const transactions = ref(null);

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
                    <Column filterField="transactionId" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.transactionId }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <NuxtLink v-if="data.transactionId" :to="'/transaction/' + data.transactionId" rel="noopener">
                                    <span>{{ data.transactionId }}</span>
                                </NuxtLink>
                                <span v-else>{{ data.transactionId }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="fee" dataType="numeric" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.fee }} </template>
                        <template #body="{ data }">
                            {{ toAleoScale(data.fee) }}
                        </template>
                    </Column>
                    <Column filterField="blockHeight" dataType="numeric" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.blockHeight.toLocaleString() }}
                        </template>
                    </Column>
                    <Column filterField="timestamp" dataType="datetime" style="min-width: 10rem">
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