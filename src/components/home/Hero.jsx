import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import LogoImg from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'

const Hero = () => {
    const nav = useNavigate();

    return (
        <section className='py-5 bg-light'>
            <Container>
                <Row>
                    <Col sm="12" lg="8" md="10" className='mx-auto'>
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src={LogoImg} alt="Logo" className={styles.hero_img} />
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil nemo repellendus modi id voluptatibus deleniti iusto vel recusandae alias ipsam obcaecati illum neque amet temporibus fuga, incidunt at facere itaque mollitia possimus dolores exercitationem. Adipisci, perspiciatis dolore exercitationem harum aliquam vitae iure saepe repellat quam molestias voluptas esse aspernatur dignissimos.
                            </p>
                            <div className="mt-4">
                                <Button size='lg' onClick={()=>{nav('/blog/new')}}>
                                    Add new article
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export default Hero
