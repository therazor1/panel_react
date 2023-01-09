import { SplideTrack } from '@splidejs/react-splide'
import AreaIMG from "../img/icon-menu-area.svg"
import SectionMiembros from './SectionMiembros'
import short from "short-uuid"
const SectionComponent = ({miembros, estado}) => {
    return (
        <section className='row primero pendientes'>
            <div className="etiqueta">
                {estado} del equipo
                <div className="nextArea">
                    <img 
                        src={AreaIMG}
                    />
                </div>
            </div>
            <SplideTrack>
            {
                
                miembros.map(miembro =>
                    <SectionMiembros 
                        key={short.generate()}
                        miembro={miembro}
                        estado={estado}
                    />
                )
            }
            </SplideTrack>
                
        </section>   
    )
}

export default SectionComponent