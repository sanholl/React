/* eslint-disable */

import { useState, createContext } from "react";
import { Button, Nav, Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

import "./App.css";

import bg from "./img/bg.png";
import data1 from "./data.js";

import Product from "./component/Product";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import About from "./pages/About";
import Event from "./pages/Event";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data1);
  let navigate = useNavigate();
  let [clickCount, setClickCount] = useState(2);
  let [loading, setLoading] = useState(false);
  let [stock] = useState(Context1);

  return (
    <div className="App">
      <Nav justify variant="tabs" defaultActiveKey="/" className="Navbar">
        <Nav.Item>
          <Nav.Link href="/" className="link">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            className="link"
            onClick={() => {
              navigate("./about");
            }}
          >
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            className="link"
            onClick={() => {
              navigate("./detail");
            }}
          >
            Detail
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            className="link"
            onClick={() => {
              navigate("./event");
            }}
          >
            Event
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-4"
            className="link"
            onClick={() => {
              navigate(-1);
            }}
          >
            이전
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled className="link">
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="main-bg"></div>
      {/* <div style={{ backgroundImage : 'url('+bg+')'}}></div> */}

      {/* <Link to="/">HOME</Link>
      <Link to="/detail">DETAIL</Link>
      <Link to="about">ABOUT</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Product shoes={shoes[i]} i={i + 1} />;
                  })}
                </div>
              </div>
              {loading == true ? <div>loading...</div> : null}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setLoading(true);
                  if (clickCount < 4) {
                    axios
                      .get(`https://codingapple1.github.io/shop/data${clickCount}.json`)
                      .then((data) => {
                        // console.log(data.data)
                        // console.log(shoes)
                        let copy2 = clickCount;
                        copy2 = copy2 + 1;
                        setClickCount(copy2);

                        let copy = [...shoes, ...data.data];
                        setShoes(copy);

                        setLoading(false);
                      })
                      .catch(() => {
                        console.log("ajax요청이 실패했을 경우");
                        setLoading(false);
                      });
                  } else {
                    setLoading(false);
                    alert("상품이 없습니다.");
                  }
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<h4>location</h4>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
