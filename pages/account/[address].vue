<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAleoPrice, getAccount, getAccountTransitions, getAccountSolutions } from '@/commons/commonService';

const loading8 = ref<boolean>(true);
const loading10 = ref<boolean>(true);
const loading17 = ref<boolean>(true);
const address = ref<string>('');
const account = ref<Account | null>(null);
const transitions = ref<Transition[]>([]);
const solutions = ref<Solution[]>([]);

const loading12 = ref<boolean>(true);
const aleoPrice = ref<number>(0);
const aleoPriceChangePercentage = ref<number>(0);
const copied = ref<boolean>(false);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(address.value);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

watch(() => route.params.address, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        address.value = newValue.toString();
        getAccount(address, loading10, account);
        getAccountTransitions(address, loading8, transitions);
        getAleoPrice(aleoPrice, aleoPriceChangePercentage, loading12);
    }
});

onMounted(() => {
    address.value = route.params.address.toString();
    getAccount(address, loading10, account);
    getAccountTransitions(address, loading8, transitions);
    getAccountSolutions(address, loading17, solutions);
    getAleoPrice(aleoPrice, aleoPriceChangePercentage, loading12);
});



</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.account }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.address }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10">
                        <div class="data-non-shorten-950">
                            {{ account?.address }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(account?.address ?? '', 15, 10) }}
                        </div>
                    </span>
                    <template v-if="!copied">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="ml-2 cursor-pointer"
                            @click="copyToClipboard"
                        >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    </template>
                    <template v-else>
                        <span  class="text-900 line-height-3">&nbsp;&nbsp;Copied!</span>
                    </template>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.publicCredits }}</span>
                    <span class="text-900 text-blue-600 line-height-3" v-if="!loading10">{{ toAleoScale(account?.publicCredits) }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.estimatedValue }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10 && !loading12">
                        $ {{ toAleoScaleUSDT(account?.publicCredits, aleoPrice, 2) }}
                    </span>
                </div>
            </div>
            <div class="card">
                <TabView>
                    <TabPanel v-if="!loadingState" :header="labels.latestTransitions">
                        <p class="line-height-3 m-0">
                            <DataTable
                                :value="transitions"
                                paginator
                                showGridlines
                                :rows="50"
                                dataKey="transition_id"
                                :sortField="'height'"
                                :sortOrder="-1" 
                                v-if="!loading8 && !loading10"
                            >
                                <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                                <template #loading> 
                                    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                                </template>
                                <Column>
                                    <template #header v-if="!loadingState"> {{ labels.from }} </template>
                                    <template #body="{ data }">
                                        <div class="flex align-items-center gap-2">
                                            <template v-if="account?.address === data.transfer_from?.address">
                                                <div class="data-non-shorten-950">
                                                    {{ data.transfer_from.address }}
                                                </div>
                                                <div class="data-shorten-950">
                                                    {{ shortenStr(data.transfer_from.address ?? '', 7, 5) }}
                                                </div>                                                
                                            </template>
                                            <template v-else>
                                                <NuxtLink class="text-blue-600" v-if="data.transfer_from?.address" :to="'/account/' + data.transfer_from.address">
                                                    <div class="data-non-shorten-950">
                                                        {{ data.transfer_from.address }}
                                                    </div>
                                                    <div class="data-shorten-950">
                                                        {{ shortenStr(data.transfer_from.address ?? '', 7, 5) }}
                                                    </div>
                                                </NuxtLink>
                                            </template>
                                        </div>
                                    </template>
                                </Column>
                                <Column dataType="numeric">
                                    <template #header v-if="!loadingState"> {{ labels.transferAmount }} </template>
                                    <template #body="{ data }">
                                        <div class="data-non-shorten-950">
                                            {{ toAleoScale(data.credits) }}
                                        </div>
                                        <div class="data-shorten-950">
                                            {{ toAleoScale(data.credits, 2) }}
                                        </div>
                                    </template>
                                </Column>
                                <Column>
                                    <template #header v-if="!loadingState"> {{ labels.to }} </template>
                                    <template #body="{ data }">
                                        <div class="flex align-items-center gap-2">
                                            <template v-if="account?.address === data.transfer_to?.address">
                                                <div class="data-non-shorten-950">
                                                    {{ data.transfer_to.address }}
                                                </div>
                                                <div class="data-shorten-950">
                                                    {{ shortenStr(data.transfer_to.address ?? '', 7, 5) }}
                                                </div>
                                            </template>
                                            <template v-else>
                                                <NuxtLink class="text-blue-600" v-if="data.transfer_to?.address" :to="'/account/' + data.transfer_to.address">
                                                    <div class="data-non-shorten-950">
                                                        {{ data.transfer_to.address }}
                                                    </div>
                                                    <div class="data-shorten-950">
                                                        {{ shortenStr(data.transfer_to.address ?? '', 7, 5) }}
                                                    </div>
                                                </NuxtLink>
                                            </template>
                                        </div>
                                    </template>
                                </Column>
                                <Column dataType="numeric">
                                    <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                                    <template #body="{ data }">
                                        {{ data.height.toLocaleString() }}
                                    </template>
                                </Column>
                                <Column>
                                    <template #header v-if="!loadingState"> {{ labels.timestamp }} </template>
                                    <template #body="{ data }">
                                        {{ formatTimestamp(data.timestamp) }}
                                    </template>
                                </Column>
                            </DataTable>             
                        </p>
                    </TabPanel>
                    <TabPanel v-if="!loadingState" :header="labels.puzzleSolutions">
                        <p class="line-height-3 m-0">
                            <DataTable
                                :value="solutions"
                                paginator
                                showGridlines
                                :rows="50"
                                dataKey="solution_id"
                                :sortField="'height'"
                                :sortOrder="-1" 
                                v-if="!loading17"
                            >
                                <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                                <template #loading> 
                                    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                                </template>
                                <Column>
                                    <template #header v-if="!loadingState"> {{ labels.solutionId }} </template>
                                    <template #body="{ data }">
                                        <div class="flex align-items-center gap-2">
                                            <div class="data-non-shorten-950">
                                                {{ data.solution_id }}
                                            </div>
                                            <div class="data-shorten-950">
                                                {{ shortenStr(data.solution_id ?? '', 7, 1) }}
                                            </div>
                                        </div>
                                    </template>
                                </Column>
                                <Column dataType="numeric">
                                    <template #header v-if="!loadingState"> {{ labels.target }} </template>
                                    <template #body="{ data }">
                                        {{ data.target }}
                                    </template>
                                </Column>
                                <Column>
                                    <template #header v-if="!loadingState"> {{ labels.reward }} </template>
                                    <template #body="{ data }">
                                        <div class="flex align-items-center gap-2">
                                            {{ toAleoScale(data.reward) }}
                                        </div>
                                    </template>
                                </Column>
                                <Column dataType="numeric">
                                    <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                                    <template #body="{ data }">
                                        {{ data.height.toLocaleString() }}
                                    </template>
                                </Column>
                                <Column>
                                    <template #header v-if="!loadingState"> {{ labels.timestamp }} </template>
                                    <template #body="{ data }">
                                        {{ data.time }}
                                    </template>
                                </Column>
                            </DataTable>           
                        </p>
                    </TabPanel>
                </TabView>
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
