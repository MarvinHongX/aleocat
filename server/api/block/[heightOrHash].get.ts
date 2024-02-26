export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    const heightOrHash: string = event.context.params.heightOrHash;
    const url: string = `${apiBase}/block/${heightOrHash}`;
    const response: any = await $fetch(url);

    return response;
})