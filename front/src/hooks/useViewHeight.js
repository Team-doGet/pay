import React, { useEffect } from 'react';

const useViewHeight = () => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return;
};

export default useViewHeight;
