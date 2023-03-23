import styles from "../styles/Home.module.css";
import { MintNFTs } from "../components/MintNFTs";

export default function Home() {
  return (
    <div>
      <div className={styles.App}>
        <MintNFTs />{" "}
      </div>
    </div>
  );
}
