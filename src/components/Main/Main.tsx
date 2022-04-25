import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import transferIcon from '../../images/transfer.svg'
import Button from '@mui/material/Button';
import '../../i18n';
import { useTranslation } from "react-i18next";
import { availableLanguages } from "../../i18n";

function Main() {
  const [currancyFrom, setCurrancyFrom] = useState('30');
  const [currancyTo, setCurrancyTo] = useState('10');

  const handleChangeFrom = (event: SelectChangeEvent) => {
    setCurrancyFrom(event.target.value.toString());
  };

  const handleChangeTo = (event: SelectChangeEvent) => {
    setCurrancyTo(event.target.value.toString());
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    let fromCurrancy = currancyFrom;
    setCurrancyFrom(currancyTo);
    setCurrancyTo(fromCurrancy);
  };

  const { t, i18n } = useTranslation()

  return (
    <main className="content">
      <h1>Конвертер валют</h1>
      <Select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {availableLanguages.map((language) => (
          <MenuItem value={language}>{language}</MenuItem>
        ))}
      </Select>
      <Box className="converter__content" component="form" sx={{ minWidth: 120 }}>
        <div className="converter__input-container">
          <TextField className="converter__input-field" id="input-from" label={t('change')} variant="outlined" />
          <Select
            id="select-from"
            label="Age"
            value={currancyFrom}
            onChange={handleChangeFrom}
          >
            <MenuItem value={10}>USD</MenuItem>
            <MenuItem value={20}>EUR</MenuItem>
            <MenuItem value={30}>RUB</MenuItem>
          </Select>
        </div>
        <Button onClick={(e) => handleButtonClick(e)}><img src={transferIcon} alt="стрелка" /></Button>
        <div className="converter__input-container">
          <TextField className="converter__input-field" id="input-to" label={t('get')} variant="outlined" />
          <Select
            id="select-to"
            value={currancyTo}
            label="Age"
            onChange={handleChangeTo}
          >
            <MenuItem value={10}>USD</MenuItem>
            <MenuItem value={20}>EUR</MenuItem>
            <MenuItem value={30}>RUB</MenuItem>
          </Select>
        </div>
      </Box>
    </main>
  );
}

export default Main;