import React, { useRef } from 'react';
import {connect} from "react-redux";
import {RootState} from "@reducers/index";
import {CenterCaptcha, dispatchType, PasswordField} from "@shared/utils";
import {CreateCSSProperties, makeStyles} from "@material-ui/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Hidden,
    IconButton,
    TextField,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {loginDialogSetProp} from "@actions/ui";
import {Close as CloseIcon} from '@material-ui/icons';
import Recaptcha from 'react-recaptcha';

export interface OwnProps {

}

const mapDispatchToProps = {setProperty: loginDialogSetProp};
const mapStateToProps = (state: RootState) => ({
    dialogProps: state.ui.loginDialog.data
});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const useStyles = makeStyles((theme: Theme) => ({
    dialog: {},
    dialogTitle: {
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(2),
    },
    fieldsGrid: {
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
    , submitLogin: {
        margin: `auto ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
    }
}) as { [key: string]: CreateCSSProperties });
const LoginForm: React.FC<Props> = (props => {
    const captchaRef=useRef<Recaptcha |null>(null);

    const theme = useTheme();
    const classes = useStyles();
    const shouldFullScreen = useMediaQuery(theme.breakpoints.down('xs'));


    function setFormProps(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        props.setProperty({[e.target.name]: e.target.value});
    }

    function handleClose() {
        props.setProperty({open: false});
    }
    function handleSubmit(){
        props.setProperty({captchaValue:null});
        captchaRef.current?.reset();
    }


    return (
        <Dialog
            className={classes.dialog}
            onClose={handleClose}
            open={props.dialogProps.open}
            fullScreen={shouldFullScreen}
            maxWidth={'xs'}
            fullWidth
        >
            <Hidden smUp>
                <Toolbar/>
            </Hidden>
            <DialogTitle disableTypography className={classes.dialogTitle}>
                <Typography variant={'h6'}>
                    login
                </Typography>
                <IconButton
                    onClick={handleClose}
                    className={classes.closeButton}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid
                    justify={'center'}
                    container
                >
                    <Grid
                        className={classes.fieldsGrid}
                        xs={10}
                        sm={11}
                        item
                    >
                        <TextField
                            value={props.dialogProps.email}
                            onChange={setFormProps}
                            name={'email'}
                            label={'Email'}
                            variant={'outlined'}
                            fullWidth
                        />
                        <PasswordField
                            value={props.dialogProps.password}
                            onChange={setFormProps}
                            name={'password'}
                            label={'Password'}
                            variant={'outlined'}
                            fullWidth
                        />
                        <CenterCaptcha
                            ref={captchaRef}
                            onChange={(value) => props.setProperty({captchaValue: value})}
                            CaptchaProps={{
                                size: shouldFullScreen ? 'compact' : 'normal'
                            }}
                        />
                        <DialogActions>
                            <Button
                                onClick={handleSubmit}
                                variant={'contained'}
                                color={'primary'}
                                size={'large'}
                                className={classes.submitLogin}>
                                login
                            </Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);