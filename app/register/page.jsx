"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/Register.module.css";
import { postDataAPI } from "../../Config/ApiConfig";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const state = {
    name: "",
    email: "",
    password: "",
  };
  const [info, setInfo] = useState(state);
  const [error, setError] = useState("");

  const { name, email, password } = info;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      router.replace("/login");
      return;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters");
      return;
    }
    if (!/\d/.test(password)) {
      setError("Password should contain at least one number");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password should contain at least one letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password should contain at least one capital letter");
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      setError("Password should contain at least one special character");
      return;
    }

    setError("");
    postDataAPI("authentication/register", info)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        router.replace("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.header}>Sign up</p>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.btn} type="submit" onClick={onSubmit}>
          Sign up
        </button>
        <p className={styles.footerLine}>
          <Link href="/login">Already have an user?</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
