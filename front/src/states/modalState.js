import { atom } from 'recoil';

const modalState = atom({
    key: 'modalState',
    default: {
        show: false,
        title: '',
        content: '',
        confirmHandler: null,
        cancel: false,
    },
});

export { modalState };
