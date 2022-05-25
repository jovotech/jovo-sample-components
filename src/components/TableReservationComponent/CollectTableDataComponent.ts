import { Component, BaseComponent, Intents } from '@jovotech/framework';

@Component({})
export class CollectTableDataComponent extends BaseComponent {
  START() {
    this.$component.data.unhandledCounter = 0;

    return this.$send({
      message: 'Do you prefer inside or outside seating?',
      quickReplies: ['inside', 'outside'],
    });
  }

  @Intents(['SeatingTypeIntent'])
  collectSeatingType() {
    return this.$resolve('success', this.$entities.seatingType?.resolved);
  }

  @Intents(['HelpIntent'])
  UNHANDLED() {
    this.$component.data.unhandledCounter++;

    if (this.$component.data.unhandledCounter < 2) {
      return this.$send({
        message: 'You can choose either inside or outside seating:',
        quickReplies: ['inside', 'outside'],
      });
    } else {
      return this.$resolve('dismiss');
    }
  }
}
