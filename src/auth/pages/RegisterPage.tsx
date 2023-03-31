import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../store/api/apiSlice";
import { Alert, Button, Input } from "../../ui/components";
import { registerInitialValues, registerValidationSchema } from "../formik";
import { onLogin, onLogout } from "../../store/auth/authSlice";
import { ICustomFetchBaseQueryError } from "../../interfaces";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};
const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [register, { data, isLoading, isSuccess, error }] =
    useRegisterMutation();
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("authToken", data.token);
      dispatch(
        onLogin({
          token: data.token,
          username: data.username,
          email: data.email,
          uid: data.uid,
        })
      );
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
        <motion.form
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col">
            <motion.div variants={item}>
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
            </motion.div>
            <motion.div variants={item}>
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
            </motion.div>
            <motion.div variants={item}>
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
            </motion.div>
            <motion.div className="mt-6" variants={item}>
              <Button type="submit" disabled={isLoading} fullWidth>
                Crear Cuenta
              </Button>
            </motion.div>
            <motion.div className="flex justify-end mt-4 gap-1" variants={item}>
              <span className="text-sm text-dark-300 dark:text-light-400">
                ¿Ya tienes una cuenta?
              </span>
              <Link className="text-sm text-primary-50" to={"/auth/login"}>
                Ingresa!
              </Link>
            </motion.div>
          </div>
        </motion.form>
      </AuthLayout>
      {error && (
        <Alert variant="error">
          {(error as ICustomFetchBaseQueryError).data?.msg}
        </Alert>
      )}
    </>
  );
};
