### ResetPasswordForm component:

```jsx
const wrapperStyles = {
    background: '#051a2d',
    padding: '1rem 2rem'
};
const labels = {
    formTitle: {
        id: 'resetPasswordForm.doc.formTitle',
        defaultMessage: 'Restore password'
    },
    emailField: {
        id: 'resetPasswordForm.doc.emailField',
        defaultMessage: 'Enter Your Email'
    },
    sendButton: {
        id: 'resetPasswordForm.doc.sendButton',
        defaultMessage: 'Send'
    },
    loginLink: {
        id: 'resetPasswordForm.doc.loginLink',
        defaultMessage: 'Login'
    }
};

<div style={wrapperStyles}>
    <ResetPasswordForm
        labels={labels}
        onSubmit={email => console.log('send:', email)}
        onLoginLinkClick={() => console.log('login link was clicked')}
    />
</div>;
```
