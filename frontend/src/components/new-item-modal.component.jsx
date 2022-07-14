import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

const NewItemModal = (props) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setName("");
        setPrice(0);
        setQuantity(1);
    }, [props.open]);

    return (
        <Modal
            open={props.open}
            onClose={() => props.handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb:2 }}>
                Add new item
            </Typography>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    props.addNewItem({
                        name: name,
                        price: price,
                        quantity: quantity,
                        totalPrice: quantity * price
                    });
                    props.handleClose();
                }}>
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <TextField
                            required
                            fullWidth
                            sx={{ mb: 2}}
                            id="outlined-required"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            label="Product Name"
                        />
                    </Box>

                    <TextField
                        required
                        fullWidth
                        sx={{ mb: 2}}
                        id="outlined-number"
                        label="Price"
                        type="number"
                        value={price}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(event) => setPrice(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        sx={{ mb: 2}}
                        id="outlined-number"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={(event) => setQuantity(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography id="modal-modal-title" variant="subtitle1" component="h2">
                        Total Price (HUF): {quantity * price} Ft
                    </Typography>

                    <Typography id="modal-modal-title" variant="subtitle2" component="h2">
                        Total Price (EUR): {parseFloat((quantity * price) / props.EUR).toFixed(2)} €
                    </Typography>
                    <Button variant="contained" 
                            sx= {{ mt: 2 }}
                            type="submit">Add
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default NewItemModal;