"use client";

import { useSelector } from "react-redux";
import { isValidToken, logOut } from "@/utils/auth";
import { useEffect } from "react";
import ThemeChange from "./ThemeChange";
import Link from "next/link";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    isValidToken();
  }, []);

  return (
    <div className="navbar flex flex-row justify-between">
      <Link href="/" className="btn btn-ghost normal-case text-xl h-12">
        Next Jobs
      </Link>
      <ul className="flex justify-evenly px-5">
        <li className="flex items-center">
          <ThemeChange />
          {isLoggedIn ? (
            <div>
            <Link href="/upload-jobs" className="btn btn-ghost p-4 ">
                Upload Jobs
            </Link>
            <Link href="/" className="btn btn-ghost p-4 " onClick={logOut}>
              Log Out
            </Link>
            </div>
          ) : (
            <div>
                <Link href="/sign-up" className="btn btn-ghost p-4">
                  Sign Up
                </Link>
                <Link href="/login" className="btn btn-ghost p-4">
                  Log In
                </Link>
                </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
