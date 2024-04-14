import React, { useReducer } from 'react'

const SECURITY_CODE = "paradigma"

function UseReducer ({ name }) {

    // componente compuesto
    const [ state, dispatch ] = useReducer(reducer, initialState)

    // componentes simples/independientes
    /*const [value, setValue] = React.useState("")
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)*/

    React.useEffect (() => {
        if(!!state.loading) {
            setTimeout(() => {

                if ( state.value !== SECURITY_CODE) {
                    dispatch({
                        type: "ERROR"
                    })
                } else {
                    dispatch({
                        type: "CONFIRM"
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
                        dispatch({
                            type: "WRITE",
                            payload: event.target.value
                        })
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "CHECK"
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
                        dispatch({
                            type: "DELETE"
                        })
                    }}
                >
                    Sí, Eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: "RESET"
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
                        dispatch({
                            type: "RESET"
                        })
                    }}
                >
                    Recuperar Estado
                </button>
            </React.Fragment>
        )
        
    }

}

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const reducerObject = (state, payload) => ({
    'ERROR': {
        ...state, 
        error: true,
        loading: false
    },
    'CHECK': {
        ...state, 
        error: false,
        loading: true
    },
    'CONFIRM': {
        ...state,
        loading: false,
        confirmed: true,
        error: false
    },
    'DELETE': {
        ...state, 
        deleted: true
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'RESET': {
        ...state,
        deleted: false,
        confirmed: false,
        value: ""
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer }