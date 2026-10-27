import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard.tsx";
import "./FeedPage.css";
import { getPosts } from "../../services/postService.ts";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        setError("Não foi possível carregar as publicações.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Carregando publicações...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="feed-page">
      <h1>Publicações</h1>

      <p className="feed-description">Minhas postagens</p>

      <div className="posts-list">
        {posts.map(
          (post: {
            id: string;
            title: string;
            content: string;
            created_at: string;
          }) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              created_at={post.created_at}
            />
          ),
        )}
      </div>
    </section>
  );
}

export default FeedPage;
