import React from 'react';
import { connect } from 'react-redux';

import {
    performGetItems,
    performCreateItem,
    performDeleteItem
} from '../../action_performers/tempItems';

import './Test.css';

export class Test extends React.Component {
    static mapStateToProps(state) {
        return {
            items: state.TempItems.items.data
        };
    }

    componentDidMount() {
        performGetItems();
    }

    renderItems() {
        const { props: { items = [] } } = this;
        return items.map((item, index) => <p key={index}>{item.name}</p>);
    }

    addItem(id) {
        performCreateItem({ name: id });
    }

    removeItem(id) {
        performDeleteItem(id);
    }

    render() {
        return (
            <div className="test">
                <button id="add" onClick={() => this.addItem('11')}>
                    Add
                </button>
                <button id="remove" onClick={() => this.removeItem('11')}>
                    Remove
                </button>
                <p>Items:</p>
                <br />
                <div id="items">{this.renderItems()}</div>
            </div>
        );
    }
}

export default connect(Test.mapStateToProps)(Test);
