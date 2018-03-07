/*global Plotly*/

import React from 'react';

class Plot extends React.Component {
  drawPlot = () => {
    Plotly.newPlot(
      'plot',
      [{
        x: this.props.xData,
        y: this.props.yData,
        type: this.props.type,
      }],
      {
        title: 'Showing forecast for ' + this.props.location,
        displayModeBar: true,
        margin: {
          b: 100,r: 25
        },
        xaxis: {
          title:'Date and Time in UTC',
        },
        yaxis: {
          title: 'Temp (' + this.props.tempMetric + ')',
        }
      }
    );
    document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
  }

  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  render() {
    return (
      <div id="plot"></div>
    );
  }
}

export default Plot;
