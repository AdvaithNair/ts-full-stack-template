import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  helperText: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
}

const TextEntry: React.FC<Props> = ({
  onChange,
  helperText,
  required,
  fullWidth,
  label
}) => {
  return (
    <TextField
      label={label}
      type={'text'}
      onChange={onChange}
      helperText={helperText}
      variant='outlined'
      margin='normal'
      fullWidth={fullWidth}
      required={required}
    />
  );
};

export default TextEntry;
