import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true },
        { field: "lastname", sortable: true, filter: true, floatingFilter: true },
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true},
        { field: "postcode", sortable: true, filter: true, floatingFilter: true},
        { field: "city", sortable: true, filter: true, floatingFilter: true},
        { field: "email", sortable: true, filter: true, floatingFilter: true},
        { field: "phone", sortable: true, filter: true, floatingFilter: true}
        
       
    ]


    return (
        <div>
         <b>Customer List</b>
            <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto', justifyContent:'center', alignItems:'center' }} >
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
        </div>
    );
}