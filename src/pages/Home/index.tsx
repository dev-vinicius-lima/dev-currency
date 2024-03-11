import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { BsSearch } from "react-icons/bs";

interface CoinsProps {
  name: string;
  id: string;
  image: string;
  marketCapUsd: string;
  priceUsd: string;
  changePercent24Hr: string;
  symbol: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  data: CoinsProps[];
}

const Home = () => {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch("https://api.coincap.io/v2/assets")
        .then((res) => res.json())
        .then((data: DataProps) => {
          const coinsData = data.data.slice(0, 15);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.priceUsd)),
              formatedMarket: price.format(Number(item.marketCapUsd)),
            };
            return formated;
          });
          setCoins(formatResult);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inputValue === "") return;
    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o símbolo da moeda: BTC ..."
          onChange={(e) => setInputValue(e.target.value)}
        />
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
          {coins.map((coin) => {
            const changePercent24HrFormatted = Number(
              coin.changePercent24Hr
            ).toFixed(2);

            return (
              <tr key={coin.name} className={styles.tr}>
                <td className={styles.tdLabel} data-label="moeda">
                  <Link to={`/assets/${coin.id}`} className={styles.link}>
                    <span className={styles.link}>{coin.name}</span> |{" "}
                    {coin.symbol}
                  </Link>
                </td>
                <td className={styles.tdLabel} data-label="mercado">
                  {coin.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label="preço">
                  {coin.formatedPrice}
                </td>
                <td
                  className={
                    parseFloat(changePercent24HrFormatted) >= 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                  data-label="volume"
                >
                  <span>{changePercent24HrFormatted}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
