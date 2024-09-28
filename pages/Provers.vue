<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getDailyPower, fetchProversForPage } from '@/commons/commonService';

const loading14 = ref<boolean>(true);
const loading16 = ref<boolean>(true);
const provers = ref<Prover[]>([]);
const labels = useLabels();
const loadingState = useLoadingState();
const tableParams = ref<TableParams>({
    currentPage: 0,
    pageSize: 100,
    totalRecords: 1
});

const dailyPower = ref<LineChart>({
        labels: ['label'],
        datasets: [
          {
            label: 'power',
            data: [1],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
          },
        ]
      });

const onProverPage = (event: any) => {
    tableParams.value.currentPage = event.page;
    fetchProversForPage(tableParams, loading14, provers);
};


onMounted(() => {
    getDailyPower(loading16, dailyPower);
    fetchProversForPage(tableParams, loading14, provers);
});

</script>

<template>
    <div class="grid">
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Daily Productive Forces</h5>
                <Chart type="line" :data="dailyPower" v-if="!loading16"/>
            </div>
        </div>
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
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.rank }} </template>
                        <template #body="{ data }">
                            {{ data.rank }}
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.address }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <NuxtLink class="text-blue-600" v-if="data.address" :to="'/account/' + data.address">
                                    <div class="data-non-shorten-950">
                                        {{ data.address }}
                                    </div>
                                    <div class="data-shorten-950">
                                        {{ shortenStr(data.address,7,4) }}
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.credits }} </template>
                        <template #body="{ data }">
                            {{ toAleoScale(data.score) }}
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.powerOfRatio }} </template>
                        <template #body="{ data }">
                            <span class="data-non-shorten-500">
                                {{ toProverPowerScale(data.power) }}M
                            </span>
                            <span :class="proverScorePercentScaleClass(data.rank)">{{ toProverPowerPercentScale(data.power, data.totalPower) }}%</span>
                            <div class="data-non-shorten-500 surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px;">
                                <div :class="proverScorePercentScaleBarClass(data.rank)" :style="{ width: toProverPowerPercentScale(data.power, data.totalPower) + '%' }"></div>
                            </div>
                         </template>
                    </Column>
                    <Column dataType="numeric">
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
