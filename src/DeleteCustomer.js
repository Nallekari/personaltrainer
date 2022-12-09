
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropertyKeys } from 'ag-grid-community';



export default function DeleteCustomer(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log(props.data)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const deleteCustomer = () => {
        props.colDef.deleteCustomer.deleteCustomer(props.data.links[0].href);
    }


    return (
        <div>
        <Button variant="contained" size='small' color="error" onClick={handleClickOpen}>
            Delete
        </Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Delete Customer {props.data.firstname} {props.data.lastname}?</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={deleteCustomer} color="primary">Delete</Button>
            </DialogActions>
        </Dialog>
        </div>
        );
}