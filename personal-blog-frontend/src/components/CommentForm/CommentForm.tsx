import { useState } from "react";
import { createComment } from "../../services/commentService";

interface CommentFormProps {
  postId: string;
  onCommentCreated: () => void;
}

function CommentForm({ postId, onCommentCreated }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setError("Digite um comentário antes de enviar.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createComment(postId, content.trim());

      setContent("");
      onCommentCreated();
    } catch (error) {
      setError("Não foi possível enviar o comentário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-content">Seu comentário</label>

      <textarea
        id="comment-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button
      type="submit"
      disabled={loading}
      >
        {loading? "Enviando..." : "Enviar comentário"}
      </button>
    </form>
  );
}

export default CommentForm