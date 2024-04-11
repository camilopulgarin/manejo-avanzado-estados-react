import React, { useState } from 'react'

const SECURITY_CODE = "paradigma"

function UseState ({ name }) {

    // componente compuesto
    const [ state, setState ] = useState({
        value: "",
        error: false,
        loading: false
    })

    // componentes simples/independientes
    /*const [value, setValue] = React.useState("")
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)*/

    React.useEffect (() => {
        if(!!state.loading) {
            setTimeout(() => {

                if ( state.value !== SECURITY_CODE) {
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                } else {
                    setState({
                        ...state,
                        loading: false
                    })
                }
            }, 3000)
        }
        
    }, [state.loading])
    return (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {state.error && (
                <p>Error: el código es incorrecto </p>
            )}

            {state.loading && (
                <p>Cargando... </p>
            )}

            <input 
                placeholder='Código de seguridad' 
                value={state.value}
                onChange={(event) => {
                    setState({
                        ...state,
                        value: event.target.value
                    })
                }}
            />
            <button
                onClick={() => {
                    setState({
                        ...state,
                        error: false,
                        loading: true
                    })
                }}
            >
                Comprobar
            </button>
        </div>
    )
}

export { UseState }
