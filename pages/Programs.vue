<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { fetchProgramsForPage } from '@/commons/commonService';

const filters = ref<any>(null);
const loading4 = ref<boolean>(true);
const programs = ref<Program[]>([]);

const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();
const tableParams = ref<TableParams>({
    currentPage: 0,
    pageSize: 100,
    totalRecords: 1
});


const onProgramPage = (event: any) => {
    tableParams.value.currentPage = event.page;
    fetchProgramsForPage(tableParams, loading4, programs);
};

onMounted(() => {
    fetchProgramsForPage(tableParams, loading4, programs);
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.programs }} </h5>
                <DataTable
                    :value="programs"
                    lazy 
                    paginator
                    :first="((tableParams.currentPage) * tableParams.pageSize) + 1"
                    :rows="tableParams.pageSize"
                    :totalRecords="tableParams.totalRecords"
                    showGridlines
                    dataKey="id"
                    filterDisplay="menu"
                    :sortField="'height'"
                    :sortOrder="-1" 
                    :loading="loading4"
                    :currentPage="tableParams.currentPage - 1"
                    @page="onProgramPage($event)"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column filterField="name" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }">
                        <template #header v-if="!loadingState"> {{ labels.programName }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <NuxtLink v-if="data.name" :to="'/program/' + data.name">
                                    <div class="data-non-shorten-950">
                                        {{ data.name }}
                                    </div>
                                    <div class="data-shorten-950">
                                        {{ shortenStr(data.name, 10, 1) }}
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="height" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.height?.toLocaleString() }}
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
