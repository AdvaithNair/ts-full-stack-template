import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { ChangeEvent, useState } from 'react';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: boolean;
  helperText: string;
  required: boolean;
  fullWidth: boolean;
  label: string;
}

const SmallPassword: React.FC<Props> = ({
  onChange,
  error,
  helperText,
  required,
  fullWidth,
  label
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      label={label}
      type={show ? 'text' : 'Password'}
      onChange={onChange}
      error={error}
      helperText={helperText}
      variant='outlined'
      margin='normal'
      fullWidth={fullWidth}
      required={required}
      size={'small'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='Toggle Password Visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SmallPassword;
