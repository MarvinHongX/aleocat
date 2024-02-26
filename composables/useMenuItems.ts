const { layoutConfig } = useLayout();
import { getMenuItems } from '@/commons/commonLanguageService';

export const useMenuItems = () => {  
    return useState('menuItems', () => getMenuItems(layoutConfig.language));
};
