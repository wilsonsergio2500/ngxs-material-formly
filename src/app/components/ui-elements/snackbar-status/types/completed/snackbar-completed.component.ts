import { Component } from '@angular/core';
import { SnackbarStatusBase} from '../../snackbar-status-base';
import { styles } from '../../styles';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'completed-snackbar',
  templateUrl: 'snackbar-completed.component.html',
  styles
})
export class CompletedSnackbarComponent extends SnackbarStatusBase{

    
}
