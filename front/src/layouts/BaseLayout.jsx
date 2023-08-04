import Base from './BaseLayout.module.css';
import useViewHeight from '../hooks/useViewHeight';
import Loading from '../components/molecules/common/Loading';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../states/loadingState';

const BaseLayout = ({ children }) => {
    useViewHeight();
    const { show } = useRecoilValue(loadingState);

    return (
        <>
            <div className={Base.container}>
                <div className={Base.wrapper}>
                    {show && <Loading />}
                    <div className={Base.contents}>{children}</div>
                </div>
            </div>
        </>
    );
};

export default BaseLayout;
