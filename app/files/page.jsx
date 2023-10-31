"use client";
import { useEffect, useState } from "react";
import { getDataAPI, deleteDataAPI } from "../../Config/ApiConfig";
import styles from "../../styles/Files.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonContainer from "../../components/ButtonContainer";
import Loading from "../../components/Loading";

const Files = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.replace("/login");
      return;
    }
    getDataAPI("files")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onDelete = (id) => {
    setIsLoading(true);
    deleteDataAPI(`files/${id}`)
      .then((res) => {
        setFiles(files.filter((file) => file.id !== id));
      })
      .catch((error) => {
        setError(error.response.data.msg);
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
      <ButtonContainer file="files" />
      <div className={styles.container}>
        <p className={styles.header}>Files</p>
        <div className={styles.headers}>
          <div className={styles.tableHeader}>Filename</div>
          <div className={styles.tableHeader}>PublicId</div>
          <div className={styles.tableHeader}>MediaType</div>
          <div className={styles.tableHeader}>Size(KB)</div>
          <div className={styles.tableHeader}>ExpiresAt</div>
          <div className={styles.tableHeader}>Delete</div>
        </div>
        {files.length === 0 && <div className={styles.noData}>No data</div>}
        {files.map((file) => (
          <div className={styles.dataContainer} key={file.publicId}>
            <div className={styles.data}>{file.fileName}</div>
            <div className={styles.data}>
              <Link href={`${file.publicId}`}>{file.publicId}</Link>
            </div>
            <div className={styles.data}>{file.mediaType}</div>
            <div className={styles.data}>{file.size}</div>
            <div className={styles.data}>{file.expiresAt}</div>
            <div className={styles.data}>
              <button
                className={styles.btn}
                onClick={() => {
                  onDelete(file.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
