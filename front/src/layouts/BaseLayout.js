import Base from './BaseLayout.module.css';

const BaseLayout = ({ children }) => {
    return (
        <div className={Base.wrapper}>
            <div className={Base.appWrapper}>
                <div className={Base.appContainer}>{children}</div>
            </div>
        </div>
    );
};

export default BaseLayout;
