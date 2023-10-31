"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import { postDataAPI } from "../../Config/ApiConfig";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const state = {
    email: "",
    password: "",
  };
  const [info, setInfo] = useState(state);
  const [error, setError] = useState("");

  const { email, password } = info;

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
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    postDataAPI("auth/login", info)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("name", res.data.name);
        redirect("/");
      })
      .catch((err) => {
        console.log(err);
        //setError(err.response.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.header}>Sign in</p>
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
          Sign in
        </button>
        <p className={styles.footerLine}>
          <Link href="/register">Don't have an user?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
