




import React from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

import Global from '../Global';

// IMPORTAR COMPONENTES
import Sidebar from './Sidebar';

import imageDefault from '../assets/images/default.png';

// IMPORTAR EL VALIDATOR
import Validator from 'simple-react-validator';

// IMPORTAR LAS ALERTAS
import Sweet from 'sweetalert';

class EditArticle extends React.Component{

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();

    url = Global.url;

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

        this.getArticle(this.props.match.params.id);

        this.validator = new Validator({
            'messages': {
                'alpha_num_space': 'Solo puede agregar letras, numeros y espacios',
                'required': 'Este campo es requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/'+id)
            .then(res => {
                this.setState({
                    'article': res.data.article
                });
            });
    }

    updateArticle = (event)=> {

        this.changeValuesOfState();
        console.log("ESTADO DEL METODO SAVE: ",this.state);    

        // VALIDACION SI ESTAN BIEN DATOS DEL FORMULARIO
        if(this.validator.allValid()){

            // HACER PETICION AJAX AL BACKEND
            axios.put(this.url+'update/'+this.props.match.params.id, this.state.article)

                .then(res => {
                    if(res.data.articleUpdated){
                        this.setState({
                            'article': res.data.articleUpdated,
                            'status': 'waiting'
                        });
                        console.log("RESPUESTA DEL BACKEND: ",res.data);

                        Sweet({
                            title: "Mensaje!",
                            text: "Articulo Actualizado !!!",
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
                                            'article': res.data.articuloActualizado,
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

                    }// if articleUpdated
                    else{
                        this.setState({
                            'status': 'fail'
                        });
                    }// else articleUpdated
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
                'title': this.titleRef.current.value,
                'content': this.contentRef.current.value,
                'image': this.state.article.image
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


        console.log("ARTICULO QUE VIENE DE LA BD: ",this.state.article);
        console.log("STATUS DEL STATE: ", this.state.status);

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
                    <h1 className="subheader">Editar articulo</h1>

                    {this.state.article.title && this.state.article.content &&

                        <form className="mid-form" onSubmit={this.updateArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="titulo" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeValuesOfState} />
                                {this.validator.message('titulo', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="contenido" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeValuesOfState}></textarea>
                                {this.validator.message('contenido', this.state.article.content, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file">Suba imagen:</label>

                                <div className="image-wrap">
                                    {
                                        this.state.article.image ? (
                                            <img src={this.url+"/get-image/"+this.state.article.image} alt={this.state.article.title} className="thum"/>
                                        ) : (
                                            <img src={imageDefault} alt="PAISAJE" className="thum"/>
                                        )
                                    }   
                                </div>
                                <input type="file" name="file0" onChange={this.uploadFileChangeState}/>
                            </div>

                            <input type="submit" value="GUARDAR" className="btn btn-success"/>
                            

                        </form>
                    }
                    {!this.state.article.title && !this.state.article.content &&
                        <h2>Cargando... !!!!</h2>
                    }
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default EditArticle;

