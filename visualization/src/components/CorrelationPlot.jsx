import React from 'react';
import Plot from 'react-plotly.js';

function CorrelationPlot(props) {
    return <div>
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
                width: 400, height: 300,
                title: 'Correlation between selected columns <br> and number of casualties (r=' + (Math.round(props.corr * 100) / 100) + ")." }}
            
        />
    </div>
}

export default CorrelationPlot;
