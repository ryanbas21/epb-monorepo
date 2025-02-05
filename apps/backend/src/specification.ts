import { Schema } from 'effect';
import { HttpApi, HttpApiGroup, HttpApiEndpoint } from '@effect/platform';

const MyApi = HttpApi.make('MyApi').add(
  HttpApiGroup.make('Greetings').add(
    HttpApiEndpoint.get('hello-world')`/`.addSuccess(Schema.String)
  )
);

export { MyApi };
