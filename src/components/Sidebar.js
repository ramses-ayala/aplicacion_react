


import React, {Component} from 'react';

import {Link, Redirect } from 'react-router-dom';

class Sidebar extends Component{

    searchRef = React.createRef();

    state = {
        'search': "",
        'redirect': false
    };

    toSearch = (e) => {

        this.setState({
            'search': this.searchRef.current.value,
            'redirect': true
        });

        e.preventDefault();
    }

    render(){

        if(this.state.redirect){
            return(
                <Redirect to={'/blog/busqueda/'+this.state.search} />
            );
        }

        

        return(
            <div>
                <aside id="sidebar">
                    
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <Link to={'/blog/crear'} className="btn btn-success">Crear Articulo</Link>
                    </div>
                    
                    <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        
                        <form onSubmit={this.toSearch}>
                            <label>Ingrese el nombre del artículo:</label>
                            <input type="text" name="search" ref={this.searchRef}/>
                            <input type="submit" className="btn" value="BUSCAR"/>
                        </form>
                    </div>
                </aside>
                
                
                <div className="clearfix"></div> 
            </div>
        );
    }
}

export default Sidebar;