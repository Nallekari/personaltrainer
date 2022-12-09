

import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteTraining(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log(props.data)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const deleteTraining = () => {
        console.log(props.data);
        props.colDef.deleteTraining.deleteTraining(props.data.id);
    }


    return (
        <div>
        <Button variant="contained" size='small' color="error" onClick={handleClickOpen}>
            Delete
        </Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Delete {props.data.activity} from {props.data.customer.firstname} {props.data.customer.lastname}?</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={deleteTraining} color="primary">Delete</Button>
            </DialogActions>
        </Dialog>
        </div>
        );
}