






import React from 'react';


import Slider from './Slider';
import Sidebar from './Sidebar';

import Articles from './Articles';

class Blog extends React.Component{

    render(){

        return(
            <div id="blog">
                <Slider title="Blog"  size="slider-small"/>

                <div className="center">
                    <div id="contenido">
                    
                        <h1 className="subheader">Articulos</h1>
                        <Articles/>
                        {/* this.state.status == "success" &&
                            <div>
                                {this.state.articles.map((article)=> {
                                    return(<h2>{article.title}</h2>)
                                })}
                            </div>
                         */}  

                    </div>

                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Blog;

