import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostById } from "../../services/postService";
import "./PostPage.css";
import { getComments } from "../../services/commentService";
import CommentForm from "../../components/CommentForm/CommentForm";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string | null;
  user_name: string | null;
  content: string;
  created_at: string;
}

function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comment, setComment] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentError, setCommentsError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!id) {
          setError("ID da publicação não foi informado.");
          return;
        }

        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        setError("Não foi possível carregar a publicação.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function fetchComments() {
    try {
      if (!id) return;

      const data = await getComments(id);
      setComment(data);
      setCommentsError("");
    } catch (error) {
      setCommentsError("Não foi possivel carregar os comentários.");
    } finally {
      setCommentLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [id]);

  if (loading) {
    return <p>Carregando publicação...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Publicação não encontrada.</p>;
  }

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

        <CommentForm postId={id!} onCommentCreated={fetchComments} />

        {commentLoading ? (
          <p>Carregando comentários...</p>
        ) : commentError ? (
          <p>{commentError}</p>
        ) : comment.length === 0 ? (
          <p>Esta publicação ainda não possui comentários.</p>
        ) : (
          comment.map((comment) => (
            <article key={comment.id}>
              <strong>{comment.user_name ?? "Usuário desconhecido"}</strong>

              <p>{comment.content}</p>

              <small>
                {new Date(comment.created_at).toLocaleDateString("pt-BR")}
              </small>
            </article>
          ))
        )}
      </section>
    </article>
  );
}

export default PostPage;
