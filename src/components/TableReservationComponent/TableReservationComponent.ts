import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { GlobalComponent } from '../GlobalComponent';
import { CollectTableDataComponent } from './CollectTableDataComponent';

@Component({ components: [CollectTableDataComponent] })
export class TableReservationComponent extends BaseComponent {
  /*
    START can either be reached via $redirect from another component
    or via a global ReserveTableIntent.
  */
  @Intents([{ name: 'ReserveTableIntent', global: true }])
  START() {
    this.$send('Sure, I can help you book a table.');
    return this.$delegate(CollectTableDataComponent, {
      resolve: {
        success: this.confirm,
        dismiss: this.dismiss,
      },
    });
  }

  confirm() {
    return this.$send('Great!');
  }

  dismiss() {
    this.$send('No problem.');
    return this.$redirect(GlobalComponent, 'suggestOptions');
  }
}
