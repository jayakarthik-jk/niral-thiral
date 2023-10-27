"use client";

import * as z from "zod";
import Container from "./Container";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function ContactSection() {
  return (
    <section id="contact" className="my-10">
      <Container>
        <div className="flex w-full flex-col">
          <div className="header flex flex-col items-center justify-center gap-3 p-10">
            <p className="text-sm font-light text-slate-500">
              Having Question?
            </p>
            <h1 className="text-3xl font-extrabold">CONTACT US</h1>
          </div>
          <div className="body flex w-full items-center justify-center">
            <Details />
            <ProfileForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

const Details = () => {
  return (
    <div className="left-details flex w-[30%] flex-col gap-5">
      <div>
        <span className="text-sm text-slate-600">Address: </span>
        <h2 className="font-bold">OMR, Kazhipattur</h2>
      </div>
      <div>
        <span className="text-sm text-slate-600">Mobile: </span>
        <h2 className="font-bold">9080388158</h2>
      </div>
      <div>
        <span className="text-sm text-slate-600">Email: </span>
        <h2 className="font-bold">testmail@gmail.com</h2>
      </div>
    </div>
  );
};

const formSchema = z.object({
  fistName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string(),
  email: z.string().email(),
  mobile: z.string().min(10),
  message: z.string(),
});

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message: string;
}

const ProfileForm = () => {
  function validate(inputs: FormValues) {
    const result = formSchema.safeParse({
      fistName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      mobile: inputs.mobile,
      message: inputs.message,
    });
    console.log(result.success);

    if (result.success) {
    }
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="right-form flex w-[70%] flex-col gap-4 rounded-md border p-10"
      onSubmit={(event) => {
        event.preventDefault();
        validate({
          firstName,
          lastName,
          mobile,
          email,
          message,
        });
      }}
    >
      <div className="flex gap-4">
        <Input
          className="rounded-none border border-x-0 border-b border-t-0 shadow-none"
          onChange={(ev) => setFirstName(ev.target.value)}
          placeholder="Your Name"
        />
        <Input
          className="rounded-none border border-x-0 border-b border-t-0 shadow-none"
          onChange={(ev) => setLastName(ev.target.value)}
          placeholder="LastName"
        />
      </div>
      <div className="flex gap-4">
        <Input
          className="rounded-none border border-x-0 border-b border-t-0 shadow-none"
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Email"
        />
        <Input
          className="rounded-none border border-x-0 border-b border-t-0 shadow-none"
          onChange={(ev) => setMobile(ev.target.value)}
          placeholder="Your Number"
        />
      </div>
      <Textarea
        className="rounded-none border border-x-0 border-b border-t-0 shadow-none"
        onChange={(ev) => setMessage(ev.target.value)}
        placeholder="Your Message..."
      />
      <Button variant={"default"} type="submit">
        Send Message
      </Button>
    </form>
  );
};

export default ContactSection;
