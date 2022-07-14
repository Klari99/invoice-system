import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const InvoiceItems = (props) => {
    return (
        <div>
            {
            props.items.length ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Unit Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total Price (HUF)</TableCell>
                        <TableCell align="center">Total Price (EUR)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell align="center">{ item.name }</TableCell>
                                    <TableCell align="center">{ item.price } Ft</TableCell>
                                    <TableCell align="center">{ item.quantity }</TableCell>
                                    <TableCell align="center">{ item.totalPrice } Ft</TableCell>
                                    <TableCell align="center">{ parseFloat(item.totalPrice / props.EUR).toFixed(2) } €</TableCell>
                                </TableRow>
                            )
                        })} 
                    </TableBody>
                </Table>
            </TableContainer>
            : 
            <Typography id="modal-modal-title" variant="subtitle2" component="h2" align="center">
                No invoice items.
            </Typography>
            }
        </div>
    );
};

export default InvoiceItems;