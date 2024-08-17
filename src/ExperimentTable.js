import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Autosuggest from 'react-autosuggest';
import { useImperativeHandle, forwardRef } from 'react';
import { AutocompleteSelectCellEditor } from "ag-grid-autocomplete-editor";
import 'ag-grid-autocomplete-editor/dist/main.css';

const DurationEditor = forwardRef((props, ref) => {
    const [selectedValue, setSelectedValue] = useState(props.value);

    // Component Editor Lifecycle methods
    useImperativeHandle(ref, () => ({
        getValue() {
            return selectedValue;
        }
    }));

    const onKeyDown = (event) => {
        const key = event.key;


    };

    return (
        <select
            value={selectedValue}
            onChange={(event) => setSelectedValue(event.target.value)}
            onKeyDown={(event) => onKeyDown(event)}
        >
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2 months">2 months</option>
        </select>
    );
});


const handleEditClick = (rowData) => {
    // Handle the edit action (e.g., open a modal for editing)
    console.log('Edit clicked for row:', rowData);
  };
  
  const handleUpdateClick = (rowData) => {
    // Handle the update action (e.g., send updated data to the backend)
    console.log('Update clicked for row:', rowData);
  };
  
  const handleDeleteClick = (rowData) => {
    // Handle the delete action (e.g., confirm deletion and send delete request to the backend)
    console.log('Delete clicked for row:', rowData);
  };




function actionCellRenderer(props){

    return (
    <div>
        <button onClick={() => handleEditClick(props.data)}>Edit</button>
        <button onClick={() => handleUpdateClick(props.data)}>Update</button>
        <button onClick={() => handleDeleteClick(props.data)}>Delete</button>
      </div>
    );    
}

const ExperimentTable = () => {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const colors = ['Red', 'Green', 'Blue'];
  const selectData = [
    { value: 0, label: "this" },
    { value: 1, label: "is" },
    { value: 2, label: "sparta" },
    { value: 3, label: "yolo" },
    { value: 4, label: "yoloooooo" },
    { value: 5, label: "yola" },
    { value: 6, label: "yoli" },
    { value: 7, label: "yolu" },
    { value: 8, label: "yolp" },
    { value: 9, label: "yolop" },
    { value: 10, label: "yolpo" },
    { value: 11, label: "yolui" },
    { value: 12, label: "yolqw" },
    { value: 13, label: "yolxz" },
    { value: 14, label: "yolcv" },
    { value: 15, label: "yolbn" }
  ];
  const [colDefs, setColDefs] = useState(
    [

        { headerName: 'Name', field: 'name', editable: true },
        { headerName: 'Description', field: 'description', editable: true },
        {
            headerName: 'Date',
            field: 'date',
            editable: true,
            cellEditor: 'agDateStringCellEditor',
            cellEditorParams: {
                min: '2000-01-01',
                max : '2025-12-31',
            }
        },
        {
            headerName: 'Duration',
            field: 'duration',
            width: 90,
            editable: true,
            cellEditor: DurationEditor,
            singleClickEdit : true,
          
          },
        { headerName: 'Location', field: 'location', editable: true },
        
        {
            headerName: "Researcher",
            field: "researcher",
            cellEditor: AutocompleteSelectCellEditor,
            cellEditorParams: {
                selectData: [
                    { label: 'Canada', value: 'CA', group: 'North America' },
                    { label: 'United States', value: 'US', group: 'North America' },
                    { label: 'Uzbekistan', value: 'UZ', group: 'Asia' },
                ],
                placeholder: 'Select an option',
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.label || params.value.value || params.value;
                }
                return "";
            },
            editable: true,
          },
        {
            headerName: "action",
            minWidth: 150,
            cellRenderer: actionCellRenderer,
            editable: false,
            colId: "action"
        },
      ]);
      const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: true,
          editable: true,
        };
      }, []);

  useEffect(() => {
    const fetchExperimentData = async () => {
      try {
        const response = await fetch('http://localhost:8080/experiments');
        const data = await response.json();

        setRowData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExperimentData();
  }, []);





  const handleCellValueChanged = (params) => {
    const { newValue, node } = params;
    // Update your data with the new value
    const updatedData = [...rowData];
    updatedData[node.rowIndex].autoSuggestValue = newValue;
    setRowData(updatedData);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          domLayout="autoHeight"
          onCellValueChanged={handleCellValueChanged}

        />
      )}
    </div>
  );
};


export default ExperimentTable;
