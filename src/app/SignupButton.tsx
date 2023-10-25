"use client";
import { signIn } from "next-auth/react";

export const SignupButton = () => {
  return <button onClick={() => signIn("google")}>Sign up</button>;
};
