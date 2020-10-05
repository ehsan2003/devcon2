import React, {useState} from 'react';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {makeStyles} from "@material-ui/styles";
import {
    AppBar,
    Button,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    Zoom
} from "@material-ui/core";
import {
    AccountBox as ProfileIcon,
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    ImportContacts as ImportContactsIcon,
    Menu as MenuIcon
} from "@material-ui/icons";
import containerTheme from "../theme";
import {RootState} from "../reducers";
import {dispatchType} from "@shared/utils";

export interface OwnProps {}

const mapDispatchToProps: MapDispatchToProps<{}, OwnProps> = {};
const mapStateToProps: MapStateToProps<{ authorization: RootState['authorization'] }, OwnProps, RootState> = state => ({authorization: state.authorization});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 101
    },
    root: {
        color: 'red',
    },
    menuIcon: {
        marginRight: theme.spacing(2),
        position: 'relative'
    },
    menuIconIcon: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    brandName: {
        flexGrow: 1,
        userSelect: 'none'
    }, menuButton: {
        color: 'inherit',
        marginRight: theme.spacing(1),
        fontWeight: 'bold'
    }
}));

const Header: React.FC<Props> = (props => {
    const menuItems = [
        {
            link: '/home',
            text: 'home',
            icon: HomeIcon
        }, {
            link: '/blog',
            text: 'blog',
            icon: ImportContactsIcon
        },
        ...props.authorization.data ? [
            {
                link: '/dashboard',
                text: 'dashboard',
                icon: DashboardIcon,
            }, {
                link: '/profile',
                text: 'profile',
                icon: ProfileIcon
            }
        ] : []
    ];
    const classes = useStyles(containerTheme);
    props.authorization.data = 'hello';
    const [mainMenuOpen, setMainMenuOpen] = useState(false);
    return (
        <React.Fragment>
            <AppBar className={classes.appBar} position={'fixed'}>
                <Toolbar>
                    <Hidden smUp>
                        <IconButton onClick={() => setMainMenuOpen(!mainMenuOpen)} color={'inherit'}
                                    className={classes.menuIcon}>
                            <Zoom in={mainMenuOpen} unmountOnExit><CloseIcon className={classes.menuIconIcon}/></Zoom>
                            <Zoom in={!mainMenuOpen} unmountOnExit><MenuIcon className={classes.menuIconIcon}/></Zoom>
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} className={classes.brandName}>
                        Devcon
                    </Typography>
                    <Hidden xsDown
                    >{menuItems.map(({text}) =>
                        <Button className={classes.menuButton}>
                            {text}
                        </Button>
                    )}</Hidden>
                </Toolbar>
            </AppBar>
            <Drawer
                open={mainMenuOpen}
                onClose={() => setMainMenuOpen(false)}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Toolbar/>
                <List>
                    {menuItems.map(({icon: Icon, text, secondary}) =>
                        <ListItem button>
                            <Link>
                                <ListItemIcon>
                                    <Icon/>
                                </ListItemIcon>
                                <ListItemText primary={text} secondary={secondary}/></Link>
                        </ListItem>
                    )}

                </List>
            </Drawer>
        </React.Fragment>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);