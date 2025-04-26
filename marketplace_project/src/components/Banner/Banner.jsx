import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../../assets/header-img.svg";
import './Banner.css'
import 'animate.css';
import TrackVisibility from 'react-on-screen';



export default function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Women cloth", "child cloth", "Men cloth" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <section
      className="banner"
     
      style={{
        color: 'white',
        
      }}
    >
      <Container  >
        <Row >
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to online marketplace</span>
                  <h1>
                    {`Discover, sell and find extraordinary Products `}
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Women cloth", "child cloth", "Men cloth" ]'>
                      <span className="wrap">{text}</span>
                      <p>
                        Our online marketplace system is a digital platform that allows buyers and sellers to connect,  </p>
                        <p style={{marginLeft: '10px',marginTop:'0px'}}>interact,and engage in the buying and selling of goods or services.</p>
                       
                        <p style={{marginTop: '0px'}}>
                          The system acts as an intermediary, 
                         facilitating transactions between multiple parties </p>
                    </span>
                  </h1>
                </div>
              }
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""} style={{ textAlign: 'right' }}>
<img
  src={headerImg}
  alt="Header Img"
  style={{
    width: '80%',
    maxHeight: '600px',
    display: 'block',
    margin: '100px auto 0 auto', // marginTop, marginSides, marginBottom
    background: 'transparent',   // <=== Important
  }}
/>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
