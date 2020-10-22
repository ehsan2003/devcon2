import React, {useState} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import {PasswordShowInputAdornment} from "@shared/utils";

const PasswordField = React.forwardRef<HTMLInputElement, Omit<TextFieldProps, 'InputProps'>>((props, ref) => {
    const [show, setShow] = useState(false);
    return (
        <TextField
            InputProps={{endAdornment: <PasswordShowInputAdornment show={show} setShow={setShow}/>}}
            type={show ? 'text' : 'password'}
            {...props}
            ref={ref}
        />
    );
});
export default PasswordField;