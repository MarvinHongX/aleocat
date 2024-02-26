<script setup lang="ts">
const { logoUrl } = useCommonComputed();

const sentences = useSentences();
const loadingState = useLoadingState();

</script>

<template>
    <div class="layout-footer" v-if="!loadingState">
        <div class="col-12">
            <div class="card">       
                <div class="flex flex-row">
                    <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
                    <span class="font-medium text-xl mb-4 mr-4">Aleo Cat</span>
                </div> 
                <div class="flex flex-row">
                    <span class="text-600 font-medium text-2xl mb-6 mr-4" v-if="!loadingState"> {{ sentences.footerMsg1 }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="text-500 font-medium">© 2024 ALEO CAT. All rights reserved.</span>
                </div>         
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
