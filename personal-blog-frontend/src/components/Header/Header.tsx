import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Personal.blog</h1>
      </Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/login">Entrar</Link>
        <Link to="/register">Cadastrar</Link>
      </nav>
    </header>
  );
}

export default Header;
