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
    return this.collectData();
  }

  collectData() {
    return this.$delegate(CollectTableDataComponent, {
      resolve: {
        success: this.confirm, // The handler that gets called if 'success' is resolved
        dismiss: this.dismiss, // The handler that gets called if 'dismiss' is resolved
      },
    });
  }

  confirm(seatingType: string) {
    return this.$send({
      message: `Great! We're going to reserve a table for ${seatingType} seating.`,
      listen: false, // close session
    });
  }

  dismiss() {
    this.$send('No problem.');
    return this.$redirect(GlobalComponent, 'suggestOptions');
  }
}
