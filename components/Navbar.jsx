import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={styles.name}>
        <p>Hello, Your Name</p>
      </div>
      <div className={styles.logout}>Logout</div>
    </nav>
  );
};

export default Navbar;
