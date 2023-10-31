import Link from "next/link";
import styles from "../styles/Footer.module.css";

/**
 * Footer
 * @return  {JSX}  Footer
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Created by{" "}
        <Link className={styles.portfolio} href="https://sb011.github.io/">
          Smit Bhoraniya
        </Link>{" "}
        with ❤️
      </p>
    </footer>
  );
};

export default Footer;
