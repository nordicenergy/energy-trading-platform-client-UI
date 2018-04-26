import React from 'react';
import { connect } from 'react-redux';

import './FAQ.css';
import { DisclosureArrow } from '../../components';
import { FAQ as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class FAQ extends AbstractContainer {
    constructor(props) {
        super(props);
        this.state = {
            expandedIds: []
        };
    }

    static mapStateToProps(state) {
        return {
            questions: state.App.localization.data.faq
        };
    }

    toggleExpandQuestion(id) {
        if (this.state.expandedIds.includes(id)) {
            const index = this.state.expandedIds.findIndex(expandedId => expandedId === id);
            this.setState({
                expandedIds: [...this.state.expandedIds.slice(0, index), ...this.state.expandedIds.slice(index + 1)]
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
                    const isExpanded = this.state.expandedIds.includes(id);
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
    questions: PropTypes.array
};

export default connect(FAQ.mapStateToProps)(FAQ);
