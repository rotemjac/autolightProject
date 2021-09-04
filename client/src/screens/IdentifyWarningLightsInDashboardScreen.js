import React, {useEffect, useState} from 'react';
import {DropzoneArea} from 'material-ui-dropzone'
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {useSelector, useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    saveDashImgAction, identifyWarningLightsInDashboardAction,
    clearErrorMsgAction
} from '../actions/identifyWarningLightsInDashboardActions';

import InputLabel from "@material-ui/core/InputLabel";
import {LoopCircleLoading} from 'react-loadingg';
import {Dialog, DialogActions, DialogContent, DialogContentText, Icon} from '@material-ui/core';
import {spacing} from '@material-ui/system';
import "./IdentifyWarningLightsInDashboardScreen.css"

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DoneIcon from '@material-ui/icons/Done';
import {MuiThemeProvider, createTheme} from "@material-ui/core/styles";
//todo: style number of lights (make lable look better and the number input smaller)
//todo: option to take picture from camera if we are on mobile

//todo: set python interpreter not only locally

const theme = createTheme({
    overrides: {
        MuiDropzonePreviewList: {
            image: {
                width: '80%',
                height: '80%',
            },
            imageContainer: {
                maxWidth: '80%',
                flexBasis: '80%',
            }
        },
        MuiDropzoneArea: {
            root: {
                width: '80%'
            }
        }
    }
});

const validationSchema = Yup.object().shape({
    warningLightsNum: Yup.number()
        .required("This field is required")
        .integer("This field should be a whole number")
        .typeError('This field is required')
        .min(1, 'This field should be 1 or greater')
});

function IdentifyWarningLightsInDashboardScreen(props) {

    const dispatch = useDispatch();
    const identifyWarningLightsInDashboard = useSelector(state => state.identifyWarningLightsInDashboard);
    let {resultsIds, loading, errorMsg} = identifyWarningLightsInDashboard;
    const [imgError, setImgError] = useState(null);
    const [isImageLoaded, SetIsImageLoaded] = useState(false);
    const [imgName, SetImgName] = useState("");
    //todo: should be async ?
    const onSubmit = async (form) => {
        if (isImageLoaded == true)
            dispatch(identifyWarningLightsInDashboardAction(form.warningLightsNum, props.history, imgName));
    }

    const saveUploadedPictureInDrop = async (uploadedFile) => {
        SetIsImageLoaded(true);
        dispatch(saveDashImgAction(uploadedFile));
        setImgError("");
        SetImgName(uploadedFile[0].name)
    }

    const handleImgdelete = () => {
        SetIsImageLoaded(false);
        SetImgName("");
        setImgError("Dashboard image is required");
    }

    const onModalClosed = async () => {
        dispatch(clearErrorMsgAction());
    }

    const setDropZoneText = () => {
        let str = "";
        if (isImageLoaded == false)
            str = "Drag and drop a dashboard image here, or click to select image";
        return str;
    }

    const setDropZoneIcon = () => {
        if (isImageLoaded == false)
            return CloudUploadIcon;
        return DoneIcon;
    }

    const handleSubmitClick = () => {
        if (isImageLoaded == false)
            setImgError("Dashboard image is required");
    }

    const {
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // const classes = useStyles();
    return (

        <Container>
            {/* Header */}
            <Box className="headerBox" fontSize={32}> Search Warning Lights By Dashboard Image </Box>

            <Backdrop className='backdrop' open={loading === true}>
                <div>
                    <LoopCircleLoading/>
                </div>

                <div className="progressText">Warning lights identification in progress...</div>
            </Backdrop>

            <Dialog open={errorMsg != null}>
                <DialogContent>
                    <DialogContentText>
                        <strong> No results were found.<br/>Please try other image</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button m={2} className='okBtn' onClick={onModalClosed} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


            <div className='paper'>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} className="gridRoot">
                        <Grid item xs={10} className="gridItem">
                            <MuiThemeProvider theme={theme}>
                                <DropzoneArea
                                    previewGridClasses={{container: "dropRoot", item: "dropImgCon"}}
                                    //previewGridProps
                                    showFileNamesInPreview={true}
                                    name="dashboardPic"
                                    id="dashboardPic"
                                    maxFileSize={10000000}
                                    filesLimit={1}
                                    accept="image/*"
                                    onDrop={saveUploadedPictureInDrop}
                                    dropzoneText={setDropZoneText()}
                                    Icon={setDropZoneIcon()}
                                    dropzoneParagraphClass="dropText"
                                    // Drag and drop a dashboard image here, or click to select image
                                    type="file"
                                    onDelete={handleImgdelete}
                                    showFileNames={true}
                                    alertSnackbarProps={{anchorOrigin: {vertical: 'top', horizontal: 'center'}}}>
                                </DropzoneArea>
                            </MuiThemeProvider>
                        </Grid>
                        <Grid item xs={10} className="gridItem">
                            <span className='error'>{imgError}</span>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} className="gridItem">

                            {/* <InputLabel className='inputLbl' htmlFor="warningLightsNum">Number of warning light to search</InputLabel>
                <TextField
                    className='inputField'
                    id="warningLightsNum"
                    name="warningLightsNum"
                    type="number"
                    {... register('warningLightsNum')}
                    error={errors.warningLightsNum!=null}
                    helperText={errors.warningLightsNum?.message}
                /> */}

                            <TextField
                                id="warningLightsNum"
                                name="warningLightsNum"
                                label="Number of warning light to search"
                                type="number"
                                defaultValue="0"
                                InputProps={{
                                    classes: {root: "inputRoot"},
                                    // classes: { root: "inputRoot", underline:"underline" } ,
                                    inputProps: {min: 1} //todo:need ?
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    // classes: { root: "labelRoot" },
                                }}
                                variant="outlined"
                                {...register('warningLightsNum')}
                                error={errors.warningLightsNum != null}
                                helperText={errors.warningLightsNum?.message}
                                style={{width: 253}}

                            />

                            <Button
                                // onClick={checkImgUploaded}
                                type="submit"
                                // fullWidth
                                variant="contained"
                                color="primary"
                                className='submit'
                                onClick={handleSubmitClick}
                                // mt={3}
                            >
                                Identify warning lights
                            </Button>

                        </Grid>
                    </Grid>
                </form>
                `
            </div>
        </Container>

    );

}

export default IdentifyWarningLightsInDashboardScreen;
