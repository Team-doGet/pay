import React, { useEffect, useRef } from 'react';
import BottomModalLayout_ from './BottomModalLayout.module.css';

const BottomModalLayout = ({ children }) => {
    const darBgRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        darBgRef.current.style.top = `${document.documentElement.scrollTop}px`;
        document.body.style.cssText = `overflow-y: hidden;`;

        return () => {
            document.body.style.cssText = ``;
        };
    }, []);

    return (
        <div>
            <div className={BottomModalLayout_.darkBg} ref={darBgRef}></div>
            <div className={BottomModalLayout_.wrapper} ref={modalRef}>
                {children}
            </div>
        </div>
    );
};

export default BottomModalLayout;
