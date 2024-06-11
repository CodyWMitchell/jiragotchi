import * as React from 'react';

const LayeredImage = ({ images, displayCount, displayPrevious = true, ...props }) => {
    const pruneUnusedImages = (images, displayCount, displayPrevious) => {
        if (displayCount === undefined || displayCount < 0) {
            return images;
        }
        if (displayCount === 0) {
            return [];
        }
        const imageCount = Math.min(images.length, displayCount);
        if (displayPrevious) {
            return images.slice(0, imageCount);
        }
        return [images[imageCount - 1]];
    };

    return (
        <>
            {pruneUnusedImages(images, displayCount, displayPrevious).map((image, index) => {
                return <img key={index} src={image} {...props} />;
            })}
        </>
    );
};

export default LayeredImage;