import React, { useEffect, useState } from "react";
import { Grid, Box, TextField,  Accordion, AccordionSummary, AccordionDetails, Button, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InvoiceItems from "../components/invoice-items.component";
import NewItemModal from "../components/new-item-modal.component";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";

const CreateInvoice = (props) => {

    const [customer, setCustomer] = useState("");
    const [issueDate, setIssueDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [comment, setComment] = useState("");
    const [items, setItems] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [EUR, setEUR] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.EUR) {
            setEUR(location.state.EUR);
        } else {
            navigate("/");
        }
    }, [])

    function addInvoiceItem(item) {
        setItems(items => [...items, item]);
    }

    function getTotalPrice() {
        let totalPrice = 0;

        for(let item of items) {
            totalPrice += item.totalPrice;
        }

        return totalPrice;
    }

    async function createInvoice() {
        try {
            const response = await axios.post(baseURL + "/invoices", {
                invoice: {
                    customer: customer,
                    issueDate: issueDate,
                    dueDate: dueDate,
                    comment: comment, 
                    invoiceTotal: getTotalPrice()
                },
                items: items
            });
            
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Button variant="outlined" 
                    size="small"
                    sx={{mt: 2, mb: 2, ml: 2 }}
                    onClick={ () => {
                        navigate(`/`);
                }}>Back to invoices
            </Button>

            <Box sx={{ width: '75%', ml: 2 }}>
                <Typography id="modal-modal-title" variant="subtitle1" component="h2">
                    Please fill the form below in order to create a new invoice.
                </Typography>
            </Box>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createInvoice();
                }}>
                <Box sx={{ width: '50%', m: 2 }}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        value={customer}
                        onChange={(event) => setCustomer(event.target.value)}
                        label="Customer Name"
                    />
                </Box>

                <Box sx={{ width: '50%', m: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <DateTimePicker
                                label="Issue Date"
                                value={issueDate}
                                onChange={(newValue) => setIssueDate(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Grid>

                        <Grid item xs={6}>
                                <DateTimePicker
                                    label="Due Date"
                                    value={dueDate}
                                    onChange={(newValue) => setDueDate(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                        </Grid>
                        
                        
                    </Grid>
                </Box>

                <Box sx={{ width: '50%', m: 2 }}>
                    <TextField
                        id="outlined-multiline-static"
                        fullWidth
                        label="Comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        multiline
                        rows={2}
                    />
                </Box>

                <Box sx={{ width: '50%', m: 2 }}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Invoice Items</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                            <Box textAlign='center' sx={{ width: '99%' }}>
                                <InvoiceItems items={ items } EUR={EUR} />
                                <Button variant="contained" sx={{mt: 2}}
                                    onClick={() => setShowCreateModal(true)}>Add item
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Typography variant="h7"
                            component="h2"
                            sx={{ mt: 1, ml: 2 }}>
                    Total Price (HUF): {getTotalPrice()} Ft
                </Typography>

                <Typography variant="h6" 
                            component="h2"
                            sx={{ml: 2 }}>
                    Total Price (EUR): {parseFloat(getTotalPrice() / EUR).toFixed(2)} €
                </Typography>

                <Button variant="contained" 
                        sx={{mt: 2, mb: 2, ml: 2}}
                        type="submit">Submit
                </Button>
            </form>

            <NewItemModal 
                addNewItem={addInvoiceItem}
                EUR={EUR}
                open={showCreateModal}
                handleClose={() => setShowCreateModal(false)}/>

            </LocalizationProvider>
        </div>
    );
};

export default CreateInvoice;