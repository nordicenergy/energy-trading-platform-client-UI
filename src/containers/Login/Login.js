import React from 'react';
import { Link } from 'react-router-dom';
import { AuthScreen, TextField, Button } from '../../components';
import './Login.css';

const Login = () => (
    <AuthScreen>
        <form className="login-form">
            <div className="username-field">
                <TextField label="Username" type="text" name="username" />
            </div>
            <div className="password-field">
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    helperText={
                        <Link
                            className="reset-password-link"
                            to="/reset-password"
                        >
                            Forgot your password?
                        </Link>
                    }
                />
            </div>
            <Button>Login</Button>
        </form>
    </AuthScreen>
);

export default Login;
