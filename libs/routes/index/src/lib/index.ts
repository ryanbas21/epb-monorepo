import { HttpApiBuilder } from '@effect/platform';
import { MyApi } from '@epb/backend-spec';
import { Effect } from 'effect';

const GreetingsLive = HttpApiBuilder.group(MyApi, 'Greetings', (handlers) =>
  handlers.handle('hello-world', () => Effect.succeed('Hello, World!'))
);

export { GreetingsLive };
