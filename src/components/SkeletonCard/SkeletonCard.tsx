import './SkeletonCard.css';

export default function SkeletonCard() {
    return (
        <article className="skeleton-card">
            <div className="skeleton-poster shimmer"></div>
            <div className="skeleton-content">
                <div className="skeleton-title shimmer"></div>
                <div className="skeleton-year shimmer"></div>
            </div>
        </article>
    );
}
