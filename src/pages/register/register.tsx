import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";

const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Senha é obrigatória"),
});

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create-user",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Status:", response.status);
      console.log("Dados retornados:", response.data);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="sectionRegister">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} placeholder="Nome" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input type="text" {...register("email")} placeholder="Email" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div className="buttons">
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
          <Link to="/" className="link">
            Voltar ao Login
          </Link>
        </div>
      </form>
    </section>
  );
}
