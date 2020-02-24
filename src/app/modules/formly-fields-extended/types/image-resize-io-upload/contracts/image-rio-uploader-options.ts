import { ISizeDimensions } from '../../../../image-resizer-io/config/contracts/dimensions';

export interface IImageResizeIoUploaderOptions {
    previewFlexSize: number;
    thumbnailMissingImageUrl: string;
    thumbnailAspectRatio: ISizeDimensions,
    thumbnailDimensions: ISizeDimensions;
}
