import {
  HttpApi,
  HttpApiGroup,
  HttpApiEndpoint,
  HttpApiError,
  OpenApi,
} from '@effect/platform';
import { TreasuryDataResponse } from '@epb/treasury-data-schemas';
import { TreasuryRequestParams } from '@epb/treasury-params-schemas';

const TreasuryDataSpec = HttpApi.make('US Treasury Data').add(
  HttpApiGroup.make('Treasury Data API')
    .add(
      HttpApiEndpoint.get('avg_interest_rates')`/avg_interest_rates`
        .addSuccess(TreasuryDataResponse)
        .setUrlParams(TreasuryRequestParams)
        .annotate(
          OpenApi.Description,
          'https://fiscaldata.treasury.gov/datasets/average-interest-rates-treasury-securities/average-interest-rates-on-u-s-treasury-securities'
        )
    )
    .add(
      HttpApiEndpoint.get('rates_of_exchange')`/rates_of_exchange`
        .addSuccess(TreasuryDataResponse)
        .setUrlParams(TreasuryRequestParams)
        .annotate(
          OpenApi.Description,
          'https://fiscaldata.treasury.gov/datasets/treasury-reporting-rates-exchange/treasury-reporting-rates-of-exchange'
        )
    )
    .add(
      HttpApiEndpoint.get(
        'Advances to State Unemployment Funds (Social Security Act Title XII)'
      )`/title_xii_advances`
        .addSuccess(TreasuryDataResponse)
        .setUrlParams(TreasuryRequestParams)
        .annotate(
          OpenApi.Description,
          'https://fiscaldata.treasury.gov/datasets/ssa-title-xii-advance-activities/advances-to-state-unemployment-funds-social-security-act-title-xii'
        )
    )
    .addError(HttpApiError.NotFound)
    .addError(HttpApiError.BadRequest)
    .addError(HttpApiError.Forbidden)
    .addError(HttpApiError.InternalServerError)
    .addError(HttpApiError.MethodNotAllowed)
    .addError(HttpApiError.RequestTimeout, { status: 429 })
);

export { TreasuryDataSpec };
