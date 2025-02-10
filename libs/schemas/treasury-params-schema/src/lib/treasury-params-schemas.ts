import { Schema } from 'effect';

export const TreasuryRequestParams = Schema.Struct({
  filter: Schema.optional(Schema.String),
  sort: Schema.optional(Schema.String),
  format: Schema.optional(Schema.Literal('csv', 'json', 'xml')),
  ['page[size]']: Schema.optional(Schema.NumberFromString),
  ['page[number]']: Schema.optional(Schema.NumberFromString),
});

export type TreasuryRequestParams = Schema.Schema.Type<
  typeof TreasuryRequestParams
>;
