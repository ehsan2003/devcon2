import React, {useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "@reducers/index";
import {dispatchType} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";
import {
    Button,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
    IconButton,
    ListItemIcon,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Theme
} from "@material-ui/core";
import {AccountCircle, ExitToApp as LogoutIcon, Person} from "@material-ui/icons";
import {userLogout} from "@actions/ajax/creator-user-logout";
import {loginDialogOpenSet} from "@actions/ui/creator-login-dialog-open-set";
import {Link, useLocation} from "react-router-dom";

export interface OwnProps {
}

const mapDispatchToProps = {
    logout: userLogout,
    setLoginDialogOpen: loginDialogOpenSet
};
const mapStateToProps = (state: RootState) => ({
    authorized: !!state.authorization.data,
    userData: state.user.data,
    loginDialogOpen: state.ui.loginDialog.data.open
});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const useStyles = makeStyles((theme: Theme) => ({
        menuPaper: {
            zIndex: '2000!important' as any
        },
        menuList: {
            width: 150
        },
        authorizationButtons: {
            color: 'inherit',
            marginLeft: theme.spacing(1),
            fontWeight: 'bold'
        }
    }
));

const AppBarAuthorizationButtons: React.FC<Props> = (props => {
    const classes = useStyles();
    const location = useLocation();
    const isAuthorizationPages = location.pathname === '/register';
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [logoutDialogIsOpen, setLogoutDialogIsOpen] = useState(false);

    function logoutDialogOpen() {
        setLogoutDialogIsOpen(true);
        console.log('logging out');
        setAnchorEl(null);
    }

    function logoutDialogClose() {
        setLogoutDialogIsOpen(false);
    }

    function handleButtonClick(e: React.MouseEvent) {
        setAnchorEl(e.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        props.authorized ? <>
            <Dialog
                onClose={logoutDialogClose}
                open={logoutDialogIsOpen}>
                <DialogTitle>
                    are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        now you are trying to log out are you sure
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color={'secondary'} onClick={() => {
                        logoutDialogClose();
                        props.logout();
                    }}>yes</Button>
                    <Button color={'primary'} variant={'outlined'} onClick={logoutDialogClose}>no</Button>
                </DialogActions>
            </Dialog>
            <IconButton color={'inherit'} onClick={handleButtonClick}>
                <AccountCircle/>
            </IconButton>
            <Popper
                anchorEl={anchorEl}
                className={classes.menuPaper}
                open={!!anchorEl}
                transition
            >
                {({TransitionProps, placement}) => (
                    <Grow {...TransitionProps}
                          style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                        <Paper elevation={5}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList className={classes.menuList}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Person/>
                                        </ListItemIcon>
                                        profile
                                    </MenuItem>
                                    <MenuItem onClick={logoutDialogOpen}>
                                        <ListItemIcon>
                                            <LogoutIcon/>
                                        </ListItemIcon>
                                        logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </> : !isAuthorizationPages ? <>
            <Button variant={'outlined'} className={classes.authorizationButtons} component={Link}
                    to={'/register'}>register</Button>
            <Button variant={'outlined'} className={classes.authorizationButtons}
                    onClick={() => props.setLoginDialogOpen(!props.loginDialogOpen)}>login</Button>
        </> : null
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBarAuthorizationButtons);