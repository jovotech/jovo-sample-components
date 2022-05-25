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
        success: this.askForFinalConfirmation, // The handler that gets called if 'success' is resolved
        dismiss: this.redirectToOptions, // The handler that gets called if 'dismiss' is resolved
      },
    });
  }

  askForFinalConfirmation(seatingType: string) {
    this.$component.data.seatingType = seatingType;

    return this.$send({
      message: `Alright! Just to confirm: Should I reserve table ${seatingType} for you?`,
      quickReplies: ['yes', 'no'],
    });
  }

  @Intents(['YesIntent'])
  confirm() {
    return this.$send({
      message: `Great! We're going to reserve a table for ${this.$component.data.seatingType} seating.`,
      listen: false, // close session
    });
  }

  /*
    This handler is reached either via a 'dismiss' resolve or a NoIntent on final confirmation
  */
  @Intents(['NoIntent'])
  redirectToOptions() {
    this.$send('No problem.');
    return this.$redirect(GlobalComponent, 'suggestOptions');
  }
}
