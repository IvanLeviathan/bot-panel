import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import './style.css'

export default function Stats(props) {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [5, 3, 4, 2, 5, 3, 3]
      }
    ]
  };

  // const options = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'Отчет за день',
  //     }
  //   },
  //   responsive: true,
  //   scales: {
  //     yAxes: [{
  //       scaleLabel: {
  //         display: true,
  //         labelString: 'Y text'
  //       }
  //     }]
  //   }
  // };

  const options = {
    maintainAspectRatio : false,
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: "Статистика за месяц"
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            var label = context.dataset.label || '';

            if (label) {
                label += ': ';
            }
            if (context.parsed.x !== null) {
                label += context.parsed.x;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          callback: (label) => {
            return label;
          },
        },
      }
    },
    responsive: true,
  }

  return (
    <div className="card">
      <div className="card-body chart">
        <Bar data={props.stat} options={options} />
      </div>
    </div>
  )
}
