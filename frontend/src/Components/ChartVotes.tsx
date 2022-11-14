import React from 'react';

import { BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartVotes = ({ data }) => {
    return (
        <>
            <BarChart width={900} height={400} data={data} margin={{ top: 25, right: 0, left: 0, bottom: 25 }}>
                <Bar dataKey="votes" fontFamily="sans-serif" fill="#00a0fc">
                    {/*data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                    ))*/}
                </Bar>
                <XAxis dataKey="name" fontFamily="sans-serif" />

                <YAxis />
            </BarChart>
        </>
    );
};

// const ChartVotes = null;
// export default ChartVotes;
