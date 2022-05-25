import { Component, BaseComponent, Intents } from '@jovotech/framework';

@Component({})
export class CollectTableDataComponent extends BaseComponent {
  START() {
    // return this.$send('For how many people?');
    return this.$send('Do you really want to book a table?');
  }

  @Intents(['YesIntent'])
  yes() {
    return this.$resolve('success');
  }

  @Intents(['NoIntent'])
  no() {
    return this.$resolve('dismiss');
  }
}
