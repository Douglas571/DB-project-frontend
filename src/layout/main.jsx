import { Link, Outlet } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"

function Menu() {
    const [token, setToken] = useLocalStorage("token", null)
    const [user, saveUser] = useLocalStorage('user', null)

    function logout() {
        setToken(null)
        saveUser(null)
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
            : 
            <>
                <Link onClick={logout}>Cerrar Sesión</Link>
                <br/>
                <Link to={'/user'}>Mi perfil ({user.username})</Link>
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