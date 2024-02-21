<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAccount, getAccountTransitions } from '@/commons/commonService';

const loading8 = ref(true);
const loading10 = ref(true);
const address = ref(null);
const account = ref(null);
const transitions = ref(null);
const route = useRoute();

const labels = useLabels();
const loadingState = useLoadingState();

watch(() => route.params.address, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        address.value = newValue;
        getAccount(address, loading10, account);
        getAccountTransitions(address, loading8, transitions);
    }
});

onMounted(() => {
    address.value = route.params.address;
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
                    <span class="text-900 line-height-3" v-if="!loading10">{{ account.address }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.publicCredits }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10">{{ toAleoScale(account.publicCredits) }}</span>
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
                    <Column style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.transitionId }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.transition_id }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column dataType="numeric" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.transferAmount }} </template>
                        <template #body="{ data }">
                            {{ toAleoScale(data.transfer_amount) }}
                        </template>
                    </Column>
                    <Column dataType="numeric" style="min-width: 10rem">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.block_height.toLocaleString() }}
                        </template>
                    </Column>
                    <Column style="min-width: 10rem">
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
