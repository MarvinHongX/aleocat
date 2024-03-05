export const useLoadingState = () => {
    return useState('loadingState', (): boolean => true);
};