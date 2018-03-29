### RestorePasswordForm component:

```jsx
const wrapperStyles = {
    background: '#051a2d',
    padding: '1rem 2rem'
};
const labels = {
    formTitle: {
        id: 'restorePasswordForm.doc.formTitle',
        defaultMessage: 'Restore password'
    },
    emailField: {
        id: 'restorePasswordForm.doc.emailField',
        defaultMessage: 'Enter Your Email'
    },
    sendButton: {
        id: 'restorePasswordForm.doc.sendButton',
        defaultMessage: 'Send'
    },
    loginLink: {
        id: 'restorePasswordForm.doc.loginLink',
        defaultMessage: 'Login'
    }
};

<div style={wrapperStyles}>
    <RestorePasswordForm
        labels={labels}
        onSubmit={email => console.log('send:', email)}
        onLoginLinkClick={() => console.log('login link was clicked')}
    />
</div>;
```
