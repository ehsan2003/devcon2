import React, {useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "@reducers/index";
import {dispatchType} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    Hidden,
    IconButton,
    InputAdornment,
    TextField,
    Theme,
    Toolbar,
    useMediaQuery
} from "@material-ui/core";
import {loginDialogOpenSet} from "@actions/creator-login-dialog-open-set";
import theme from "../../theme";
import validator from 'validator';
import {Visibility, VisibilityOff} from "@material-ui/icons";

export interface OwnProps {

}

const mapDispatchToProps = {};
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
    }, dialogPaper: {
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
    }
}));

const LoginForm: React.FC<Props> = (props => {
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    return (
        <Dialog
            open={props.open}
            onClose={() => loginDialogOpenSet(false)}
            TransitionComponent={Fade}
            classes={{
                paper: classes.dialogPaper
            }}
            fullScreen={fullScreen}
            fullWidth
        >
            <Hidden smUp>

                <Toolbar/></Hidden>
            <DialogTitle>
                login
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <form onSubmit={e => {
                    console.log('submitting');
                    e.preventDefault();

                }}>
                    <TextField
                        error={!!email && !validator.isEmail(email)}
                        label='Email Address'
                        type='email'
                        helperText={validator.isEmail(email)}
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
                                <InputAdornment position={'end'}
                                                onClick={() => setShowPassword(v => !v)}
                                >
                                    <IconButton>
                                        {showPassword ? <Visibility fontSize={'small'}/> :
                                            <VisibilityOff fontSize={'small'}/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />

                    <DialogActions>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            className={classes.loginButton}
                            color={'primary'}
                            size={'large'}
                        >login</Button>
                    </DialogActions></form>
            </DialogContent>
        </Dialog>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);