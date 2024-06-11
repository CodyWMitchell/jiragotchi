import React from 'react';
import f0 from './assets/DayTracker/d0.png';
import f1 from './assets/DayTracker/d1.png';
import f2 from './assets/DayTracker/d2.png';
import f3 from './assets/DayTracker/d3.png';
import f4 from './assets/DayTracker/d4.png';
import f5 from './assets/DayTracker/d5.png';
import f6 from './assets/DayTracker/d6.png';
import f7 from './assets/DayTracker/d7.png';
import f8 from './assets/DayTracker/d8.png';
import f9 from './assets/DayTracker/d9.png';
import p0 from './assets/PointTracker/0.png';
import p1 from './assets/PointTracker/1.png';
import p2 from './assets/PointTracker/2.png';
import p3 from './assets/PointTracker/3.png';
import p4 from './assets/PointTracker/4.png';
import p5 from './assets/PointTracker/5.png';
import p6 from './assets/PointTracker/6.png';
import p7 from './assets/PointTracker/7.png';
import p8 from './assets/PointTracker/8.png';
import p9 from './assets/PointTracker/9.png';
import p10 from './assets/PointTracker/10.png';
import p11 from './assets/PointTracker/11.png';
import p12 from './assets/PointTracker/12.png';
import p13 from './assets/PointTracker/13.png';
import p14 from './assets/PointTracker/14.png';
import p15 from './assets/PointTracker/15.png';
import p16 from './assets/PointTracker/16.png';
import p17 from './assets/PointTracker/17.png';
import p18 from './assets/PointTracker/18.png';
import LayeredImage from './LayeredImage.jsx';

export const DayTracker = ({count, ...props}) => {
    const days = [f0, f1, f2, f3, f4, f5, f6, f7, f8, f9];
    return <LayeredImage images={days} displayCount={count} {...props} />;
}

export const PointTracker = ({count, ...props}) => {
    const points = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18];
    return <LayeredImage images={points} displayCount={count} {...props} />;
}

export default DayTracker;