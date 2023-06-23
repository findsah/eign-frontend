import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';


import bgPattern from '../../assets/images/bg-pattern.png';
import blogbuy from '../../assets/images/b-buy.png';
import blogrent from '../../assets/images/b-rent.png';
import blogellipse from '../../assets/images/b-ellipse.png';
import blogsearch from '../../assets/icons/b-search.png';
import blogtalk from '../../assets/images/b-talk.png';
import blogwear from '../../assets/images/b-wear.png';
import blogdesign from '../../assets/images/b-design.png';
import blogarrow from '../../assets/images/b-arrow.png';
import blogdawn from '../../assets/images/b-dawn.png';
import blogarohome from '../../assets/images/b-arohome.png';
import blogstears from '../../assets/images/b-stears.png';
import bloglounch from '../../assets/images/b-lounch.png';
import blogcar from '../../assets/images/b-car.png';
import blogsweethome from '../../assets/images/b-sweethome.png';
import blogboys from '../../assets/images/b-boys.png';
export default function Blog() {
  return (
    <div className="blog bgHeaderPattern">
    <img src={bgPattern} alt="bgPattern" className="bgPattern" />
    <div className="blog1">
        <Container>
            <Row className="m-0">
                <Col lg={8} md={12} sm={12} xs={12} className="leftcol">
                    <div className="wellcometalk">
                        <h1>Welcome to Eign blog</h1>
                        <p>
                            Stay on top of announcements and research,
                            find media assets,
                            and learn about our experts.
                        </p>
                        <div className="bwellcomeimgs">
                            <img src={blogboys} alt="blogboys" className="blogboys" />
                        </div>
                        <div className="imgoptions">
                            <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                            <img src={blogellipse} alt="blogellipse" className="blogellipse2" /><span>February 17, 2019</span>
                            <img src={blogellipse} alt="blogellipse" className="blogellipse2" /><span>5 min read</span>
                        </div>
                    </div>
                    <div className="wellcometext">
                        <h3>Anyone can hold the helm when the sea is calm</h3>
                        <p>
                            Find home first, Tour homes fast with a our agent,
                            you can stay ahed of other buyers to get the right home.Creating a wireframe for a mobile app comes .
                    </p>
                        <button className="readbtn">Read More</button>
                    </div>
                    <Row className=" row">
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <img src={blogbuy} alt="blogbuy" className="blogbuy" />
                            <div className="buyexplain">
                                <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                                <p>Anyone can hold the helm when the sea is calm</p>
                                <a href="/">Read More</a>
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <img src={blogrent} alt="blogrent" className="blogrent" />
                            <div className="buyexplain">
                                <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Rent Guide</span>
                                <p>Anyone can hold the helm when the sea is calm</p>
                                <a href="/">Read More</a>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12} className="rightcol">
                    <p className="searcheading">Search Blog</p>
                    <div className="searchdiv">
                        <img src={blogsearch} alt="blogsearch" className="blogsearch" />
                        <input type="text" placeholder="Search" className="searchbox" />
                    </div>
                    <img src={blogtalk} alt="blogtalk" className="blogtalk" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                    <img src={blogwear} alt="blogwear" className="blogwear" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                    <img src={blogdesign} alt="blogdesign" className="blogdesign" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                    <img src={blogarrow} alt="blogarrow" className="blogarrow" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    <div className="blog2">
        <Container>
            <Row className="m-0">
                <Col lg={12} md={12} sm={12} xs={12}>
                    <h2>New Post</h2>
                </Col>
            </Row>
            <Row className="m-0">
                <Col lg={4} md={4} sm={12} xs={12}>
                    <img src={blogdawn} alt="blogdawn" className="blogimg" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <img src={blogarohome} alt="blogarohome" className="blogimg" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <img src={blogstears} alt="blogstears" className="blogimg" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
            </Row>
            <Row className="m-0">
                <Col lg={4} md={4} sm={12} xs={12}>
                    <img src={bloglounch} alt="bloglounch" className="blogimg" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <img src={blogcar} alt="blogcar" className="blogimg" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <img src={blogsweethome} alt="blogsweethome" className="blogimg" />
                    <div className="guide">
                        <img src={blogellipse} alt="blogellipse" className="blogellipse" /><span>Buy Guide</span>
                        <p>Anyone can hold the helm when the sea is calm</p>
                        <a href="/">Read More</a>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
</div>
  )
}
