import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser, registerUser } from "../../services/authService";
import "./LoginPage.css";

function LoginPage() {
  const { setToken } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError(" As senhas não coincidem.");
          return;
        }

        await registerUser({ name, email, password });

        setIsRegistering(false);
        setPassword("");
        setConfirmPassword("");
        setError("");
      } else {
        const data = await loginUser({ email, password });

        setToken(data.token);
      }
    } catch (error) {
      setError(
        isRegistering
          ? "Não foi possiven criar a conta. Verifique os dados"
          : "Não foi possível entrar. Confira seu email e senha.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <h1>{isRegistering ? "Criar conta" : "Entrar"}</h1>
      <p>
        {isRegistering
          ? "Crie sua conta para participar das conversas"
          : "Acesse sua conta para participar das conversas"}
      </p>

      <form onSubmit={handleLogin}>
        {isRegistering && (
          <>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {isRegistering && (
          <>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </>
        )}

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Aguarde..." : isRegistering ? "Criar conta" : "Entrar"}
        </button>
      </form>

      {isRegistering ? (
        <p>
          Já tem uma conta?{" "}
          <button type="button" onClick={() => setIsRegistering(false)}>
            Entrar
          </button>
        </p>
      ) : (
        <p>
          Ainda não tem uma conta?{" "}
          <button type="button" onClick={() => setIsRegistering(true)}>
            Criar conta
          </button>
        </p>
      )}
    </section>
  );
}

export default LoginPage;
