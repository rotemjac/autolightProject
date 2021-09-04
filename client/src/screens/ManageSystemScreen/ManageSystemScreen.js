import React, {useEffect, useState, Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './ManageSystemScreen.css'
import '../../adminComponents/MainTabs'
import {useDispatch, useSelector} from "react-redux";
import {listProducts, deleteWarningLight, handleEditWarningLights} from "../../actions/productActions";
import {bindActionCreators} from "redux"
import AddWarningLightFrom from "../../adminComponents/AddWarningLightForm";
import StaticTableRow from "../../adminComponents/StaticTableRow";
import EditableTableRow from "../../adminComponents/EditableTableRow";
import {TextField, Modal} from "@material-ui/core";


export default function SystemTable() {

    //useStates
    const [currentId, setCurrentId] = useState(null);
    const [searchParam, setSearchParam] = useState("");

    //handle methods
    const handlePreformEdit = (editedData) => {
        let img = editedData.Image;
        let name = editedData.Name;
        let explanation = editedData.Explanation;
        let severity = editedData.Severity;
        let recommendation = editedData.Recommendation;
        dispatch(handleEditWarningLights(currentId, name, explanation, recommendation, img, severity));
        setCurrentId(null);
    }
    const handleCancel = (event) => {
        event.preventDefault();
        setCurrentId(null);
    }

    const handleEdit = (event, light) => {
        event.preventDefault();
        setCurrentId(light.Id);
    }

    async function handleDelete(value) {
        dispatch(deleteWarningLight(value));
    }

    const warningLights = useSelector((state) => state.productList);
    const dispatch = useDispatch();


    //useEffect
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    function getWarningLightsData() {
        dispatch(listProducts());
    }

    const actionCreator = bindActionCreators({getWarningLightsData}, dispatch);

    const goToEndOfTable = () => {
        let tableBody = document.getElementById('TableBody');
        tableBody.childNodes[tableBody.childNodes.length - 1].scrollIntoView(false);
    }

    return (
        <div className="container">
            <TextField
                className="searchField"
                name="name"
                variant="outlined"
                color="primary"
                label="Search warning light"
                autoFocus
                fullWidth
                onChange={(e) => setSearchParam(e.target.value)}
            >
            </TextField>

            <TableContainer component={Paper} className="table-container">
                <Table className="table" aria-label="simple table">
                    <TableHead key="head" className="table-head">
                        <TableRow className="top-row" key="firstRow">
                            <TableCell align="center" className="Headers">ID</TableCell>
                            <TableCell align="center" className="Name">Name</TableCell>
                            <TableCell align="center" className="Img">Photo</TableCell>
                            <TableCell align="center" className="Exp">Explanation</TableCell>
                            <TableCell align="center" className="Exp">Recommendation</TableCell>
                            <TableCell align="center" className="Headers">Severity</TableCell>
                            <TableCell align="center" className="Headers">Functions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id="TableBody">
                        {warningLights.products && warningLights.products.filter((light) => light.Name.toLowerCase().includes(searchParam.toLowerCase())).sort((a, b) => a.Id > b.Id ? 1 : -1).map((light, i) =>
                            (
                                <Fragment key={light.Id + light.Name}>
                                    {
                                        currentId === light.Id ?
                                            (<EditableTableRow
                                                key={light.id}
                                                // className="row"
                                                light={light}
                                                handleCancel={handleCancel}
                                                handlePreformEdit={handlePreformEdit}
                                            />) :
                                            (<StaticTableRow
                                                // className="row"
                                                key={light.id}
                                                light={light}
                                                handleDelete={handleDelete}
                                                handleEdit={handleEdit}
                                            />)
                                    }
                                </Fragment>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <AddWarningLightFrom goToEndOfTable={goToEndOfTable}/>
        </div>
    );
}

