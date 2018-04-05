const tickColor = '#b1bac1';
const tickStartTag =
    '<span translate="no" style="font-weight: 600;line-height: 1.5em;">';
const tickEndTag = '</span>';

const options = {
    data: {
        type: 'scatter',
        mode: 'lines+markers',
        line: {
            color: '#48d376',
            width: '2',
            dash: 'solid',
            shape: 'linear'
        },
        marker: {
            symbol: 'circle',
            size: '8',
            color: 'rgb(43, 197, 157)',
            line: {
                color: 'rgba(72, 211, 118, 0.3)',
                width: '8'
            }
        },
        showlegend: false
    },
    layout: {
        autosize: true,
        height: undefined,
        width: undefined,
        font: {
            family: 'Artegra Sans Alt',
            size: '12',
            color: ''
        },
        hovermode: false,
        xaxis: {
            type: 'date',
            fixedrange: true,
            color: tickColor,
            showline: false,
            showgrid: false,
            tickprefix: tickStartTag,
            ticksuffix: tickEndTag
        },
        yaxis: {
            side: 'right',
            fixedrange: true,
            color: tickColor,
            showgrid: true,
            gridcolor: '#eceef1',
            gridwidth: '1',
            tickprefix: tickStartTag,
            ticksuffix: `&nbsp;kWh${tickEndTag}`
        },
        margin: {
            l: 30,
            r: 80,
            b: 80,
            t: 10,
            pad: 4
        }
    },
    config: {
        showLink: false,
        displayModeBar: false
    }
};

export default options;
