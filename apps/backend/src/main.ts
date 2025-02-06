import { HttpApiBuilder, HttpApiSwagger } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Layer } from 'effect';
import { GreetingsLive } from '@epb/index';
import { MyApi } from '@epb/backend-spec';
import { createServer } from 'node:http';

const MyApiLive = HttpApiBuilder.api(MyApi).pipe(Layer.provide(GreetingsLive));

const ServerLive = HttpApiBuilder.serve().pipe(
  // Provide the Swagger layer so clients can access auto-generated docs
  Layer.provide(HttpApiSwagger.layer()),
  Layer.provide(MyApiLive),
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
);

Layer.launch(ServerLive).pipe(NodeRuntime.runMain);
