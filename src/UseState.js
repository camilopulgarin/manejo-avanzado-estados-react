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
    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            confirmed: true,
            error: false
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            error: false,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    }

    const onReset = () => {
        setState({
            ...state,
            deleted: false,
            confirmed: false,
            value: ""
        })
    }

    React.useEffect (() => {
        if(!!state.loading) {
            setTimeout(() => {

                if ( state.value !== SECURITY_CODE) {
                    onError()
                } else {
                    onConfirm()
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
                        onWrite(event.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        onCheck()
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
                        onDelete()
                    }}
                >
                    Sí, Eliminar
                </button>
                <button
                    onClick={() => {
                        onReset()
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
                        onReset()
                    }}
                >
                    Recuperar Estado
                </button>
            </React.Fragment>
        )
        
    }

}

export { UseState }
