import React from 'react';
import './CountryBar.css';

function CountryBar(props) {
    const populationRatio = props.pop / props.maxPop;
    const adjustment = 809 - (populationRatio / (1 / 809));
    const dynamicWidth = `calc(100% - 280px - ${adjustment}px)`;

    return (
        <div className="country-bar-wrapper">
            <div className="country-name">
                {props.name}
            </div>
            <div className="country-pop-label">{props.pop != null && props.pop.toLocaleString()}</div>
            <div className="country-bar" style={{ width: dynamicWidth }}>
            </div>
        </div>
    );
}

export default CountryBar;