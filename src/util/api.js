
const HOST = 'http://localhost:8080'

export async function singUp(newUser) {
    const res = await fetch(`${HOST}/singup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })

    const resJson = await res.json()

    return resJson
}

export async function login(newUser) {
    const res = await fetch(`${HOST}/singin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
}
    // TODO: Develope the loging singIn features
