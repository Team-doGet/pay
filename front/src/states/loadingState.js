import { atom } from 'recoil';

const loadingState = atom({
    key: 'loadingState',
    default: {
        show: false,
    },
});

export { loadingState };
