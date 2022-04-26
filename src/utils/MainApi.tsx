import { BASE_URL, API_KEY } from '../config/constants'

export const convert = (fromCurrency: string, toCurrency: string, amount: number) => {
  return fetch(`${BASE_URL}${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json()
    })
};

export const getSupportedCodes = () => {
  return fetch(`${BASE_URL}${API_KEY}/codes`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json()
    })
};