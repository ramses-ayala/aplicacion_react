


// IMPORTAR MODULOS DE REACT 
import React from 'react';
import { NavLink } from 'react-router-dom';

import imagen_logo from '../assets/images/logo.svg';


// DEFINICION DE LA CLASE
class Header extends React.Component{

    render(){

        return(
            <header id="site-header">
		
			<div className="center">
				<div id="logo">
						<img src={imagen_logo} alt="IMAGEN"/>
						<span id="brand">
							<strong>Master</strong>React
						</span>
				</div>
				<div className="clearfix"></div>
				<nav id="menu">
					<ul>
						<li><NavLink to="/home" activeClassName="active">Inicio</NavLink></li>
						<li><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
						<li><NavLink to="/pagina-sin-componente" activeClassName="active">Pagina sin componente</NavLink></li>
						<li><NavLink to="/formulario" activeClassName="active">Formulario</NavLink></li>
						<li><NavLink to="/peliculas" activeClassName="active">Peliculas</NavLink></li>
						<li><NavLink to="/prueba-con-parametros/Ramses/Ayala" activeClassName="active">Pagina 1</NavLink></li>
					</ul>
				</nav>
				
				{/*<div className="clearfix"></div>*/}
			</div>
		
		</header>
        );
    }
}

export default Header;