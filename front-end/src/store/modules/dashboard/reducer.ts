import { convert } from 'cashify';
import currency from 'currency.js';
import moment from 'moment';
import rates from 'assets/mock/rates.json';
import symbols from 'assets/mock/symbols.json';
import { DashboardState, DashboardActionTypes } from './types';
import * as ActionTypes from './actionTypes';

const initialState: DashboardState = {
  endAnimations: false,
  countries: [],
  moneyAvailable: 99999,
  youSend: 0,
  recipientGets: 0,
  delivery: moment().set('hour', 12).toString(),
  typeDelivery: 'Express',
  fromCountry: {
    label: 'India',
    id: 'INR',
    value: 'INR',
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAsVBMVEX/mTMSiAf/////mjH//fv6+/cAgwAAAIgAAIUAAIMAAIAAAH4AAHvu7vfe3u7Hx+AAAHb5+f20tNb39/1LS6Ghocrk5PGSksSDg7utrdEAAHLMzOS+vtxSUqRERJzX1+oQEI1ERKMvL5Z/f7d5ebaYmManp88bG5JkZK/JyeEiIpFoaKqMjL9ycrSzs9uVlctYWKI3N5tgYKw6OpoeHo8YGJEsLJYAAJAbG5lYWKkmJpLm9FjFAAAEl0lEQVR4nO3ba3PiNhiGYaoeJB9kg0/YsbEg5rQkaUtINk3+/w/rK0OyDS/tTL9YmeG5Zgin/SDuNZYRZjQCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPiffoZzo1/g3EjAOTTh0IRDEw5NuK/QpGjKu8XT5mlxVzaF68GIL9CkuJ8HvqeUknTx/GB+H7kekuMmdRZ4Utogvu/bLFJ6QVu7HZTTJsXMtxHU9iHMClNk4cNW2UR+5vQt5LLJym4Znj8VqWi0MEI3dGtKbySqsnI4LndNJjOfXnuXt1rE9v7v9k8sdJt31MqfTZyNzFkTvfOkak3/ytf2zx8ftyamVdLbaVdDc9VEz+llB/lxE4ntVLOkS3S8K3La86q5qyiOmkx2lCQvtUgruqen9GdLl6nNUKVClzlFeXP09nHUZOZJP+lv5XaKWdDlz9N1kfePN770Zm4G56bJil7wWjT97Ve6bCnMgXJsT/cpiVhTNjezj5MmEc04QXnarea0XaxWIt2k9kqs+82EnikDmn2cHNM6aZIp1dpdx2Rr9xiSjk1uhaarWyNSKU6P62mrVOZieC6axP77BpDuqUy1EGmotad1mIoFzcZ6n/bP0ubkxw7G56IJ/f+XadxPKoWkOCoRm1yHOt+IRFEKeTyyj9OSticH43PQxNAOlmbgvD8+i/xaJMGka4tx0XYiqETtG/uE3a9UtJs1ww/QQZOOXqmddKOZrfItTIS8a4IojILmTooktG+XambfXAuqVw4/QAdNnqS3Oh6i5nPaXpJxHo8jr36pvWgcr8d02JI8HydhvfLk0/ADHL4J7Tnn7weoOntJRH7TLMsymSVluWxucpHM2/elgsncxXQ8fJO1p7aTOGmOm0rlb+IkjPZ1VVb1PgqTbzu/6p/RcRJPHtXp3pCGb0KTid1HmOnrY04fiyfbcWduTdfu2858N914m9IH4/X29d78+MfDGr5JpmR4POqIVptgv4yjbm/afj02M/ulibuDP58e3zFxKB0ctg3f5E2p2ccqQJEfQlWapSctb2nuVXi7+lh51DOl3gYf4fBNaNpJP+6kuqhNnR9U30QdVrGpC/2P511MPMM3eZYqMk01ffz+EtzcjMnLw14eHcoX+wA9LP/Kujw2kZKbwUeI7YTD/oT7IvNOdt3zzr8fn5RXe3xS4TiWweedC/C5mPu8fhJj/UScrbMZrLP16ANfd7Ye+3xxPba7mvXY/1y3b/t1++PuhvbGwbWs2+P7nQs+fw+4xveAFr4vvgDnFXCTN5x/wuA8pQtwPtsFx/MelxfOe1xe63mPAufHXoTzqC/B+faXFPfPn36X8Xz1v8vo9b/f2W12+P3O14UmHJpwaMKhCTf6Fc6NfoNzo5/gHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCYcmHJpwaMKhCfc3xgk4+urIdocAAAAASUVORK5CYII=',
  },
  toCountry: {
    label: 'Canada',
    id: 'CAD',
    value: 'CAD',
    flag: 'data:image/png;base64,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',
  },
};

const dashboard = (
  state = initialState,
  action: DashboardActionTypes,
): DashboardState => {
  switch (action.type) {
    case ActionTypes.DASHBOARD_COUNTRIES_REQUEST_SUCCESS:
      return {
        ...state,
        countries: action.data,
      };

    case ActionTypes.DASHBOARD_UPDATE_FROM_COUNTRY:
      return {
        ...state,
        fromCountry: action.country,
      };

    case ActionTypes.DASHBOARD_UPDATE_TO_COUNTRY:
      return {
        ...state,
        toCountry: action.country,
      };

    case ActionTypes.DASHBOARD_UPDATE_YOU_SEND:
      const { value } = action;

      const { fromCountry, toCountry } = state;

      const result = convert(Number(value), {
        from: fromCountry.value,
        to: toCountry.value,
        base: 'EUR',
        rates,
      });

      return {
        ...state,
        youSend: action.value,
        recipientGets: currency(result, {
          symbol: 'INR'
        }).value,
      };

    case ActionTypes.DASHBOARD_UPDATE_DELIVERY_DATE:
      const currentDeliveryHour = moment(action.date).format('H');
      const stateDeliveryHour = moment(state.delivery).format('H');

      const dateDelivery = moment(action.date).set(
        'hour',
        Number(currentDeliveryHour) || Number(stateDeliveryHour),
      );

      return {
        ...state,
        delivery: dateDelivery.toString(),
        typeDelivery: action.typeDelivery,
      };

    case ActionTypes.DASHBOARD_END_ANIMATIONS:
      return {
        ...state,
        endAnimations: true,
      };

    case ActionTypes.DASHBOARD_REVERSE_CURRENCY:
      return {
        ...state,
        fromCountry: action.to,
        toCountry: action.from,
      };

    default:
      return state;
  }
};

export default dashboard;
