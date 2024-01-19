import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"

import * as api from '@/util/api'

function SingIn () {
    const navigate = useNavigate()

    const [token, saveToken] = useLocalStorage("token", null)

    useEffect(() => {
        if (token) {
            navigate('/user')
        }
    })

    function singIn () {
        console.log({token})

        
    }

    return (
        <>
            <h1>Iniciar Sesió</h1>
            <div>
            <label>
                Nombre de Usuario:
                <input 
                    // value={userData.username}
                    type='text' 
                    name='username' 
                    // onChange={handleInput}
                />
            </label>
            </div>
            <div>
                <label>
                    Contraseña: 
                    <input 
                        // value={userData.password}
                        type='text' 
                        name='password' 
                        // onChange={handleInput}
                    />
                </label>
            </div>
            <button onClick={singIn}>Inicias Sesión</button>
        </>
    )
}

export default SingIn