
import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format, compareAsc } from 'date-fns';



export default function CustomerList() { 
    
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
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
        { headerName: 'Customer', field: 'firstname', sortable: true, filter: true, floatingFilter: true, valueGetter(params) {
            if(params.data.customer){
                return params.data.customer.firstname + ' ' + params.data.customer.lastname;
            }
            else {
                return "No assigned customer"
            }
            },
        },
    ]

    return (
        <div>
            <b>Training List</b>
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
