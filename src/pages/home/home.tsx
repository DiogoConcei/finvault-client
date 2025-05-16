import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

import "./home.scss";

const loginSchema = yup.object({
  email: yup.string().email("Email Inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Senha é obrigatorio"),
});

type inputs = {
  email: string;
  password: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({ resolver: yupResolver(loginSchema) });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<inputs> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Status:", response.status);
      console.log("Dados retornados:", response.data);

      navigate("/user/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="sectionLogin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <p>{errors.password.message}</p>}
        <div className="buttons">
          <button type="submit">Entrar</button>
          <Link to="/register" className="link">
            Cadastrar-se
          </Link>
        </div>
      </form>
    </section>
  );
}
