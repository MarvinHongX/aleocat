<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTransactionsOfLatestBlock, getLatestBlockFromLocalStorage } from '@/commons/commonService';

const intervalId = ref<NodeJS.Timeout | null>(null);
const loading1 = ref<boolean>(true);
const loading2 = ref<boolean>(true);
const loading3 = ref<boolean>(true);
const latestBlock = ref<Block | null>(null); 
const transactions = ref<Transaction[]>([]);
const blocks = ref<Block[]>([]);
const blockParams = ref<BlockParams>({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 1
});


const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();

const { LOCAL_STORAGE_KEY, INTERVAL_THRESHOLD } = useCommonConstant();

const onBlockPage = (event: any) => {
    blockParams.value.currentPage = event.page + 1;
    fetchBlocksForPage(blockParams, loading2, blocks);
};

const intervalAction = () => {
    if (getLatestBlockFromLocalStorage(latestBlock, loading1, LOCAL_STORAGE_KEY)) {
        blockParams.value.totalRecords = latestBlock.value?.header?.metadata?.height ?? 1;
        fetchBlocksForPage(blockParams, loading2, blocks);
        getTransactionsOfLatestBlock(latestBlock, loading3, transactions);
    }
}


onMounted(() => {
    intervalAction();
    intervalId.value = setInterval(intervalAction, INTERVAL_THRESHOLD);
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value ?? undefined); 
});


</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState"> {{ labels.latestBlock }} </span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ latestBlock?.header.metadata.height.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState"> {{ labels.proofTarget }} </span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ latestBlock?.header.metadata.proof_target.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.coinbaseTarget }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ latestBlock?.header.metadata.coinbase_target.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.timestamp }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ formatTimestamp(latestBlock?.header.metadata.network) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.network }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >
                            <Tag :severity="getBadgeNetwork(latestBlock?.header.metadata.network)">{{ getNetwork(latestBlock?.header.metadata.network) }}</Tag>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.round }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ latestBlock?.header.metadata.round.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">&nbsp;</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >&nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">&nbsp;</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >&nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.latestBlocks }} </h5>
                <DataTable 
                    :value="blocks" 
                    lazy 
                    paginator
                    :first="((blockParams.currentPage - 1) * blockParams.pageSize) + 1"
                    :rows="blockParams.pageSize"
                    :totalRecords="blockParams.totalRecords"
                    showGridlines
                    dataKey="block_hash"
                    filterDisplay="menu"
                    :currentPage="blockParams.currentPage - 1"
                    @page="onBlockPage($event)"
                    v-if="!loading2"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column field="header.metadata.height" dataType="numeric" style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.blockHeight }} </template>
                        <template #body="{ data }">
                            <NuxtLink v-if="data.header.metadata.height" :to="'/block/' + data.header.metadata.height">
                                <span>{{ data.header.metadata.height.toLocaleString() }}</span>
                            </NuxtLink>
                            <span v-else>{{ data.header.metadata.height.toLocaleString() }}</span>

                            
                        </template>
                    </Column>
                    <Column field="block_hash"  style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.blockHash }} </template>
                        <template #body="{ data }">
                            {{ data.block_hash }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.latestTransactions }} </h5>
                <DataTable 
                    :value="transactions" 
                    paginator
                    showGridlines
                    :rows="10"
                    dataKey="transactionId"
                    :sortField="'sortNo'"
                    :sortOrder="-1" 
                    responsiveLayout="scroll"
                    v-if="!loading3"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading v-if="!loadingState"> {{ labels.loading }} </template>
                    <Column style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.transactionId }}  </template>
                        <template #body="{ data }">
                            <NuxtLink v-if="data.transactionId" :to="'/transaction/' + data.transactionId" rel="noopener">
                                <span>{{ data.transactionId }}</span>
                            </NuxtLink>
                            <span v-else>{{ data.transactionId }}</span>
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.blockHeight.toLocaleString() }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div
                class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                style="border-radius: 1rem; background: linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1c80cf 47.88%, #ffffff 100.01%)"
                v-if="!loadingState"
            >
                <div>
                    <div class="text-blue-100 font-medium text-xl mt-2 mb-3">{{ sentences.skyzoneMsg1}}</div>
                    <div class="text-white font-medium text-5xl">{{ sentences.skyzoneMsg2}}</div>
                </div>
                <div class="mt-4 mr-auto md:mt-0 md:mr-0">
                    <a href="https://theskyzone.net" target="_blank" class="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"> {{ labels.getStarted}} </a>
                </div>
            </div>
        </div>
    </div>
</template>
