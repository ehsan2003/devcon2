import React from 'react';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {makeStyles} from "@material-ui/styles";
import {AppBar, Button, Hidden, IconButton, SvgIconTypeMap, Theme, Toolbar, Typography, Zoom} from "@material-ui/core";
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
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {StateMainMenuOpen} from "@reducers/ui/reducer-main-menu-open";
import {mainMenuOpenSet} from "@actions/creator-main-menu-open-set";
import MenuDrawer from "@components/MenuDrawer";

export interface OwnProps {}


const mapDispatchToProps: MapDispatchToProps<{
    mainMenuOpenSet: typeof mainMenuOpenSet
}, OwnProps> = {
    mainMenuOpenSet
};
const mapStateToProps: MapStateToProps<{ authorization: RootState['authorization'], menuOpen: StateMainMenuOpen }, OwnProps, RootState> = state => ({
    authorization: state.authorization,
    menuOpen: state.ui.mainMenuOpen
});

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
    ] as {
        icon: OverridableComponent<SvgIconTypeMap<any, any>>;
        link: string,
        text: string,
        secondary: string
    }[];
    const classes = useStyles(containerTheme);
    props.authorization.data = 'hello';
    const mainMenuOpen = props.menuOpen.data;
    const setMainMenuOpen = (open: boolean) => props.mainMenuOpenSet(open);

    return (
        <React.Fragment>
            <AppBar className={classes.appBar} position={'fixed'}>
                <Toolbar>
                    <Hidden smUp>
                        <IconButton
                            onClick={() => setMainMenuOpen(!mainMenuOpen)}
                            color={'inherit'}
                            className={classes.menuIcon}
                        >
                            <Zoom in={mainMenuOpen} unmountOnExit><CloseIcon className={classes.menuIconIcon}/></Zoom>
                            <Zoom in={!mainMenuOpen} unmountOnExit><MenuIcon className={classes.menuIconIcon}/></Zoom>
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} className={classes.brandName}>
                        Devcon
                    </Typography>
                    <Hidden xsDown>
                        {menuItems.map(({text}) =>
                            <Button className={classes.menuButton}>
                                {text}
                            </Button>
                        )}
                    </Hidden>
                </Toolbar>
            </AppBar>
            <MenuDrawer menuItems={menuItems} open={mainMenuOpen} setOpen={props.mainMenuOpenSet}/>
        </React.Fragment>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);