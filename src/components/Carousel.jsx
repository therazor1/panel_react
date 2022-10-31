import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SlideComponent from './SlideComponent';
import useUsers from '../hooks/useUsers'
import AreaIMG from "../img/icon-menu-area.svg"
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';

const Carousel = ({boton, estado, titulo, miembros}) => {

    return (
        <Splide 
            hasTrack={ false } 
            options={{
                perPage: 2,
                pagination: false
            }}
        >
            <section className='row primero pendientes'>
                <div className="etiqueta">
                    {titulo}
                    <div className="nextArea">
                        <img 
                            src={AreaIMG}
                        />
                    </div>
                </div>
                <SplideTrack>
                    {
                        miembros.map((user, index) => (
                            <SlideComponent 
                                key={user.uid}
                                user={user}
                                index={index}
                                estado={estado}
                            />
                        ))
                    }
                </SplideTrack>
            </section>
            {
                boton && (
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">Prev</button>
                        <button className="splide__arrow splide__arrow--next">Next</button>
                    </div>
                )
            }
            
        </Splide>
    )
}

export default Carousel