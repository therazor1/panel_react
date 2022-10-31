import { Outlet } from "react-router-dom"
import Logo from "../img/logo-iv-1.png"
const AuthLayout = () => {
    return (
        <div className='login'>
            <div className="contenedor">
                <div className="form-login">
                    <img src={Logo} alt="" />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout