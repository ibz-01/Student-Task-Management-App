import { useState } from "react";

export default function Collapse(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mb-3">
      {/* Custom Collapse Button */}
      <button
        className="collapse-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${props.id}`}
        aria-expanded={isOpen}
        aria-controls={props.id}
        onClick={toggle}
      >
        <span>{props.title}</span>
        <span className={`collapse-arrow ${isOpen ? "open" : ""}`}>
          <i className="bi bi-chevron-right"></i>
        </span>
      </button>

      {/* Collapsible Content */}
      <div style={{ minHeight: "120px" }}>
        <div className="collapse" id={props.id}>
          <div className="collapse-content">{props.text}</div>
        </div>
      </div>
    </div>
  );
}
