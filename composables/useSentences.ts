const { layoutConfig } = useLayout();
import { getSentences } from '@/commons/commonLanguageService';

export const useSentences = () => {   
    return useState('sentences', () => getSentences(layoutConfig.language));
};
