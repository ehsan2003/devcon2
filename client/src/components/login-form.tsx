import React, {Component, ReducerState} from 'react';
import {connect} from 'react-redux';
import rootReducer from '@reducers/index';
import {userLogin} from "@actions/creator-user-login";


function mapStateToProps(state: ReducerState<typeof rootReducer>) {
    return {};
}

const mapDispatchToProps = {
    userLogin
};

class LoginForm extends Component<ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps)> {
    state = {
        email: '',
        password: ''
    };
    onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.email} onChange={this.onChange} name='email'/>
                    <input type="password" value={this.state.password} onChange={this.onChange} name="password"/>
                    <input type="submit"/>
                </form>

            </div>
        );
    }

    private onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        this.props.userLogin(this.state.email, this.state.password);
        console.log('submitting');
    };
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(LoginForm);