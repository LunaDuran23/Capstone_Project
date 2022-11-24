import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Card from 'react-bootstrap/Card';


const COLORS = ["#4a5645", "#E74C3C", "#E67E22 ", "#707B7C"];

const ChartVotes = ({data}) =>{
    
    return(
        
            <Card style={{width: '750px', height: '370px'}}>
                    
                    <Card.Body>
                        <BarChart 
                width={700}
                height={350}
                data={data}
                margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
            >
                <Bar dataKey="votes" label={true} fontFamily='sans-serif'  >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                    ))}
                </Bar> 
                <Tooltip />
                <XAxis dataKey="name" fontFamily="sans-serif"  />
                
                <YAxis />
            </BarChart>
                    </Card.Body>
                </Card>
    );
}

export default ChartVotes;