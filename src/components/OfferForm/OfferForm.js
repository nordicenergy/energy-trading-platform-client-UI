import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import { PLANT_TYPES } from '../../constants';
import TextField from '../TextField';
import DeltaField from '../DeltaField';
import SelectField, { OptionPropType } from '../SelectField';
import DateField from '../DateField';
import Button from '../Button';
import './OfferForm.css';

class OfferForm extends Component {
    constructor(props) {
        super(props);

        const [firstOption] = props.plantTypeOptions;
        this.state = {
            salePrice: props.marketPrice,
            plantType: firstOption.value,
            annualProduction: '',
            capacity: '',
            date: '',
            location: '',
            description: '',
            ...pick(props.formData, [
                'salePrice',
                'plantType',
                'annualProduction',
                'capacity',
                'date',
                'location',
                'description'
            ])
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onSubmit } = this.props;

        if (typeof onSubmit === 'function') {
            onSubmit({ ...this.state });
        }
    }

    handleChange(event) {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleDeltaChange(name, { value }) {
        this.setState({ [name]: value });
    }

    handleSelectChange(name, option) {
        this.setState({ [name]: option.value });
    }

    handleDateChange(name, timestamp) {
        this.setState({ [name]: timestamp });
    }

    getSelectedOption() {
        const { plantTypeOptions } = this.props;
        const { plantType } = this.state;
        return plantTypeOptions.find(option => option.value === plantType);
    }

    calculateDelta() {
        const { marketPrice } = this.props;
        const { salePrice } = this.state;
        return Math.round((salePrice - marketPrice) * 10) / 10;
    }

    renderDeleteButton() {
        const { labels, disabled, onDelete } = this.props;

        if (typeof onDelete === 'function') {
            return (
                <button className="offer-form-delete-button" type="button" disabled={disabled} onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} /> {labels.deleteButton}
                </button>
            );
        }

        return null;
    }

    render() {
        const { className, labels, plantTypeOptions, marketPrice, disabled } = this.props;
        const classes = classNames('offer-form', className);

        return (
            <form className={classes} onSubmit={event => this.handleSubmit(event)}>
                <div className="offer-form-fields">
                    <div className="offer-form-field offer-form-field--price-delta">
                        <DeltaField
                            labels={{
                                beforeLabel: labels.salePriceFieldBefore,
                                inputLabel: labels.salePriceField,
                                afterLabel: labels.salePriceFieldAfter,
                                units: labels.salePriceFieldUnits
                            }}
                            initialValue={marketPrice}
                            delta={this.calculateDelta()}
                            value={this.state.salePrice}
                            onChange={payload => this.handleDeltaChange('salePrice', payload)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <SelectField
                            label={labels.plantTypeField}
                            options={plantTypeOptions}
                            value={this.getSelectedOption()}
                            onChange={option => this.handleSelectChange('plantType', option)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="annualProduction"
                            label={labels.annualProductionField}
                            addon="kWg / day"
                            value={this.state.annualProduction}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="capacity"
                            label={labels.capacityField}
                            addon="MW"
                            value={this.state.capacity}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <DateField
                            name="date"
                            label={labels.dateField}
                            value={this.state.date}
                            onChange={timestamp => this.handleDateChange('date', timestamp)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="location"
                            label={labels.locationField}
                            value={this.state.location}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="description"
                            label={labels.descriptionField}
                            value={this.state.description}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                </div>
                <div className="offer-form-actions">
                    <Button type="primary" disabled={disabled}>
                        {labels.submitButton}
                    </Button>
                    {this.renderDeleteButton()}
                </div>
            </form>
        );
    }
}

OfferForm.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        deltaPriceFieldBefore: PropTypes.string,
        deltaPriceField: PropTypes.string,
        deltaPriceFieldAfter: PropTypes.string,
        deltaPriceFieldUnits: PropTypes.string,
        plantTypeField: PropTypes.string,
        annualProductionField: PropTypes.string,
        capacityField: PropTypes.string,
        dateField: PropTypes.string,
        locationField: PropTypes.string,
        descriptionField: PropTypes.string,
        submitButton: PropTypes.string,
        deleteButton: PropTypes.string
    }),
    plantTypeOptions: PropTypes.arrayOf(OptionPropType),
    marketPrice: PropTypes.number,
    formData: PropTypes.shape({
        salePrice: PropTypes.number,
        plantType: PropTypes.string,
        annualProduction: PropTypes.string,
        capacity: PropTypes.string,
        date: PropTypes.number,
        location: PropTypes.string,
        description: PropTypes.string
    }),
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func
};
OfferForm.defaultProps = {
    labels: {
        salePriceFieldBefore: 'Current Market Price:',
        salePriceField: 'Delta to Market Price',
        salePriceFieldAfter: 'Sale price:',
        salePriceFieldUnits: 'cent',
        plantTypeField: 'Type of energy',
        annualProductionField: 'Annual Production',
        capacityField: 'Peak Capacity',
        dateField: 'Selected since',
        locationField: 'Location',
        descriptionField: 'Description',
        submitButton: 'Add Offer',
        deleteButton: 'Delete the offer'
    },
    plantTypeOptions: [
        { value: PLANT_TYPES.solar, title: 'Solar' },
        { value: PLANT_TYPES.wind, title: 'Wind' },
        { value: PLANT_TYPES.biomass, title: 'Biomass' },
        { value: PLANT_TYPES.default, title: 'Default' },
        { value: PLANT_TYPES.other, title: 'Other' }
    ],
    marketPrice: 0,
    formData: {},
    disabled: false
};

export default OfferForm;
