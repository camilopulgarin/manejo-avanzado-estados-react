import React, { useState } from 'react'

const SECURITY_CODE = "paradigma"

function UseState ({ name }) {

    // componente compuesto
    const [ state, setState ] = useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
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
                        loading: false,
                        confirmed: true
                    })
                }
            }, 3000)
        }
        
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
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
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmacion, ¿Estas seguro?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true
                        })
                    }}
                >
                    Sí, Eliminar
                </button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            value: ""
                        })
                    }}
                >
                    No, Regresar
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: false,
                            confirmed: false,
                            value: ""
                        })
                    }}
                >
                    Recuperar Estado
                </button>
            </React.Fragment>
        )
        
    }

}

export { UseState }
