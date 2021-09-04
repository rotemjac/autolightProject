import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signinAction} from '../actions/userActions';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

//todo: design lock icon color
//todo: design register button color

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('User name is required'),
    password: Yup.string()
        .required('Password is required')
});

function SigninScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, errorMsg} = userSignin;
    const dispatch = useDispatch();

    const onSubmit = async (form) => {
        // dispatch(signinAction(form.username, form.password,props.history));
        dispatch(signinAction(props.setUserName, props.setIsAdmin, form.username, form.password, props.history));

    }

    const {
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const classes = useStyles();
    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="userName"
                        label="User name *"
                        name="userName"
                        autoFocus
                        {...register('username')}
                        error={errors.username != null}
                        helperText={errors.username?.message}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password *"
                        type="password"
                        id="password"
                        {...register('password')}
                        error={errors.password != null}
                        helperText={errors.password?.message}
                    />

                    {errorMsg && <Typography color="error" component="h6">
                        {errorMsg}
                    </Typography>
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            {/*<Link href="/register" variant="body2">*/}
                            <Link href="/register" variant="body2">
                                Don't have an account? register now
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

}

export default SigninScreen;
