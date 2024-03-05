<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlockAndTransactionAndTransitions } from '@/commons/commonService';

const loading5 = ref<boolean>(true);
const loading7 = ref<boolean>(true);
const loading8 = ref<boolean>(true);
const transactionId = ref<string>('');
const block = ref<Block | null>(null);
const transaction = ref<Transaction | null>(null);
const transitions = ref<Transition[]>([]);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();

watch(() => route.params.transactionId, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        transactionId.value = newValue.toString();
        getBlockAndTransactionAndTransitions(transactionId, loading5, loading7, loading8, block, transaction, transitions);
    }
});

onMounted(() => {
    transactionId.value = route.params.transactionId.toString();
    getBlockAndTransactionAndTransitions(transactionId, loading5, loading7, loading8, block, transaction, transitions);
});


</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.transaction }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.transactionId }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7">
                        <div class="data-non-shorten-950">
                            {{ transaction?.transactionId }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(transaction?.transactionId ?? '', 15, 7) }}
                        </div> 
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.fee }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7"
                    >{{ toAleoScale(transaction?.fee) }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.inBlock }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5"
                    >
                        <NuxtLink :to="'/block/' + transaction?.blockHeight" rel="noopener">
                            {{ transaction?.blockHeight.toLocaleString() }}
                        </NuxtLink>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.timestamp }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ formatTimestamp(transaction?.timestamp) }}</span>
                </div>
            </div>



            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.transitions }} </h5>
                <DataTable
                    :value="transitions"
                    paginator
                    showGridlines
                    :rows="20"
                    dataKey="transitionId"
                    :sortField="'sortNo'"
                    :sortOrder="1" 
                    v-if="!loading8"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.transitionId }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <div class="data-non-shorten-950">
                                    {{ data.transitionId }}
                                </div>
                                <div class="data-shorten-950">
                                    {{ shortenStr(data.transitionId ?? '', 5, 5) }}
                                </div> 
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.programId }} </template>
                        <template #body="{ data }">
                            <div class="data-non-shorten-950">
                                {{ data.program }}
                            </div>
                            <div class="data-shorten-950">
                                {{ shortenStr(data.program ?? '', 10, 1) }}
                            </div> 
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.functionName }} </template>
                        <template #body="{ data }">
                            {{ data.function }}
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.inputs }} </template>
                        <template #body="{ data }">
                            {{ concatTransitionInputsOrOutputs(data.inputs) }}
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.outputs }} </template>
                        <template #body="{ data }">
                            {{ concatTransitionInputsOrOutputs(data.outputs) }}
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
    width: 25%;
}
</style>
