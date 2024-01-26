import { Link, Outlet } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"

function Menu() {
    const [token, setToken] = useLocalStorage("token", null)
    const [user, setUser] = useLocalStorage('user', null)

    function logout() {
        setToken(null)
        setUser(null)
    }

    return (
        <>
            { !token 
            ? 
            <>
                <Link to={'/singup'} data-test="singup-button">Registrarce</Link>
                <br/>
                <Link to={'/singin'} data-test="singin-button">Iniciar sesión</Link>
            </>
            : 
            <>
                <Link onClick={logout} data-test="close-session-button">Cerrar Sesión</Link>
                <br/>
                <Link to={'/user'} data-test="user-home-page-link">Mi perfil ({user.username})</Link>
            </>
            }
        </>
    )
}

export default function MainLayout() {
    return (
        <>
            <Menu/>
            <Outlet/>        
        </>
    )
}