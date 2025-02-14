import { HttpApiBuilder, HttpApiSwagger } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Layer } from 'effect';
import { TreasuryDataHandlers } from '@epb/treasury-data-handlers';
import { TreasuryDataServiceLive } from '@epb/treasury-data-service';
import { TreasuryDataSpec } from '@epb/treasury-data-spec';
import { createServer } from 'node:http';

const TreasuryApi = HttpApiBuilder.api(TreasuryDataSpec).pipe(
  Layer.provide(TreasuryDataHandlers),
  Layer.provide(TreasuryDataServiceLive)
);

const ServerLive = HttpApiBuilder.serve().pipe(
  // Provide the Swagger layer so clients can access auto-generated docs
  Layer.provide(HttpApiSwagger.layer()),
  Layer.provide(TreasuryApi),
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
);

Layer.launch(ServerLive).pipe(NodeRuntime.runMain);
