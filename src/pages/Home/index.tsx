import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Digite o símbolo da moeda: BTC ..." />
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor do mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="moeda">
              <Link to={"/detail/btc"} className={styles.link}>
                <span className={styles.link}>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="mercado">
              R$ 1999
            </td>
            <td className={styles.tdLabel} data-label="preço">
              R$ 40.500
            </td>
            <td className={styles.tdProfit} data-label="volume">
              <span>- 5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default Home;
