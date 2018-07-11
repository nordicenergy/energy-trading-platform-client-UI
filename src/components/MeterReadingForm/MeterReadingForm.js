import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import DateField from '../DateField';
import Button from '../Button';
import './MeterReadingForm.css';

class MeterReadingForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            meterReadings: '',
            date: null,
            comment: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { meterReadings, date, comment } = this.state;

        onSubmit({ meterReadings, date, comment });
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value });
    }

    render() {
        const { props: { labels, errors, numberOfMeter }, state: { meterReadings, date, comment } } = this;

        return (
            <form className="meter-reading-form" onSubmit={event => this.handleSubmit(event)} noValidate>
                <div className="meter-reading-form-fields">
                    <div>
                        <TextField
                            name="meterReadings"
                            label={labels.meterReadingsField}
                            value={meterReadings}
                            addon="kWh"
                            onChange={({ target }) => this.handleChange(target)}
                            error={errors.meterReadings}
                            helperText={
                                <span>
                                    {labels.meterNumberTitle}:{' '}
                                    <span className="meter-reading-form-field-helper-text">{numberOfMeter || ''}</span>
                                </span>
                            }
                        />
                    </div>
                    <div>
                        <DateField
                            name="date"
                            label={labels.dateField}
                            value={date}
                            error={errors.date}
                            onChange={payload => this.handleChange(payload)}
                        />
                    </div>
                    <div>
                        <TextField
                            name="comment"
                            label={labels.commentField}
                            value={comment}
                            error={errors.comment}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                </div>
                <div className="meter-reading-form-actions">
                    <Button type="primary">{labels.submitButton}</Button>
                </div>
            </form>
        );
    }
}

MeterReadingForm.propTypes = {
    labels: PropTypes.shape({
        meterReadingsField: PropTypes.string,
        dateField: PropTypes.string,
        commentField: PropTypes.string,
        submitButton: PropTypes.string
    }),
    onSubmit: PropTypes.func,
    numberOfMeter: PropTypes.number,
    errors: PropTypes.shape({
        meterReadings: PropTypes.string,
        commentField: PropTypes.string
    })
};
MeterReadingForm.defaultProps = {
    onSubmit: () => {},
    labels: {
        meterReadingsField: 'Meter readings',
        dateField: 'Date of reading',
        commentField: 'Comment',
        submitButton: 'Submit'
    },
    errors: {},
    numberOfMeter: null
};

export default MeterReadingForm;
