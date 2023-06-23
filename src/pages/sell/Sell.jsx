import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import c from '../../assets/images/c.png';
import check from '../../assets/icons/check.png';
import sellBig from '../../assets/images/sellBig.png';
import sellSmall from '../../assets/images/sellSmall.png';
import selltrue from '../../assets/images/sell-true.png';
import sellcros from '../../assets/images/sell-cros.png';
import { Link } from 'react-router-dom';

const Sell = ({ history }) => {
  const [sell, setSell] = useState('$25000');
  const [mortage, setMortage] = useState('');
  const [selected, setSelected] = useState('Mercedes');
  const [selling, setSelling] = useState([
    'Mercedes',
    'Toyota',
    'Suzuki',
    'Honda',
  ]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="sell">
      <div className="selling">
        <Row className="bg-pattern m-0">
          <Col>
            <Row className="m-0">
              <Col lg={1} md={1} sm={1} xs={1} className="c"></Col>
              <Col lg={4} md={4} sm={4} xs={4} className="c">
                <div className="sell">
                  <div>
                    <h2>
                      Selling
                      <br /> your home
                    </h2>
                    <Link to="/submit-property">

                    <button >
                      Submit Property   
                    </button>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} className="c p-0">
                <div className="sellSmall">
                  <img src={sellSmall} alt="sellSmall" />
                </div>
              </Col>
              <Col lg={5} md={5} sm={5} xs={5} className="c p-0">
                <div className="sellBig">
                  <img src={sellBig} alt="sellBig" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Container className="sell-with">
                    <Row>
                        <Col xs={12} className="c">
                            <h4>Sell with Eign</h4>
                        </Col>
                        <Col xs={3} className="c">
                            <div>
                                <h3>1</h3>
                                <h5>Example Heading</h5>
                                <p>
                                    Find home first, Tour homes fast with our agent, you can stay
                                    ahead of other buyers to get the right home.
                                </p>
                            </div>
                        </Col>
                        <Col xs={1} className="c">
                            <div className="hr s ml-auto mr-auto"></div>
                        </Col>
                        <Col xs={3} className="c">
                            <div>
                                <h3>2</h3>
                                <h5>Example Heading</h5>
                                <p>
                                    Find home first, Tour homes fast with our agent, you can stay
                                    ahead of other buyers to get the right home.
                                </p>
                            </div>
                        </Col>
                        <Col xs={1} className="c">
                            <div className="hr"></div>
                        </Col>
                        <Col xs={3} className="c">
                            <div>
                                <h3>3</h3>
                                <h5>Example Heading</h5>
                                <p>
                                    Find home first, Tour homes fast with our agent, you can stay
                                    ahead of other buyers to get the right home.
                                </p>
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
                <Container className="easy">
                    <Row>
                        <Col xs={3} className="c">
                            <div>
                                <h4>Easy to see the difference</h4>
                            </div>
                        </Col>
                        <Col xs={3} className="c">
                            <div className="active">
                                <h6>Eign</h6>
                                <h3>10%</h3>
                            </div>
                        </Col>
                        <Col xs={3} className="c">
                            <div className="border">
                                <h6>Other Platforms</h6>
                                <h3>40%</h3>
                            </div>
                        </Col>
                        <Col xs={3} className="c">
                            <div className="border">
                                <h6>Traditional Agent</h6>
                                <h3>60%</h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="selltable">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td></td>
                                <td className="col2"></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Listing fee</td>
                                <td className="col2">
                                    <div>1%</div>
                                </td>
                                <td>24%</td>
                                <td>6%</td>
                            </tr>
                            <tr>
                                <td>Smart matching</td>
                                <td className="col2"><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                            </tr>
                            <tr>
                                <td>Data analytics</td>
                                <td className="col2"><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                            </tr>
                            <tr>
                                <td>Virtual tours</td>
                                <td className="col2"><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                            </tr>
                            <tr>
                                <td>Unbiased advice</td>
                                <td className="col2"><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                            </tr>
                            <tr>
                                <td>24/7 support</td>
                                <td className="col2"><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                            </tr>
                            <tr>
                                <td>Electronic deal closing</td>
                                <td className="col2"><img src={selltrue} alt="selltrue" className="selltrue" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                                <td><img src={sellcros} alt="sellcros" className="sellcros" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="col2"></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </Container>
                <div className="sellformcal">
                    <h3>Commision Calculator</h3>
                    <Container>
                        <Row>
                            <Col lg={4} md={4} sm={12} xs={12} className="sellform">
                                <p>Home sell Price</p>
                                <input value={sell} onChange={(e) => this.setState({ sell: e.target.value })} />
                                <p>Outstanding Mortgage</p>
                                <input value={mortage} onChange={(e) => this.setState({ mortage: e.target.value })} />
                                <p>Selling In</p>
                                <select className="select" defaultValue={selected} onChange={handleChange}>
                                    {
                                        selling.map((sell, index) => {
                                            return (<option key={index} value={sell}>{sell}</option>)
                                        })
                                    }
                                </select><br></br>
                                <button>Calculate Sale Price</button>
                            </Col>
                            <Col lg={8} md={8} sm={12} xs={12} className="sellcal">
                                <table className="table">
                                    <tbody>
                                        <tr className="firstrow">
                                            <td></td>
                                            <td className="col2">Eign</td>
                                            <td>Other Agent</td>
                                        </tr>
                                        <tr>
                                            <td>Seller Agent Commission</td>
                                            <td className="col2">$5,000    (1%)</td>
                                            <td>$15,000    (3%)</td>
                                        </tr>
                                        <tr>
                                            <td>Buyer Agent Commission</td>
                                            <td className="col2">$15,000    (3%)</td>
                                            <td>$15,000    (3%)</td>
                                        </tr>
                                        <tr className="bottomrow">
                                            <td>Fees & Taxes</td>
                                            <td className="col2">$785</td>
                                            <td>$5,785</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="selltalk">Talk with Eign</button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        );

    }



export default Sell;