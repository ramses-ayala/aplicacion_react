








import React from 'react';


import Slider from './Slider';
import Sidebar from './Sidebar';

import Articles from './Articles';

class Search extends React.Component{

    render(){

        let parametro_Busqueda = this.props.match.params.search;

        return(
            <div id="blog">
                <Slider title={"Busqueda: " + parametro_Busqueda}  size="slider-small"/>

                <div className="center">
                    <div id="contenido">
                    
                        <h1 className="subheader">Articulos encontrados</h1>
                        <Articles search={parametro_Busqueda}/>

                    </div>

                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Search;

