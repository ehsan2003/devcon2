import React from 'react';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {makeStyles} from "@material-ui/styles";
import {AppBar, SvgIconTypeMap, Theme} from "@material-ui/core";
import {
    AccountBox as ProfileIcon,
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    ImportContacts as ImportContactsIcon
} from "@material-ui/icons";
import {RootState} from "../reducers";
import {dispatchType} from "@shared/utils";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {StateMainMenuOpen} from "@reducers/ui/reducer-main-menu-open";
import {mainMenuOpenSet} from "@actions/creator-main-menu-open-set";
import MenuDrawer from "@components/MenuDrawer";
import HeaderAppBarToolbar from "@components/HeaderAppBarToolbar";

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
    const classes = useStyles();
    props.authorization.data = 'hello';
    const mainMenuOpen = props.menuOpen.data;
    const setMainMenuOpen = (open: boolean) => props.mainMenuOpenSet(open);

    return (
        <React.Fragment>
            <AppBar className={classes.appBar} position={'fixed'}>
                <HeaderAppBarToolbar
                    menuItems={menuItems}
                    menuDrawerOpen={mainMenuOpen}
                    setMenuDrawerOpen={setMainMenuOpen}
                />
            </AppBar>
            <MenuDrawer menuItems={menuItems} open={mainMenuOpen} setOpen={props.mainMenuOpenSet}/>
        </React.Fragment>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);