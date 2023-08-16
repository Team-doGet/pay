import { atom } from 'recoil';

const localStorageEffect =
    key =>
    ({ setSelf, onSet }) => {
        const savedValue = localStorage.getItem(key);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

const userState = atom({
    key: 'userState',
    default: {
        userId: null,
        emailNo: '',
        userName: '',
        phoneNo: '',
        simplePw: false,
        accessToken: '',
        refreshToken: '',
        fds: false,
        accountNo: '',
        bankCode: '',
    },
    effects: [localStorageEffect('user')],
});

export { userState };
