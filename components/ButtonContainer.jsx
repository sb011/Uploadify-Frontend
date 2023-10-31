import Link from "next/link";
import styles from "../styles/ButtonContainer.module.css";
import { useRouter } from "next/navigation";

const ButtonContainer = ({ file }) => {
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.replace("/login");
  };

  return (
    <div className="button-container">
      {file !== "upload" && (
        <Link className={styles.btn} href="/">
          Upload
        </Link>
      )}
      {file !== "files" && (
        <Link className={styles.btn} href="/files">
          Files
        </Link>
      )}
      <button className={styles.btn} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default ButtonContainer;
