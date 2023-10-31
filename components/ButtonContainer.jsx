import { useRouter } from "next/navigation";

import Link from "next/link";
import styles from "../styles/ButtonContainer.module.css";

/**
 * Button Container
 * @param   {string}  file  Current file
 * @return  {JSX}  Button Container
 */
const ButtonContainer = ({ file }) => {
  const router = useRouter();

  /**
   * Logout the user
   * @return  {void}
   */
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
