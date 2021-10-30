import { CheckAnimationComponent } from './check-animation/check-animation.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { FirebasePaginationComponent } from './firebase-pagination/firebase-pagination.component';
import { getLoadingButtonComponents } from './loading-button/elements';
import { getSnackBarStatusComponents, getSnackBarStatusProviders } from './snackbar-status/elements';
import { getConfirmationDialogEntryComponents, getConfirmationDialogProviders } from './confirmation-dialog/elements';
import { getToolbarNavigationComponents } from './toolbar-navigation/elements';
import { getSideNavigationComponents } from './side-navigation/elements';

export function getCustomUiElements() {
  return [
    CheckAnimationComponent,
    LoadingPanelComponent,
    FirebasePaginationComponent,
    ...getToolbarNavigationComponents(),
    ...getLoadingButtonComponents(),
    ...getSnackBarStatusComponents(),
    ...getConfirmationDialogEntryComponents(),
    ...getSideNavigationComponents()
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
