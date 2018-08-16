import React from 'react';
import PropTypes from 'prop-types';
// TODO uncomment after enabling Trading page
// import Plot from 'react-plotly.js';
//
// import options from './options';
import './EnergyAmountGraph.css';

const EnergyAmountGraph = ({ title = '', subtitle = '', data = {} }) => {
    // const { dates = [], amounts = [] } = data;
    return (
        <figure role="group" className="energy-amount-graph">
            <figcaption>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </figcaption>
            {/*<Plot*/}
                {/*className="graph"*/}
                {/*data={[*/}
                    {/*{*/}
                        {/*x: [...dates],*/}
                        {/*y: [...amounts],*/}
                        {/*...options.data*/}
                    {/*}*/}
                {/*]}*/}
                {/*layout={options.layout}*/}
                {/*config={options.config}*/}
                {/*useResizeHandler={true}*/}
            {/*/>*/}
        </figure>
    );
};

EnergyAmountGraph.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    data: PropTypes.shape({
        dates: PropTypes.array,
        amounts: PropTypes.array
    })
};

export default EnergyAmountGraph;
