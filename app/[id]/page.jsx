"use client";
import styles from "../../styles/Download.module.css";
import { useEffect, useState } from "react";
import { getDataAPI } from "../../Config/ApiConfig";
import axios from "axios";

const Download = ({ params }) => {
  const id = params.id;
  const [files, setFiles] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getDataAPI(`/`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  });

  const onDownload = () => {
    axios.get(fileUrl).catch((error) => {
      setError(error.response.data.msg);
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.header}>File</p>
        <div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>PublicId</div>
            <div className={styles.data}>{files.publicId}</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>Url</div>
            <div className={styles.data}>{files.url}</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>MediaType</div>
            <div className={styles.data}>{files.mediaType}</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>ExpiresAt</div>
            <div className={styles.data}>{files.expiresAt}</div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.btn} onClick={onDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Download;
