import React, {useEffect, useMemo, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "@reducers/index";
import {dispatchType} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";
import Recaptcha from 'react-recaptcha';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fade,
    Hidden,
    IconButton,
    InputAdornment,
    Slide,
    TextField,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import {loginDialogOpenSet} from "@actions/creator-login-dialog-open-set";
import theme from "../../theme";
import validator from 'validator';
import {Close as CloseIcon, Visibility, VisibilityOff} from "@material-ui/icons";
import keys from '@conf/keys';
import {userLogin} from "@actions/creator-user-login";

export interface OwnProps {

}

const mapDispatchToProps = {userLogin, loginDialogOpenSet};
const mapStateToProps = (state: RootState) => ({open: state.ui.loginDialog.data.open});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const useStyles = makeStyles((thm: Theme) => ({
    root: {
        backgroundColor: 'red'
    },
    email: {
        maxWidth: 300,
        margin: thm.spacing(2),
    }, password: {
        maxWidth: 300,
        margin: thm.spacing(2),
    }, captchaContainer: {
        display: 'flex',
        justifyContent: 'center'
    }

    , dialogPaper: {
        [thm.breakpoints.up('sm')]: {
            maxWidth: 400
        }
    },
    dialogContent: {

        textAlign: 'center',
        overflowX: 'hidden'
    },
    loginButton: {
        marginRight: thm.spacing(3),
        marginBottom: thm.spacing(2),
        marginTop: thm.spacing(2)
    }, closeIcon: {
        position: 'absolute',
        top: thm.spacing(2),
        right: thm.spacing(2),
        [thm.breakpoints.down('sm')]: {
            top: (thm.mixins.toolbar.minHeight as number + thm.spacing(1))
        }
    }
}));

const LoginForm: React.FC<Props> = (props => {
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmDown = useMediaQuery('sm');
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [firstFocusOut, setFirstFocusOut] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const isValidEmail = useMemo(() => validator.isEmail(email), [email]);
    const captchaRef = React.useRef<any>();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        props.userLogin(email, password, captchaValue as string);
    }

    function handleClose() {
        props.loginDialogOpenSet(false);
    }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            transitionDuration={fullScreen?700:300}
            TransitionComponent={fullScreen?Slide:Fade}
            TransitionProps={{direction: 'left'} as any}
            classes={{
                paper: classes.dialogPaper
            }}
            fullScreen={fullScreen}
            fullWidth
        >
            <Hidden smUp>
                <Toolbar/></Hidden>
            <DialogTitle disableTypography>
                <Typography variant={'h6'}>login</Typography>
                <IconButton className={classes.closeIcon} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <form>
                    <TextField
                        error={firstFocusOut && !isValidEmail}
                        onBlur={() => email.length && setFirstFocusOut(true)}
                        label='Email Address'
                        type='email'
                        helperText={!isValidEmail && firstFocusOut ? 'invalid email' : null}
                        onChange={e => setEmail(e.target.value)}
                        className={classes.email}
                        autoFocus
                        fullWidth
                    />
                    <TextField
                        label={'Password'}
                        type={showPassword ? 'text' : 'password'}
                        className={classes.password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position={'end'}
                                    onClick={() => setShowPassword(v => !v)}
                                    tabIndex={-1}
                                >
                                    <IconButton tabIndex={-2}>
                                        {
                                            showPassword ?
                                                <Visibility fontSize={'small'}/> :
                                                <VisibilityOff fontSize={'small'}/>
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                    <div className={classes.captchaContainer}>
                        <Recaptcha
                            size={fullScreen ? 'compact' : 'normal'}
                            tabindex={3}
                            ref={captchaRef} sitekey={keys.recaptcha}
                            verifyCallback={(newValue) => {
                                setCaptchaValue(newValue);
                            }}
                            expiredCallback={() => setCaptchaValue(null)}
                            badge={'inline'}
                            render={'onload'}
                        /></div>
                    <DialogActions>
                        <Button
                            disabled={!isValidEmail || !password || !captchaValue}
                            tabIndex={1}
                            variant={'contained'}
                            className={classes.loginButton}
                            color={'primary'}
                            size={'large'}
                            onClick={handleSubmit}
                        >login</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);