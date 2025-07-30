export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBasePrice as string;
    const apiKey: string = config.apiPriceKey as string;
    const url: string = `${apiBase}/products/ALEO-USD/stats`;
    const response: any = await $fetch(url);

    // const url: string = `${apiBase}/cryptocurrency/quotes/latest`;
    // const response: any = await $fetch(url, {
    //     params: {
    //       symbol: 'aleo', 
    //       convert: 'USD'
    //     },
    //     headers: {
    //       'X-CMC_PRO_API_KEY': apiKey,
    //     },
    // });
    
    return response;
})