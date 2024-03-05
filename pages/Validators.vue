<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getValidators } from '@/commons/commonService';

const loading11 = ref<boolean>(true);
const latestCommittee = ref<Committee | null>(null);
const validators = ref<Validator[]>([]);
const labels = useLabels();
const loadingState = useLoadingState();

onMounted(() => {
    getValidators(loading11, latestCommittee, validators);
});



</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.latestCommittee }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.totalStake }}</span>
                    <span class="text-900 line-height-3" v-if="!loading11">
                        
                        <div class="data-non-shorten-950">
                            {{ latestCommittee?.total_stake.toLocaleString() }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenNum(latestCommittee?.total_stake ?? 0) }}
                        </div>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.startingRound }}</span>
                    <span class="text-900 line-height-3" v-if="!loading11">{{ latestCommittee?.starting_round.toLocaleString() }}</span>
                </div>
            </div>
            <div class="card">
                <DataTable
                    :value="validators"
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
                                <NuxtLink v-if="data.address" :to="'/account/' + data.address">
                                    <div class="data-non-shorten-950">
                                        {{ data.address }}
                                    </div>
                                    <div class="data-shorten-950">
                                        {{ shortenStr(data.address,7,1) }}
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.stake }} </template>
                        <template #body="{ data }">
                            <div class="data-non-shorten-950">
                                {{ data.stake?.toLocaleString() }}
                            </div>
                            <div class="data-shorten-950">
                                {{ shortenNum(data.stake) }}
                            </div>
                        </template>
                    </Column>
                    <Column>
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
