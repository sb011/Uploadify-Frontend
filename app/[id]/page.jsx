"use client";
import { useEffect, useState } from "react";
import { getDataAPI } from "../../Config/ApiConfig";

import Loading from "../../components/Loading";
import styles from "../../styles/Download.module.css";

/**
 * Download Page
 * @param   {object}    params  Parameters from the url
 * @return  {JSX}               Download Page
 */
const Download = ({ params }) => {
  const id = params.id;

  const [file, setFile] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Get file data from the API
   */
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

  /**
   * Download the file
   * @return  {void}
   */
  const onDownload = async () => {
    // Get the file
    const response = await fetch(file.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a link and click it
    const a = document.createElement("a");
    a.href = url;
    a.download = file.publicId + "." + file.type;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Loading
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
