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
export const addProjectValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("El título es obligatorio")
    .min(5, "el título debe tener al menos 5 caracteres")
    .max(100, "el título no debe pasar de 100 caracteres"),
  description: Yup.string()
    .trim()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(250, "La descripción no debe pasar de 250 caracteres"),
});
export const addTaskValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("El título es obligatorio")
    .min(5, "el título debe tener al menos 5 caracteres")
    .max(100, "el título no debe pasar de 100 caracteres"),
  description: Yup.string()
    .trim()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(250, "La descripción no debe pasar de 250 caracteres"),
  assignedTo: Yup.array()
    .required("Debes asignar la tarea a un usuario como mínimo")
    .min(1, "Debes asignar la tarea a un usuario como mínimo"),
});
