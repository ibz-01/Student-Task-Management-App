



export default function Collapse(props) {
  return (
    <div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${props.id}`}
        aria-expanded="false"
        aria-controls={props.id}
      >
        {props.title}
      </button>

      <div style={{ minHeight: "120px" }}>
        <div className="collapse collapse-horizontal" id={props.id}>
          <div className="card card-body" style={{ width: "300px" }}>
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
}
