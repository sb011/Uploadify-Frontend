"use client";
import { useEffect, useState } from "react";
import { getDataAPI, deleteDataAPI } from "../../Config/ApiConfig";
import styles from "../../styles/Files.module.css";
import { useRouter } from "next/navigation";

const Files = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.replace("/login");
      return;
    }
    getDataAPI("files/")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  });

  const onDelete = (id) => {
    deleteDataAPI(`files/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.header}>Files</p>
        <div className={styles.headers}>
          <div className={styles.tableHeader}>PublicId</div>
          <div className={styles.tableHeader}>Url</div>
          <div className={styles.tableHeader}>MediaType</div>
          <div className={styles.tableHeader}>ExpiresAt</div>
          <div className={styles.tableHeader}>Delete</div>
        </div>
        {files.length === 0 && <div className={styles.noData}>No data</div>}
        {files.map((file) => {
          <div className={styles.dataContainer}>
            <div className={styles.data}>{file.publicId}</div>
            <div className={styles.data}>
              <Link href={file.publicId}>{file.publicId}</Link>
            </div>
            <div className={styles.data}>{file.mediaType}</div>
            <div className={styles.data}>{file.expiresAt}</div>
            <div className={styles.data} onClick={onDelete(file.id)}>
              Delete
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Files;
