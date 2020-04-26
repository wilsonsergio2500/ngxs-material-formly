import { defaults } from '../config/defaults';
import { IImageResizerIOResponse } from '../uploader/contracts/image-resize-io-response';

const API_INTEGRATION_PATH = 'https://api.imageresizer.io/v1/images';
export const FILE_BASE_PATH = 'https://im.ages.io/';

export class ImageResizeIoAPI {

    static Upload(image: File): Promise<string> {
        return new Promise((resolve, reject) => {

            const key = defaults.uploader.key;
            const INTEGRATION_PATH = `${API_INTEGRATION_PATH}?key=${key}`;
            const data = new FormData();
            data.append('image', image);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', INTEGRATION_PATH, true);
            xhr.onreadystatechange = () => {

                if (xhr.readyState === 4) {
                    const response = JSON.parse(xhr.responseText) as IImageResizerIOResponse;
                    if (response.success) {
                        const id = response.response.id;
                        const img = `${FILE_BASE_PATH}${id}`
                        resolve(img);

                    } else {
                        reject();
                    }

                }
            }
            xhr.send(data);

        });
    }

    static Delete(Id: string) : Promise<void> {
        return new Promise((resolve, reject) => {
            const key = defaults.uploader.key;
            const DELETE_PATH = `${API_INTEGRATION_PATH}/${Id}/delete?key=${key}`;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', DELETE_PATH, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve();
                }
            }
            xhr.send();
        })

    }
}
