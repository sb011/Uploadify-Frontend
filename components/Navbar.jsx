import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
