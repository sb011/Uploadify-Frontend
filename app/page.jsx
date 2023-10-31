"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Loading from "../components/Loading";
import styles from "../styles/page.module.css";
import ButtonContainer from "../components/ButtonContainer";

/**
 * Upload File Page
 * @return  {JSX}  Upload File Page
 */
const UploadFile = () => {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check if the user is logged in
   * @return  {void}
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.replace("/login");
      return;
    }
    setIsLoading(false);
  }, []);

  /**
   * Handle file change
   * @param   {object}  e  Event
   * @return  {void}
   */
  const handleFileChange = (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    // Check file size
    if (e.target.files[0].size > 5000000) {
      setError("File size should be less than 10MB");
      return;
    }

    // Upload the file
    fetch("/api/files/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setMessage("File uploaded successfully");
          return res.json();
        }
        throw new Error("File upload failed");
      })
      .then((data) => {
        setUrl(data.publicId);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.mainContainer}>
      <ButtonContainer file="upload" />
      <div className={styles.container}>
        <p className={styles.header}>Upload file</p>
        <div className={styles.uploadContainer}>
          <input
            className={styles.input}
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
          <div className={styles.uploadText}>Choose File</div>
        </div>
      </div>
      {message && (
        <div className={styles.messageContainer}>
          <>
            <p className={styles.message}>{message}</p>
            <Link href={url} className={styles.url}>
              {url}
            </Link>
          </>
        </div>
      )}
      {error && (
        <div className={styles.messageContainer}>
          <p className={styles.error}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
