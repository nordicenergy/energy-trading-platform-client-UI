import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OtherEnergyIcon, WindEnergyIcon, SolarEnergyIcon, BiomassEnergyIcon } from './icons';
import { PLANT_TYPES, ENTER_KEY_CODE } from '../../../constants';
import './FilterCheckbox.css';

class FilterCheckbox extends React.Component {
    handleFilterEnterPress(event) {
        const { onChange, name } = this.props;
        if (event.which === ENTER_KEY_CODE) {
            onChange({
                target: {
                    name
                }
            });
        }
    }

    renderIcon() {
        switch (this.props.type) {
            case PLANT_TYPES.wind:
                return <WindEnergyIcon />;
            case PLANT_TYPES.solar:
                return <SolarEnergyIcon />;
            case PLANT_TYPES.biomass:
                return <BiomassEnergyIcon />;
            default:
                return <OtherEnergyIcon />;
        }
    }

    render() {
        const { className, label, name, checked, onChange } = this.props;
        const classes = classNames('filter-checkbox', className);
        return (
            <label className={classes} onKeyPress={event => this.handleFilterEnterPress(event)} tabIndex={0}>
                <input
                    className="filter-checkbox-input"
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
                <span className="filter-checkbox-label">
                    <span className="filter-checkbox-icon">{this.renderIcon()}</span>
                    <span className="filter-checkbox-text">{label}</span>
                </span>
            </label>
        );
    }
}

FilterCheckbox.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([PLANT_TYPES.wind, PLANT_TYPES.solar, PLANT_TYPES.biomass, PLANT_TYPES.other]),
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default FilterCheckbox;
