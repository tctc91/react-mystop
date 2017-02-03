import React, { Component } from 'react';
import * as _ from 'lodash';

class StationArrivals extends Component {
  formatEta(mins) {
    let eta = Math.floor(mins / 60);
    return eta === 0 ? `Due` : `${eta} min`;
  }

  render() {
    let arrivalEle = null;
    let arrivals = this.props.selectedStopArrivals;

    if(typeof arrivals === 'object' && Object.keys(arrivals).length) {
      arrivalEle = _.sortBy(arrivals, 'timeToStation').map((arrival) =>
        <div key={arrival.id}>
          <h2>{arrival.destinationName} <small>{this.formatEta(arrival.timeToStation)}</small></h2>
          <h3>Currently {arrival.currentLocation}</h3>
        </div>
      );
    }

    if(!arrivals && !this.props.isLoading) {
      arrivalEle = <h3>Sorry, no arrival information available 🙁</h3>;
    }

    return (
      <div>
        <button onClick={() => this.props.onStopChange(1)}>Choose new stop</button>
        <button onClick={this.props.onStopRefresh}>&#8635;</button>
        <div>{arrivalEle}</div>
      </div>
    );
  }
}

export default StationArrivals;
