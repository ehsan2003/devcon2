import React, {Component, ReducerState} from 'react';
import {connect} from 'react-redux';
import rootReducer from '@reducers/index';
import {createStyles, withStyles} from "@material-ui/styles";
import {AppBar, Box, Button, Hidden, IconButton, Theme, Toolbar, Typography, WithStyles} from "@material-ui/core";
import {Menu as MenuIcon, Person, PersonAdd} from '@material-ui/icons';

const styles = (theme: Theme) => createStyles({
    root: {
        color: 'red',
    }
});

// propTypes
interface Props extends WithStyles<typeof styles> {

}

function mapStateToProps(state: ReducerState<typeof rootReducer>) {
    return {};
}

const mapDispatchToProps = {};

class Header extends Component<Props & ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps)> {
    render() {
        return (
            <AppBar color={'primary'} position={'fixed'}>
                <Toolbar>
                    <IconButton color={'inherit'}>
                        <MenuIcon/>
                    </IconButton>
                    <Box mr={'auto'}>
                        <Typography variant={'h6'}>
                            Devcon project
                        </Typography>
                    </Box>
                    <Hidden smDown>
                        <Button color={'inherit'}>
                            login
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton color={'inherit'}><Person/></IconButton>
                    </Hidden>
                    <Hidden smDown>
                        <Button color={'inherit'}>
                            register
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton color={'inherit'}><PersonAdd/></IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Header));