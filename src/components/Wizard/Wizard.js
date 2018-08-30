import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import Content from './Content';
import './Wizard.css';

class Wizard extends Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.calculateScaleX = this.calculateScaleX.bind(this);
        this.animationFrame = null;
        this.stepRefs = {};
        this.state = {
            scaleX: 0
        };
    }

    componentDidMount() {
        this.calculateScaleX();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeStep !== this.props.activeStep) {
            this.calculateScaleX();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    getActiveStepTitle() {
        const { activeStep: activeStepNumber, steps } = this.props;
        const activeStep = steps.find(step => step.number === activeStepNumber);

        return (activeStep && activeStep.title) || '';
    }

    registerStepRef(key, ref) {
        this.stepRefs[key] = ref;
    }

    calculateScaleX() {
        const { activeStep } = this.props;
        const stepRef = this.stepRefs[activeStep];
        const wizardWidth = this.wizardRef.offsetWidth;
        const progressWidth = stepRef.getOffsetX() - this.wizardRef.getBoundingClientRect().left;

        this.setState({ scaleX: progressWidth / wizardWidth });
    }

    handleWindowResize() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        this.animationFrame = requestAnimationFrame(this.calculateScaleX);
    }

    render() {
        const { steps, succeedSteps, activeStep } = this.props;
        const { scaleX } = this.state;
        const progressStyle = { transform: `scaleX(${scaleX})` };

        return (
            <div
                ref={ref => (this.wizardRef = ref)}
                className="wizard"
                role="progressbar"
                aria-valuetext={this.getActiveStepTitle()}
                aria-valuenow={Math.round(activeStep / steps.length * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div style={progressStyle} className="wizard-progress" aria-hidden="true" />
                <div className="wizard-layout">
                    {steps.map(step => (
                        <Step
                            key={step.number}
                            ref={ref => this.registerStepRef(step.number, ref)}
                            className="wizard-item"
                            isActive={step.number === activeStep}
                            isSucceed={succeedSteps.indexOf(step.number) > -1}
                            {...step}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

Wizard.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape(Step.propTypes)).isRequired,
    succeedSteps: PropTypes.arrayOf(PropTypes.number),
    activeStep: PropTypes.number
};
Wizard.defaultProps = {
    steps: [],
    succeedSteps: [],
    activeStep: 1
};
Wizard.Step = Step;
Wizard.Content = Content;

export default Wizard;
