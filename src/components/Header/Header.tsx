import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <Link className={styles.header} href="/">
      The Best Recipes!
    </Link>
  );
}
