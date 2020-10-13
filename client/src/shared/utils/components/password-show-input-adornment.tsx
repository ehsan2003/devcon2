import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {IconButton, InputAdornment, InputAdornmentProps, Theme} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";


export type Props = {
    [p in string | number]: any;
} & {
    show: boolean;
    setShow: (show: boolean) => void;
};

const useStyles = makeStyles((theme: Theme) => ({}));

const PasswordShowInputAdornment: React.FC<Props> = (props => {
    const classes = useStyles();
    return (
        <InputAdornment
            position={props.position}
            onClick={() => props.setShow(!props.show)}
            tabIndex={-1}
        >
            <IconButton tabIndex={-1}>
                {props.show ?
                    <Visibility/> :
                    <VisibilityOff/>
                }
            </IconButton>
        </InputAdornment>
    );
});
export default PasswordShowInputAdornment;