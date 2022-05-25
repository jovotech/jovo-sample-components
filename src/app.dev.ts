import { app } from './app';
import { FileDb } from '@jovotech/db-filedb';
import { JovoDebugger } from '@jovotech/plugin-debugger';
import { Nlp, NlpjsNlu } from '@jovotech/nlu-nlpjs';
import { LangEn } from '@nlpjs/lang-en';
import { Platform } from '@jovotech/framework';
const { BuiltinDefault } = require('@nlpjs/builtin-default');

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    new FileDb({
      pathToFile: '../db/db.json',
    }),
    new JovoDebugger({
      nlu: new NlpjsNlu({
        languageMap: {
          en: LangEn,
        },
        useModel: true,
        setupModelCallback: async (parent: Platform, nlp: Nlp) => {
          nlp.forceNER = true;
          nlp.container.use(BuiltinDefault, 'extract-builtin');
          nlp.use(LangEn);
          nlp.addCorpus('../models');
        },
      }),
    }),
  ],
});

export * from './server.express';
