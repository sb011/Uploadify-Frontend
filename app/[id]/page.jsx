"use client";
import styles from "../../styles/Download.module.css";
import { useEffect, useState } from "react";
import { getDataAPI } from "../../Config/ApiConfig";
import Loading from "../../components/Loading";

const Download = ({ params }) => {
  const id = params.id;
  const [file, setFile] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDataAPI(`files/${id}`)
      .then((res) => {
        setFile(res.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onDownload = async () => {
    // using fetch
    const response = await fetch(file.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.publicId + "." + file.type;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.header}>File</p>
        <div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>Filename</div>
            <div className={styles.data}>{file.fileName}</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>PublicId</div>
            <div className={styles.data}>{file.publicId}</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>MediaType</div>
            <div className={styles.data}>{file.mediaType}</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>ExpiresAt</div>
            <div className={styles.data}>{file.expiresAt}</div>
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
