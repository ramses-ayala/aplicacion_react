



import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//  IMPORTAR COMPONENTES

import Peliculas from './components/Peliculas';
import Error from './components/Error';
import MiComponente from './components/MiComponente';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';



class Router extends Component {

    render() {

        return (
            // configurar rutas y paginas

            <BrowserRouter>
                <Header />

                    <Switch> {/*ETIQUETA OBLIGATORIA DENTRO DEL BROWSERROUTER*/}

                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/blog" component={Blog} />

                        <Route exact path="/blog/article/:id" component={Article} />
                        <Route exact path="/blog/crear" component={CreateArticle} />
                        <Route exact path="/blog/busqueda/:search" component={Search} />
                        <Route exact path="/blog/article/edit/:id" component={EditArticle} />
                       {/*  <Route exact path="/redirect/:search" render={(props) => {

                            let parametro = props.match.params.search;
                            return(
                                <Redirect to={'/blog/busqueda/'+parametro} />
                            );

                        } }/> */}

                        <Route exact path="/formulario" component={Formulario} />
                        <Route exact path="/peliculas" component={Peliculas} />


                        <Route exact path="/pagina-sin-componente" render={() => (
                            <React.Fragment>
                                <h2>Hola desde la ruta sin componente especificado !! :) </h2>
                                <MiComponente />
                            </React.Fragment>
                        )} />
                        <Route exact path="/prueba-con-parametros/:nombre/:apellidos?" render={(props) => {

                            let nombre = props.match.params.nombre;
                            let apellido = props.match.params.apellidos;

                            return (
                                <div id="contenido">

                                    <h1>Pagina con parametros</h1>
                                    <h2>

                                        {nombre && !apellido &&
                                            <React.Fragment>
                                                {nombre}
                                            </React.Fragment>
                                        }

                                        {nombre && apellido &&
                                            <React.Fragment>
                                                {nombre + " - " + apellido}
                                            </React.Fragment>
                                        }

                                    </h2>

                                </div>
                            );
                        }
                        } />

                        <Route component={Error} />
                    </Switch>
                    
                    
                <Footer />
            </BrowserRouter>

        );
    }
}

export default Router;