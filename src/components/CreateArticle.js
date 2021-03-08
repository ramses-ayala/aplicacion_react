




import React from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Global from '../Global';

// IMPORTAR COMPONENTES
import Sidebar from './Sidebar';

// IMPORTAR EL VALIDATOR
import Validator from 'simple-react-validator';

// IMPORTAR LAS ALERTAS
import Sweet from 'sweetalert';

class CreateArticle extends React.Component{

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        'article': {},
        'status': null,
        'selectedFile': null
    };

 /*    constructor(props){
        this.validator = new Validator({
            'messages': {
                'alpha_num_space': 'Solo puede agregar letras, numeros y espacios',
                'required': 'Este campo es requerido'
            }
        });
    } */

    /*
     - SE RECOMIENDA CARGAR EL VALIDATOR EN EL CONSTRUCTOR
     - EN EL CURSO SE UTILIZA EL METODO componentWillMount()
    */
    componentWillMount(){
        this.validator = new Validator({
            'messages': {
                'alpha_num_space': 'Solo puede agregar letras, numeros y espacios',
                'required': 'Este campo es requerido'
            }
        });
    }

    saveArticle = (event)=> {

        this.changeValuesOfState();
        console.log("ESTADO DEL METODO SAVE: ",this.state);    

        // VALIDACION SI ESTAN BIEN DATOS DEL FORMULARIO
        if(this.validator.allValid()){

            // HACER PETICION AJAX AL BACKEND
            axios.post(this.url+'save', this.state.article)

                .then(res => {
                    if(res.data.resultado){
                        this.setState({
                            'article': res.data.resultado,
                            'status': 'waiting'
                        });
                        console.log("RESPUESTA DEL BACKEND: ",res.data);

                        Sweet({
                            title: "Mensaje!",
                            text: "Articulo Guardado !!!",
                            icon: "success"
                        })

                        // SUBIR IMAGEN
                        if(this.state.selectedFile !== null){

                            /*SACAR EL ID DEL ARTICULO YA GUARDADO PARA ASIGNARLE LA IMAGEN
                                (this.state.article._id)
                            */

                            // CREAR EL FORMDATA PARA MANDAR EL FILE
                            const formData = new FormData();
                            formData.append(
                                'file0', // NOMBRE DEL FICHERO (PORQUE ASI RECIBIRA EL API EL FICHERO)
                                this.state.selectedFile, // ARCHIVO QUE SE SUBIRA
                                this.state.selectedFile.name // EL NOMBRE DEL ARCHIVO CON EL QUE SE SUBIRA
                            );

                            // PETICION AJAX
                            axios.post(this.url + 'upload-image/' + this.state.article._id, formData)
                                .then(res => {
                                    if(res.data.articuloActualizado){
                                        this.setState({
                                            'article': res.data.resultado,
                                            'status': 'success'
                                        });
                                        console.log("STATE DENTRO DEL IF DONDE SI HAY IMAGEN: ",this.state);
                                    }else{
                                        this.setState({
                                            'status': 'failed'
                                        });
                                        console.log("STATE DENTRO DEL ELSE DONDE NO HAY IMAGEN");
                                    }
                                });
                            
                        }// if selectedFile
                        else{
                            this.setState({
                                'status': 'success'
                            });
                        }// else selectedFile

                    }else{
                        this.setState({
                            'status': 'fail'
                        });
                    }
                });

            }// if 
            else{
                this.setState({
                    'status': 'fail'
                });

                this.validator.showMessages();
                this.forceUpdate();
            }
            event.preventDefault();
        

    }

    changeValuesOfState = () => {

        this.setState({
            'article': {
                titulo: this.titleRef.current.value,
                contenido: this.contentRef.current.value
            }
        });

        //console.log("ESTADO EN EL METODO CHANGE: ",this.state);
    }

    uploadFileChangeState = (event) => {
        console.log("EVENTO COMPLETO --> ",event);
        console.log("EVENTO CON EL TARGET --> ",event.target);
        console.log("EVENTO CON EL TARGET.FILES --> ",event.target.files); // ES UN OBJETO 
        console.log("EVENTO CON EL TARGET.FILES[0] --> ",event.target.files[0]); // ES UN OBJETO 
        this.setState({
            'selectedFile': event.target.files[0] // LOS ARCHIVOS SE GUARDAN EN UN ARRAY
        });

        console.log("ESTADO: ",this.state);
    }


    render(){

        if(this.state.status === 'success'){
            return(
                <Redirect to={'/blog'} />
            );
        }/* else{
            return(
                <React.Fragment>
                    <h2 className="subheader">Hubo un error en la respuesta</h2>
                </React.Fragment>
            );
        } */
        
        return(
            <div className="center">
                <section id="contenido">
                    <h1 className="subheader">Crear articulo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="titulo" ref={this.titleRef} onChange={this.changeValuesOfState} />
                            {this.validator.message('titulo', this.state.article.titulo, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="contenido" ref={this.contentRef} onChange={this.changeValuesOfState}></textarea>
                            {this.validator.message('contenido', this.state.article.contenido, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file">Suba imagen:</label>
                            <input type="file" name="file0" onChange={this.uploadFileChangeState}/>
                        </div>

                        <input type="submit" value="GUARDAR" className="btn btn-success"/>
                        

                    </form>
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default CreateArticle;

