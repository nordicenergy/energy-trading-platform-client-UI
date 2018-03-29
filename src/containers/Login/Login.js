import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button } from '../../components/index';
import { performLogin } from '../../action_performers/users';

import logo from './logo.svg';
import './Login.css';

export class Login extends React.Component {
    static mapStateToProps(state) {
        return {
            loading: state.Users.login.loading,
            login: state.Users.login.data
        };
    }

    sendCredentials(user, password) {
        performLogin(user, password);
    }

    render() {
        return (
            <div className="login-page">
                <section className="login-form-container">
                    <form>
                        {/* TODO Replace by login form component */}
                        <Button onClick={() => this.sendCredentials()}>
                            <FormattedMessage
                                id="app.loginBtn"
                                defaultMessage="Login"
                            />
                        </Button>
                    </form>
                </section>
                <section className="login-logo-container">
                    {/* TODO Replace by logo area component */}
                    <img src={logo} className="login-logo" alt="logo" />
                </section>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default connect(Login.mapStateToProps)(Login);
