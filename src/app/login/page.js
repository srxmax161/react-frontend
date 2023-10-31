"use client"
import { authenticateUser } from "@/utils/auth";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAlert, setAlert } from "@/redux/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";

export default function logIn(){
    const router = useRouter();
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)

    useEffect(()=>{
      if(isLoggedIn){
        router.push('/')
        dispatch(setAlert({message: "Already logged in", type: "alert-warning"}));
        setTimeout(() => {
            dispatch(clearAlert());
        }, 3000)
      }
    },[isLoggedIn]);

function logIn(){
    router.push('/');
};

async function userLogIn(evt) {
    evt.preventDefault();
    const userData = {
        username: evt.target["username"].value,
        password: evt.target["password"].value,
    };

    const res = await authenticateUser(userData.username, userData.password);
    console.log(res);

    if(res.success){
        logIn()
        dispatch(setAlert({message: "Login successful!", type: "alert-success"}))
        setTimeout(() => {
            dispatch(clearAlert());
        }, 3000)
    } else { 
        const newFormErrors = {
            username: res.res.message || "",
            password: res.res.message || "",
          };
          setFormErrors(newFormErrors);
          dispatch(setAlert({ message: res.res.message, type: "alert-error" }));
          setTimeout(() => {
            dispatch(clearAlert());
          }, 3000)
    }
}

return (
    <div>
      <h1 className="text-center text-xl">Login into your account</h1>
      <div className="text-center">
      </div>
      <div className="flex justify-center items-center mt-8">
        <form onSubmit={userLogIn} className="w-1/3">
          <div className="form-control w-full">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              className="input input-bordered w-full"
              required
            />
            {formErrors["username"] && (
              <label className="label" htmlFor="username">
                <span className="label-text-alt text-red-500">
                  {formErrors["username"]}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder=""
              className="input input-bordered w-full"
              required
            />
            {formErrors["password"] && (
              <label className="label" htmlFor="password">
                <span className="label-text-alt text-red-500">
                  {formErrors["password"]}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full mt-4">
            <button className="btn btn-md">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}