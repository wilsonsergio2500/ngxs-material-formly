import { ISizeDimensions } from './contracts/dimensions';

export const defaults = {
    viewer: {
        imageDimensions: <ISizeDimensions>{
            width: 100,
            height: 100
        },
        aspectRatio: <ISizeDimensions>{
            width: 2,
            height: 1
        },
        loadingDiameter: 25,
        delayShow: 200,
        imageQuality:90
    },
    uploader: {
        key: '52e46719889fd0d110da2c14d00dadc1ac491ac1',
        quality:90
    }
}
