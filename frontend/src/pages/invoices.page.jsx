import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from "axios";
import { baseURL } from "../config";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';


const Invoices = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [EUR, setEUR] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getInvoices();
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));

    async function getInvoices() {
        try {
            const response = await axios.get(baseURL + '/invoices');
            const invoicesData = response.data.response;
            setInvoices(invoicesData);
            const EURData = response.data.EUR;
            setEUR(EURData);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <TableContainer component={Paper} className="invoices-table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Customer Name</StyledTableCell>
                            <StyledTableCell align="center">Issue Date</StyledTableCell>
                            <StyledTableCell align="center">Due Date</StyledTableCell>
                            <StyledTableCell align="center">Comment</StyledTableCell>
                            <StyledTableCell align="center">Invoice Total (HUF)</StyledTableCell>
                            <StyledTableCell align="center">Invoice Total (EUR)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice, index) => {
                            return (
                                <StyledTableRow onClick={ () => {
                                    navigate(`/invoice/${invoice.invoice.id}`);
                                }} key={index}>
                                    <StyledTableCell align="center">{ invoice.invoice.customer }</StyledTableCell>
                                    <StyledTableCell align="center">{ format(new Date(invoice.invoice.issueDate), 'yyyy-MM-dd hh:mm') }</StyledTableCell>
                                    <StyledTableCell align="center">{ format(new Date(invoice.invoice.dueDate), 'yyyy-MM-dd hh:mm') }</StyledTableCell>
                                    <StyledTableCell align="center">{ invoice.invoice.comment || "–" }</StyledTableCell>
                                    <StyledTableCell align="center">{ invoice.invoice.invoiceTotal } Ft</StyledTableCell>
                                    <StyledTableCell align="center">{ invoice.EURPrice } €</StyledTableCell>
                                </StyledTableRow>
                            )
                        })} 
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Box sx={{ textAlign: 'center' }}>
                <Button variant="contained" 
                    sx={{mt: 5, mb: 5}}
                    onClick={ () => {
                        navigate(`/create`, {state: {EUR: EUR}});
                    }}>Create new invoice
                </Button>
            </Box>
    </div>
    );
};

export default Invoices;