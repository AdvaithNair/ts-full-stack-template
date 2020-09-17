import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, useState} from 'react';

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    helperText: string;
    label: string;
    required: boolean;
    fullWidth: boolean;
    error: boolean;
    innerStr: string;
    small: boolean;
    name: string;
}

const TextEntryValued: React.FC<Props> = ({
                                        onChange,
                                        helperText,
                                        required,
                                        fullWidth,
                                        label,
                                        error,
                                        innerStr,
                                        small,
                                        name
                                    }) => {

    const [valueStr, setValueStr] = useState<string>(innerStr);

    return (
        <TextField
            label={label}
            type={'text'}
            onChange={onChange}
            error={error}
            helperText={helperText}
            variant='outlined'
            margin='normal'
            fullWidth={fullWidth}
            required={required}
            value={valueStr}
            name={name}
            size={small ? 'small' : 'medium'}
        >
        </TextField>
    );
};

export default TextEntryValued;
