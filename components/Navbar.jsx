import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.png";
import styles from "../styles/Navbar.module.css";

/**
 * Navbar
 * @return  {JSX}  Navbar
 */
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={Logo} alt="Logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
