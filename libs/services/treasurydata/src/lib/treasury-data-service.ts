import type { HttpBody, HttpClientError } from '@effect/platform';
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform';
import { NodeHttpClient } from '@effect/platform-node';
import { TreasuryDataResponse } from '@epb/treasury-data-schemas';
import type { TreasuryRequestParams } from '@epb/treasury-params-schemas';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import type * as ParseResult from 'effect/ParseResult';

export interface TreasuryDataService {
  readonly getStateUnemployementFundAdvances: (
    params: TreasuryRequestParams
  ) => Effect.Effect<
    TreasuryDataResponse,
    | HttpClientError.HttpClientError
    | HttpBody.HttpBodyError
    | ParseResult.ParseError
  >;
  readonly getAverageInterestRates: (
    params: TreasuryRequestParams
  ) => Effect.Effect<
    TreasuryDataResponse,
    | HttpClientError.HttpClientError
    | HttpBody.HttpBodyError
    | ParseResult.ParseError
  >;
  readonly getRatesOfExchange: (
    params: TreasuryRequestParams
  ) => Effect.Effect<
    TreasuryDataResponse,
    | HttpClientError.HttpClientError
    | HttpBody.HttpBodyError
    | ParseResult.ParseError
  >;
}

export const TreasuryDataService = Context.GenericTag<TreasuryDataService>(
  '@epb/treasury-data-service'
);

// Service Implementation
export const makeTreasuryDataService = Effect.gen(function* () {
  const defaultClient = yield* HttpClient.HttpClient;
  const clientWithBaseUrl = (params: TreasuryRequestParams) =>
    defaultClient.pipe(
      HttpClient.mapRequest((request) =>
        HttpClientRequest.setUrlParams(request, params)
      ),
      HttpClient.filterStatusOk,
      HttpClient.mapRequest(
        HttpClientRequest.prependUrl(
          'https://api.fiscaldata.treasury.gov/services/api/fiscal_service'
        )
      )
    );

  const decodeResponse =
    HttpClientResponse.schemaBodyJson(TreasuryDataResponse);

  const getAverageInterestRates = (params: TreasuryRequestParams) =>
    clientWithBaseUrl(params)
      .get('/v2/accounting/od/avg_interest_rates')
      .pipe(Effect.flatMap(decodeResponse), Effect.scoped);

  const getRatesOfExchange = (params: TreasuryRequestParams) =>
    clientWithBaseUrl(params)
      .get('/v1/accounting/od/rates_of_exchange')
      .pipe(Effect.flatMap(decodeResponse), Effect.scoped);

  const getStateUnemployementFundAdvances = (params: TreasuryRequestParams) =>
    clientWithBaseUrl(params)
      .get('v2/accounting/od/title_xii')
      .pipe(Effect.flatMap(decodeResponse), Effect.scoped);

  return TreasuryDataService.of({
    getAverageInterestRates,
    getRatesOfExchange,
    getStateUnemployementFundAdvances,
  });
});

export const TreasuryDataServiceLive = Layer.effect(
  TreasuryDataService,
  makeTreasuryDataService
).pipe(Layer.provide(NodeHttpClient.layer));
