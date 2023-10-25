"use client"
import { authenticateUser } from "@/utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function logIn(){
    const router = useRouter();
    const [formErrors, setFormErrors] = useState({});


function postLogIn(){
    router.push('/');
};

async function userLogIn(evt) {
    evt.preventDefault();
    const userData = {
        username: evt.target["username"].value,
        password: evt.target["password"].value,
    };

    const res = await authenticateUser(userData.username, userData.password);

    if(res.success){
        postLogIn();
    } else {
        setFormErrors(res.res.error);
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