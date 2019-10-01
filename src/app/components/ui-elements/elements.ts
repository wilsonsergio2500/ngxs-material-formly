import { CheckAnimationComponent } from './check-animation/check-animation.component';
import { getLoadingButtonComponents } from './loading-button/elements';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { getSnackBarStatusComponents, getSnackBarStatusProviders } from './snackbar-status/elements';
import { getConfirmationDialogEntryComponents, getConfirmationDialogProviders } from './confirmation-dialog/elements';

export function getCustomUiElements() {
  return [
    CheckAnimationComponent,
    ...getLoadingButtonComponents(),
    LoadingPanelComponent,
    ...getSnackBarStatusComponents(),
    ...getConfirmationDialogEntryComponents()
  ];
}

export function getCustomUiElementsProviders() {
  return [
    ...getSnackBarStatusProviders(),
    ...getConfirmationDialogProviders()
  ];
}

export function getCustomUiElementsEntryComponents() {
  return [
    ...getSnackBarStatusComponents(),
    ...getConfirmationDialogEntryComponents()
  ];
}
