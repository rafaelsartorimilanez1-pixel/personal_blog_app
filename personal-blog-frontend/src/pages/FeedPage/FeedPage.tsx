import PostCard from "../../components/PostCard/PostCard.tsx";
import "./FeedPage.css";

function FeedPage() {
  const posts = [
    {
      id: "1",
      title: "Por que decidi criar meu próprio blog",
      content:
        "Um espaço para compartilhar ideias, aprendizados e experiências durante minha jornada na programação.",
      created_at: "2026-10-10",
    },
    {
      id: "2",
      title: "Aprendendo sobre APIs e arquitetura",
      content:
        "Entendendo como controllers, services e repositories trabalham juntos em uma aplicação.",
      created_at: "2026-10-08",
    },
  ];

  return (
    <section className="feed-page">
      <h1>Publicações</h1>

      <p className="feed-description">Minhas postagens</p>

      <div className="posts-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            created_at={post.created_at}
          />
        ))}
      </div>
    </section>
  );
}

export default FeedPage;
