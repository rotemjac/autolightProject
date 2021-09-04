import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {registerAction} from '../actions/userActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//todo: design lock icon color
//todo: design register button color

// import {registerValidationSchema} from 'formsValidation/validationSchems';
// var {registerValidationSchema} =require('./formsValidation/validationSchems');

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#143a7e",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('User name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm password does not match password'),
});


function RegisterScreen(props) {
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, errorMsg} = userRegister;

    const onSubmit = (form) => {
        dispatch(registerAction(form.username, form.email, form.password, props.history))
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
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="User name *"
                                autoFocus
                                {...register('username')}
                                error={errors.username != null || errorMsg != null}
                                helperText={errors.username ? errors.username.message : (errorMsg ? errorMsg : "")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address *"
                                {...register('email')}
                                error={errors.email != null}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                variant="outlined"
                                fullWidth
                                id="password"
                                label="Password *"
                                type="password"
                                {...register('password')}
                                error={errors.password != null}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="rePassword"
                                label="Confirm Password *"
                                type="password"
                                id="rePassword"
                                {...register('confirmPassword')}
                                error={errors.confirmPassword != null}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default RegisterScreen;
