import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { baseURL } from "../config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InvoiceItems from "../components/invoice-items.component";
import InvoiceDetails from "../components/invoice-details.component";

const Invoice = (props) => {
  const [invoice, setInvoice] = useState(null);
  const [EURPrice, setEURPrice] = useState(0);
  const [EUR, setEUR] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getInvoice();
  }, [id]);

  async function getInvoice() {
    try {
      const response = await axios.get(baseURL + "/invoices/" + id);
      console.log(response);
      const invoiceData = response.data.invoice;
      const EURPriceData = response.data.EURPrice;
      const EURData = response.data.EUR;
      setInvoice(invoiceData);
      setEURPrice(EURPriceData);
      setEUR(EURData);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
        { invoice && <> 
        <InvoiceDetails invoice={ invoice } EURPrice={ EURPrice }/>

            <Box sx={{width: '50%', m: 2 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Invoice Items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InvoiceItems items={ invoice.Items } EUR={ EUR } />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </> }

        <Button variant="contained" 
                sx={{m: 2 }} 
                onClick={ () => {
                    navigate(`/`);
                }}>Back to invoices
        </Button>
    </div>
  );
};

export default Invoice;
