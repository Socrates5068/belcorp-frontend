import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    ci: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/selec");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="mt-5 text-2xl font-light text-white">
        <span className="font-bold text-fuchsia-500">
          {" "}
          iniciando sesión en este formulario
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-10 mt-10 space-y-8 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="ci" className="text-2xl font-normal">
            C.I.
          </label>

          <input
            id="ci"
            type="ci"
            placeholder="C.I."
            className="w-full p-3 border border-gray-300"
            {...register("ci", {
              required: "El C.I. es obligatorio",
            })}
          />
          {errors.ci && <ErrorMessage>{errors.ci.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="text-2xl font-normal">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
        />
      </form>

      <nav className="flex flex-col mt-10 space-y-4">
        {/* {<Link
          to={'/auth/register'}
          className="font-normal text-center text-gray-300"
        >¿No tienes cuenta? Crear Una</Link>} */}

        <Link
          to={"#"}
          className="font-normal text-center text-gray-300"
        >
          ¿Olvidaste tu contraseña? Contacta con un Administrador para resetear tu contraseña
        </Link>
      </nav>
    </>
  );
}
