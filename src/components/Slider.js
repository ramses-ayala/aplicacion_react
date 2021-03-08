



import React from 'react';
import { Link } from 'react-router-dom';

class Slider extends React.Component{

    render(){

        //console.log(this.props);

        return(
            <div id="slider" className={this.props.size}>
				<h1>{this.props.title}</h1>

                {this.props.btnTitle &&
				    <Link to={'/blog'}className="btn btn-white">{this.props.btnTitle}</Link>
                }

		    </div>
        );
    }
}

export default Slider;