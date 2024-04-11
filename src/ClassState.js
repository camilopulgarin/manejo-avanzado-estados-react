import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma"

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false
        }
    }

    UNSAFE_componentWillMount() {
        console.log("componentWillMount")
    }

    componentDidMount() {
        console.log("componentDidMount")

    }

    componentDidUpdate() {
        console.log("Actualizacion")
        if (!!this.state.loading) {
            setTimeout(() => {
                if (this.state.value !== SECURITY_CODE) {
                this.setState({ error: true, loading: false })
                }

                this.setState({ loading: false })
            }, 3000)
        }
    }

    render() {
        const { error, loading, value } = this.state
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {error && (
                    <p>Error: el código es incorrecto </p>
                )}

                {loading && (
                    <Loading />
                )}

                <input 
                    placeholder="Código de seguridad"
                    value={value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}
                />
                <button
                    onClick={() => {
                        this.setState({ loading: true })
                        this.setState({ error: false})
                    }
                    }
                >
                    Comprobar
                </button>
            </div>
        )
    }
}

export { ClassState }