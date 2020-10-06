import React from 'react';
import {connect} from "react-redux";
import {dispatchType} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";
import {Button, Hidden, IconButton, Theme, Toolbar, Typography, Zoom} from "@material-ui/core";
import {RootState} from "@reducers/index";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {Close as CloseIcon, Menu as MenuIcon} from "@material-ui/icons";
import {mainMenuOpenSet} from "@actions/creator-main-menu-open-set";

export interface OwnProps {
    menuItems: {
        icon: OverridableComponent<any>;
        link: string;
        text: string;
        secondary?: string;
    }[];
}

const mapDispatchToProps = {
    setMenuDrawerOpen: mainMenuOpenSet
};
const mapStateToProps = (state: RootState) => ({
    menuDrawerOpen: state.ui.mainMenuOpen.data
});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: 'red'
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
        marginLeft: theme.spacing(1),
        fontWeight: 'bold'
    }, authorizationButtons: {
        color: 'inherit',
        marginLeft: theme.spacing(1),
        fontWeight: 'bold'
    }
}));

const HeaderAppBarToolbar: React.FC<Props> = (props => {
    const classes = useStyles();
    return (
        <Toolbar>
            <Hidden mdUp>
                <IconButton
                    onClick={() => props.setMenuDrawerOpen(!props.menuDrawerOpen)}
                    color={'inherit'}
                    className={classes.menuIcon}
                >
                    <Zoom in={props.menuDrawerOpen} unmountOnExit><CloseIcon className={classes.menuIconIcon}/></Zoom>
                    <Zoom in={!props.menuDrawerOpen} unmountOnExit><MenuIcon className={classes.menuIconIcon}/></Zoom>
                </IconButton>
            </Hidden>
            <Typography variant={'h6'} className={classes.brandName}>
                Devcon
            </Typography>
            <Hidden smDown>
                {props.menuItems.map(({text}) =>
                    <Button size={'small'} key={text} className={classes.menuButton}>
                        {text}
                    </Button>
                )}
            </Hidden>
            <Button variant={'outlined'} className={classes.authorizationButtons}>register</Button>
            <Button variant={'outlined'} className={classes.authorizationButtons}>login</Button>
        </Toolbar>
    );
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderAppBarToolbar);