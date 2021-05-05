import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Components/Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('Jan', 24),
  createData('Feb', 22),
  createData('March', 18),
  createData('April', 19),
  createData('May', 16),
  createData('June', 14),
  createData('July', 13),
  createData('Aug', 11),
  createData('Sep', undefined),
  createData('Oct', undefined),
  createData('Nov', undefined),
  createData('Dec', undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Year to Date</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Service Calls
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}