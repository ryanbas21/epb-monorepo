import { Schema } from 'effect';

export const TreasuryDataDataTypes = Schema.Struct({
  record_date: Schema.String,
  security_type_desc: Schema.String,
  security_desc: Schema.String,
  avg_interest_rate_amt: Schema.String,
  src_line_nbr: Schema.String,
  record_fiscal_year: Schema.String,
  record_fiscal_quarter: Schema.String,
  record_calendar_year: Schema.String,
  record_calendar_quarter: Schema.String,
  record_calendar_month: Schema.String,
  record_calendar_day: Schema.String,
  state_nm: Schema.optional(Schema.String),
  interest_rate_pct: Schema.optional(Schema.NumberFromString),
  outstanding_advance_bal: Schema.optional(Schema.NumberFromString),
  advance_auth_month_amt: Schema.optional(Schema.NumberFromString),
  gross_advance_draws_month_amt: Schema.optional(Schema.NumberFromString),
  interest_accrued_fytd_amt: Schema.optional(Schema.NumberFromString),
  interest_paid_amt: Schema.optional(Schema.NumberFromString),
});

export const TreasuryDataMeta = Schema.Struct({
  count: Schema.Number,
  'total-count': Schema.Number,
  'total-pages': Schema.Number,
  labels: Schema.Struct({
    record_date: Schema.String,
    security_type_desc: Schema.optional(Schema.String),
    security_desc: Schema.optional(Schema.String),
    avg_interest_rate_amt: Schema.optional(Schema.String),
    src_line_nbr: Schema.String,
    record_fiscal_year: Schema.String,
    record_fiscal_quarter: Schema.String,
    record_calendar_year: Schema.String,
    record_calendar_quarter: Schema.String,
    record_calendar_month: Schema.String,
    record_calendar_day: Schema.String,
  }),
});
export const TreasuryDataLinks = Schema.Struct({
  self: Schema.NullOr(Schema.String),
  first: Schema.NullOr(Schema.String),
  prev: Schema.NullOr(Schema.String),
  next: Schema.NullOr(Schema.String),
  last: Schema.NullOr(Schema.String),
});
export const TreasuryData = Schema.Struct({
  record_date: Schema.String,
  security_type_desc: Schema.optional(Schema.String),
  security_desc: Schema.optional(Schema.String),
  avg_interest_rate_amt: Schema.optional(Schema.NumberFromString),
  src_line_nbr: Schema.NumberFromString,
  record_fiscal_year: Schema.NumberFromString,
  record_fiscal_quarter: Schema.NumberFromString,
  record_calendar_year: Schema.NumberFromString,
  record_calendar_quarter: Schema.NumberFromString,
  record_calendar_month: Schema.NumberFromString,
  record_calendar_day: Schema.NumberFromString,
});
export const TreasuryDataResponse = Schema.Struct({
  data: Schema.Array(TreasuryData),
  links: TreasuryDataLinks,
  meta: TreasuryDataMeta,
});

export type TreasuryDataResponse = Schema.Schema.Type<
  typeof TreasuryDataResponse
>;
