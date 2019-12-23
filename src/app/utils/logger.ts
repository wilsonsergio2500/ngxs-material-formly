import { environment } from '../../environments/environment';

export class Logger {

    public static LogTable(title: string, table: any[]) {
        if (!environment.production) {
            console.groupCollapsed(title);
            console.table(table);
            console.groupEnd();
        }
    }

}
