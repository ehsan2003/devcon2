import React, {FunctionComponent, ReducerState, useState} from 'react';
import {connect} from 'react-redux';
import rootReducer from '@reducers/index';
import {makeStyles} from "@material-ui/styles";
import {AppBar, Drawer, Hidden, IconButton, Theme, Toolbar} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";
import containerTheme from "../theme";


function mapStateToProps(state: ReducerState<typeof rootReducer>) {
    return {};
}

const mapDispatchToProps = {};

// propTypes
interface Props extends ReturnType<typeof mapStateToProps> {

}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: 'red',
    },
    menuIcon: {
        marginRight: theme.spacing(2)
    }
}));
const Header: FunctionComponent<Props> = (props) => {
    const classes = useStyles(containerTheme);
    const [mainMenuOpen, setMainMenuOpen] = useState(false);
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <Hidden smUp>
                        <IconButton color={'inherit'} className={classes.menuIcon}>
                            <MenuIcon onClick={() => setMainMenuOpen(true)}/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer open={mainMenuOpen}>

            </Drawer>
        </React.Fragment>
    );
};

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(Header);