"use client";
import React from "react";
import "./page.scss";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";
import { MdLock } from "react-icons/md";
import PrivateRouter from "./components/PrivateRouter.js/PrivateRouter";

export default function Home() {
  return (
    <div className="login">
      <Navbar title="LOGIN" subtitle="Authentication" />
      <div className="login__icon">
        <MdLock size={92} />
      </div>

      <div className="login__form">
        <Form type="login" />
      </div>
    </div>
  );
}
