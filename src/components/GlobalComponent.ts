import { Component, BaseComponent, Global, Intents } from '@jovotech/framework';
import { TableReservationComponent } from './TableReservationComponent/TableReservationComponent';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    this.$send('Hello there!');
    return this.suggestOptions();
  }

  @Intents(['HelpIntent'])
  suggestOptions() {
    return this.$send({
      message: 'I can help you with one of the following tasks:',
      quickReplies: ['reserve a table' /* ... */],
    });
  }

  /*
    This handler shows how a component can redirect to another component.
  */
  @Intents(['ExampleIntent'])
  example() {
    return this.$redirect(TableReservationComponent);
  }
}
