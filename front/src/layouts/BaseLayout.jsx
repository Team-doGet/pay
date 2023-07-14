import Base from './BaseLayout.module.css';
import useViewHeight from '../hooks/useViewHeight';

const BaseLayout = ({ children }) => {
    useViewHeight();

    return (
        <div className={Base.container}>
            <div className={Base.wrapper}>
                <div className={Base.contents}>{children}</div>
            </div>
        </div>
    );
};

export default BaseLayout;
