


import React from 'react';

// IMPORTAR PARA HACER REDIRECCIONES
import { Redirect, Link } from 'react-router-dom';



// IMPORTAR AXIOS PARA PETICIONES AJAX
import axios from 'axios';

// IMPORTAR COMPONENTES Y UTILERIAS
import Sidebar from './Sidebar';
import Global from '../Global';

import Moment from 'react-moment';
import 'moment/locale/es';

// IMPORTAR LAS ALERTAS
import Sweet from 'sweetalert';



import imageDefault from '../assets/images/default.png';
import EditArticle from './EditArticle';




class Article extends React.Component{

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount(){
        this.getArticle();
    }

    getArticle = () => {

        let id = this.props.match.params.id;

        axios.get(this.url+"article/"+id)
            .then(res => {
                console.log("RESPUESTA ---> ",res.data.article);
                this.setState({
                    article: res.data.article,
                    status: "success"
                });
            })

            .catch(res => {
                this.setState({
                    article: false,
                    status: "success"
                });
            });
    }

    deleteArticle = (id) => {

        Sweet({
            title: "Mensaje",
            text: "¿Esta seguro de eliminar este articulo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                
                axios.delete(this.url +'delete/'+id)
                    .then(res => {
                        this.setState({
                            'article': res.data.respuesta,
                            'status': 'deleted'    
                        });
                    })
                Sweet("Eliminado");
            } else {
              Sweet("No se elimino el articulo !!! ");
            }
          });

        
    }

    render(){

         
        if(this.state.status === 'deleted'){
            return <Redirect to={'/blog'} />
        }

        let article = this.state.article;

        return(

            <main id="contenido-principal" className="center">
			
				<section id="contenido">

                    {article &&
                        <article className="article-item article-detail">
                            
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url+'get-image/'+article.image} alt="paisaje"/>
                                ) : (
                                    <img src={imageDefault} alt="paisaje" />
                                )
                                }
                            </div>
                            

                            <h1 className="subheader">{article.title}</h1>
                            <div className="fecha">
                                <span className="date"><Moment locale="es" fromNow>{article.date}</Moment></span>
                                <p>
                                    {article.content}
                                </p>
                                
                                <Link to={'/blog/article/edit/'+article._id} className="btn btn-warning" >Editar</Link>

                                <button className="btn btn-danger" onClick={
                                () => {
                                    this.deleteArticle(article._id);
                                }
                                }>Eliminar</button>
                                
                            </div>		

                            <div className="clearfix"></div>
                        </article>
                    }

                    {!article && this.state.status === "success" &&
                        <div className="center">
                            <h2>No existe el articulo</h2>
                        </div>
                    }
                    {!article && this.state.status === null && 
                        <div className="center">
                            <h2>Cargando...</h2>
                        </div>
                    }
					
				
				</section>
				
                {/* <!--AGREGAR LOS DEMAS ARTICULOS MEDIANTE JS--> */}
                <Sidebar />
			</main>
        ); // return
    }// render
}

export default Article;