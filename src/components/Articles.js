



import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';


import Moment from 'react-moment';
import 'moment/locale/es';  

import Global from '../Global.js';
import imageDefault from '../assets/images/default.png';

class Articles extends React.Component{

    url = Global.url;

    state = {
        'articles': [],
        'status': null
    };

    componentWillMount(){

        if(this.props.home){
            this.getLastArticles();
        }
        else if(this.props.search && this.props.search !== null && this.props.search !== undefined){
            this.getArticlesBySearch(this.props.search);
        }
        else{
            this.getArticles();
        }
        
    }

    getArticles = ()=> {

        axios.get(this.url+"articles")
            .then(res => {
                console.log("DATOS: ",res);
                this.setState({
                    'articles': res.data.lista,
                    'status': 'success'
                });

                console.log("ARTICULOS: ", this.state);
            });
    }

    getLastArticles = ()=> {

        axios.get(this.url+"articles/true")
            .then(res => {
                console.log("DATOS: ",res);
                this.setState({
                    'articles': res.data.lista,
                    'status': 'success'
                });

                console.log("ARTICULOS: ", this.state);
            });
    }

    getArticlesBySearch = (searched)=> {

        axios.get(this.url+"search/" +searched)
            .then(res => {
                
                this.setState({
                    'articles': res.data.articles,
                    'status': 'success'
                });
    
            })
            
            .catch(err => {

                console.log("ESTADO: ", this.state);
                console.log("RESPUESTA DEL BACKEND: ", err.response.data);
                this.setState({
                    'articles': [],
                    'status': 'success'
                });
            });
            
    }

    render(){

        let listArticles = this.state.articles.map((Article,i) => {
            return(
                <article className="article-item" id="article-template" key={Article._id}>
							
                    <div className="image-wrap">
                    {
                        Article.image ? (
                            <img src={this.url+"/get-image/"+Article.image} alt={Article.title}/>
                        ) : (
                            <img src={imageDefault} alt="PAISAJE"/>
                        )
                        
                    }
                        
                    </div>
                    
                    <h2>{Article.title}</h2>
                    <div className="fecha">
                        <Moment fromNow>{Article.date}</Moment>
                        <br/>
                        <Link to={'/blog/article/'+Article._id}>Leer Más</Link>
                    </div>		

                    <div className="clearfix"></div>
                </article>
            );

        });      
        
        

        if(this.state.articles.length > 0){
            return(
                <div id="articles">
                    {listArticles}            
                </div>
            );
        }
        else if(this.state.articles.length === 0 && this.state.status === "success"){
            return(
                <div>
                    <p>No hay articulos para mostrar</p>

                </div>
            );
        }
        else{
            return(
                <React.Fragment>
                    <p>Cargando datos.... !!!!</p>
                </React.Fragment>
            );
        }
    }
}


export default Articles;