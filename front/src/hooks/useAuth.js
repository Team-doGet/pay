import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../states/userState';
import { modalState } from '../states/modalState';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuth = () => {
    const user = useRecoilValue(userState);
    const [modal, setModal] = useRecoilState(modalState);
    const resetModal = useResetRecoilState(modalState);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.accessToken === '') {
            setModal({
                ...modal,
                show: true,
                title: '알림',
                content: '로그인이 필요한 서비스입니다.',
                confirmHandler: () => {
                    (async () => {
                        await navigate('/login', { replace: true });
                        await resetModal();
                    })();
                },
                cancel: false,
            });
        }
    }, []);
};

export default useAuth;
