"use client";
import styles from "../styles/page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonContainer from "../components/ButtonContainer";
import Loading from "../components/Loading";

const UploadFile = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.replace("/login");
      return;
    }
    setIsLoading(false);
  }, []);

  const handleFileChange = (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    if (e.target.files[0].size > 5000000) {
      setError("File size should be less than 10MB");
      return;
    }
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
