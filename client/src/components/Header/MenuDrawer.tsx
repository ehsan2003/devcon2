import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar} from "@material-ui/core";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {Link} from "react-router-dom";


export interface Props {
    menuItems: {
        icon: OverridableComponent<any>;
        link: string;
        text: string;
        secondary?: string;
    }[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: 'red'
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
}));

const MenuDrawer: React.FC<Props> = (props => {
    const classes = useStyles();
    return (
        <Drawer
            open={props.open}
            onClose={() => props.setOpen(false)}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar/>
            <List>
                {props.menuItems.map(({icon: Icon, text, secondary, link}) =>
                    <ListItem button key={link} component={Link} to={link}>
                        <ListItemIcon>
                            <Icon/>
                        </ListItemIcon>
                        <ListItemText primary={text} secondary={secondary}/>
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
});

export default MenuDrawer;