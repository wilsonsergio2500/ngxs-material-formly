import { ImagesManagerComponent } from "./images-manager/images-manager.component";
import { ImagesComponent } from "./images.component";

export function getImageModuleComponents() {
  return [
    ImagesComponent,
    ImagesManagerComponent
  ];
}
