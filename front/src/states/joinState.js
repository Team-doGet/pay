import { atom } from 'recoil';

const joinState = atom({
    key: 'joinState',
    default: {
        emailNo: '',
        passwordNo: '',
        passwordNoCheck: '',
        userName: '',
        phoneNo: '',
        agree1Yn: false,
        agree2Yn: false,
        agree3Yn: false,
    },
});

export { joinState };
