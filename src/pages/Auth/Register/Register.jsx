import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, userUpateProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("in register", location);

  const handelRegistration = (data) => {
    console.log(data.photo[0]);
    const imageFile = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        //1. store the image and get the photo url
        const formData = new FormData();
        formData.append("image", imageFile);

        //2. send the photo store and get the url
        const image_API_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(image_API_Url, formData).then((res) => {
          console.log("after image upload", res.data.data.url);
          //3. update the photo firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          userUpateProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location.state || "/");
            })
            .catch((e) => {
              console.log(e);
            });
        });
        //update user profile
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handelRegistration)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <label className="label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Your Full Name"
            {...register("name")}
          />{" "}
          <label className="label">Picture</label>
          <input
            type="file"
            className="file-input file-input-ghost"
            {...register("photo")}
          />
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <span className=" text-red-500">This field is required</span>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 7,
              // pattern:
              //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          {errors.password?.type === "required" && (
            <span className=" text-red-500">This field is required</span>
          )}{" "}
          {errors.password?.type === "minLength" && (
            <span className=" text-red-500">Password must be 7 charctor</span>
          )}{" "}
          {/* {errors.password?.type === "pattern" && (
            <span className=" text-red-500">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character.
            </span>
          )} */}
          <div>
            <a className=" link link-hover">Forget Password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
          <div>
            <p>
              Do you have already account?{" "}
              <Link
                state={location.state}
                className=" font-bold text-[18px]"
                to={"/login"}
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
