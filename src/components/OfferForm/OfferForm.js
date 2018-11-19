import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import { PLANT_TYPES } from '../../constants';
import TextField from '../TextField';
import DeltaField from '../DeltaField';
import SelectField, { OptionPropType } from '../SelectField';
import DateField from '../DateField';
import Button from '../Button';
import './OfferForm.css';

const OFFER_FIELDS = [
    'price',
    'plantType',
    'annualProduction',
    'capacity',
    'date',
    'street',
    'city',
    'postcode',
    'description',
    'name'
];

const DELTA_ROUNDING_VALUE = 100;

class OfferForm extends React.PureComponent {
    constructor(props) {
        super(props);

        const [firstOption] = props.plantTypeOptions;
        this.state = {
            isEdited: false,
            price: 0,
            plantType: firstOption.value,
            annualProduction: '',
            capacity: 0,
            date: 0,
            city: '',
            street: '',
            postcode: '',
            description: '',
            name: '',
            ...pick(props.offer, OFFER_FIELDS)
        };
    }

    componentDidUpdate() {
        if (!this.state.isEdited) {
            this.setState({
                ...this.state,
                ...pick(this.props.offer, OFFER_FIELDS),
                isEdited: false
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onSubmit } = this.props;
        onSubmit &&
            onSubmit({
                ...pick(this.state, OFFER_FIELDS)
            });
    }

    handleChange({ name, value }) {
        this.setState({
            [name]: value,
            isEdited: true
        });
    }

    calculateDelta() {
        const { marketPrice } = this.props;
        const { price: salePrice } = this.state;
        const delta = Math.round((salePrice - marketPrice) * DELTA_ROUNDING_VALUE) / DELTA_ROUNDING_VALUE;
        return isNaN(delta) ? 0 : delta;
    }

    renderDeleteButton() {
        const { labels, disabled, onDelete } = this.props;

        return onDelete ? (
            <button className="offer-form-delete-button" type="button" disabled={disabled} onClick={onDelete}>
                <FontAwesomeIcon icon={faTrashAlt} /> {labels.deleteButton}
            </button>
        ) : null;
    }

    render() {
        const { className, labels, plantTypeOptions, marketPrice, disabled, errors } = this.props;
        const classes = classNames('offer-form', className);

        return (
            <form className={classes} onSubmit={event => this.handleSubmit(event)} noValidate>
                <div className="offer-form-fields">
                    <div className="offer-form-field offer-form-field--price-delta">
                        <DeltaField
                            name="price"
                            labels={{
                                beforeLabel: labels.salePriceFieldBefore,
                                inputLabel: labels.salePriceField,
                                afterLabel: labels.salePriceFieldAfter,
                                units: labels.salePriceFieldUnits
                            }}
                            initialValue={marketPrice}
                            delta={this.calculateDelta()}
                            value={this.state.price}
                            onChange={payload => this.handleChange(payload)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="name"
                            label={labels.nameField}
                            value={this.state.name}
                            error={errors.name}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <SelectField
                            disabled
                            name="plantType"
                            label={labels.plantTypeField}
                            options={plantTypeOptions}
                            value={this.state.plantType}
                            onChange={payload => this.handleChange(payload)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            disabled
                            name="annualProduction"
                            label={labels.annualProductionField}
                            addon="kWg / day"
                            value={this.state.annualProduction}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="capacity"
                            label={labels.capacityField}
                            addon="MW"
                            value={this.state.capacity}
                            error={errors.capacity}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <DateField
                            disabled
                            name="date"
                            label={labels.dateField}
                            helperText={labels.dateHelperText}
                            value={this.state.date}
                            onChange={payload => this.handleChange(payload)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="city"
                            label={labels.cityField}
                            value={this.state.city}
                            error={errors.city}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="street"
                            label={labels.streetField}
                            value={this.state.street}
                            error={errors.street}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="postcode"
                            label={labels.postcodeField}
                            value={this.state.postcode}
                            error={errors.postcode}
                            onChange={({ target }) => this.handleChange(target)}
                        />
                    </div>
                    <div className="offer-form-field">
                        <TextField
                            name="description"
                            label={labels.descriptionField}
                            value={this.state.description}
                            error={errors.description}
                            onChange={({ target }) => this.handleChange(target)}
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
        salePriceFieldBefore: PropTypes.string,
        salePriceField: PropTypes.string,
        salePriceFieldAfter: PropTypes.string,
        salePriceFieldUnits: PropTypes.string,
        plantTypeField: PropTypes.string,
        annualProductionField: PropTypes.string,
        capacityField: PropTypes.string,
        dateField: PropTypes.string,
        dateHelperText: PropTypes.string,
        locationField: PropTypes.string,
        descriptionField: PropTypes.string,
        submitButton: PropTypes.string,
        deleteButton: PropTypes.string
    }),
    plantTypeOptions: PropTypes.arrayOf(OptionPropType),
    marketPrice: PropTypes.number,
    offer: PropTypes.shape({
        price: PropTypes.number,
        plantType: PropTypes.string,
        name: PropTypes.string,
        annualProduction: PropTypes.string,
        date: PropTypes.number,
        capacity: PropTypes.number,
        city: PropTypes.string,
        street: PropTypes.string,
        postcode: PropTypes.string,
        description: PropTypes.string
    }),
    errors: PropTypes.shape({
        capacity: PropTypes.string,
        city: PropTypes.string,
        street: PropTypes.string,
        postcode: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string
    }),
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func
};
OfferForm.defaultProps = {
    labels: {
        salePriceFieldBefore: 'Current Market Price',
        salePriceField: 'Delta to Market Price',
        salePriceFieldAfter: 'Sale price',
        salePriceFieldUnits: 'cent',
        plantTypeField: 'Type of energy',
        nameField: 'Name',
        annualProductionField: 'Annual Production',
        capacityField: 'Peak Capacity',
        dateField: 'Selected since',
        dateHelperText: 'Editing format dd.mm.yyyy',
        cityField: 'City',
        streetField: 'Street',
        postcodeField: 'Postcode',
        descriptionField: 'Description',
        submitButton: 'Add Offer',
        deleteButton: 'Delete the offer'
    },
    plantTypeOptions: [
        { value: PLANT_TYPES.solar, label: 'Solar' },
        { value: PLANT_TYPES.wind, label: 'Wind' },
        { value: PLANT_TYPES.biomass, label: 'Biomass' },
        { value: PLANT_TYPES.other, label: 'Other' }
    ],
    marketPrice: 2.5,
    offer: {},
    errors: {},
    disabled: false
};

export default OfferForm;
