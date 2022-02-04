import React from 'react';
import Plot from 'react-plotly.js';

function CorrelationPlot(props) {
    return <div className="correlation-plot">
        <Plot
            data={[{
                x: [-1, 1],
                y: [-props.corr, props.corr],
                type: 'scatter',
                mode: 'lines',
                marker: { color: props.corr >= 0 ? 'red' : 'green' },
            }]}
            config={{
                staticPlot: true,
                displayModeBar: false
            }}
            layout={{ 
                xaxis: { range: [-1, 1], type: 'linear' }, 
                yaxis: { range: [-1, 1], type: 'linear' }, 
                width: 500, height: 400,
                title: 'Correlation between <br>' + 
                    (props.selected.length > 0 ?
                        props.selected.reduce((acc, curr) => [((acc[1] % 3 == 0 && acc[1] != 0) ? acc[0] + (acc[1] != 0 ? ', ' : '') + '<br>' : acc[0] + (acc[1] != 0 ? ', ' : '')) + curr, acc[1] + 1], ['', 0])[0].replaceAll("_", " ") 
                    : 'nothing')
                    + '<br> and number of casualties (<b>r=' 
                    + (Math.round(props.corr * 100) / 100) + "</b>)." 
            }}
            
        />
    </div>
}

export default CorrelationPlot;
