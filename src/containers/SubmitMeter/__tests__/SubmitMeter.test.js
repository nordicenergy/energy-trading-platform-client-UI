import React from 'react';
import { SubmitMeter } from '../SubmitMeter';

import { shallowWithIntl } from '../../../services/intlTestHelper';
import { MeterReadingsHistory, MeterReadingForm } from '../../../components';
import * as consumptionActions from '../../../action_performers/consumption';
import * as notificationsActionPerformers from '../../../action_performers/notifications';
import * as appActions from '../../../action_performers/app';

const MOCK_METER_READINGS_HISTORY = {
    consumptionUnitLabel: 'kWh',
    consumptions: [
        {
            consumption: 123,
            date: 1531144080000
        },
        {
            consumption: 123.234234,
            date: 1531144080000
        },
        {
            consumption: 0,
            date: 1531244080000
        }
    ],
    isSeriesBasedOnLiveData: true
};

const DEFAULT_PROPS = {
    meterReadingsHistory: {},
    loading: false,
    meterNumber: null,
    submittedMeterReading: {}
};

function renderComponent(props = {}, mountFn = shallowWithIntl) {
    return mountFn(<SubmitMeter {...DEFAULT_PROPS} {...props} />);
}

describe('<SubmitMeter /> Component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    beforeEach(() => {
        consumptionActions.performGetMeterReadingsHistory = jest.fn();
        consumptionActions.performGetMeterNumber = jest.fn();
        consumptionActions.performSubmitMeterReading = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
    });

    it('should render SubmitMeter with specific components', () => {
        const component = renderComponent();

        expect(consumptionActions.performGetMeterReadingsHistory).toHaveBeenCalledTimes(1);
        expect(consumptionActions.performGetMeterNumber).toHaveBeenCalledTimes(1);

        expect(component.find(MeterReadingsHistory)).toHaveLength(1);
        expect(component.find(MeterReadingForm)).toHaveLength(1);
        expect(component.find('section')).toHaveLength(2);
        expect(component.find('aside')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
    });

    it('should render MeterReadingForm with specific properties', () => {
        const component = renderComponent({
            meterNumber: 123,
            submittedMeterReading: { loading: true, error: null, data: {} }
        });

        const meterReadingForm = component.find(MeterReadingForm).at(0);
        expect(meterReadingForm).toHaveLength(1);
        expect(meterReadingForm.props().isSuccessfullySubmitted).toEqual(false);
        expect(meterReadingForm.props().errors).toEqual({});
        expect(meterReadingForm.props().labels).toEqual({
            dateField: 'Date of reading',
            dateRequired: 'Date is required',
            header: 'Submit Meter readings',
            historyCaption: 'History',
            loadingErrorMessage:
                "Can't load meter readings data from Lition web server. Please contact administrator to resolve the error.",
            meterNumberTitle: 'Number of meter',
            incorrectMeterNumber: 'Number of meter is still not defined.',
            meterReadingNumber: 'Meter readings is not a number',
            meterReadingsField: 'Meter readings',
            noData: 'Sorry, not live metering data available for you…',
            submitButton: 'Submit',
            submitErrorMessage: 'An error occurred while sending meter readings.',
            successMessage: 'Meter reading value was successfully saved'
        });
        expect(meterReadingForm.props().locale).toEqual('en');
        expect(meterReadingForm.props().numberOfMeter).toEqual(123);
        expect(typeof meterReadingForm.props().onSubmit).toEqual('function');
    });

    it('should render MeterReadingForm with "isSuccessfullySubmitted" is true when meter submitted', () => {
        const component = renderComponent({
            meterNumber: 123,
            submittedMeterReading: { loading: false, error: null, data: {} }
        });

        const meterReadingForm = component.find(MeterReadingForm).at(0);
        expect(meterReadingForm).toHaveLength(1);
        expect(meterReadingForm.props().isSuccessfullySubmitted).toEqual(true);
        expect(meterReadingForm.props().errors).toEqual({});
        expect(meterReadingForm.props().labels).toEqual({
            dateField: 'Date of reading',
            dateRequired: 'Date is required',
            header: 'Submit Meter readings',
            historyCaption: 'History',
            loadingErrorMessage:
                "Can't load meter readings data from Lition web server. Please contact administrator to resolve the error.",
            meterNumberTitle: 'Number of meter',
            incorrectMeterNumber: 'Number of meter is still not defined.',
            meterReadingNumber: 'Meter readings is not a number',
            meterReadingsField: 'Meter readings',
            noData: 'Sorry, not live metering data available for you…',
            submitButton: 'Submit',
            submitErrorMessage: 'An error occurred while sending meter readings.',
            successMessage: 'Meter reading value was successfully saved'
        });
        expect(meterReadingForm.props().locale).toEqual('en');
        expect(meterReadingForm.props().numberOfMeter).toEqual(123);
        expect(typeof meterReadingForm.props().onSubmit).toEqual('function');
    });

    it('should call performSubmitMeterReading when meter submitted with correct data', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const meterReading = {
            meterReadings: 123,
            date: 312441234
        };
        const component = renderComponent();

        component
            .find(MeterReadingForm)
            .props()
            .onSubmit(meterReading);

        expect(component.state().errors).toEqual({});
        expect(component.find(MeterReadingForm).props().errors).toEqual({});
        expect(consumptionActions.performSubmitMeterReading).toHaveBeenCalledWith(meterReading);
        component.setProps({
            submittedMeterReading: {
                data: meterReading,
                loading: false,
                error: null
            }
        });
        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            message: 'Meter reading value was successfully saved',
            type: 'success'
        });
    });

    it("should don't call performSubmitMeterReading when meter submitted with incorrect data", () => {
        const meterReading = {
            meterReadings: 123,
            date: 312441234
        };
        const component = renderComponent();

        component
            .find(MeterReadingForm)
            .props()
            .onSubmit({ ...meterReading, meterReadings: undefined });
        expect(component.state().errors).toEqual({
            meterReadings: 'Meter readings is not a number'
        });

        component
            .find(MeterReadingForm)
            .props()
            .onSubmit({ ...meterReading, date: undefined });
        expect(component.state().errors).toEqual({
            date: 'Date is required'
        });
    });

    it('should render MeterReadingsHistory with specific properties', () => {
        const component = renderComponent({
            meterReadingsHistory: MOCK_METER_READINGS_HISTORY
        });

        const meterReadingsHistory = component.find(MeterReadingsHistory).at(0);
        expect(meterReadingsHistory).toHaveLength(1);
        expect(meterReadingsHistory.props().data).toEqual(MOCK_METER_READINGS_HISTORY.consumptions);
        expect(meterReadingsHistory.props().title).toEqual('History');
        expect(meterReadingsHistory.props().consumptionUnitLabel).toEqual(
            MOCK_METER_READINGS_HISTORY.consumptionUnitLabel
        );
        expect(meterReadingsHistory.props().noDataMessage).toEqual('Sorry, not live metering data available for you…');
    });

    it('should render MeterReadingsHistory with empty array data when "isSeriesBasedOnLiveData" is false', () => {
        const component = renderComponent({
            meterReadingsHistory: { ...MOCK_METER_READINGS_HISTORY, isSeriesBasedOnLiveData: false }
        });

        const meterReadingsHistory = component.find(MeterReadingsHistory).at(0);
        expect(meterReadingsHistory).toHaveLength(1);
        expect(meterReadingsHistory.props().data).toEqual([]);
        expect(meterReadingsHistory.props().title).toEqual('History');
        expect(meterReadingsHistory.props().consumptionUnitLabel).toEqual(
            MOCK_METER_READINGS_HISTORY.consumptionUnitLabel
        );
        expect(meterReadingsHistory.props().noDataMessage).toEqual('Sorry, not live metering data available for you…');
    });

    it('should map state properties', () => {
        const stateMock = {
            Consumption: {
                meterReadingsHistory: {
                    data: MOCK_METER_READINGS_HISTORY,
                    error: null,
                    loading: true
                },
                submittedMeterReading: {
                    data: { readingValue: 200 },
                    error: 'Error message 2',
                    loading: false
                },
                meterNumber: {
                    data: { meterNumber: 321 },
                    error: 'Error message 3',
                    loading: false
                }
            }
        };
        const props = SubmitMeter.mapStateToProps(stateMock);

        expect(props.loading).toEqual(
            stateMock.Consumption.meterReadingsHistory.loading ||
                stateMock.Consumption.submittedMeterReading.loading ||
                stateMock.Consumption.meterNumber.loading
        );
        expect(props.errorLoading).toEqual(
            stateMock.Consumption.meterReadingsHistory.error || stateMock.Consumption.meterNumber.error
        );

        expect(props.errorSubmit).toEqual(stateMock.Consumption.submittedMeterReading.error);
        expect(props.meterReadingsHistory).toEqual(stateMock.Consumption.meterReadingsHistory.data);
        expect(props.meterNumber).toEqual(stateMock.Consumption.meterNumber.data.meterNumber);
        expect(props.submittedMeterReading).toEqual(stateMock.Consumption.submittedMeterReading);
    });

    it('should shows server error if smth is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({
            loading: false,
            error: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'success',
            message: 'Meter reading value was successfully saved'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const component = renderComponent();

        component.setProps({ loading: true });
        component.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
        const [[firstCallArg], [secondCallArg]] = appActions.performSetupLoaderVisibility.mock.calls;
        expect(firstCallArg).toBeTruthy();
        expect(secondCallArg).toBeFalsy();
    });
});
