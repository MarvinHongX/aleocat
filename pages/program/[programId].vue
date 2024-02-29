<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProgram } from '@/commons/commonService';

const loading9 = ref<boolean>(true);
const programId = ref<string>('');
const program = ref<Program>({     
    id: '',
    sourceCode: '',
    transactionId: '',  
});

const block1 = ref<string>('');

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();

watch(() => route.params.programId, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        programId.value = newValue.toString();
        getProgram(programId, loading9, program);
    }
});

onMounted(() => {
    programId.value = route.params.programId.toString();
    getProgram(programId, loading9, program);
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.program }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.programId }}</span>
                    <span class="text-900 line-height-3" v-if="!loading9">{{ program?.id }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.transaction }}</span>
                    <span class="text-900 line-height-3" v-if="!loading9"
                    >
                        <NuxtLink v-if="program?.transactionId" :to="'/transaction/' + program.transactionId" rel="noopener">
                            {{ program.transactionId }}
                        </NuxtLink>
                        <span v-else>-</span>
                    </span>
                </div>
            </div>
            <div class="card">
                <TabView>
                    <TabPanel v-if="!loadingState" :header="labels.programStructure">
                        <p class="line-height-3 m-0">
                                            
                        </p>
                    </TabPanel>
                    <TabPanel v-if="!loadingState" :header="labels.recentCalls">
                        <p class="line-height-3 m-0">
                                            
                        </p>
                    </TabPanel>
                    <TabPanel v-if="!loadingState" :header="labels.executeTransitions">
                        <p class="line-height-3 m-0">
                           
                        </p>
                    </TabPanel>
                </TabView>
            </div>
            <BlockViewer :header="labels.sourceCode" previewOff="true" :code="program?.sourceCode">
            </BlockViewer>
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
    width: 10%;
}
</style>
