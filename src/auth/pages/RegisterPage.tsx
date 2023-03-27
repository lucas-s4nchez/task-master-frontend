import { useEffect, useState } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../store/apiSlice";

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required("El nombre es obligatorio"),
      email: Yup.string()
        .required("El email es obligatorio")
        .email("Email no válido"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      const { error }: any = await register({ ...values });
      if (error) {
        console.log(error);
      }
    },
  });

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre de usuario"
              type="text"
              placeholder="Tu nombre"
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              {...getFieldProps("username")}
              error={!!errors.username && touched.username}
              helperText={touched.username && errors.username}
              sx={{
                "& label": {
                  color: "text.primary",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electronico"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              {...getFieldProps("email")}
              error={!!errors.email && touched.email}
              helperText={touched.email && errors.email}
              sx={{
                "& label": {
                  color: "text.primary",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="password"
              {...getFieldProps("password")}
              error={!!errors.password && touched.password}
              helperText={touched.password && errors.password}
              sx={{
                "& label": {
                  color: "text.primary",
                },
              }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                title="Crear cuenta"
                aria-label="Crear cuenta"
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
                <Typography>Crear cuenta</Typography>
              </Button>
            </Grid>
            {/* {errorMessage && <MessageAlert message={errorMessage} />} */}
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1, fontSize: 14 }}>
              ¿Ya tienes una cuenta?
            </Typography>
            <Link
              component={RouterLink}
              sx={{ fontSize: 14 }}
              color="inherit"
              to={"/auth/login"}
            >
              ingresa
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
