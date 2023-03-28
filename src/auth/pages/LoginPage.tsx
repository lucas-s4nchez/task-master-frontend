import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthLayout } from "../layout/AuthLayout";
import { Input, Button } from "../../ui/components";
import { useLoginMutation } from "../../store/apiSlice";
import { onLogin, onLogout } from "../../store/authSlice";
import { loginInitialValues, loginValidationSchema } from "../formik";

const regEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("authToken", data.token); // guarda el token en localStorage
      dispatch(onLogin({ username: data.username, token: data.token }));
    }
    if (error) {
      console.log(error);
      dispatch(onLogout());
    }
  }, [isSuccess, data, error]);

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: loginInitialValues,
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        await login({ ...values });
      },
    });

  return (
    <AuthLayout title={"Iniciar sesión"}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
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
              Iniciar sesion
            </Button>
          </div>
          <div className="flex justify-end mt-4 gap-1">
            <span className="text-sm text-dark-300 dark:text-light-400">
              ¿No tienes una cuenta?
            </span>
            <Link className="text-sm text-primary-50" to={"/auth/register"}>
              Crea una aquí!
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
