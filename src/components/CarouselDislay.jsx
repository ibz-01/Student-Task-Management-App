export default function CarouselDisplay({ groupedTasks }) {
  return (
    <div id="carousel-dates" className="carousel slide">
      <div className="carousel-indicators">
        {Object.keys(groupedTasks).map((dateLabel, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#carousel-dates"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {Object.entries(groupedTasks).map(([dateLabel, tasks], idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            <div className="slide-content">
              <h3>{dateLabel}</h3>
              <ul>
                {tasks.map((t, i) => (
                  <li key={i}>
                    <strong>
                      {t.start} - {t.end}
                    </strong>
                    : {t.task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carousel-dates"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carousel-dates"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
