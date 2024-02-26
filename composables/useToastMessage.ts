export const useToastMessage = (): Ref<ToastMessage> => {
    return ref<ToastMessage>({
        severity: 'warn',
        summary: '',
        detail: '',
        life: 3000
    });
};