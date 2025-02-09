import { Effect, pipe } from 'effect';
import { HttpApiBuilder, HttpApiError } from '@effect/platform';

import { TreasuryDataSpec } from '@epb/treasury-data-spec';
import { TreasuryDataService } from '@epb/treasury-data-service';

export const TreasuryDataHandlers = HttpApiBuilder.group(
  TreasuryDataSpec,
  'Treasury Data API',
  (handlers) =>
    handlers
      .handle('avg_interest_rates', ({ urlParams: params }) =>
        pipe(
          TreasuryDataService,
          Effect.flatMap((treasureyService) =>
            treasureyService.getAverageInterestRates(params)
          ),
          Effect.mapError((error) => {
            return new HttpApiError.HttpApiDecodeError({
              message: 'Failed to decode treasury data response',
              issues: [
                {
                  _tag: 'Type' as const,
                  message: 'message' in error ? error.message : 'HttpBodyError',
                  path: [],
                },
              ],
            });
          })
        )
      )
      .handle('rates_of_exchange', ({ urlParams: params }) =>
        pipe(
          TreasuryDataService,
          Effect.flatMap((treasureyService) =>
            treasureyService.getRatesOfExchange(params)
          ),
          Effect.mapError((error) => {
            return new HttpApiError.HttpApiDecodeError({
              message: 'Failed to decode treasury data response',
              issues: [
                {
                  _tag: 'Type' as const,
                  message: 'message' in error ? error.message : 'HttpBodyError',
                  path: [],
                },
              ],
            });
          })
        )
      )
      .handle(
        'Advances to State Unemployment Funds (Social Security Act Title XII)',
        ({ urlParams: params }) =>
          pipe(
            TreasuryDataService,
            Effect.flatMap((treasureyService) =>
              treasureyService.getRatesOfExchange(params)
            ),
            Effect.mapError((error) => {
              return new HttpApiError.HttpApiDecodeError({
                message: 'Failed to decode treasury data response',
                issues: [
                  {
                    _tag: 'Type' as const,
                    message:
                      'message' in error ? error.message : 'HttpBodyError',
                    path: [],
                  },
                ],
              });
            })
          )
      )
);
