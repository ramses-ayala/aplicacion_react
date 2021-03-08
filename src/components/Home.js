



import React from 'react';

import Articles from './Articles';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Home extends React.Component{

    render(){

        return(
            <div id="home">

                <Slider title="Curso Frameworks JAVASCRIPT" btnTitle="Ir al blog ->" size="slider-big"/>

                <div className="center">
                    <div id="contenido">
                        <h1 className="subheader">Ultimos articulos</h1>
                        <Articles home="true"/>

                    </div>

                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;

