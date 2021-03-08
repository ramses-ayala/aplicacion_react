






import React from 'react';


import Slider from './Slider';
import Sidebar from './Sidebar';

class Formulario extends React.Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    radioHombreRef = React.createRef();
    radioMujerRef = React.createRef();

    state = {
        usuario: {}
    };

    recibirDatos = (e) => {

        let valorGenero;

        if(this.radioHombreRef.current.checked){
            valorGenero = this.radioHombreRef.current.value;
        }else{
            valorGenero = this.radioMujerRef.current.value;
        }

        
        let user = {
            'nombre': this.nombreRef.current.value,
            'apellidos': this.apellidosRef.current.value,
            'bio': this.bioRef.current.value,
            'genero': valorGenero
        };

        this.setState({
            usuario: user
        });
        
        //console.log(this.nombreRef.current.value);
        //console.log("VALOR DEL GENERO: ",  valorGenero);
        console.log(user);
        e.preventDefault();
    }

    render() {

        return (
            <div id="blog">
                <Slider title="Formulario" size="slider-small" />

                <div className="center">
                    <div id="contenido">

                        {/* {this.state.usuario.nombre && 

                            <div id="user-data">
                                <p>Nombre: {this.state.usuario.nombre}</p>
                                <p>Apellido: {this.state.usuario.apellidos}</p>
                                <p>Biografia: {this.state.usuario.bio}</p>
                                <p>Genero: {this.state.usuario.genero}</p>
                            </div>
                        } */}

                        <h1 className="subheader">Llene los campos solicitados</h1>

                        <form className="mid-form" onSubmit={this.recibirDatos} >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input type="text" name="nombre" id="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos:</label>
                                <input type="text" name="apellidos" id="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="biografia">Biografia:</label>
                                <textarea name="bio" id="biografia" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radio-buttons">
                                <input type="radio" name="genero" value="hombre" ref={this.radioHombreRef} checked/>hombre
                                <input type="radio" name="genero" value="mujer" ref={this.radioMujerRef}/>mujer 
                            </div>

                             <div className="clearfix"></div>

                            <input type="submit" value="ENVIAR" className="btn btn-success" />


                        </form>

                    </div>

                    <Sidebar estado="false" />

                </div>
                    </div>
                    );
                }
            }
            
export default Formulario;
            
