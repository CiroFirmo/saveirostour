'use client'

import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import MainLayout from '../../components/layout/MainLayout'

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Dados de exemplo - depois virão do banco
const reservasExemplo = [
  {
    id: 1,
    title: 'TOUR REGULAR - BAIA DE GUANABARA',
    start: new Date(2024, 2, 24, 9, 0),
    end: new Date(2024, 2, 24, 12, 0),
    barco: 'BAIA DE GUANABARA',
    status: 'confirmada',
  },
  {
    id: 2,
    title: 'Bem Brasil Entretenimento - W. A. MOZART',
    start: new Date(2024, 2, 25, 14, 0),
    end: new Date(2024, 2, 25, 17, 0),
    barco: 'W. A. MOZART',
    status: 'confirmada',
  },
  {
    id: 3,
    title: 'North Side - PIRATA RIO I',
    start: new Date(2024, 2, 25, 10, 0),
    end: new Date(2024, 2, 25, 13, 0),
    barco: 'PIRATA RIO I',
    status: 'confirmada',
  },
]

const barcos = [
  'Todos',
  'BAIA DE GUANABARA',
  'W. A. MOZART',
  'PIRATA RIO I',
  'SAVEIRO ESTRELA',
]

export default function CalendarioPage() {
  const [barcoSelecionado, setBarcoSelecionado] = useState('Todos')
  const [visualizacao, setVisualizacao] = useState('month')

  const reservasFiltradas = barcoSelecionado === 'Todos'
    ? reservasExemplo
    : reservasExemplo.filter(reserva => reserva.barco === barcoSelecionado)

  const eventStyleGetter = (event: any) => {
    let backgroundColor = ''
    switch (event.status) {
      case 'confirmada':
        backgroundColor = '#10B981' // verde
        break
      case 'pendente':
        backgroundColor = '#F59E0B' // amarelo
        break
      case 'cancelada':
        backgroundColor = '#EF4444' // vermelho
        break
      default:
        backgroundColor = '#6B7280' // cinza
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    }
  }

  const messages = {
    today: 'Hoje',
    previous: 'Anterior',
    next: 'Próximo',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'Não há reservas neste período.',
  }

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Calendário de Reservas</h1>
            <p className="mt-2 text-sm text-gray-700">
              Visualize todas as reservas em formato de calendário.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex space-x-4">
            <select
              value={barcoSelecionado}
              onChange={(e) => setBarcoSelecionado(e.target.value)}
              className="block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              {barcos.map((barco) => (
                <option key={barco} value={barco}>
                  {barco}
                </option>
              ))}
            </select>
            <select
              value={visualizacao}
              onChange={(e) => setVisualizacao(e.target.value)}
              className="block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="month">Mês</option>
              <option value="week">Semana</option>
              <option value="day">Dia</option>
              <option value="agenda">Agenda</option>
            </select>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div style={{ height: '700px' }}>
            <Calendar
              localizer={localizer}
              events={reservasFiltradas}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              eventPropGetter={eventStyleGetter}
              view={visualizacao as any}
              onView={(view) => setVisualizacao(view)}
              messages={messages}
              popup
              selectable
              views={['month', 'week', 'day', 'agenda']}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <div className="flex items-center">
            <span className="h-4 w-4 rounded bg-green-500 mr-2"></span>
            <span className="text-sm text-gray-600">Confirmada</span>
          </div>
          <div className="flex items-center">
            <span className="h-4 w-4 rounded bg-yellow-500 mr-2"></span>
            <span className="text-sm text-gray-600">Pendente</span>
          </div>
          <div className="flex items-center">
            <span className="h-4 w-4 rounded bg-red-500 mr-2"></span>
            <span className="text-sm text-gray-600">Cancelada</span>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 