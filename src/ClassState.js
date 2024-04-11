import React from "react";
import { Loading } from "./Loading";

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: true,
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
                this.setState({ loading: false })
            }, 3000)
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {this.state.error && (
                    <p>Error: el código es incorrecto </p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input />
                <button
                    onClick={() => this.setState({ loading: true })}
                >
                    Comprobar
                </button>
            </div>
        )
    }
}

export { ClassState }