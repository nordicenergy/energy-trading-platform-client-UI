import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OtherEnergyIcon, WindEnergyIcon, SolarEnergyIcon, BiomassEnergyIcon } from './icons';
import { PLANT_TYPES } from '../../../constants';
import './FilterCheckbox.css';

const FilterCheckbox = ({ className, type, label, name, checked, onChange }) => {
    const classes = classNames('filter-checkbox', className);
    let icon = null;

    switch (type) {
        case PLANT_TYPES.wind:
            icon = <WindEnergyIcon />;
            break;
        case PLANT_TYPES.solar:
            icon = <SolarEnergyIcon />;
            break;
        case PLANT_TYPES.biomass:
            icon = <BiomassEnergyIcon />;
            break;
        default:
            icon = <OtherEnergyIcon />;
            break;
    }

    return (
        <label className={classes}>
            <input
                className="filter-checkbox-input"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <span className="filter-checkbox-label">
                <span className="filter-checkbox-icon">{icon}</span>
                <span className="filter-checkbox-text">{label}</span>
            </span>
        </label>
    );
};

FilterCheckbox.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([PLANT_TYPES.wind, PLANT_TYPES.solar, PLANT_TYPES.biomass, PLANT_TYPES.other]),
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default FilterCheckbox;
