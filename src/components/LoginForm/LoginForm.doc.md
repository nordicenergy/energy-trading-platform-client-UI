LoginForm component:

```jsx
const wrapperStyles = {
    background: '#051a2d',
    padding: '1rem 2rem'
};
const labels = {
    usernameField: {
        id: 'loginForm.doc.usernameField',
        defaultMessage: 'Username'
    },
    passwordField: {
        id: 'loginForm.doc.passwordField',
        defaultMessage: 'Password'
    },
    forgotPasswordLink: {
        id: 'loginForm.doc.forgotPasswordLink',
        defaultMessage: 'Forgot your password?'
    },
    loginButton: {
        id: 'loginForm.doc.loginButton',
        defaultMessage: 'Login'
    }
};

<div style={wrapperStyles}>
    <LoginForm
        labels={labels}
        onForgotPasswordLinkClick={() => {
            console.log('forgot password link was clicked');
        }}
        onSubmit={credentials => console.log(credentials)}
    />
</div>;
```
