import React from 'react';
import './styles.sass';
import UserProgress from './UserProgress.js';
import ScoreProgressChart from './ScoreProgressChart.js';
import PreferredLanguagesChart from './PreferredLanguagesChart.js';
import ScoreByTechnologyChart from './ScoreByTechnologyChart.js';
import ProfilesPieChart from './ProfilesPieChart.js';
import UserInterviewSummary from './UserInterviewSummary.js'; 

function Dashboard() {
  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        {/* Gráficas organizadas en 2 columnas */}
        <div className="chart-container">
          <ProfilesPieChart />
        </div>
        <div className="chart-container">
            <PreferredLanguagesChart />
        </div>
        <div className="chart-container">
          <ScoreByTechnologyChart />  {/* Gráfico de puntaje por tecnología */}
        </div>
        <div className="chart-container">
           <ScoreProgressChart /> {/* Gráfico de pastel para perfiles */}
        </div>
      </div>

      <section className="interviews-section">
      <UserInterviewSummary />
      </section>
    </div>
  );
}

export default Dashboard;
