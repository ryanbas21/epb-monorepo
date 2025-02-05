import { HttpApiBuilder } from '@effect/platform';
import { Effect } from 'effect';

import { MyApi } from '../specification.js';

const GreetingsLive = HttpApiBuilder.group(MyApi, 'Greetings', (handlers) =>
  handlers.handle('hello-world', () => Effect.succeed('Hello, World!'))
);

export { GreetingsLive };
