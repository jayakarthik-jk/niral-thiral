"use client";
import { signIn, signOut } from "next-auth/react";
import { NavItem } from "./NavItem";
import type { User } from "next-auth";

interface RegisterButtonProps {
  user?: User;
}

export default function RegisterButton({ user }: RegisterButtonProps) {
  if (user) {
    return (
      <NavItem variant="default" onClick={() => void signOut()}>
        {user.name ?? "Account"}
      </NavItem>
    );
  } else {
    return (
      <NavItem variant="default" onClick={() => void signIn("google")}>
        Register Now
      </NavItem>
    );
  }
}
