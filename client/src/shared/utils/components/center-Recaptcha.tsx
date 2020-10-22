import React from 'react';
import {Box} from "@material-ui/core";
import keys from "@conf/keys";
import Recaptcha, {RecaptchaProps} from "react-recaptcha";


export interface Props {
    onChange: (newValue: string | null) => void;
    CaptchaProps?: RecaptchaProps;
}

const CenterRecaptcha = React.forwardRef<null, Props>((props, ref) => {
    const defaultCaptchaProps: RecaptchaProps = {
        badge: 'inline',
        render: 'explicit',
    };
    const CaptchaProps = {...defaultCaptchaProps, ...props.CaptchaProps};
    return (
        <Box display={'flex'} justifyContent={'center'}>
            <Recaptcha
                ref={ref}
                sitekey={keys.recaptcha}
                verifyCallback={props.onChange}
                expiredCallback={() => props.onChange(null)}
                {...CaptchaProps}
            />
        </Box>
    );
});

export default CenterRecaptcha;