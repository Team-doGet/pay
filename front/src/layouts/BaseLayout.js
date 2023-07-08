import Base from './BaseLayout.module.css';

const BaseLayout = ({ children }) => {
    return (
        <div className={Base.container}>
            <div className={Base.wrapper}>
                <div className={Base.contents}>{children}</div>
            </div>
        </div>
    );
};

export default BaseLayout;
