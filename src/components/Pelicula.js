



import React, {Component} from 'react';

class Pelicula extends Component{

    marcar = () => {
        this.props.marcarFavorita(this.props.peli);
    }

    render(){

        //const pelicula = this.props.peli;

        const {titulo, imagen} = this.props.peli;
        console.log("PROPS: ",this.props);

        return(

            
            <article className="article-item" id="article-template">
                                
                <div className="image-wrap">
                    <img src={imagen} alt="paisaje"/>
                </div>
            
            
                <h2>{titulo}</h2>
                <div className="fecha">
                    <span className="date">Hace 5 minutos</span>
                    <a href="#">Leer Más</a><br/>
                    <button onClick={this.marcar}>Marcar como favorita</button>
                </div>		
        

                <div className="clearfix"></div>
            </article>
        );
    }
}
export default Pelicula;