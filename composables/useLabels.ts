const { layoutConfig } = useLayout();
import { getLabels } from '@/commons/commonLanguageService';

export const useLabels = () => {
    return useState('labels', () => getLabels(layoutConfig.language));
};