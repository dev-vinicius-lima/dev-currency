import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Ops... Esta página não existe!</h1>
      <Link to={"/"}>Acessar Cripto Moedas</Link>
    </div>
  );
};

export default NotFound;
