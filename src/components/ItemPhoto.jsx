import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  NavLink,
} from "reactstrap";

function ItemPhoto(props) {
  let image = "http://127.0.0.1:8000/photos/" + props.route;
  return (
    <div className="col-md-4">
      <Card style={{ width: "18rem", padding: "10px" }}>
        <img alt="Sample" src={image} />
        <CardBody>
          <CardTitle tag="h5">{props.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <NavLink>
              <b>Galería:</b> {props.gallery}
            </NavLink>
            <NavLink>
              <b>Categoría:</b> {props.category}
            </NavLink>
          </CardSubtitle>
          <CardText>{props.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default ItemPhoto;
