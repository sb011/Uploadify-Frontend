"use client";
import styles from "./page.module.css";
import { useState } from "react";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.header}>Upload file</p>
        <div>
          <input
            className={styles.input}
            type="file"
            id="file"
            name="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
