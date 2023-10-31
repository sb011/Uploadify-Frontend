"use client";
import styles from "../styles/page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UploadFile = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.replace("/login");
      return;
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    postDataAPI("files/upload", file)
      .then((res) => {
        setMessage("File uploaded successfully");
        setUrl(res.data.publicId);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  };
  return (
    <div className={styles.mainContainer}>
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
      {(error || message) && (
        <div className={styles.messageContainer}>
          {error && <p className={styles.error}>{message}</p>}
          {message && (
            <>
              <p className={styles.message}>{message}</p>
              <Link href={url} className={styles.url}>
                {url}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
