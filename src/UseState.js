import React from 'react'

function UseState ({ name }) {
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect (() => {
        setTimeout(() => {
            setLoading(false)
            setError(true)
        }, 5000)
    }, [loading])
    return (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {error && (
                <p>Error: el código es incorrecto </p>
            )}

            {loading && (
                <p>Cargando... </p>
            )}

            <input placeholder='Código de seguridad' />
            <button
                onClick={() => setLoading(true)}
            >
                Comprobar
            </button>
        </div>
    )
}

export { UseState }
