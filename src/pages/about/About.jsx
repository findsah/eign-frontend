import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import c from '../../assets/images/c.png';
import check from '../../assets/icons/check.png';
import aboutroom from '../../assets/images/a-room.png';
import aboutDawn1 from '../../assets/images/a-dawn1.png';
import aboutDawn2 from '../../assets/images/a-dawn2.png';
import aboutvision1 from '../../assets/images/a-vision1.png';
import aboutvision2 from '../../assets/images/a-vision2.png';
import aboutrectdown from '../../assets/images/a-rectdown.png';
import aboutRectangle from '../../assets/images/a-rectangle.png';
import aboutmeeting from '../../assets/images/a-meeting.png';
export default function About() {
  return (
    <div className="about">
    <div className="to-gain">
        <Container>
            <Row className="m-0">
                <Col lg={3} md={3} sm={12} xs={12} className="showCol" style={{ display: "none" }}>
                    <div className="missionimg1">
                        <img src={aboutDawn1} alt="aboutDawn1" className="aboutDawn1" />
                        <img src={aboutRectangle} alt="aboutRectangle" className="aboutRectangle" />
                    </div>
                </Col>
                <Col lg={5} md={5} sm={12} xs={12}>
                    <div className="missiontalks">
                        <div>
                            <h2>Mission</h2>
                            <p>
                                Our mission is to disrupt Canada’s real
                                estate industry by providing buyers, sellers,
                                renters and leasers with the resources they need
                                to make better decisions, craft better deals, and save
                                thousands of dollars without needing an intermediary.
                            </p>
                        </div>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12} className="hideCol">
                    <div className="missionimg1">
                        <img src={aboutDawn1} alt="aboutDawn1" className="aboutDawn1" />
                        <img src={aboutRectangle} alt="aboutRectangle" className="aboutRectangle" />
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} className="aboutCol">
                    <img src={aboutDawn2} alt="aboutDawn2" className="aboutDawn2" />
                </Col>
            </Row>
        </Container>
    </div>
    <div className="centertext">
        <Container>
            <Row className="m-0">
                <Col lg={12} md={12} sm={12} xs={12}>
                    <p>
                        Our platform’s AI, VR and ML technology
                        connects customers with listings that fit
                        specific needs and offers spectacular VR views
                        of properties in the zip codes of their choice.
                        In addition, with access to a wide range of legal
                        forms and supporting documents, they have everything
                        needed to move forward with one of the most important
                        decisions in a lifetime!
                </p>
                </Col>
            </Row>
        </Container>
    </div>
    <Container>
        <Row>
            <Col lg={5} md={5} sm={12} xs={12} >
                <div className="visionimg">
                    <img src={aboutvision2} alt="aboutvision2" className="aboutvision2" />
                    <img src={aboutvision1} alt="aboutvision1" className="aboutvision1" />
                </div>
            </Col>
            <Col lg={1} md={1} sm={1} xs={1}></Col>
            <Col lg={6} md={6} sm={12} xs={12}>
                <div className="visiontalks">
                    <div>
                        <h2>Vision</h2>
                        <p>
                            We envision that EIGN will shift the paradigm in
                            the Canadian real estate industry using
                            disruptive innovation; that our reputation for
                            integrity, trust, transparency, and
                            dependability will place us as the number one real
                            estate platform of choice in the nation;
                            and that we will continue to break through boundaries
                            with our passion for excellence and innovation.
                        </p>
                    </div>
                </div>
            </Col>
            <Col lg={1} md={12} sm={12} xs={12}></Col>
        </Row>
    </Container>
    <Container className="img-container">
        <Row className="m-0">
            <div className="aboutusimgs">
                <Col lg={12} md={12} sm={12} xs={12}>
                    <img src={aboutrectdown} alt="aboutrectdown" className="aboutrectdown" />
                    <img src={aboutroom} alt="aboutroom" className="aboutroom" />
                </Col>
            </div>
        </Row>

    </Container>
    <Container>
        <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
                <div className="aboutustalks">
                    <h2>About us</h2>
                    <p className="p1">
                        Imagine holding a comprehensive real estate
                        ‘market place’ in the palm of your hand.
                        Imagine checking out all the options, gathering all the
                        information, making informed decisions based on your needs,
                        and then closing the perfect deal electronically without involving a broker fee.
                    </p>
                    <p className="p2">
                        Built on the foundation of the latest developments in Artificial Intelligence
                        (AI) and Virtual Reality (VR) technology, EIGN is positioned to lead the
                        ‘proptech’ market in Canada because we always put the customer experience
                        first as we shift the balance of power in real estate.
                    </p>
                </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
                <div className="aboutusrightDiv">
                    <div className="aboutusright">
                        <div className="bordertop"></div>
                        <p>
                            The EIGN platform is exciting; it’s intuitive; it’s dependable;
                            it’s customised; and it’s affordable! But most importantly,
                            it puts you in control of your real estate transactions whenever
                            you need it and wherever you are.
                        </p>
                        <div className="borderright"></div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
    <div className="selling-your">
        <Container>
            <Row>
                <Col lg={7} md={6} sm={12} xs={12}>
                    <div className="sell">
                        <h6>
                            Selling your home the old fashioned way means paying 5-6%
                            brokerage fees, dealing with mountains of paperwork, and long
                            drawn-out processes.
                        </h6>
                        <p>
                            <img src={check} alt="check" />
                            <span>No middle-man guaranteed</span>
                        </p>
                        <p>
                            <img src={check} alt="check" />
                            <span>
                                Wall-to-wall support for every step of the selling process
                            </span>
                        </p>
                        <p>
                            <img src={check} alt="check" />
                            <span>Virtual Tours—in full 3D VR</span>
                        </p>
                        <p>
                            <img src={check} alt="check" />
                            <span>Low brokerage fees—less than 1%</span>
                        </p>
                        <p>
                            <img src={check} alt="check" />
                            <span>
                                All documents prefilled, and can be executed and signed online
                            </span>
                        </p>
                        <p>
                            <img src={check} alt="check" />
                            <span>
                                Lawyers, home inspection—anything you need, EIGN has you
                                covered
                            </span>
                        </p>
                        <p>
                            <img src={check} alt="check" />
                            <span>Listing a property is fast and easy</span>
                        </p>
                    </div>
                </Col>
                <Col lg={5} md={6} sm={12} xs={12} className="home-col">
                    <img src={c} alt="c" className="home" />
                </Col>
            </Row>
        </Container>
    </div>
    <Container>
        <div className="meetus">
            <Row className="m-0" >
                <Col lg={6} md={6} sm={12} xs={12}>
                    <img src={aboutmeeting} alt="aboutmeeting" className="aboutmeeting" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p>
                        There’s everything to gain by using the EIGN platform and nothing to lose.
                        We are transforming an industry that has lingered far too long in past practices.
                        We know that you want to be in the driver’s seat, and we are putting you right there!
                    </p>
                </Col>
            </Row>
        </div>
    </Container>
</div>
  )
}
