import React, {Component, ReducerState} from 'react';
import {connect} from 'react-redux';
import rootReducer from '@reducers/index';
import {AppBar, Toolbar} from "@material-ui/core";

// propTypes
interface Props {

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
                    Icon
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(Header);