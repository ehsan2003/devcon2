import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from "@material-ui/styles";
import {AppBar, Slide, SvgIconTypeMap, Theme, useScrollTrigger} from "@material-ui/core";
import {
    AccountBox as ProfileIcon,
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    ImportContacts as ImportContactsIcon
} from "@material-ui/icons";
import {dispatchType} from "@shared/utils";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {mainMenuOpenSet} from "@actions/ui/creator-main-menu-open-set";
import MenuDrawer from "@components/Header/MenuDrawer";
import HeaderAppBarToolbar from "@components/Header/HeaderAppBarToolbar";
import {RootState} from "@reducers/index";
import LoginForm from "@components/Header/login-form";

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
            link: '/',
            text: 'home',
            icon: HomeIcon
        }, {
            link: '/blog',
            text: 'blog',
            icon: ImportContactsIcon
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
    const scrollTriggered = useScrollTrigger();
    return (
        <React.Fragment>
            <Slide direction={'down'} timeout={400}  in={!scrollTriggered}><AppBar className={classes.appBar} position={'fixed'}>
                <HeaderAppBarToolbar
                    menuItems={menuItems}
                />
            </AppBar></Slide>
            <MenuDrawer menuItems={menuItems} open={mainMenuOpen} setOpen={props.mainMenuOpenSet}/>
            <LoginForm/>
        </React.Fragment>
    );
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);