import React, {useRef, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import "./EditableTableRow.css"
import {AiOutlineUpload} from "react-icons/all"

import {Button} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

const EditableTableRow = ({light, handleCancel, handlePreformEdit}) => {
    const [image, setImage] = useState(light.displayImgPath);
    const imageRef = useRef()
    const [editData, setEditData] = useState({
        Name: light.Name,
        Image: light.displayImgPath,
        Explanation: light.Explanation,
        Recommendation: light.Recommendation,
        Severity: light.Severity.length == 4 ? light.Severity.substring(0, 1) : light.Severity.substring(0, 2)
    })

    return (
        <TableRow key={light.Id} className="row">
            <TableCell align="center" component="th" scope="row" className="first-cell">
                {light.Id}
            </TableCell>
            <TableCell align="center">
                <input type="text"
                       required="required"
                       name="Name"
                       className="textField"
                       value={editData.Name}
                       onChange={(e) => setEditData({...editData, Name: e.target.value})}
                />
            </TableCell>
            <TableCell align="center" className={"cell"}>
                <Tooltip title="Choose Image">
                    <label htmlFor="imgInp"><AiOutlineUpload className="icon"/></label>
                </Tooltip>
                <input accept="image/*" type='file' id="imgInp" name="warningLightImg" className="img-field"
                       onChange={(e) => e.target.files[0] ? setEditData({
                           ...editData,
                           Image: e.target.files[0]
                       }) : undefined}/>

            </TableCell>
            <TableCell align="center">
                <textarea name="explanation" className="text-area-field"
                          value={editData.Explanation}
                          onChange={(e) => setEditData({...editData, Explanation: e.target.value})}/>
            </TableCell>
            <TableCell align="center">
                <textarea name="recommendation" className="text-area-field"
                          value={editData.Recommendation}
                          onChange={(e) => setEditData({...editData, Recommendation: e.target.value})}/>
            </TableCell>
            <TableCell align="center">
                <input type="number" className="severity" name="severity"
                       value={editData.Severity.length === 4 ? editData.Severity.substring(0, 1) : editData.Severity.substring(0, 2)}
                       onChange={(e) => setEditData({...editData, Severity: e.target.value})}
                       min="0" max="10" onKeyDown={(e) => {
                    e.preventDefault();
                }}/>
            </TableCell>
            <TableCell align="center">

                <ButtonGroup>
                    <Tooltip title="Cancel">
                        <Button
                            size="small" variant="text" className="editIcons"
                            onClick={(event) => handleCancel(event)}><ClearIcon fontSize="small"/>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Save">
                        <Button onClick={(e) => handlePreformEdit(editData)}
                                className="editIcons"
                                variant="text"
                                component="label"
                        >
                            <SaveIcon color="primary"/>
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    )
};
export default EditableTableRow;


