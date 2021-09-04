// import * as Yup from "yup";
//
// let registerValidationSchema = Yup.object().shape({
//     username: Yup.string()
//         .required('User name is required'),
//     email: Yup.string()
//         .required('Email is required')
//         .email('Email is invalid'),
//     password: Yup.string()
//         .required('Password is required')
//         .min(6, 'Password must be at least 6 characters'),
//     confirmPassword: Yup.string()
//         .required('Confirm password is required')
//         .oneOf([Yup.ref('password'), null], 'Confirm password does not match password'),
// });
//
// module.exports = registerValidationSchema;
// // module.exports = {registerValidationSchema};
