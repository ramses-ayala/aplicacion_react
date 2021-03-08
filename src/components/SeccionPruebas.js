




import React, { Component } from 'react';

import MiComponente from './MiComponente';

class SeccionPruebas extends Component {

    //contar = 0;    

    
    constructor(props){
        super(props);
        
        this.state = {
            conta: 0
        };
    }
    
    holaMundo(nombre){

        let plantilla = (<section>
                            <h3>Pruebas</h3>
                            <ul>
                                <li>React</li>
                                <li>Angular</li>
                                <li>{nombre}</li>
                            </ul>
                        </section>);

        return plantilla;
    }

    sumar = () =>{
         this.setState({
            conta: (this.state.conta + 1)
        });
    }

    restar = () => {
        this.setState({
            conta: (this.state.conta - 1)
        });
    }


    render() {

        let nombre = "PRUEBA DE METODOS Y VARIABLES";

        return (

            <main id="contenido-principal">
                <section id="contenido">
                    <div id="articles">
                        <h2 className="subheader">contenido</h2>


                        <h2 className="subheader">Funciones JSX basico</h2>
                        {this.holaMundo(nombre)}

                        <h2 className="subheader">Componentes</h2>

                        <section className="componentes">
                            <MiComponente/>
                            {/* <Peliculas/> */}
                        </section>

                        <h2 className="subheader">Estado</h2>

                        <p>{this.state.conta}</p>

                        <input type="button" value="SUMAR" onClick={this.sumar}/>
                        <input type="button" value="RESTAR" onClick={this.restar}/>

                    </div>
                </section>
            </main>

        );
    }
}

export default SeccionPruebas;
