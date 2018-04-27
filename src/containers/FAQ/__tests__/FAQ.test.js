import React from 'react';
import FAQContainer, { FAQ } from '../FAQ';
import { mountWithIntl } from '../../../services/intlTestHelper';
import { Provider } from 'react-redux';
import * as notificationActions from '../../../action_performers/notifications';
import * as appActionPerformers from '../../../action_performers/app';
import configureMockStore from 'redux-mock-store';

const context = {
    intl: {
        formatMessage: jest.fn()
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    App: {
        localization: {
            data: {
                faq: [
                    {
                        id: 'testId1',
                        question: 'question1',
                        answer: 'answer1'
                    },
                    {
                        id: 'testId2',
                        question: 'question2',
                        answer: 'answer2'
                    }
                ]
            }
        }
    }
});

const defaultProps = {
    questions: [
        {
            id: 'testId1',
            question: 'question1',
            answer: 'answer1'
        },
        {
            id: 'testId2',
            question: 'question2',
            answer: 'answer2'
        }
    ]
};

function renderContainer(mountFn = mountWithIntl) {
    return mountFn(
        <Provider store={store}>
            <FAQContainer context={context} />
        </Provider>
    );
}

function renderComponent(mountFn = mountWithIntl, props = defaultProps) {
    return mountFn(<FAQ {...props} context={context} />);
}

describe('<FAQ /> Component', () => {
    beforeEach(() => {
        notificationActions.performPushNotification = jest.fn();
        appActionPerformers.performGetFaqInfo = jest.fn();
    });

    it(`should contains following controls:
        - <div> with class "about-page";
        - 1 <h1>;
        - 2 <div> with class name "question-container";
        - 2 <div> with class name "title-container";
        - 2 <DisclosureArrow /> with class name "toggle-button";
        - 2 <div> with class name "answer-container"`, () => {
        const component = renderContainer();

        expect(component.find('.faq-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find('.question-container')).toHaveLength(2);
        expect(component.find('.title-container')).toHaveLength(2);
        expect(component.find('DisclosureArrow')).toHaveLength(2);
        expect(component.find('.answer-container')).toHaveLength(2);
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            App: {
                localization: {
                    data: {
                        faq: ['test_data']
                    }
                }
            }
        };
        const props = FAQ.mapStateToProps(stateDummy);
        expect(props).toEqual({
            questions: ['test_data']
        });
    });

    it('should expand question answer by clicking on title', () => {
        const component = renderComponent();
        component
            .find('.title')
            .at(0)
            .simulate('click');
        expect(component.state('expandedIds')).toEqual(['testId1']);
    });

    it('should collapse question answer by clicking on title', () => {
        const component = renderComponent();
        component.setState({
            expandedIds: ['testId1']
        });
        component
            .find('.title')
            .at(0)
            .simulate('click');
        expect(component.state('expandedIds')).toEqual([]);
    });

    it('should expand question answer by clicking on disclosure arrow', () => {
        const component = renderComponent();
        component
            .find('DisclosureArrow')
            .at(0)
            .simulate('click');
        expect(component.state('expandedIds')).toEqual(['testId1']);
    });

    it('should collapse question answer by clicking on disclosure arrow', () => {
        const component = renderComponent();
        component.setState({
            expandedIds: ['testId1']
        });
        component
            .find('DisclosureArrow')
            .at(0)
            .simulate('click');
        expect(component.state('expandedIds')).toEqual([]);
    });

    it('should call performPushNotification on componentDidUpdate', () => {
        notificationActions.performPushNotification = jest.fn();
        const component = renderComponent();
        component.setProps({
            loading: false,
            error: {
                message: 'test',
                type: 'error'
            }
        });
        expect(notificationActions.performPushNotification).toHaveBeenCalledWith({
            message: 'Could not load content',
            type: 'error'
        });
    });

    it('should call performPushNotification on componentDidMount', () => {
        notificationActions.performPushNotification = jest.fn();
        renderComponent(mountWithIntl, {
            ...defaultProps,
            error: {
                message: 'test',
                type: 'error'
            }
        });
        expect(notificationActions.performPushNotification).toHaveBeenCalledWith({
            message: 'Could not load content',
            type: 'error'
        });
    });
});
