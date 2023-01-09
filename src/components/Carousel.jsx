import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SlideComponent from './SlideComponent';
import useUsers from '../hooks/useUsers'

import { Splide} from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';
import SlideComponent2 from './SlideComponent2';
import SlideComponentNull from './SlideComponentNull';
import { useState } from 'react';
import SplideComponent3 from './SplideComponent3';
import SectionComponent from './SectionComponent';
import short from "short-uuid"
const Carousel = ({boton, miembros}) => {
    const {cambioStado} = useUsers()
    const [estados, setEstados] = useState(["pendiente", "completo", "proximos"])
    return (
        <Splide 
            hasTrack={ true } 
            options={{
                pagination: true
            }}
        >
            {
                estados.map(estado => 
                    <SectionComponent 
                        key={short.generate()}
                        miembros={miembros}
                        estado={estado}
                    />
                )
            }
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