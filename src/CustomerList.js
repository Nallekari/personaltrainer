import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import AddTraining from './AddTraining';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CSVLink } from "react-csv";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
            .then(data => setCustomers(data.content))
    }
    
    const handleNotification = () => {
        setOpen(true);
      };

      const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            fetch(gridRef.current.getSelectedNodes()[0].data.links[0].href, { method: 'DELETE' })
            .then(res => fetchData())
            .catch(err => console.error(err))
             handleNotification();
        }
        else {
            alert('Select row first')
        }
    }

    const addTraining = (training, link) => {
        console.log(training)
        console.log(link)
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))

    }

    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true , resizable: true, width: 140, maxWidth: 140},
        { field: "lastname", sortable: true, filter: true, floatingFilter: true , resizable: true, width: 140, maxWidth: 140},
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true, width: 160, maxWidth: 160},
        { field: "postcode", sortable: true, filter: true, floatingFilter: true, width: 140, maxWidth: 140},
        { field: "city", sortable: true, filter: true, floatingFilter: true, width: 140, maxWidth: 140},
        { field: "email", sortable: true, filter: true, floatingFilter: true, width: 200, maxWidth: 200},
        { field: "phone", sortable: true, filter: true, floatingFilter: true, width: 140, maxWidth: 140},
        { cellRenderer: EditCustomer, updateCustomer: { updateCustomer }, width: 100, maxWidth: 100 },
        { cellRenderer: DeleteCustomer, deleteCustomer: { deleteCustomer }, width: 100, maxWidth: 100 },
        { cellRenderer: AddTraining, addTraining: { addTraining }, width: 140, maxWidth: 140 },
        
    ]

    return (
        <div>
            <b>Customer List</b>
            <AddCustomer saveCustomer={saveCustomer}></AddCustomer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Customer removed succesfully!</Alert>
            </Snackbar>
            <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }} >
                <AgGridReact
                        ref={gridRef}
                        onGridReady={ params => gridRef.current = params.api }
                        rowSelection="single"
                        columnDefs={columns}
                        rowData={customers}
                        animateRows='true'
                    >
                </AgGridReact>
            </div>
            <CSVLink data={customers} filename={"Customer Data"} separator={","}>Download Customer Info</CSVLink>;
        </div>
    );
}