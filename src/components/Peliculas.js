



import React, { Component } from 'react';

import Pelicula from './Pelicula';

import Sidebar from './Sidebar';

class Peliculas extends Component {

    state = {

    };

    cambiar = () => {

        let { peliculas } = this.state;
        console.log("PELICULAS --> ", peliculas);
        peliculas[0].titulo = "RAPIDO Y FURIOSO 4";

        this.setState({
            pel: peliculas
        });
    }

    favorita = (pelicula) => {

        console.log("MARCADA COMO FAVORITA");
        console.log("PELICULA --> ", pelicula);

        this.setState({
            favorita: pelicula
        });

    }

    componentWillMount() {

        //alert("SE MONTARA EL COMPONENTE");

        this.setState({
            peliculas: [
                { 'titulo': 'Rapido y furioso 3', 'imagen': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWuR0M_q04N7jVkKRzBgzWSxIM5MwnvpMAILjDZQWXQXptPR7G&usqp=CAU' },
                { 'titulo': 'Duro de matar 4', 'imagen': 'https://www.cinepremiere.com.mx/wp-content/uploads/2019/05/Bruce-Duro-de-Matar-4_1024.jpg', 'SALUDO': 'HOLA MUNDO' }
            ],
            'nombre': 'Ramses Ayala',
            'favorita': 'X'
        });
    }

    componentDidMount() {
        //alert("SE HA MONTADO EL COMPONENTE");

    }

    componentWillUnmount() {

    }

    render() {

        let estilos = {
            'background': 'brown',
            'color': 'white',
            'padding': '5px'
        };

        let templateFavorita = (
            <p>NO HAY PELICULA FAVORITA !!!!!!</p>
        );

        if (this.state.favorita.titulo) {
            templateFavorita = (
                <p className="favorita" style={estilos}>PELICULA FAVORITA: <span>{this.state.favorita.titulo}</span></p>
            )
        }

        return (
            <React.Fragment>
                <div className="center">
                    <div id="contenido" className="peliculas">

                        <h2 className="subheader">Peliculas</h2>
                        <p>Peliculas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiar}>Cambiar titulo</button>
                        </p>


                        {/* {this.state.favorita.titulo ? (
                    <p className="favorita" style={estilos}>PELICULA FAVORITA: <span>{this.state.favorita.titulo}</span></p>
                    ):(
                        <p>NO HAY PELICULA FAVORITA</p>
                    )
                     } */}
                        {templateFavorita}


                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, i) => {

                                    return (
                                        <Pelicula key={i} peli={pelicula} marcarFavorita={this.favorita}
                                            indice={i} />
                                    )

                                }) // funcion map
                            }
                        </div>

                        {/* <MensajeEstatico/> */}
                    </div>
                </div>
                <Sidebar/>
                <div className="clearfix"></div>
            </React.Fragment>
        );
    }
}


export default Peliculas;