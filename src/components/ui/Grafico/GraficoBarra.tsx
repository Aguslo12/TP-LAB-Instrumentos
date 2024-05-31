import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data: ChartData<'bar'> = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [
    {
      label: 'Ventas',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 20, 90, 100, 100, 200],
    },
  ],
};


const options: ChartOptions<'bar'> = {
  scales: {
    y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, 
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 16, 
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18, // Tamaño de la fuente para la leyenda
          },
        },
      },
  },
};

const GraficoBarra: React.FC = () => (
  <div style={{width:'800px', height: '400px' }}>
    <Bar data={data} options={options} />
  </div>
);

export default GraficoBarra;