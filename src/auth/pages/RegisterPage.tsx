import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../store/apiSlice";
import { Alert, Button, Input } from "../../ui/components";
import { registerInitialValues, registerValidationSchema } from "../formik";
import { onLogin, onLogout } from "../../store/authSlice";
import { ICustomFetchBaseQueryError } from "../../interfaces";

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [register, { data, isLoading, isSuccess, error }] =
    useRegisterMutation();
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("authToken", data.token); // guarda el token en localStorage
      dispatch(onLogin({ username: data.username, token: data.token }));
    }
    if (error) {
      dispatch(onLogout());
    }
  }, [isSuccess, data, error]);

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: registerInitialValues,
      validationSchema: registerValidationSchema,
      onSubmit: async (values) => {
        await register({ ...values });
      },
    });

  return (
    <>
      <AuthLayout title="Crear cuenta">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input
              id="inputUsername"
              type="text"
              name="username"
              label="Nombre de usuario:"
              placeholder="Mike Tyson"
              value={values.username}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isError={touched.username && !!errors.username}
              errorMessage={errors.username}
            />
            <Input
              id="inputEmail"
              type="email"
              name="email"
              label="Correo electronico:"
              placeholder="correo@correo.com"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isError={touched.email && !!errors.email}
              errorMessage={errors.email}
            />
            <Input
              id="inputPassword"
              type="password"
              name="password"
              label="Contraseña:"
              placeholder="********"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isError={touched.password && !!errors.password}
              errorMessage={errors.password}
            />
            <div className="mt-6">
              <Button type="submit" disabled={isLoading} fullWidth>
                Crear Cuenta
              </Button>
            </div>
            <div className="flex justify-end mt-4 gap-1">
              <span className="text-sm text-dark-300 dark:text-light-400">
                ¿Ya tienes una cuenta?
              </span>
              <Link className="text-sm text-primary-50" to={"/auth/login"}>
                Ingresa!
              </Link>
            </div>
          </div>
        </form>
      </AuthLayout>
      {error && (
        <Alert variant="error">
          {(error as ICustomFetchBaseQueryError).data?.msg}
        </Alert>
      )}
    </>
  );
};
