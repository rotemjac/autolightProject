import React, {useState} from "react";
import "./addWarningLightForm.css"
import {handleAddWarningLight} from "../actions/productActions";
import TextField from '@material-ui/core/TextField';
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Box from '@material-ui/core/Box';
import {Modal, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default function AddWarningLightFrom({goToEndOfTable}) {

    const [chosenFile, setChosenFile] = useState("No file chosen");
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    function addLight(e) {
        e.preventDefault();
        let img = e.target.warningLightImg.files[0];
        dispatch(handleAddWarningLight(goToEndOfTable, e.target.name.value, e.target.explanation.value, e.target.recommendation.value, img, e.target.color.value, e.target.severity.value, e.target.isCommon.checked));
        e.target.reset();
        setChosenFile("No file chosen");
        setModalOpen(false);
    }

    const presentChosenFile = (e) => {
        if (e.target.files[0] !== undefined) {
            setChosenFile(e.target.files[0].name);
        }
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    }
    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Button
                className="submit-add-light"
                variant="contained"
                component="label"
                onClick={handleModalOpen}
            >
                Add Warning Light
                <AddBoxIcon color="primary"/>
                <input
                    style={{width: "1px", display: "none"}}
                    type="submit"
                />
            </Button>
            <Modal
                open={modalOpen}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <Box color="textSecondary">

                        <form onSubmit={addLight} className="add-form">
                            <IconButton aria-label="close" className="closeBtn" onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                            <TextField
                                name="name"
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Warning light name"
                                autoFocus
                                required
                            />
                            <br/>
                            <br/>

                            <label>Image:</label>
                            <Button
                                className="upload-button"
                                variant="contained"
                                component="label"
                            >
                                choose image
                                <SaveAltIcon className="upload-button-icon" color="primary"/>
                                <input
                                    className="upload-button-input"
                                    required="required"
                                    name="warningLightImg"
                                    onChange={presentChosenFile}
                                    accept="image/*"
                                    type="file"
                                />
                            </Button>

                            <label>{chosenFile}</label>
                            <br/>
                            <br/>

                            <TextField
                                name="explanation"
                                aria-label="minimum height" minRows={4}
                                variant="outlined"
                                fullWidth
                                multiline
                                required
                                id="explanation"
                                label="Explanation"
                                autoFocus
                            />

                            <br/>
                            <br/>

                            <TextField
                                name="recommendation"
                                aria-label="minimum height" minRows={4}
                                variant="outlined"
                                fullWidth
                                multiline
                                required
                                id="recommendation"
                                label="Recommendation"
                                autoFocus
                            />

                            <br/>
                            <br/>

                            <label>Severity:</label>
                            <TextField
                                autoFocus
                                name="severity"
                                defaultValue="0"
                                type="number"
                                InputProps={{
                                    disableUnderline: true,
                                    inputProps: {
                                        max: 10, min: 0
                                    }
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}/>

                            <FormLabel style={{padding: "5px"}}>
                                <input name="isCommon" type="checkbox" className="checkBox"/>
                                Is common
                            </FormLabel>
                            <br/>

                            <FormLabel className="colorLbl">Color: </FormLabel>
                            <FormLabel style={{padding: "5px"}}>
                                <input type="radio" id="red" name="color" value="red" defaultChecked={"checked"}
                                       className="radioBtn"/>
                                Red
                            </FormLabel>
                            <FormLabel style={{padding: "5px"}}>
                                <input type="radio" id="yellow" name="color" value="yellow" className="radioBtn"/>
                                Yellow
                            </FormLabel>
                            <FormLabel style={{padding: "5px"}}>
                                <input type="radio" id="green" name="color" value="green" className="radioBtn"/>
                                Green
                            </FormLabel>
                            <FormLabel style={{padding: "5px"}}>
                                <input type="radio" id="blue" name="color" value="blue" className="radioBtn"/>
                                Blue
                            </FormLabel>

                            <br/>
                            <br/>

                            <Button
                                className="submit-add-light"
                                variant="contained"
                                component="label"
                            >
                                Add Warning Light
                                <AddBoxIcon color="primary"/>
                                <input
                                    style={{width: "1px", display: "none"}}
                                    type="submit"
                                />
                            </Button>
                        </form>
                    </Box>
                </div>
            </Modal>
        </div>
    )
}
