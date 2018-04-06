import React from 'react';
import PropTypes from 'prop-types';
import {
    AllEnergyIcon,
    WindEnergyIcon,
    SolarEnergyIcon,
    BiomassEnergyIcon,
    LocalEnergyIcon,
    RenewableEnergyIcon
} from './icons';
import './FilterCheckbox.css';

const FilterCheckbox = ({ type, label, name, checked, onChange }) => {
    let icon = null;

    switch (type) {
        case 'wind':
            icon = <WindEnergyIcon />;
            break;
        case 'solar':
            icon = <SolarEnergyIcon />;
            break;
        case 'biomass':
            icon = <BiomassEnergyIcon />;
            break;
        case 'local':
            icon = <LocalEnergyIcon />;
            break;
        case 'renewable':
            icon = <RenewableEnergyIcon />;
            break;
        case 'all':
        default:
            icon = <AllEnergyIcon />;
            break;
    }

    return (
        <label className="filter-checkbox">
            <input
                className="filter-checkbox-input"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <div className="filter-checkbox-label">
                <span className="filter-checkbox-icon">{icon}</span>
                <span className="filter-checkbox-text">{label}</span>
            </div>
        </label>
    );
};

FilterCheckbox.propTypes = {
    type: PropTypes.oneOf([
        'all',
        'wind',
        'solar',
        'biomass',
        'renewable',
        'local'
    ]).isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default FilterCheckbox;
