


import React from 'react';

class MiComponente extends React.Component{

    render(){

        let receta = {
            "nombre": "Pescado frito",
            "ingredientes": ["pescado", "lechuga","tomate", "salsa"],
            "calorias": 300
        };

        return(
            <div>
                <h1>Hola este el componente 'MiComponente'</h1>
                <h2>Este es un encabezado</h2>

                <ol>
                    {
                        receta.ingredientes.map((element,i) => {
                            return(
                                <li key={i}>{element}</li>        
                            );
                        })
                    }
                </ol>
            </div> 
        );
    }

}

export default MiComponente;



