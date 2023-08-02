import { atom } from 'recoil';

const historyFilterState = atom({
    key: 'historyFilterState',
    default: {
        show: false,
        period: 1,
        type: 1,
        orderby: 1,
    },
});

export { historyFilterState };
