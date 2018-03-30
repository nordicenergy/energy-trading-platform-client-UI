### RestorePasswordForm component:

```jsx
const wrapperStyles = {
    background: '#051a2d',
    padding: '1rem 2rem'
};
const labels = {
    formTitle: 'Restore password',
    emailField: 'Enter Your Email',
    sendButton: 'Send',
    loginLink: 'Login'
};

<div style={wrapperStyles}>
    <RestorePasswordForm
        labels={labels}
        onSubmit={email => console.log('send:', email)}
        onLoginLinkClick={() => console.log('login link was clicked')}
    />
</div>;
```
