<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProversForPage } from '@/commons/commonService';

const loading14 = ref<boolean>(true);
const provers = ref<Prover[]>([]);
const labels = useLabels();
const loadingState = useLoadingState();
const tableParams = ref<TableParams>({
    currentPage: 0,
    pageSize: 100,
    totalRecords: 1
});

const onProverPage = (event: any) => {
    tableParams.value.currentPage = event.page;
    fetchProversForPage(tableParams, loading14, provers);
};

onMounted(() => {
    fetchProversForPage(tableParams, loading14, provers);
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.provers }} </h5>
                <DataTable
                    :value="provers"
                    lazy 
                    paginator
                    :first="((tableParams.currentPage) * tableParams.pageSize) + 1"
                    :rows="tableParams.pageSize"
                    :totalRecords="tableParams.totalRecords"
                    showGridlines
                    dataKey="address"
                    filterDisplay="menu"
                    :sortField="'rank'"
                    :sortOrder="1" 
                    :loading="loading14"
                    :currentPage="tableParams.currentPage - 1"
                    @page="onProverPage($event)"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column dataType="numeric" style="min-width: 4rem">
                        <template #header v-if="!loadingState"> {{ labels.rank }} </template>
                        <template #body="{ data }">
                            {{ data.rank }}
                        </template>
                    </Column>
                    <Column :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #header v-if="!loadingState"> {{ labels.address }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <NuxtLink v-if="data.address" :to="'/account/' + data.address">
                                    <span>{{ data.address }}</span>
                                </NuxtLink>
                                <span v-else>{{ data.address }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.powerOfRatio }} </template>
                        <template #body="{ data }">
                            <span>
                                {{ toProverScoreScale(data.score) }}
                            </span>
                            <span :class="proverScorePercentScaleClass(data.rank)">{{ toProverScorePercentScale(data.score, data.totalPower) }}%</span>

                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
                                <div :class="proverScorePercentScaleBarClass(data.rank)" :style="{ width: toProverScorePercentScale(data.score, data.totalPower) + '%' }"></div>
                            </div>
                         </template>
                    </Column>
                    <Column dataType="numeric" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.latestBlock }} </template>
                        <template #body="{ data }">
                            {{ data.lastBlock?.toLocaleString() }}
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

.block {
    width: 15%;
}
</style>
