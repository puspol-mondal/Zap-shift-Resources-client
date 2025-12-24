import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { SignInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handelLogin = (data) => {
    SignInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" align-middle fieldset bg-base-200 border-base-300 rounded-box border p-4">
      <form onSubmit={handleSubmit(handelLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email")}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register("password")}
          />
          <div>
            <a className=" link link-hover">Forget Password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
          <div>
            <p>
              Are you new here?
              <Link
                state={location.state}
                className=" font-bold text-[18px]"
                to={"/register"}
              >
                Register
              </Link>{" "}
            </p>
          </div>
        </fieldset>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
