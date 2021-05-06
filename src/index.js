//Importando react
import React from 'react';
//Importando react-dom
import ReactDOM from 'react-dom'
//Importar componente
import App from './components/App';
//Importando los estilos css
import './styles/global.scss';

//Crear recurso para decir donde se va a ejecutar nuestra aplicacion.
ReactDOM.render( <App/> , document.getElementById('app'))
