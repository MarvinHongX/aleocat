<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { getPrograms } from '@/commons/commonService';

const filters = ref<any>(null);
const loading4 = ref<boolean>(true);
const programs = ref<Program[]>([]);

const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "id":  { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
};


onMounted(() => {
    getPrograms(loading4, programs);
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
                <h5 v-if="!loadingState"> {{ labels.programs }} </h5>
                <DataTable
                    v-model:filters="filters"
                    :value="programs"
                    paginator
                    showGridlines
                    :rows="50"
                    dataKey="id"
                    filterDisplay="menu"
                    :sortField="'block_height'"
                    :sortOrder="-1" 
                    :loading="loading4"
                    :globalFilterFields="['id']"
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
                    <Column filterField="id" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }">
                        <template #header v-if="!loadingState"> {{ labels.programId }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <NuxtLink v-if="data.id" :to="'/program/' + data.id">
                                    <div class="data-non-shorten-950">
                                        {{ data.id }}
                                    </div>
                                    <div class="data-shorten-950">
                                        {{ shortenStr(data.id, 10, 1) }}
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="block_height" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.block_height?.toLocaleString() }}
                        </template>
                    </Column>
                    <Column filterField="block_timestamp" dataType="datetime">
                        <template #header v-if="!loadingState"> {{ labels.timestamp }} </template>
                        <template #body="{ data }">
                            {{ formatTimestamp(data.block_timestamp) }}
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
