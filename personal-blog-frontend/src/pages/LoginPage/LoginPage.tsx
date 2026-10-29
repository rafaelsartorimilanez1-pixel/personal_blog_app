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
          setError("As senhas não coincidem.");
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
    } catch {
      setError(
        isRegistering
          ? "Não foi possível criar a conta. Verifique os dados."
          : "Não foi possível entrar. Confira seu e-mail e senha.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h1 className="login-title">
          {isRegistering ? "Criar conta" : "Entrar"}
        </h1>

        <p className="login-description">
          {isRegistering
            ? "Crie sua conta para participar das conversas."
            : "Acesse sua conta para participar das conversas."}
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          {isRegistering && (
            <>
              <label className="login-label" htmlFor="name">
                Nome
              </label>
              <input
                className="login-input"
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </>
          )}

          <label className="login-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="login-input"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label className="login-label" htmlFor="password">
            Senha
          </label>
          <input
            className="login-input"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isRegistering ? "new-password" : "current-password"}
            required
          />

          {isRegistering && (
            <>
              <label className="login-label" htmlFor="confirmPassword">
                Confirmar senha
              </label>
              <input
                className="login-input"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </>
          )}

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? "Aguarde..." : isRegistering ? "Criar conta" : "Entrar"}
          </button>
        </form>

        <p className="login-switch">
          {isRegistering ? "Já tem uma conta? " : "Ainda não tem uma conta? "}

          <button
            className="login-switch-button"
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
          >
            {isRegistering ? "Entrar" : "Criar conta"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
