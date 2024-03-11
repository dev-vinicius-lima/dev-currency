import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";

interface ApiResponse {
  data: CoinProp;
}
interface CoinProp {
  symbol: string;
  name: string;
  marketCapUsd: string;
  priceUsd: string;
  volumeUsd24Hr: string;
  formatedPrice: string;
  formatedMarket: string;
  changePercent24Hr: string;
  erro?: string;
}
const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<CoinProp>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(`https://api.coincap.io/v2/assets/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((data: ApiResponse) => {
          const coinData = data.data;

          if (!coinData || !coinData.priceUsd || !coinData.marketCapUsd) {
            navigate("/");
            throw new Error("Invalid data received: " + JSON.stringify(data));
          }
          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
          const resultData = {
            ...coinData,
            formatedPrice: price.format(Number(coinData.priceUsd)),
            formatedMarket: price.format(Number(coinData.marketCapUsd)),
          };

          setDetail(resultData);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
    }
    getData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações...</h4>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>

      <section className={styles.content}>
        <p>
          <strong>Preço: </strong>
          {detail?.formatedPrice}
        </p>
        <p>
          <strong>Delta 24H: </strong>
          <span
            className={
              Number(detail?.changePercent24Hr) >= 0
                ? styles.profit
                : styles.loss
            }
          >
            {detail?.changePercent24Hr}
          </span>
        </p>
        <p>
          <strong>Valor de mercado: </strong>
          {detail?.formatedMarket}
        </p>
      </section>
    </div>
  );
};

export default Detail;
