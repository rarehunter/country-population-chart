import React from 'react';
import CountryBar from './CountryBar';
import "./BarChart.css";

function BarChart(props) {
    const maxPop = props.data.reduce((acc, country) => {
        return Math.max(acc, country["Year_" + props.year])
    }, 0);

    return (
        <>
            <div className="bar-chart-title">Country Populations in {props.year}</div>
            {
                props.data.map((c, index) =>
                    <CountryBar key={index} name={c.Country} pop={c["Year_" + props.year]} maxPop={maxPop} />
                )
            }
        </>
    );
}

export default BarChart;