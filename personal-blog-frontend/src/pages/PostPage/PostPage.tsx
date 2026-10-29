import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostById } from "../../services/postService";
import "./PostPage.css";
import {
  getComments,
  updateComment,
  deleteComment,
} from "../../services/commentService";
import CommentForm from "../../components/CommentForm/CommentForm";
import { useAuth } from "../../contexts/AuthContext";

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
  const { userId, isAdmin } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comment, setComment] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentError, setCommentsError] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editError, setEditError] = useState("");

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

  async function handleUpdateComment(commentId: string) {
    if (!editedContent.trim()) {
      setEditError("O comentário não pode ficar vázio.");
      return;
    }

    try {
      setEditError("");

      await updateComment(commentId, editedContent.trim());

      setEditingCommentId(null);
      setEditedContent("");

      await fetchComments();
    } catch (error) {
      setEditError("Não foi possível atualizar o comentário.");
    }
  }

  async function handleDeleteComment(commentId: string) {
    const confirmed = window.confirm(
      "Tem certeza que desa excluir este comentário?",
    );

    if (!confirmed) return;

    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch {
      setCommentsError("Não foi possível excluir o comentário.");
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

        {comment.map((comment) => {
          const isOwner = comment.user_id === userId;

          return (
            <article key={comment.id} className="comment-card">
              <strong className="comment-author">
                {comment.user_name ?? "Usuário desconhecido"}
              </strong>

              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(event) => setEditedContent(event.target.value)}
                    rows={3}
                  />

                  {editError && <p>{editError}</p>}

                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="comment-button"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditedContent("");
                      setEditError("");
                    }}
                    className="comment-button"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <p className="comment-content">{comment.content}</p>

                  <small className="comment-date">
                    {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                  </small>

                  {isOwner && (
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedContent(comment.content);
                        setEditError("");
                      }}
                      className="comment-button"
                    >
                      Editar
                    </button>
                  )}

                  {(isOwner || isAdmin) && (
                    <button
                      type="button"
                      className="comment-button comment-delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Excluir
                    </button>
                  )}
                </>
              )}
            </article>
          );
        })}
      </section>
    </article>
  );
}

export default PostPage;
