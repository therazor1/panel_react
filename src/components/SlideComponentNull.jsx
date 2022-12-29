import {SplideSlide} from '@splidejs/react-splide';
const SlideComponentNull = () => {
    return (
        <SplideSlide>
            <div className="card">
            <div className="card-header">
                <div className="perfil">
                <img src="" alt="" />
                <p className="name">Load...</p>
                </div>
            </div>
            <div className="card-body">
                <ul>
                <li>
                    <p>Cliente</p>
                    <p>Tarea</p>
                    <p>Tiempo</p>
                    <p>Fecha</p>
                    <p>Estado</p>
                </li>
                </ul>
                <ul className="pendiente">
                    Load...
                </ul>
            </div>
            </div>
        </SplideSlide>
    )
}

export default SlideComponentNull