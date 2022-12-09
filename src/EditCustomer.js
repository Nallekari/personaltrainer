
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropertyKeys } from 'ag-grid-community';



export default function EditCustomer(props) {
    
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});



    const handleClickOpen = () => {
        console.log(props.data)
        setOpen(true);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        })
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const updateCustomer = () => {
        props.colDef.updateCustomer.updateCustomer(customer, props.data.links[0].href);
        handleClose();
        setCustomer({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    }

    return (
        <div>
        <Button variant="contained" size='small' color="primary" onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
            <DialogContent>
            <TextField autoFocus margin="dense" name="firstname" value={customer.firstname} onChange={e => handleInputChange(e)} label="Firstname" fullWidth/>
            <TextField margin="dense" name="lastname" value={customer.lastname} onChange={e => handleInputChange(e)} label="Lastname" fullWidth/>
            <TextField margin="dense" name="streetaddress" value={customer.streetaddress} onChange={e => handleInputChange(e)} label="Streetaddress" fullWidth/>
            <TextField margin="dense" name="postcode" value={customer.postcode} onChange={e => handleInputChange(e)} label="Postcode" fullWidth/>
            <TextField margin="dense" name="city" value={customer.city} onChange={e => handleInputChange(e)} label="City" fullWidth/>
            <TextField margin="dense" name="email" value={customer.email} onChange={e => handleInputChange(e)} label="Email" fullWidth/>
            <TextField margin="dense" name="phone" value={customer.phone} onChange={e => handleInputChange(e)} label="Phone" fullWidth/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={updateCustomer} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
        </div>
        );
}