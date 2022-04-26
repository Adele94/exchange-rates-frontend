import React from 'react';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../../../i18n';
import { useTranslation } from "react-i18next";

function InputSection(props: { label: any; 
  handleTextChange: (arg0: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; 
  textValue: unknown; error: string | undefined, id: string | undefined; currency: any; 
  handleChange: ((event: SelectChangeEvent<any>, child: React.ReactNode) => void) | undefined; 
  children: React.ReactNode; symbols: any }) {
  
    const { t } = useTranslation();

  return (
    <div className="converter__input-container">
      <TextField className="converter__input-field"
        id={props.id} label={t(props.label)} onChange={(e) => props.handleTextChange(e)}
        value={props.textValue}
        error={Boolean(props.error)}
        helperText={props.error ? t('error') : ''}
        variant="outlined" />
      <Select className="converter__select"
        id={props.id}
        value={props.currency}
        onChange={props.handleChange}
        required
      >
        {props.symbols.map((item: any) => (
          <MenuItem key={item} value={item} >{item}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default InputSection;