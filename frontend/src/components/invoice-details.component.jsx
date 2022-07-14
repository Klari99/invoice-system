import React from "react";
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import {format} from 'date-fns';

const InvoiceDetails = (props) => {
    return (
        <Box sx={{width: '50%', m: 2 }}>
            <Grid container direction='column' spacing={2} alignItems="stretch">
                <Grid item>
                    <Typography variant="h5">Customer Name</Typography>
                    <Typography variant="subtitle1">{ props.invoice.customer }</Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h5">Issue Date</Typography>
                    <Typography variant="subtitle1">{ format(new Date(props.invoice.issueDate), 'yyyy-MM-dd hh:mm') }</Typography>
                </Grid>
                
                <Grid item>
                    <Typography variant="h5">Due Date</Typography>
                    <Typography variant="subtitle1">{ format(new Date(props.invoice.dueDate), 'yyyy-MM-dd hh:mm') }</Typography>
                </Grid>

                { props.invoice.comment && 
                    <Grid item>
                        <Typography variant="h5">Comment</Typography>
                        <Typography variant="subtitle1" sx= {{ maxHeight: 60, overflow: 'auto' }}>{ props.invoice.comment }</Typography>
                    </Grid>
                }

                <Grid item>
                    <Typography variant="h5">Invoice Total (HUF)</Typography>
                    <Typography variant="subtitle1">{ props.invoice.invoiceTotal } Ft</Typography>
                </Grid>

                <Grid item>
                        
                    <Typography variant="h5">Invoice Total (EUR)</Typography>
                    <Typography variant="subtitle1">{ props.EURPrice } €</Typography>
                </Grid>
        </Grid>
        
    </Box>
    );
};

export default InvoiceDetails;