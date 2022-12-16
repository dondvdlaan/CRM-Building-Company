


import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import "./ContactDetailsCard.css"
import { Customer } from '../../../types/Customer';

// Data simulation
let id = 0;
function createData(name: string, fat: number, price: number) {
  id += 1;
  return { id, name, fat, price };
}

const rows = [
  // comment
  createData('Frozen yoghurt', 159, 4.0),
  createData('Ice cream sandwich', 237, 4.3),
  createData('Eclair', 16.0, 6.0),
  createData('Cupcake', 3.7, 4.3),
  createData('Gingerbread', 16.0, 3.9),
];

/**
 * 
 */
export const ContactDetailsCard = (props:{customer: Customer}) => {

  return (
  
    <Card className="kaart" sx={{mx:1}}>
      <CardHeader
        className="header"
        title={'Customer details'}
      />
      <CardContent className="content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Details</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow >
                <TableCell component="th" scope="row">
                  First nmae
                </TableCell>
                <TableCell align="right">{props.customer.custFirstName}</TableCell>
                <TableCell align="right">{props.customer.custLastName}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};


