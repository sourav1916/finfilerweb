export function ServiceCardSkeleton() {
  return (
    <article className="service-card service-card--skeleton">
      <div className="service-card-body">
        <div className="service-card-icon skeleton-block" />
        <div className="skeleton-line skeleton-line--title" />
        <div className="skeleton-line skeleton-line--text" />
        <div className="skeleton-line skeleton-line--text short" />
        <div className="skeleton-line skeleton-line--link" />
      </div>
    </article>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div className="detail-skeleton animate-pulse">
      <div className="skeleton-line skeleton-line--back" />
      <div className="skeleton-line skeleton-line--title" />
      <div className="skeleton-line skeleton-line--subtitle" />
      <div className="detail-skeleton-price" />
      <div className="detail-skeleton-list">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-line skeleton-line--row" />
        ))}
      </div>
      <div className="skeleton-line skeleton-line--button" />
    </div>
  );
}
