import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const Charts: React.FC = () => {
  const [barChartData, setBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [pieChartData, setPieChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [startDate, setStartDate] = useState<string>("2024-10-10");
  const [endDate, setEndDate] = useState<string>("2024-11-10");

  const fetchBarData = (fechaDesde?: string, fechaHasta?: string) => {
    const url =
      fechaDesde && fechaHasta
        ? `http://localhost:8080/pedidos/filter?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`
        : "http://localhost:8080/pedidos/group-by-month-year";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item: any) => `${item[0]}-${item[1]}`);
        const values = data.map((item: any) => item[2]);

        setBarChartData({
          labels,
          datasets: [
            {
              label: "Cantidad de pedidos",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      });
  };

  const fetchPieData = () => {
    fetch("http://localhost:8080/pedidos/group-by-instrument")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item: any) => item[0]);
        const values = data.map((item: any) => item[1]);

        setPieChartData({
          labels,
          datasets: [
            {
              label: "Cantidad de pedidos por instrumento",
              data: values,
              backgroundColor: labels.map(
                (_, i) => `hsl(${(i * 360) / labels.length}, 70%, 50%)`
              ),
              borderColor: labels.map(
                (_, i) => `hsl(${(i * 360) / labels.length}, 70%, 50%)`
              ),
              borderWidth: 1,
            },
          ],
        });
      });
  };

  useEffect(() => {
    fetchBarData();
    fetchPieData();
  }, []);

  const handleApplyFilter = () => {
    fetchBarData(startDate, endDate);
  };

  const handleDownloadReport = () => {
    const url = `http://localhost:8080/pedidos/report?fechaDesde=${startDate}&fechaHasta=${endDate}`;
    window.location.href = url;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-16">
        <div className="flex flex-col justify-center w-full space-y-5">
          <h1 className="flex justify-center">Pedidos por mes y año</h1>
          <div className="w-full justify-center mb-10 flex items-center align-middle text-center space-x-5 flex-row">
            <p className="flex justify-center items-center">Fechas:</p>
            <label className="flex flex-row">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="select select-info"
              />
            </label>
            <p>/</p>
            <label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="select select-info"
              />
            </label>
            <button onClick={handleApplyFilter} className="btn btn-info">
              Aplicar filtro
            </button>
          </div>
        </div>
        <div className="flex w-full flex-row justify-center">
          <div>
            <Bar className="w-[700px]" data={barChartData} />
          </div>
          <div>
            <Pie className="w-min" data={pieChartData} />
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleDownloadReport} className="btn btn-primary">
            Descargar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Charts;