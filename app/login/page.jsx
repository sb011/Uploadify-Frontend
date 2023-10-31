"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postDataAPI } from "../../Config/ApiConfig";

import Link from "next/link";
import styles from "../../styles/Login.module.css";

/**
 * Login Page
 * @return  {JSX}  Login Page
 */
const Login = () => {
  const router = useRouter();

  const state = {
    email: "",
    password: "",
  };

  const [error, setError] = useState("");
  const [info, setInfo] = useState(state);

  const { email, password } = info;

  /**
   * Check if the user is logged in
   */
  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (token !== null) {
      router.replace("/login");
      return;
    }
  }, []);

  /**
   * Handle input change
   * @param   {object}  e  Event
   * @return  {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  /**
   * Submit the form
   * @param   {object}  e  Event
   * @return  {void}
   */
  const onSubmit = (e) => {
    e.preventDefault();

    // Check if the fields are filled
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    setError("");

    // Send the data to the API
    postDataAPI("authentication/login", info)
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
