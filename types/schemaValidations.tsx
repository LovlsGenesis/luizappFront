import * as yup from 'yup';

export const childSchema = yup.object({
  name: yup.string().required('errors.name'),
  parent: yup.number(),
});

export const loginSchema = yup.object({
  login: yup.number().required('errors.login'),
  password: yup.string().required('errors.password'),
});

export const registerSchema = yup.object({
  type: yup.string().required('errors.type'),
  name: yup.string().required('errors.name'),
  password: yup.string().required('errors.password'),
});

export const transactionSchema = yup.object({
  type: yup.string().required('errors.type'),
  value: yup
    .number()
    .typeError('errors.mustBeNumber')
    .required('errors.value')
    .moreThan(0, 'errors.minValue'),
  description: yup.string(),
});
