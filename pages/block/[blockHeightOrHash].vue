<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlockAndTransactionsAndSolutions } from '@/commons/commonService';

const loading3 = ref<boolean>(true);
const loading5 = ref<boolean>(true);
const loading6 = ref<boolean>(true);
const blockHeightOrHash = ref<string>('');
const block = ref<Block | null>(null);
const transactions = ref<Transaction[]>([]);
const solutions = ref<Solution[]>([]);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();


watch(() => route.params.blockHeightOrHash, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        blockHeightOrHash.value = newValue.toString();
        getBlockAndTransactionsAndSolutions(blockHeightOrHash, loading5, loading3, loading6, block, transactions, solutions);
    }
});

onMounted(() => {
    blockHeightOrHash.value = route.params.blockHeightOrHash.toString();
    getBlockAndTransactionsAndSolutions(blockHeightOrHash, loading5, loading3, loading6, block, transactions, solutions);
});


</script>

<template>
    <div class="grid"> 
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.block }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.height }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ block?.header.metadata.height.toLocaleString() }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.blockHash }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.block_hash }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.block_hash ?? '', 13, 7) }}
                        </div>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.network }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5"
                    ><Tag :severity="getBadgeNetwork(block?.header.metadata.network)">{{ getNetwork(block?.header.metadata.network) }}</Tag></span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.round }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5"
                    >{{ block?.header.metadata.round.toLocaleString() }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.timestamp }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ formatTimestamp(block?.header.metadata.timestamp) }}</span>
                </div>
            </div>

            <div class="card">
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.previousBlockHash }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5"
                    >
                    <NuxtLink :to="'/block/' + block?.previous_hash">
                        <div class="data-non-shorten-950">
                            {{ block?.previous_hash }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.previous_hash ?? '', 15, 7) }}
                        </div>
                    </NuxtLink>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.previousStateRoot }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.header.previous_state_root }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.header.previous_state_root ?? '', 15, 7) }}
                        </div>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.transactionsRoot }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.header.transactions_root }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.header.transactions_root ?? '', 15, 7) }}
                        </div>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.finalizeRoot }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.header.finalize_root }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.header.finalize_root ?? '', 15, 7) }}
                        </div>      
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.ratificationsRoot }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.header.ratifications_root }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.header.ratifications_root ?? '', 15, 7) }}
                        </div>   
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.solutionsRoot }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">   
                        <div class="data-non-shorten-950">
                            {{ block?.header.solutions_root }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.header.solutions_root ?? '', 15, 7) }}
                        </div>   
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.subdagRoot }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.header.subdag_root }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.header.subdag_root ?? '', 15, 7) }}
                        </div>   
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.cumulativeWeight }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        {{ block?.header.metadata.cumulative_weight.toLocaleString() }}
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.cumulativeProofTarget }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        {{ block?.header.metadata.cumulative_proof_target.toLocaleString() }}
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.coinbaseTarget }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ block?.header.metadata.coinbase_target.toLocaleString() }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.proofTarget }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ block?.header.metadata.proof_target.toLocaleString() }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.coinbaseReward }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ block?.ratifications?.find(item => item.type === 'puzzle_reward')?.amount?.toLocaleString() }}</span>

                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.totalFee }}</span>
                    <span class="text-900 line-height-3" v-if="!loading3">
                        {{ toAleoScale(transactions.reduce((sum, transaction) => sum + transaction.fee, 0)) }}
                    </span>
                </div>
            </div>



            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.transactions }} </h5>
                <DataTable
                    :value="transactions"
                    paginator
                    showGridlines
                    :rows="20"
                    dataKey="transactionId"
                    :sortField="'sortNo'"
                    :sortOrder="1" 
                    v-if="!loading3"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.index }} </template>
                        <template #body="{ data }">
                            {{ data.index }}
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.transactionId }} </template>
                        <template #body="{ data }">
                            <NuxtLink :to="'/transaction/' + data.transactionId">
                                <div class="flex align-items-center gap-2">
                                    <span>
                                        <div class="data-non-shorten-950">
                                            {{ data.transactionId }}
                                        </div>
                                        <div class="data-shorten-950">
                                            {{ shortenStr(data.transactionId ?? '', 7, 1) }}
                                        </div>   
                                    </span>
                                </div>
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.fee }} </template>
                        <template #body="{ data }">
                            <div class="data-non-shorten-950">
                                {{ toAleoScale(data.fee) }}
                            </div>
                            <div class="data-shorten-950">
                                {{ toAleoScale(data.fee, 2) }}
                            </div>   
                            
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.blockHeight.toLocaleString() }}
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.status }} </template>
                        <template #body="{ data }">
                            <Tag :severity="getBadgeStatus(data.status)">{{ data.status }}</Tag>
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.type }} </template>
                        <template #body="{ data }">
                            <Tag :severity="getBadgeType(data.type)">{{ data.type }}</Tag>
                        </template>
                    </Column>
                    <Column dataType="datetime">
                        <template #header v-if="!loadingState"> {{ labels.timestamp }} </template>
                        <template #body="{ data }">
                            {{ formatTimestamp(data.timestamp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.puzzleSolutions }} </h5>
                <DataTable
                    :value="solutions"
                    paginator
                    showGridlines
                    :rows="20"
                    dataKey="address"
                    :sortField="'sortNo'"
                    :sortOrder="1" 
                    v-if="!loading6"
                >
                    <template #empty> No data found. </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.address }} </template>
                        <template #body="{ data }">
                            <NuxtLink :to="'/account/' + data.address">
                                <div class="flex align-items-center gap-2">
                                    <div class="data-non-shorten-950">
                                        {{ data.address }}
                                    </div>
                                    <div class="data-shorten-950">
                                        {{ shortenStr(data.address ?? '', 7, 1) }}
                                    </div>   
                                </div>
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.nonce }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <div class="data-non-shorten-950">
                                    {{ data.nonce }}
                                </div>
                                <div class="data-shorten-950">
                                    {{ shortenStr(data.nonce.toString() ?? '', 5, 5) }}
                                </div> 
                            </div>
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.commitment }} </template>
                        <template #body="{ data }">
                            <div class="data-non-shorten-950">
                                {{ data.commitment }}
                            </div>
                            <div class="data-shorten-950">
                                {{ shortenStr(data.commitment ?? '') }}
                            </div>   
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
