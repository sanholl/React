/*eslint-disable */

import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import styled from "styled-components";

import { Context1 } from "../App";

// let YellowBtn = styled.button`
//   background: ${ props => props.bg };
//   color: ${ props => props.bg == 'blue' ? 'white' : 'black' };
//   padding: 10px;
// `
// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `

// let NewBtn = styled(YellowBtn)`
//   border: none;
// `

// 에전 방식
// class Detail2 extends React.Component {
//   componentDidMount() {
// 컴포넌트 mount시 해당 코드 실행

//   }
//   componentDidUpdate() {
// 컴포넌트 update시 해당 코드 실행

//   }
//   componentDidUnmount() {
// 컴포넌트 unmount시 해당 코드 실행

//   }
// }

function Detail(props) {
  let { stock, shoes } = useContext(Context1);

  // for(var i = 0; i < 1000; i++){
  //   console.log('hi');
  // }

  let [count, setCount] = useState(0);
  let [alert1, setAlert] = useState(true);
  let [content, setContent] = useState();
  let [tab, setTab] = useState(1);
  let [fade, setFade] = useState("");

  let { id } = useParams();
  let copy = parseInt(id) + 1;

  let find = props.shoes.find(function (a) {
    return a.id == id;
  });
  let number = find.id + 1;

  useEffect(() => {
    // mount, update시 코드 실행해주는 useEffect
    let a = setTimeout(() => {
      // 3초 후 실행할 코드
      setAlert(false);
      console.log(1);

      return () => {
        clearTimeout(a);
      };
    }, 3000);
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, []);

  const isInitialMount = useRef(true);

  // useEffect(()=>{
  //   if(isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     if(isNaN(content) == true) {
  //       alert('숫자만!!');
  //     }
  //   }
  // }, [ content ])

  return (
    <div className={`container start ${fade}`}>
      {alert1 == true ? <Alert /> : null}
      {/* <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="yellow">버튼</YellowBtn>
        <NewBtn>버튼</NewBtn>
      </Box> */}
      <div>{count}</div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setContent(e.target.value);

            if (isNaN(content) == true) {
              e.target.value = "";
            }
          }}
        ></input>
      </div>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className="btn btn-primary"
        >
          버튼
        </button>
      </div>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + number + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{find.title}</h4>
          <p>{find.content}</p>
          <p>{find.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="pills" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(1);
            }}
          >
            Option 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              setTab(2);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={() => {
              setTab(3);
            }}
          >
            Option 3
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={tab} />
      <TabContent2 tab={tab} />
    </div>
  );
}

function TabContent(props) {
  if (props.tab == 1) {
    return <div style={{ color: "red" }}>content1</div>;
  } else if (props.tab == 2) {
    return <div style={{ color: "blue" }}>content2</div>;
  } else {
    return <div style={{ color: "green" }}>content3</div>;
  }
}
function TabContent2({ tab }) {
  // without if

  let [fade, setFade] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [tab]);

  let copy = tab - 1;
  return <div className={`start ${fade}`}>{[<div>content1</div>, <div>content2</div>, <div>content3</div>][copy]}</div>;
}

function Alert() {
  return <div className="alert alert-warning">3초 이내 구매시 할인</div>;
}

export default Detail;
