export const useCommonConstant = () => {
    return {
        LOCAL_STORAGE_KEY: 'LATEST_BLOCK' as const,
        INTERVAL_THRESHOLD: 3000 as const,
        LOADING_THRESHOLD: 10 as const,
    };
};
