import React from 'react';
import './AuthScreen.css';

const AuthScreen = props => {
    const { children } = props;
    return (
        <div className="auth-screen">
            <div className="auth-screen-actions">{children}</div>
            <div className="auth-page-hero" />
        </div>
    );
};

export default AuthScreen;
