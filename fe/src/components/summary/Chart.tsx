import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { SalesData } from '../../types/Auxiliar';
import { useDBApi } from '../../shared/Api';
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';



// Generate Sales Data
function createData(revenue_date: string, amount?: number) {
  return { revenue_date, amount };
}

const data = [
  createData('2022-01-15', 0),
  createData('2022-02-15', 400),
  createData('2022-03-15', 600),
];
// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

console.log("Chart darta: ", data);


/**
 * Component Chart
 */
export default function Chart() {

  // *** Constants nd varoables ***
  const theme = useTheme();
  const [monthsBack, setMonthsBack] = useState("3");
  const [salesData, setSalesData] = useDBApi<any>("GET", `revenue/${monthsBack}`);

  const months =[1,2,3,4,5,6,7,8,9,10,11,12];

  if(!salesData) return <p>Loading sales data...</p>;

  console.log("salesData ", salesData);

  return (
    <React.Fragment>
      <Title>Monthly sales</Title>
      <ResponsiveContainer>
        <LineChart
          data={salesData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="revenue_date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="revenue_amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
        <TextField
            select
            value={monthsBack}
            onChange={(e) => setMonthsBack(e.target.value)}
            required={false}
            label="Months back"
            sx={{
              ml: 2,
              width: '14ch',
              }}
          >
               {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
    </React.Fragment>
  );
}