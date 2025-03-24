'use client'

import { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// Dados de exemplo - depois virão do banco
const dadosReservas = {
  meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  reservas: [65, 59, 80, 81, 56, 55],
  receita: [12500, 11000, 15000, 16000, 10500, 11000],
}

const dadosBarcos = {
  barcos: ['BAIA DE GUANABARA', 'W. A. MOZART', 'PIRATA RIO I', 'SAVEIRO ESTRELA'],
  reservas: [30, 25, 20, 15],
}

const statusReservas = {
  labels: ['Confirmadas', 'Pendentes', 'Canceladas'],
  dados: [65, 20, 15],
}

export default function Dashboard() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('6m')

  const opcoesGrafico = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const dadosGraficoReservas = {
    labels: dadosReservas.meses,
    datasets: [
      {
        label: 'Número de Reservas',
        data: dadosReservas.reservas,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const dadosGraficoReceita = {
    labels: dadosReservas.meses,
    datasets: [
      {
        label: 'Receita (R$)',
        data: dadosReservas.receita,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const dadosGraficoBarcos = {
    labels: dadosBarcos.barcos,
    datasets: [
      {
        label: 'Reservas por Barco',
        data: dadosBarcos.reservas,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  }

  const dadosGraficoStatus = {
    labels: statusReservas.labels,
    datasets: [
      {
        data: statusReservas.dados,
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
      },
    ],
  }

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">
              Visão geral das reservas, receita e performance dos barcos.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <select
              value={periodoSelecionado}
              onChange={(e) => setPeriodoSelecionado(e.target.value)}
              className="block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="1m">Último mês</option>
              <option value="3m">Últimos 3 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="1y">Último ano</option>
            </select>
          </div>
        </div>

        {/* Cards com métricas principais */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total de Reservas</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">396</dd>
            <dd className="mt-2 flex items-baseline">
              <span className="text-sm text-green-600">↑ 12% em relação ao mês anterior</span>
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Receita Total</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">R$ 76.000</dd>
            <dd className="mt-2 flex items-baseline">
              <span className="text-sm text-green-600">↑ 8% em relação ao mês anterior</span>
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Taxa de Ocupação</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">85%</dd>
            <dd className="mt-2 flex items-baseline">
              <span className="text-sm text-green-600">↑ 5% em relação ao mês anterior</span>
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Ticket Médio</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">R$ 450</dd>
            <dd className="mt-2 flex items-baseline">
              <span className="text-sm text-red-600">↓ 3% em relação ao mês anterior</span>
            </dd>
          </div>
        </div>

        {/* Gráficos */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Reservas por Mês</h3>
            <Bar options={opcoesGrafico} data={dadosGraficoReservas} />
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Receita por Mês</h3>
            <Line options={opcoesGrafico} data={dadosGraficoReceita} />
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Reservas por Barco</h3>
            <Bar options={opcoesGrafico} data={dadosGraficoBarcos} />
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Status das Reservas</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut data={dadosGraficoStatus} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 