const labelsMixin = Base =>
    class extends Base {
        prepareLabels(messages) {
            const { formatMessage } = this.context.intl;
            const entries = Object.keys(messages).map(key => [key, messages[key]]);

            return entries.reduce((labels, [labelName, messageDescriptor]) => {
                return {
                    ...labels,
                    [labelName]: formatMessage(messageDescriptor)
                };
            }, {});
        }
    };

export default labelsMixin;
