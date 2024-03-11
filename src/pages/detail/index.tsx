import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
const Detail = () => {
  const { cripto } = useParams();
  return (
    <div>
      <h1>páginas de detalhes {cripto}</h1>
    </div>
  );
};

export default Detail;
