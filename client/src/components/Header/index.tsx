import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from "@material-ui/styles";
import {AppBar, SvgIconTypeMap, Theme} from "@material-ui/core";
import {
    AccountBox as ProfileIcon,
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    ImportContacts as ImportContactsIcon,
    Info as InfoIcon,
    PermPhoneMsg as ContactUsIcon
} from "@material-ui/icons";
import {dispatchType} from "@shared/utils";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {mainMenuOpenSet} from "@actions/creator-main-menu-open-set";
import MenuDrawer from "@components/Header/MenuDrawer";
import HeaderAppBarToolbar from "@components/Header/HeaderAppBarToolbar";
import {RootState} from "@reducers/index";

export interface OwnProps {}

export interface MenuItemObject {
    icon: OverridableComponent<SvgIconTypeMap<any, any>>;
    link: string;
    text: string;
    secondary?: string;
}

const mapDispatchToProps = {
    mainMenuOpenSet
};
const mapStateToProps = (state: RootState) => ({
    authorization: state.authorization,
    menuOpen: state.ui.mainMenuOpen,
    isMd: state.ui.deviceWidth.data.is.md
});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 101
    },
    root: {
        color: 'red',
    },
}));

const Index: React.FC<Props> = (props => {
    let menuItems: MenuItemObject[] = [
        {
            link: '/home',
            text: 'home',
            icon: HomeIcon
        }, {
            link: '/blog',
            text: 'blog',
            icon: ImportContactsIcon
        }, {
            link: '/about',
            text: 'about us',
            icon: InfoIcon
        }, {
            link: '/contact',
            text: 'contact us',
            icon: ContactUsIcon
        }];
    if (props.authorization.data)
        menuItems = [
            ...menuItems,
            {
                link: '/dashboard',
                text: 'dashboard',
                icon: DashboardIcon,
            }, {
                link: '/profile',
                text: 'profile',
                icon: ProfileIcon
            }
        ];
    const classes = useStyles();
    const mainMenuOpen = !props.isMd && props.menuOpen.data;

    return (
        <React.Fragment>
            <AppBar className={classes.appBar} position={'fixed'}>
                <HeaderAppBarToolbar
                    menuItems={menuItems}
                />
            </AppBar>
            <MenuDrawer menuItems={menuItems} open={mainMenuOpen} setOpen={props.mainMenuOpenSet}/>
        </React.Fragment>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);