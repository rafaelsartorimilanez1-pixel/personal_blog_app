import { Link } from "react-router-dom";
import "./PostCard.css";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

function PostCard({ id, title, content, created_at }: PostCardProps) {
  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${id}`}>{title}</Link>

        <p>{content}</p>

        <small>{new Date(created_at).toLocaleDateString("pt-BR")}</small>
      </h2>
    </article>
  );
}

export default PostCard;
