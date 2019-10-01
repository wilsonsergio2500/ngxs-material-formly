import { Component } from '@angular/core';
import { SnackbarStatusBase } from '../../snackbar-status-base';
import { styles } from '../../styles';

@Component({
  selector: 'error-snackbar',
  templateUrl: 'snackbar-error.component.html',
  styles
})
export class ErrorSnackbarComponent extends SnackbarStatusBase {

}
