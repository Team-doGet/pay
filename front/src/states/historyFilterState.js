import { atom } from 'recoil';

const historyFilterState = atom({
    key: 'historyFilterState',
    default: {
        show: false,
    },
});

export { historyFilterState };
