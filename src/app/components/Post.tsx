import { ExtendedPost } from "../types";
import formatDate from "../utils/format-date";

export default function Post({ post }: { post: ExtendedPost }) {
  return (
    <li className="list-group-item">
      <small className="fw-semibold">{formatDate(post.updatedAt)}</small>
      <div>
        <p dangerouslySetInnerHTML={{ __html: post.title }} />
        <p dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div>
        <span className="small fst-italic text-secondary">
          {post.published ? "Published" : "Unpublished"}
        </span>
        <span className="small ms-2">
          {post.postTags.map((postTag) => (
            <span key={postTag.id} className="badge text-bg-secondary me-1">
              {postTag.tag.name}
            </span>
          ))}
        </span>
      </div>
    </li>
  );
}
