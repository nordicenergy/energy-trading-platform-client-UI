import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';

import { MeterReadingForm, MeterReadingsHistory } from '../../components';
import { SubmitMeterReadings as messages } from '../../services/translations/messages';
import {
    performGetMeterReadingsHistory,
    performGetMeterNumber,
    performSubmitMeterReading
} from '../../action_performers/consumption';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';

import AppPage from '../__shared__/AppPage';

import './SubmitMeter.css';

export class SubmitMeter extends AppPage {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {}
        };
    }

    static mapStateToProps(state) {
        return {
            user: state.Users.profile.data.user,
            meterReadingsHistory: state.Consumption.meterReadingsHistory.data,
            meterNumber: state.Consumption.meterNumber.data.meterNumber,
            submittedMeterReading: state.Consumption.submittedMeterReading,
            loading:
                state.Consumption.meterReadingsHistory.loading ||
                state.Consumption.submittedMeterReading.loading ||
                state.Consumption.meterNumber.loading ||
                state.Users.profile.loading,
            errorLoading: state.Consumption.meterReadingsHistory.error || state.Consumption.meterNumber.error,
            errorSubmit: state.Consumption.submittedMeterReading.error
        };
    }

    componentDidMount() {
        performGetMeterReadingsHistory();
        performGetMeterNumber();
    }

    componentDidUpdate(prevProps) {
        const { formatMessage } = this.context.intl;
        const { loading, user, errorLoading, errorSubmit, submittedMeterReading } = this.props;

        if (!loading && user && user.id && user !== prevProps.user) {
            performGetMeterReadingsHistory();
            performGetMeterNumber();
        }

        if (
            !loading &&
            !errorLoading &&
            !errorSubmit &&
            submittedMeterReading.data !== prevProps.submittedMeterReading.data
        ) {
            performPushNotification({ message: formatMessage(messages.successMessage), type: 'success' });
        }

        if (!loading && errorLoading && errorLoading !== prevProps.errorLoading) {
            performPushNotification({ message: formatMessage(messages.loadingErrorMessage), type: 'error' });
        }

        if (!loading && errorSubmit && errorSubmit !== prevProps.errorSubmit) {
            performPushNotification({
                type: 'error',
                message: `${formatMessage(messages.submitErrorMessage)}: [${errorSubmit.message}]`
            });
        }

        if (prevProps.loading !== loading) {
            performSetupLoaderVisibility(this.pageId, loading);
        }
    }

    prepareValidator() {
        const { formatMessage } = this.context.intl;
        const validationSchema = {
            meterReadings: {
                type: 'number',
                required: true,
                transform(value) {
                    return (value && Number(value)) || value;
                },
                message: formatMessage(messages.meterReadingNumber)
            },
            date: {
                required: true,
                message: formatMessage(messages.dateRequired)
            }
        };

        return new Validator(validationSchema);
    }

    submitMeterReading(meterReading) {
        const validator = this.prepareValidator();

        validator.validate(meterReading, errors => {
            if (errors) {
                return this.setState({
                    errors: errors.reduce(
                        (errorsState, { field, message }) => ({
                            ...errorsState,
                            [field]: message
                        }),
                        {}
                    )
                });
            }
            performSubmitMeterReading(meterReading);
            this.setState({ errors: {} });
        });
    }

    render() {
        const { formatMessage, locale } = this.context.intl;
        const labels = this.prepareLabels(messages);
        const {
            props: {
                loading,
                meterNumber,
                submittedMeterReading,
                meterReadingsHistory: { isSeriesBasedOnLiveData, consumptions, consumptionUnitLabel }
            },
            state: { errors }
        } = this;

        const historyData = isSeriesBasedOnLiveData ? consumptions : [];
        const isMeterReadingSuccessfullySubmit = !submittedMeterReading.loading && !submittedMeterReading.error;

        return (
            <section className="submit-meter-readings-page" aria-busy={loading}>
                <section>
                    <h1>{formatMessage(messages.header)}</h1>
                    <MeterReadingForm
                        isSuccessfullySubmitted={isMeterReadingSuccessfullySubmit}
                        errors={errors}
                        labels={labels}
                        locale={locale}
                        numberOfMeter={meterNumber}
                        onSubmit={meterReading => this.submitMeterReading(meterReading)}
                    />
                </section>
                <aside>
                    <MeterReadingsHistory
                        data={historyData}
                        title={labels.historyCaption}
                        consumptionUnitLabel={consumptionUnitLabel}
                        noDataMessage={labels.noData}
                    />
                </aside>
            </section>
        );
    }
}

SubmitMeter.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

SubmitMeter.propTypes = {
    meterReadingsHistory: PropTypes.shape({
        consumptionUnitLabel: PropTypes.string,
        consumptions: PropTypes.arrayOf(PropTypes.object),
        isSeriesBasedOnLiveData: PropTypes.bool
    }).isRequired,
    loading: PropTypes.bool,
    user: PropTypes.object,
    meterNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    submittedMeterReading: PropTypes.shape({
        data: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }).isRequired,
    errorLoading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    errorSubmit: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default connect(SubmitMeter.mapStateToProps)(SubmitMeter);
