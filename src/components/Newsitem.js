import React from "react";

export default function Newsitem(props) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={props.urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{
              zIndex: 1,
              left : '90%'
            }}
          >
            {props.source}
          </span>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">
            <small className="text-body-light time">{props.publishedAt} </small>
          </p>
          <p className="card-text">
            <small className="text-body-light author">{props.author} </small>
          </p>
          <a href={props.url} target="__blank" className="btn btn-primary">
            Visit
          </a>
        </div>
      </div>
    </>
  );
}
