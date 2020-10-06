import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Button, Hidden, IconButton, Theme, Toolbar, Typography, Zoom} from "@material-ui/core";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {Close as CloseIcon, Menu as MenuIcon} from "@material-ui/icons";


export interface Props {
    menuItems: {
        icon: OverridableComponent<any>;
        link: string;
        text: string;
        secondary?: string;
    }[];
    menuDrawerOpen: boolean;
    setMenuDrawerOpen: (open: boolean) => void;
}

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
        marginRight: theme.spacing(1),
        fontWeight: 'bold'
    }
}));

const HeaderAppBarToolbar: React.FC<Props> = (props => {
    const classes = useStyles();
    return (
        <Toolbar>
            <Hidden smUp>
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
            <Hidden xsDown>
                {props.menuItems.map(({text}) =>
                    <Button className={classes.menuButton}>
                        {text}
                    </Button>
                )}
            </Hidden>
        </Toolbar>
    );
});

export default HeaderAppBarToolbar;