import styles from "../styles/Loading.module.css";
import Image from "next/image";
import loading from "../public/loading.gif";

const Loading = () => {
  return (
    <div className={styles.container}>
      <Image className={styles.loading} src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
