import React, { useReducer } from 'react'

const SECURITY_CODE = "paradigma"

function UseReducer ({ name }) {

    // componente compuesto
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const onConfirm = () => { dispatch({ type: actionTypes.confirm })}
    const onError = () => {dispatch({ type: actionTypes.error })}
    const onWrite = ({target : { value }}) => {dispatch({ type: actionTypes.write, payload: value })}
    const onCheck = () => {dispatch({ type: actionTypes.check })}
    const onDelete = () => {dispatch({ type: actionTypes.delete })}
    const onReset = () => {dispatch({ type: actionTypes.reset })}

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
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}
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
                    onClick={onDelete}
                >
                    Sí, Eliminar
                </button>
                <button
                    onClick={onReset}
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
                    onClick={onReset}
                >
                    Recuperar Estado
                </button>
            </React.Fragment>
        )
        
    }

}

const actionTypes = {
    confirm: 'CONFIRM',
    write: 'WRITE',
    error: 'ERROR',
    delete: 'DELETE',
    reset: 'RESET',
    check: 'CHECK'
}

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state, 
        error: true,
        loading: false
    },
    [actionTypes.check]: {
        ...state, 
        error: false,
        loading: true
    },
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        confirmed: true,
        error: false
    },
    [actionTypes.delete]: {
        ...state, 
        deleted: true
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.reset]: {
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