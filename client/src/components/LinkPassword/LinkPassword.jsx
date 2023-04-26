import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./LinkPassword.css"
export default function LinkPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/user/forgotPassword", {
        email: email,
      })
      .then((response) => {
        console.log("mail sent");
      })
      .catch((error) => {
        console.error("error sent", error);
      });
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <Header />
      <div style={{ margin: 100 }}>
        <h1 className="title-password">write the user email to which you want to change the password</h1>
        <form className="Form-Password" onSubmit={handleSubmit}>
        <h5 className="email-password">Email</h5>
          <input  className="Input-password"
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <button className="button-sent" type="submit">Sent</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
