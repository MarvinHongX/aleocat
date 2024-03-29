<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAccount, getAccountTransitions } from '@/commons/commonService';

const loading8 = ref<boolean>(true);
const loading10 = ref<boolean>(true);
const address = ref<string>('');
const account = ref<Account | null>(null);
const transitions = ref<Transition[]>([]);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();

watch(() => route.params.address, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        address.value = newValue.toString();
        getAccount(address, loading10, account);
        getAccountTransitions(address, loading8, transitions);
    }
});

onMounted(() => {
    address.value = route.params.address.toString();
    getAccount(address, loading10, account);
    getAccountTransitions(address, loading8, transitions);
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
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.publicCredits }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10">{{ toAleoScale(account?.publicCredits) }}</span>
                </div>
            </div>
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.latestTransitions }} </h5>
                </div>
                <DataTable
                    :value="transitions"
                    paginator
                    showGridlines
                    :rows="50"
                    dataKey="transition_id"
                    :sortField="'block_height'"
                    :sortOrder="-1" 
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
                                    {{ data.transition_id }}
                                </div>
                                <div class="data-shorten-950">
                                    {{ shortenStr(data.transition_id ?? '', 7, 1) }}
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.transferAmount }} </template>
                        <template #body="{ data }">
                            <div class="data-non-shorten-950">
                                {{ toAleoScale(data.transfer_amount) }}
                            </div>
                            <div class="data-shorten-950">
                                {{ toAleoScale(data.transfer_amount, 2) }}
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.block_height.toLocaleString() }}
                        </template>
                    </Column>
                    <Column>
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

.block {
    width: 15%;
}
</style>
