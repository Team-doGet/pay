import { atom } from 'recoil';

const simplePwState = atom({
    key: 'simplePwState',
    default: {
        show: false,
        pw: [-1, -1, -1, -1, -1, -1],
        pwIdx: 0,
    },
});

export { simplePwState };
