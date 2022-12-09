
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";





export default function AddTraining(props) {


    const [training, setTraining] = React.useState({date: '', duration: '', activity: '', customer: props.data.links[0].href});
    const [open, setOpen] = React.useState(false);
    const [datePick, setDate] = useState('');

    const handleClickOpen = () => {
        console.log(props.data)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        setTraining({ ...training, date: datePick });
        }
    )
    
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }
    const addTraining = () => {
        props.colDef.addTraining.addTraining(training, props.data.links[0].href);
        handleClose();
        setTraining({date: '', duration: '', activity: '', customer: ''});
    }

    return (
        <div>
        <Button variant="contained" size='small' color="warning" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Add Training to {props.data.firstname} {props.data.lastname}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            onChange={datePick => setDate(datePick)}
                            label="Date&Time picker"
                            value={datePick}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
            <TextField margin="dense" name="duration" value={training.duration} onChange={e => handleInputChange(e)} label="Duration" fullWidth/>
            <TextField margin="dense" name="activity" value={training.activity} onChange={e => handleInputChange(e)} label="Activity" fullWidth/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={addTraining} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );

}