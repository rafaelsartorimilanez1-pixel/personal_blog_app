import { useParams } from "react-router-dom";
import "./PostPage.css"

function PostPage() {
  const { id } = useParams();

  const post = {
    title: "Por que decidi criar meu próprio blog",
    content:
      "Este é o conteúdo completo da publicação. Aqui poderei compartilhar ideias, aprendizados e experiências durante minha jornada na programação.",
    created_at: "2026-10-10",
  };

  return (
    <article className="post-page">
      <h1>{post.title}</h1>

      <small>
        Publicado em {new Date(post.created_at).toLocaleDateString("pt-BR")}
      </small>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <section>
        <h2>Comentários</h2>
        <p>Os comentarios vão aparecer aqui</p>
      </section>
    </article>
  );
}

export default PostPage
