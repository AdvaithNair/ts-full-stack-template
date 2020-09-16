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
}

const TextEntryValued: React.FC<Props> = ({
                                        onChange,
                                        helperText,
                                        required,
                                        fullWidth,
                                        label,
                                        error,
                                        innerStr
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
        >
        </TextField>
    );
};

export default TextEntryValued;
