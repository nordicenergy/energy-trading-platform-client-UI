import React from 'react';
import { connect } from 'react-redux';

import './FAQ.css';
import { DisclosureArrow } from '../../components';
import { FAQ as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { performPushNotification } from '../../action_performers/notifications';

export class FAQ extends AbstractContainer {
    constructor(props) {
        super(props);
        this.state = {
            expandedIds: []
        };
    }

    static mapStateToProps(state) {
        return {
            questions: state.App.localization.data.faq,
            error: state.App.localization.error,
            loading: state.App.localization.loading
        };
    }

    showError() {
        const { formatMessage } = this.context.intl;
        performPushNotification({ message: formatMessage(messages.error), type: 'error' });
    }

    componentDidMount() {
        const { error, loading } = this.props;
        if (!loading && error) {
            this.showError();
        }
    }

    componentDidUpdate(prevProps) {
        const { error, loading } = this.props;

        if (!loading && error && error !== prevProps.error) {
            this.showError();
        }
    }

    toggleExpandQuestion(id) {
        const searchedIndex = this.state.expandedIds.indexOf(id);
        const isIncludesSearchedId = searchedIndex !== -1;
        if (isIncludesSearchedId) {
            this.setState({
                expandedIds: [
                    ...this.state.expandedIds.slice(0, searchedIndex),
                    ...this.state.expandedIds.slice(searchedIndex + 1)
                ]
            });
        } else {
            this.setState({
                expandedIds: [...this.state.expandedIds, id]
            });
        }
    }

    render() {
        const { formatMessage } = this.context.intl;
        return (
            <div className="faq-page">
                <h1>{formatMessage(messages.header)}</h1>
                {this.props.questions.map(({ question, answer, id }) => {
                    const isExpanded = this.state.expandedIds.indexOf(id) > -1;
                    return (
                        <div
                            className={classNames('question-container', { expanded: isExpanded })}
                            key={id}
                            aria-live="polite"
                        >
                            <div className="title-container">
                                <div className="title" onClick={() => this.toggleExpandQuestion(id)}>
                                    {question}
                                </div>
                                <DisclosureArrow onClick={() => this.toggleExpandQuestion(id)} expanded={isExpanded} />
                            </div>
                            <div className="answer-container">{answer}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

FAQ.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

FAQ.propTypes = {
    questions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object
};

export default connect(FAQ.mapStateToProps)(FAQ);
