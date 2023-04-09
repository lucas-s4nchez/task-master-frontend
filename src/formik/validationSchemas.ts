import * as Yup from "yup";
import { regEmail } from "./regex";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("El email es obligatorio")
    .matches(regEmail, "Email no válido"),
  password: Yup.string()
    .trim()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string().trim().required("El nombre es obligatorio"),
  email: Yup.string()
    .trim()
    .required("El email es obligatorio")
    .matches(regEmail, "Email no válido"),
  password: Yup.string()
    .trim()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
export const addCollaboratorValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("El email es obligatorio")
    .matches(regEmail, "Email no válido"),
});
