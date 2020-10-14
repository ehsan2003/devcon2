import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "@reducers/index";
import {dispatchType, PasswordShowInputAdornment} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";
import {Button, Grid, Icon, Paper, TextField, Theme, Toolbar, Typography, useMediaQuery} from "@material-ui/core";
import theme from "../../theme";
import Recaptcha from "react-recaptcha";
import keys from "@conf/keys";
import {Cancel as CancelIcon, Check as CheckIcon} from "@material-ui/icons";

export interface OwnProps {


}

const mapDispatchToProps = {React};
const mapStateToProps = (state: RootState) => ({});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const useStyles = makeStyles((thm: Theme) => ({
    textFields: {
        marginBottom: thm.spacing(2)
    },
    gridPaper: {
        padding: `${thm.spacing(5)}px`,
        paddingBottom:thm.spacing(2)
    },
    midHeight: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1,
        right: 0,
        height: '56%',
        boxShadow: thm.shadows[4],
        backgroundColor: thm.palette.error.light,
    },
    captchaContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    background: {
        paddingTop:thm.spacing(8),
        paddingBottom:thm.spacing(3),
        minHeight: `calc(100vh - ${thm.mixins.toolbar.minHeight}px)`,
        [Object.keys(thm.mixins.toolbar)[1]]: {
            height: `calc(100vh - ${(thm.mixins.toolbar[Object.keys(thm.mixins.toolbar)[0]] as any).minHeight}px)`
        },
        [Object.keys(thm.mixins.toolbar)[2]]: {
            height: `calc(100vh - ${(thm.mixins.toolbar[Object.keys(thm.mixins.toolbar)[1]] as any).minHeight}px)`
        }
    },
    validPasswordIcon: {
        marginRight: thm.spacing(1),
        color: theme.palette.success.dark
    }, invalidPasswordIcon: {
        marginRight: thm.spacing(1),
        color: theme.palette.error.dark
    }, validatorContainer: {
        margin: `${thm.spacing(2)}px 0`
    }, textGrids: {
        maxWidth: '100%'
    }, submitButtonContainer: {
        paddingTop:thm.spacing(3)
    }
}));

const RegisterPage: React.FC<Props> = (props => {
    const passwordValidators:
        {
            validator: (password: string, confirm: string) => boolean;
            label: string
        }[]
        = [
        {
            validator: (inputPassword) => /\d/.test(inputPassword),
            label: 'should contain digits'
        },
        {
            validator: (inputPassword => /[a-zA-Z]/.test(inputPassword)),
            label: 'should contain word'
        }, {
            validator: (inputPassword => inputPassword.length >= 8 && inputPassword.length <= 40),
            label: 'length between 8 and 40'
        }, {
            validator: (inputPassword, confirmInput) => inputPassword === confirmInput,
            label: 'confirm  match'
        }
    ];
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<null | string>(null);
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const captchaRef = useRef<any>();
    return (
        <Grid container alignContent={'center'} alignItems={'center'} justify={'center'} direction={'column'} className={classes.background}>
            <div
                className={classes.midHeight}
            />
            <Grid item
                  container
                  component={Paper}
                  elevation={10}
                  direction={"column"}
                  className={classes.gridPaper}
                  xs={10}
                  sm={6}
                  md={5}
                  lg={4}
            >
                <Grid item className={classes.textGrids}>
                    <TextField
                        autoFocus
                        variant={'outlined'}
                        label={'Email'}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={classes.textFields}
                    />
                </Grid>
                <Grid item className={classes.textGrids}>
                    <TextField
                        variant={'outlined'}
                        label={'Password'}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <PasswordShowInputAdornment
                                    show={showPassword}
                                    setShow={(b) => setShowPassword(b)}
                                />)
                        }}
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={classes.textFields}
                    />
                </Grid>
                <Grid item className={classes.textGrids}>
                    <TextField
                        variant={'outlined'}
                        label={'Confirm'}
                        type={showConfirm ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <PasswordShowInputAdornment
                                    show={showConfirm}
                                    setShow={(b) => setShowConfirm(b)}
                                />)
                        }}
                        fullWidth
                        onChange={(e) => setConfirm(e.target.value)}
                        value={confirm}
                        className={classes.textFields}
                    />
                </Grid>
                <Grid item container className={classes.validatorContainer}>
                    <Grid container>
                        {passwordValidators.map(({validator, label}) => <Grid item container>
                            <Grid item>
                                <Icon>{validator(password, confirm) ?
                                    <CheckIcon className={classes.validPasswordIcon}/> :
                                    <CancelIcon className={classes.invalidPasswordIcon}/>}</Icon>
                            </Grid>
                            <Grid item><Typography variant={'caption'}>{label}</Typography></Grid>
                        </Grid>)}
                    </Grid>
                </Grid>
                <Grid item>
                    <div className={classes.captchaContainer + ' ' + classes.textGrids}>
                        <Recaptcha
                            size={isSmall ? 'compact' : 'normal'}
                            tabindex={3}
                            ref={captchaRef} sitekey={keys.recaptcha}
                            verifyCallback={(newValue) => {
                                setCaptchaValue(newValue);
                            }}
                            expiredCallback={() => setCaptchaValue(null)}
                            badge={'inline'}
                            render={'onload'}
                        /></div>
                </Grid>
                <Grid item container justify={'flex-end'} className={classes.submitButtonContainer}>
                    <Button color={'primary'} variant={'contained'} size={'large'}>register</Button>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);