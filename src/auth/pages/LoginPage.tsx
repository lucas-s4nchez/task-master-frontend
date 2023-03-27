import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthLayout } from "../layout/AuthLayout";
import {
  Button,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/apiSlice";
import { onLogin, onLogout } from "../../store/authSlice";
import { useEffect } from "react";
import { Input } from "../../ui/components/Input";

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

  const {
    getFieldProps,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es obligatorio")
        .matches(regEmail, "Email no válido"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
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
          {/* <div className="flex flex-col mt-4">
            <label
              htmlFor="inputEmail"
              className={`cursor-pointer text-gray-700 duration-300 transform mb-1  px-2 ${
                touched.email && !!errors.email
                  ? "text-red-600"
                  : "text-gray-700"
              }`}
            >
              Correo electronico:
            </label>
            <input
              type="email"
              autoComplete="off"
              className={`w-full rounded border py-4 px-2 outline-none transition-all duration-200 ease-linear ${
                touched.email && !!errors.email
                  ? "border-red-600 focus:border-red-700"
                  : "border-gray-400 focus:border-blue-500"
              }`}
              id="inputEmail"
              placeholder="correo@correo.com"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && (
              <p className="text-red-600 text-xs py-1 px-2">{errors.email}</p>
            )}
          </div> */}
          <div className="flex flex-col mt-4">
            <label
              htmlFor="inputPassword"
              className={`cursor-pointer text-gray-700 duration-300 transform mb-1  px-2 ${
                touched.password && !!errors.password
                  ? "text-red-600"
                  : "text-gray-700"
              }`}
            >
              Contraseña:
            </label>
            <input
              type="password"
              autoComplete="off"
              className={`w-full rounded border py-4 px-2 outline-none transition-all duration-200 ease-linear ${
                touched.password && !!errors.password
                  ? "border-red-600 focus:border-red-700"
                  : "border-gray-400 focus:border-blue-500"
              }`}
              id="inputPassword"
              placeholder="******"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && (
              <p className="text-red-600 text-xs py-1 px-2">
                {errors.password}
              </p>
            )}
          </div>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                title="Iniciar sesión"
                aria-label="Iniciar sesión"
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
                <Typography>Iniciar sesion</Typography>
              </Button>
            </Grid>
            {/* {errorMessage && <MessageAlert message={errorMessage} />} */}
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1, fontSize: 14 }}>
              ¿No tienes una cuenta?
            </Typography>
            <Link
              component={RouterLink}
              sx={{ fontSize: 14 }}
              color="inherit"
              to={"/auth/register"}
            >
              registrarse
            </Link>
          </Grid>
        </div>
      </form>
    </AuthLayout>
  );
};
