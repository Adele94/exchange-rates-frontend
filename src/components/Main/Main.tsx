import React, { useState, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import transferIcon from '../../images/transfer.svg'
import Button from '@mui/material/Button';
import '../../i18n';
import { useTranslation } from "react-i18next";
import { availableLanguages } from "../../i18n";
import * as MainApi from "../../utils/MainApi";
import InputSection from './InputSection/InputSection';

function Main() {
  const [currencyFrom, setCurrencyFrom] = useState('RUB');
  const [currencyTo, setCurrencyTo] = useState('USD');
  const [textValueFirst, setTextValueFirst] = useState<string>("100");
  const [textValueSecond, setTextValueSecond] = useState<string>("");
  const [errorFieldFrom, setErrorFieldFrom] = useState<{ textFieldFrom: string }>();
  const [errorFieldTo, setErrorFieldTo] = useState<{ textFieldTo: string }>();
  const [symbols, setSymbols] = useState<Array<string>>([]);

  const { t, i18n } = useTranslation()

  const handleChangeFrom = (event: SelectChangeEvent) => {
    setCurrencyFrom(event.target.value.toString());
  };

  const handleChangeTo = (event: SelectChangeEvent) => {
    setCurrencyTo(event.target.value.toString());
  };

  const reg = new RegExp(/^([1-9]\d*)(\.\d+)?$/);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (reg.test(textValueFirst) && reg.test(textValueSecond)) {
      let fromCurrancy = currencyFrom;
      setCurrencyFrom(currencyTo);
      setCurrencyTo(fromCurrancy);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target: { value } } = event;
    const regExp = reg.test(value);
    if (event.target.id === 'input-from') {
      setTextValueFirst(value);
      if (!regExp) {
        setErrorFieldFrom({ textFieldFrom: 'error' })
      } else {
        setErrorFieldFrom({ textFieldFrom: '' })
        setErrorFieldTo({ textFieldTo: '' })
        MainApi.convert(currencyFrom, currencyTo, +value)
          .then(res => {
            setTextValueSecond((res.conversion_result).toString());
          });
      }
    } else {
      setTextValueSecond(value);
      if (!regExp) {
        setErrorFieldTo({ textFieldTo: 'error' })
      } else {
        setErrorFieldTo({ textFieldTo: '' })
        setErrorFieldFrom({ textFieldFrom: '' })
        MainApi.convert(currencyTo, currencyFrom, +value)
          .then(res => {
            setTextValueFirst((res.conversion_result).toString());
          });
      }
    }
  };

  useEffect(() => {
    MainApi.getSupportedCodes()
      .then(res => {
        let symbolsArray = res.supported_codes.map((item: any[])=> {
          return item[0];
       })
        setSymbols(symbolsArray);
      }); 
  }, [])

  useEffect(() => {
    MainApi.convert(currencyFrom, currencyTo, +textValueFirst)
      .then(res => {
        setTextValueSecond((res.conversion_result).toString());
      });
  }, [currencyFrom, currencyTo]);

  return (
    <main className="content">
      <h1>{t('title')}</h1>
      <Select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {availableLanguages.map((language) => (
          <MenuItem key={language} value={language}>{language}</MenuItem>
        ))}
      </Select>
      <Box className="converter__content" component="form">
        <InputSection
          label="change"
          handleTextChange={handleTextChange}
          textValue={textValueFirst}
          error={errorFieldFrom?.textFieldFrom}
          id="input-from"
          currency={currencyFrom}
          handleChange={handleChangeFrom}
          symbols={symbols}>{ }
        </InputSection>
        <Button className="converter__transfer-btn" onClick={(e) => handleButtonClick(e)}><img src={transferIcon} alt={t('altArrowBtn')} /></Button>
        <InputSection
          label="get"
          handleTextChange={handleTextChange}
          textValue={textValueSecond}
          error={errorFieldTo?.textFieldTo}
          id="input-to"
          currency={currencyTo}
          handleChange={handleChangeTo}
          symbols={symbols}>{ }
        </InputSection>
      </Box>
    </main>
  );
}

export default Main;