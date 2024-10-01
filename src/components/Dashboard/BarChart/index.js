// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Datos para la gráfica
  const data = {
    labels: ['Coding', 'Arte Digital', 'Literatura', 'Matemáticas', 'Ciencias', 'Historia'], // Etiquetas en el eje x
    datasets: [
      {
        label: 'Persona 1', // Primera persona
        data: [12, 5, 9, 7, 15, 10], // Aciertos por tema
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de la barra
      },
      {
        label: 'Persona 2', // Segunda persona
        data: [8, 6, 11, 5, 12, 14], // Aciertos por tema
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color de la barra
      },
    ],
  };

  // Opciones de configuración de la gráfica
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      },
      title: {
        display: true,
        text: 'Preguntas correctas por tema', // Título de la gráfica
      },
    },
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Bar data={data} options={options} /> {/* Renderiza la gráfica */}
    </div>
  );
};

export default BarChart;
