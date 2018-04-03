import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

import './MenuSideBar.css';

class MenuSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: 0 };
    }

    selectMenuItem(index, id) {
        const { onSelect = f => f } = this.props;
        this.setState({ active: index });
        onSelect(id);
    }

    renderMenuItems() {
        const { items = [] } = this.props;
        return items.map(({ id, icon, label, active }, index) => (
            <MenuItem
                key={`${index}-${label}`}
                icon={icon}
                label={label}
                active={this.state.active === index}
                onClick={() => this.selectMenuItem(index, id)}
            />
        ));
    }

    render() {
        return <nav className="menu-side-bar">{this.renderMenuItems()}</nav>;
    }
}

MenuSideBar.propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func
};

export default MenuSideBar;
