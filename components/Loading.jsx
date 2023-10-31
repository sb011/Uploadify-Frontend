import Image from "next/image";
import loading from "../public/loading.gif";
import styles from "../styles/Loading.module.css";

/**
 * Loading
 * @return  {JSX}  Loading
 */
const Loading = () => {
  return (
    <div className={styles.container}>
      <Image className={styles.loading} src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
