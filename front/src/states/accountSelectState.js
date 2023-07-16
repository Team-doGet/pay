import { atom } from 'recoil';

const accountSelectState = atom({
    key: 'accountSelectState',
    default: {
        show: false,
    },
});

export { accountSelectState };
