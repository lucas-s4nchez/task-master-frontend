import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { AuthLayout } from "../layout/AuthLayout";
import { Input, Button, Alert } from "../ui/components";
import { useLoginMutation } from "../store/api/apiSlice";
import { onLogin, onLogout } from "../store/auth/authSlice";
import { loginInitialValues, loginValidationSchema } from "../formik";
import { ICustomFetchBaseQueryError } from "../interfaces/data";

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
export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
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

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: loginInitialValues,
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        await login({ ...values });
      },
    });

  return (
    <>
      <AuthLayout title={"Iniciar sesión"}>
        <motion.form
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col">
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
              <Button
                size="medium"
                bgColor="primary"
                type="submit"
                disabled={isLoading}
                fullWidth
              >
                Iniciar sesion
              </Button>
            </motion.div>
            <motion.div className="flex justify-end mt-4 gap-1" variants={item}>
              <span className="text-sm text-dark-300 dark:text-light-400">
                ¿No tienes una cuenta?
              </span>
              <Link className="text-sm text-primary-50" to={"/auth/register"}>
                Crea una aquí!
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