import React from 'react'
import { Button, Container } from 'react-bootstrap' 
import notFoundImg from '../../assets/images/not-found.png'
import styles from './NotFound.module.css'
import {  useNavigate } from 'react-router-dom'
const MainNotFound = () => {
    const nav = useNavigate();
    return (
        <section className={styles.not_found}>
            <Container>
                <div className={styles.not_found_items}>
                    <img src={notFoundImg} alt="Not Found" />
                    <h1>Page Not Found</h1>
                    <Button variant ='outline-secondary' size='lg'className='px-5' onClick={()=>{nav('/')}}>
                        go home
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default MainNotFound
