<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getValidators, getMinersInfo, fetchProversForPage, getTop10Growth, getDailyPower, getLatestBlockFromLocalStorage, getLatestBlocksAndTransactions } from '@/commons/commonService';

const intervalId = ref<NodeJS.Timeout | null>(null);
const loading1 = ref<boolean>(true);
const loading2 = ref<boolean>(true);
const loading3 = ref<boolean>(true);
const loading11 = ref<boolean>(true);
const loading14 = ref<boolean>(true);
const loading15 = ref<boolean>(true);
const loading16 = ref<boolean>(true);
const latestBlock = ref<Block | null>(null); 
const transactions = ref<Transaction[]>([]);
const blocks = ref<Block[]>([]);
const latestCommittee = ref<Committee | null>(null);
const validators = ref<Validator[]>([]);
const minersInfo = ref<MinersInfo | null>(null);
const provers = ref<Prover[]>([]);
const tableParams = ref<TableParams>({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 10
});
const proverParams = ref<TableParams>({
    currentPage: 0,
    pageSize: 10,
    totalRecords: 10
});
const top10Growth = ref<LineChart>({
        labels: ['label'],
        datasets: [
          {
            label: 'label',
            data: [1],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
          },
        ]
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


const labels = useLabels();
const sentences = useSentences();
const loadingState = useLoadingState();

const { LOCAL_STORAGE_KEY, INTERVAL_THRESHOLD } = useCommonConstant();


const intervalAction = () => {
    if (getLatestBlockFromLocalStorage(latestBlock, loading1, LOCAL_STORAGE_KEY)) {
        tableParams.value.totalRecords = latestBlock.value?.header?.metadata?.height ?? 1;
        getLatestBlocksAndTransactions(tableParams, loading2, loading3, blocks, transactions);
    }
}


onMounted(() => {
    getMinersInfo(minersInfo);
    getValidators(loading11, latestCommittee, validators);
    fetchProversForPage(proverParams, loading14, provers);
    getTop10Growth(loading15, top10Growth);
    getDailyPower(loading16, dailyPower);
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
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.networkValidators }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading11"
                            >{{ validators?.length.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.networkMiners }}</span>
                        <div class="text-900 font-medium text-xl"
                            >{{ minersInfo?.total.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <span>
                        <h5 v-if="!loadingState"> {{ labels.latestBlocks }} </h5>
                    </span>
                    <NuxtLink to="/blocks">
                        <span class="p-input-icon-left mb-1 text-500 font-medium"> {{ labels.more }}&nbsp;> </span>
                    </NuxtLink>  
                </div>
                <DataTable 
                    :value="blocks" 
                    lazy 
                    :rows="tableParams.pageSize"
                    :totalRecords="tableParams.totalRecords"
                    showGridlines
                    dataKey="block_hash"
                    :sortField="'header.metadata.height'"
                    :sortOrder="-1" 
                    responsiveLayout="scroll"
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
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <span>
                        <h5 v-if="!loadingState"> {{ labels.latestTransactions }} </h5>
                    </span>
                    <NuxtLink to="/transactions">
                        <span class="p-input-icon-left mb-1 text-500 font-medium"> {{ labels.more }}&nbsp;> </span>
                    </NuxtLink>  
                </div>
                <DataTable 
                    :value="transactions" 
                    lazy 
                    :rows="tableParams.pageSize"
                    :totalRecords="tableParams.totalRecords"
                    showGridlines
                    dataKey="transactionId"
                    :sortField="'sortNo'"
                    :sortOrder="-1" 
                    responsiveLayout="scroll"
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
            <div class="card">
                <h5>Daily Top10 Growth</h5>
                <Chart type="line" :data="top10Growth" v-if="!loading15"/>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Daily Productive Forces</h5>
                <Chart type="line" :data="dailyPower" v-if="!loading16"/>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <span>
                        <h5 v-if="!loadingState"> {{ labels.provers }} </h5>
                    </span>
                    <NuxtLink to="/provers">
                        <span class="p-input-icon-left mb-1 text-500 font-medium"> {{ labels.more }}&nbsp;> </span>
                    </NuxtLink>  
                </div>
                <DataTable
                    :value="provers"
                    lazy 
                    :rows="proverParams.pageSize"
                    :totalRecords="proverParams.totalRecords"
                    showGridlines
                    dataKey="address"
                    :sortField="'rank'"
                    :sortOrder="-1" 
                    responsiveLayout="scroll"
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