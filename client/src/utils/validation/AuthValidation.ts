import {object, ref, string} from "yup";

export const AuthValidation = object().shape({
    email: string()
        .required('Required field')
        .min(10, 'Field must have minimum 10 symbols')
        .max(40, 'Field must have maximum 40 symbols')
        .email(`It's don't valid email`),
    password: string()
        .required('Required field')
        .min(3, 'Field must have minimum 3 symbols')
        .max(10, 'Field must have maximum 10 symbols')
});