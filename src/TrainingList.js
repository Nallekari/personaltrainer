
import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format } from 'date-fns';
import DeleteTraining from './DeleteTraining';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CustomerList() { 
    
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = React.useState(false);


    useEffect(() => fetchData(), []);


    const handleNotification = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deleteTraining = (id) => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
            .then(res => fetchData())
            .catch(err => console.error(err))
             handleNotification();
        }
        else {
            alert('Select row first')
        }
    }

    

    const columns = [
        {
            field: "date", sortable: true, filter: true, floatingFilter: true,
            valueFormatter: function (params) {
                return format(new Date(params.data.date), 'dd.MM.yyyy hh:mm')
            }
        },
        { field: "duration", sortable: true, filter: true, floatingFilter: true },
        { field: "activity", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: 'Customer', field: 'firstname', sortable: true, filter: true, floatingFilter: true, valueGetter(params)
            {
                if(params.data.customer){
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname;
                }
                else {
                    return "No assigned customer"
                }
            },
        },
        { cellRenderer: DeleteTraining, deleteTraining: { deleteTraining }, width: 100, maxWidth: 100 },
    ]

    return (
        <div>
            <b>Training List</b>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Training removed succesfully!</Alert>
            </Snackbar>
            <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto', justifyContent:'center', alignItems:'center' }} >
                <AgGridReact
                        ref={gridRef}
                        onGridReady={ params => gridRef.current = params.api }
                        rowSelection="single"
                        columnDefs={columns}
                        rowData={trainings}
                        animateRows='true'
                    >
                </AgGridReact>
            </div>
        </div>
    );
}
