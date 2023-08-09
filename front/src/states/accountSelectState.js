import { atom } from 'recoil';

const accountSelectState = atom({
    key: 'accountSelectState',
    default: {
        show: false,
        accountNo: '',
        bankCode: null,
        // accountBalance: null,
    },
});

export { accountSelectState };
