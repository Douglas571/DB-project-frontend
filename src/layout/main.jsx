import { Link, Outlet } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"

function Menu() {
    const [token, setToken] = useLocalStorage("token", null)

    function logout() {
        setToken(null)
    }

    return (
        <>
            { !token 
            ? 
            <>
                <Link to={'/singup'}>Registrarce</Link>
                <br/>
                <Link to={'/singin'}>Iniciar sesión</Link>
            </>
            : <Link onClick={logout}>Cerrar Sesión</Link>
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