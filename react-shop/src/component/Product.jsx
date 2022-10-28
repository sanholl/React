/* eslint-disable */

import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Product(props) {
  let navigate = useNavigate();

  let num = props.shoes.id;

  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
        onClick={() => {
          navigate(`./detail/${num}`);
        }}
        style={{ cursor: "pointer" }}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default Product;
