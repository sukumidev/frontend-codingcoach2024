import React from 'react';
import './styles.sass';
import { TopicCard } from '../../components/Dashboard/TopicCard';
import { Topic } from '../../classes/topic'; // Importar la clase Topic
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar el componente FontAwesomeIcon
import { faCode, faPaintBrush, faBook } from '@fortawesome/free-solid-svg-icons'; // Importar más íconos
import BarChart from '../../components/Dashboard/BarChart';

function Dashboard() {
  // Crear varios ejemplos de Topic
    const topics = [
        new Topic(
        <FontAwesomeIcon icon={faCode} />, // Usar ícono de FontAwesome
        'Coding',                          // Título del topic
        75,                                // Porcentaje de progreso
        'Aprende a programar con proyectos prácticos.', // Descripción
        '#4caf50'                          // Color de fondo del ícono
        ),
        new Topic(
        <FontAwesomeIcon icon={faPaintBrush} />, // Usar otro ícono de FontAwesome
        'Arte Digital',                         // Título del topic
        50,                                     // Porcentaje de progreso
        'Explora técnicas de ilustración digital.', // Descripción
        '#ff5722'                               // Color de fondo del ícono
        ),
        new Topic(
        <FontAwesomeIcon icon={faBook} />,     // Otro ícono
        'Literatura',                          // Título del topic
        90,                                    // Porcentaje de progreso
        'Sumérgete en el mundo de la literatura clásica.', // Descripción
        '#3f51b5'                              // Color de fondo del ícono
        )
    ];

    return (
        <div className='Dashboard'>
            <div className='Topics'>
                {topics.map((topic, index) => (
                    <TopicCard key={index} topic={topic} /> // Iterar sobre los topics y renderizar TopicCard
                ))}
            </div>
            <BarChart />
        </div>
    );
}

export default Dashboard;
