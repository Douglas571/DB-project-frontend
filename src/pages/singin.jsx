import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"

import * as api from '@/util/api'

function SingIn () {
    const navigate = useNavigate()

    const [token, saveToken] = useLocalStorage("token", null)
    const [user, saveUser] = useLocalStorage("user", null)

    const [credentials, setCredentials] = useState({
        username: 'fakeUser',
        password: 'fakePassword'
    })

    useEffect(() => {
        if (token) {
            navigate('/user')
        }
    })

    async function singIn () {
        const res = await api.singin(credentials)       
        saveToken(res.token)
        saveUser({ ...res.user, ...res.token })
    }

    function handleInput(evt) {
        const { name, value } = evt.target
        // console.log({name, value})
        setCredentials({...credentials, [name]: value})
    }

    return (
        <>
            <h1>Iniciar Sesió</h1>
            <div>
            <label>
                Nombre de Usuario:
                <input 
                    value={credentials.username}
                    type='text' 
                    name='username' 
                    onChange={handleInput}
                />
            </label>
            </div>
            <div>
                <label>
                    Contraseña: 
                    <input 
                        value={credentials.password}
                        type='text' 
                        name='password' 
                        onChange={handleInput}
                    />
                </label>
            </div>
            <button onClick={singIn}>Inicias Sesión</button>
        </>
    )
}

export default SingIn