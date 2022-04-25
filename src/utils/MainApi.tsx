const API_KEY = '594e974a506493b767f6e443765f9137'

export const BASE_URL = 'https://api.exchangeratesapi.io/v1/';

export const convert = (fromCurrency: string, toCurrency: string, amount:  number ) => {
  return fetch(`${BASE_URL}convert ? access_key = ${API_KEY} & from = ${fromCurrency} & to = ${toCurrency} & amount = ${amount}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json()
    })
};

/*
class MainApi {
  url: any;
  headers: any;

  constructor(options: { baseUrl: any; headers?: any; }) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  convert(fromCurrency: string, toCurrency: string, amount:  number ) {
    return fetch(this.url + `convert ? access_key = ${API_KEY} & from = ${fromCurrency} & to = ${toCurrency} & amount = ${amount}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }
}

const mainApi = new MainApi({
  baseUrl: `https://api.exchangeratesapi.io/v1/`,
});

export default mainApi;*/