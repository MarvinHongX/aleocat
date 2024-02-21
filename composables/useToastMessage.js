export const useToastMessage = () => {
    return useState('toastMessage', () => ({
        severity: 'warn', 
        summary: '', 
        detail: '', 
        life: 3000
    }));
};