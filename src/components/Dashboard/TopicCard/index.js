import React from 'react';
import './styles.sass';

export function TopicCard({ topic }) {
    return (
        <div className='TopicCard'>
            <div className='TopicCard-header'>
                <div className="TopicCard-icon" style={{ backgroundColor: topic.color }}>{topic.icono}</div> {/* Renderiza el componente del ícono */}
                <h3 className="TopicCard-title">{topic.titulo}</h3>
            </div>
            <p className="TopicCard-description">{topic.descripcion}</p>
            <div className="TopicCard-progress">
                <div className="TopicCard-progressBar" style={{ width: `${topic.porcentaje}%`, backgroundColor: topic.color }}>
                    {topic.porcentaje}%
                </div>
            </div>
        </div>
    );
}
