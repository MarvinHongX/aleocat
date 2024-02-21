<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { getValidators } from '@/commons/commonService';

const filters = ref(null);
const loading11 = ref(true);
const validators = ref(null);
const members = ref(null);
const labels = useLabels();
const loadingState = useLoadingState();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "id":  { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
};


onMounted(() => {
    getValidators(loading11, validators, members);
});
initFilters();



</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.validators }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.totalStake }}</span>
                    <span class="text-900 line-height-3" v-if="!loading11">{{ validators.total_stake.toLocaleString() }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.startingRound }}</span>
                    <span class="text-900 line-height-3" v-if="!loading11">{{ validators.starting_round.toLocaleString() }}</span>
                </div>
            </div>
            <div class="card">
                <DataTable
                    :value="members"
                    paginator
                    showGridlines
                    :rows="50"
                    dataKey="address"
                    filterDisplay="menu"
                    :sortField="'rank'"
                    :sortOrder="1" 
                    :loading="loading11"
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
                        <template #header v-if="!loadingState"> {{ labels.stake }} </template>
                        <template #body="{ data }">
                            {{ data.stake?.toLocaleString() }}
                        </template>
                    </Column>
                    <Column style="min-width: 5rem">
                        <template #header v-if="!loadingState"> {{ labels.bondingState }} </template>
                        <template #body="{ data }">
                            <Tag :severity="getBadgeBondingState(data.bondingState)">{{ getBondingState(data.bondingState) }}</Tag>
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
