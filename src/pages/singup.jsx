import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"

import * as api from '@/util/api'

function SingUp () {
    const navigate = useNavigate()
    
    const [token, saveToken] = useLocalStorage("token", null)
    const [_, saveUser] = useLocalStorage("user", null)

    const [userData, setUserData] = useState({
        username: '', //'randomguy' + Date.now(),
        password: '', //'123456787',
        birth_date: null,
        weight_kg: 0,
        height_cm: 0
    })

    useEffect(() => {
        if (token) {
            navigate('/user')
        }
    })
    
    async function singUp() {
        const res = await api.singUp(userData)
        saveToken(res.token)
        saveUser({ ...res.user, token: res.token })
    }

    function handleInput(evt) {
        setUserData({...userData, [evt.target.name]: evt.target.value})
        console.log({userData})
    }

    return (<>
        <h1>Registro de Usuario</h1>

        <div>
            <label>
                Nombre de Usuario:
                <input 
                    value={userData.username}
                    type='text' 
                    name='username' 
                    onChange={handleInput}
                    
                    data-test="singup-username"/>
            </label>
        </div>
        <div>
            <label>
                Contraseña: 
                <input 
                    value={userData.password}
                    type='text' 
                    name='password' 
                    onChange={handleInput}
                    data-test="singup-password"/>
            </label>
        </div>

        <div>
            <label>Fecha de Nacimiento:
                <input type="date" onInput={handleInput} name="birth_date"/>
            </label>
        </div>
        <div>
            <label>Peso (kg):
                <input type="decimal" onChange={handleInput} value={userData.weight_kg} name="weight_kg"/>
            </label>
        </div>
        <div>
            <label>Altura (cm):
                <input type="decimal" onChange={handleInput} value={userData.height_cm} name="height_cm"/>
            </label>
        </div>

        <button onClick={singUp} data-test="singup-regist-button">Registrarce</button>
    </>)
}

export default SingUp