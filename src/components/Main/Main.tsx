import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import transferIcon from '../../images/transfer.svg'
import Button from '@mui/material/Button';
import '../../i18n';
import { useTranslation } from "react-i18next";
import { availableLanguages } from "../../i18n";
import * as MainApi from "../../utils/MainApi";
import { symbols } from '../../config/constants';

function Main() {
  const [currencyFrom, setCurrencyFrom] = useState('RUB');
  const [currencyTo, setCurrencyTo] = useState('USD');
  const [textValueFirst, setTextValueFirst] = useState<string>("0");
  const [textValueSecond, setTextValueSecond] = useState<string>("0");
  const [errorFieldFrom, setErrorFieldFrom] = useState<{ textFieldFrom: string }>();
  const [errorFieldTo, setErrorFieldTo] = useState<{ textFieldTo: string }>();

  const { t, i18n } = useTranslation()

  const handleChangeFrom = (event: SelectChangeEvent) => {
    setCurrencyFrom(event.target.value.toString());
  };

  const handleChangeTo = (event: SelectChangeEvent) => {
    setCurrencyTo(event.target.value.toString());
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    let fromCurrancy = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(fromCurrancy);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target: { value } } = event;
    const reg = new RegExp(/^(0|[1-9]\d*)(\.\d+)?$/).test(value);

    if (event.target.id === 'input-from') {
      setTextValueFirst(value);
      if (!reg) {
        setErrorFieldFrom({ textFieldFrom: 'error' })
      } else {
        setErrorFieldFrom({ textFieldFrom: '' })
        MainApi.convert(currencyFrom, currencyTo, +value)
          .then(res => {
            setTextValueSecond((res.conversion_result).toString());
          });
      }
    } else {
      setTextValueSecond(value);
      if (!reg) {
        setErrorFieldTo({ textFieldTo: 'error' })
      } else {
        setErrorFieldTo({ textFieldTo: '' })
        MainApi.convert(currencyTo, currencyFrom, +value)
          .then(res => {
            setTextValueFirst((res.conversion_result).toString());
          });
      }
    }
  };

  useEffect(() => {
    if (textValueFirst && +textValueFirst !== 0) {
      MainApi.convert(currencyFrom, currencyTo, +textValueFirst)
        .then(res => {
          setTextValueSecond((res.conversion_result).toString());
        });
    }
  }, [currencyFrom, currencyTo]);

  return (
    <main className="content">
      <h1>{t('title')}</h1>
      <Select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {availableLanguages.map((language) => (
          <MenuItem key={language} value={language}>{language}</MenuItem>
        ))}
      </Select>
      <Box className="converter__content" component="form" sx={{ minWidth: 120 }}>
        <div className="converter__input-container">
          <TextField className="converter__input-field"
            id="input-from" label={t('change')} onChange={(e) => handleTextChange(e)}
            value={textValueFirst}
            error={Boolean(errorFieldFrom?.textFieldFrom)}
            helperText={errorFieldFrom?.textFieldFrom ? t('error') : ''}
            variant="outlined" />
          <Select className="converter__select"
            id="select-from"
            value={currencyFrom}
            onChange={handleChangeFrom}
            required
          >
            {symbols.map((item: any) => (
              <MenuItem key={item} value={item} >{item}</MenuItem>
            ))}
          </Select>
        </div>
        <Button className="converter__transfer-btn" onClick={(e) => handleButtonClick(e)}><img src={transferIcon} alt={t('altArrowBtn')} /></Button>
        <div className="converter__input-container">
          <TextField className="converter__input-field" id="input-to"
            label={t('get')} onChange={(e) => handleTextChange(e)}
            value={textValueSecond}
            error={Boolean(errorFieldTo?.textFieldTo)}
            helperText={errorFieldTo?.textFieldTo ? t('error') : ''}
            variant="outlined" />
          <Select className="converter__select"
            id="select-to"
            value={currencyTo}
            onChange={handleChangeTo}
          >
            {symbols.map((item: any) => (
              <MenuItem key={item} value={item} >{item}</MenuItem>
            ))}
          </Select>
        </div>
      </Box>
    </main>
  );
}

export default Main;