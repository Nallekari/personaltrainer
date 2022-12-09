import { groupBy, sumBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function TrainingStatistics() {

    const [data, setData] = useState([]);

    useEffect(() => {
        
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => { const events = (groupBy(data.content, 'activity'))
            setData([])
            for (let i = 0; i < Object.values(events).length; i++) {
                setData(data => [...data, { name: Object.values(events)[i][0].activity, uv: sumBy(Object.values(events)[i], function (a){return a.duration})}])
            }
        })
    },[]

    );

    return (
        <div>
            <b>Training Statistics</b>
            <BarChart width={1000} height={600} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis label={{value: 'duration (mins)', angle: -90, position: 'insideLeft'}} />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
        </div>
        )
}