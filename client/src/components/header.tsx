import React, {Component, ReducerState} from 'react';
import {connect} from 'react-redux';
import rootReducer from '../reducers';

function mapStateToProps(state: ReducerState<typeof rootReducer>) {
    return {
        categories: state.categories
    };
}

const mapDispatchToProps = {};

class Header extends Component<ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps)> {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(Header);