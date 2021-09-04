import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import "./StaticTableRow.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

const StaticTableRow = ({light, handleDelete, handleEdit}) => {
    return (
        <TableRow key={light.Id}>
            <TableCell align="center" component="th" scope="row" className="first-cell">
                {light.Id}
            </TableCell>
            <TableCell align="left" className="NameCell">{light.Name}</TableCell>
            <TableCell align="center"><img width="80%" height="80%" src={light.displayImgPath}/></TableCell>
            <TableCell align="left" className="detailsOfLight">{light.Explanation}</TableCell>
            <TableCell align="left" className="detailsOfLight">{light.Recommendation}</TableCell>
            <TableCell align="left">{light.Severity}</TableCell>
            <TableCell align="left">
                <ButtonGroup>
                    <Tooltip title="Delete">
                        <Button style={{borderRadius: "0.9em",}}
                                size="small" variant="text"
                                onClick={() => handleDelete(light.Id)}> <DeleteIcon color="secondary"/>
                        </Button>
                    </Tooltip>

                    <Tooltip title="Edit">
                        <Button style={{borderRadius: "0.9em", position: "relative", left: "5px", color: "#1abc9c"}}
                                size="small" variant="text" onClick={(event) => handleEdit(event, light)}><EditIcon
                            style={{color: "#1abc9c"}}/></Button>
                    </Tooltip>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    )
};
export default StaticTableRow;