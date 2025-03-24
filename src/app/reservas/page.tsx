'use client'

import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import FiltrosAvancados from '../../components/reservas/FiltrosAvancados'
import FormularioReserva from '../../components/reservas/FormularioReserva'
import { CheckCircleIcon, XCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

// Dados de exemplo - substituir por dados reais da API
const reservasIniciais = [
  {
    id: 1,
    cliente: 'João Silva',
    embarcacao: 'Baía de Guanabara',
    data: '2024-03-20',
    horario: '14:00',
    pessoas: 20,
    valor: 'R$ 2.000,00',
    status: 'confirmada',
    observacoes: 'Tour regular com almoço a bordo'
  },
  {
    id: 2,
    cliente: 'Maria Santos',
    embarcacao: 'W. A. Mozart',
    data: '2024-03-21',
    horario: '10:00',
    pessoas: 15,
    valor: 'R$ 1.500,00',
    status: 'pendente',
    observacoes: 'Tour privativo'
  }
]

export default function Reservas() {
  const [reservas, setReservas] = useState(reservasIniciais)
  const [modalAberto, setModalAberto] = useState(false)
  const [reservaParaEditar, setReservaParaEditar] = useState<number | null>(null)
  const [reservaParaCancelar, setReservaParaCancelar] = useState<number | null>(null)
  const [filtrosAtivos, setFiltrosAtivos] = useState<any>(null)

  const handleSubmitReserva = (data: any) => {
    if (reservaParaEditar) {
      setReservas(prev =>
        prev.map(reserva =>
          reserva.id === reservaParaEditar
            ? { ...reserva, ...data }
            : reserva
        )
      )
    } else {
      setReservas(prev => [
        ...prev,
        {
          id: Math.max(...prev.map(r => r.id)) + 1,
          ...data,
          status: 'pendente'
        }
      ])
    }
    setModalAberto(false)
    setReservaParaEditar(null)
  }

  const handleEditar = (id: number) => {
    setReservaParaEditar(id)
    setModalAberto(true)
  }

  const handleCancelar = (id: number) => {
    setReservaParaCancelar(id)
  }

  const confirmarCancelamento = () => {
    if (reservaParaCancelar === null) return

    setReservas(prev =>
      prev.map(reserva =>
        reserva.id === reservaParaCancelar
          ? { ...reserva, status: 'cancelada' }
          : reserva
      )
    )
    setReservaParaCancelar(null)
  }

  const handleFiltrar = (filtros: any) => {
    setFiltrosAtivos(filtros)
  }

  const handleLimparFiltros = () => {
    setFiltrosAtivos(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmada':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'cancelada':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <MinusCircleIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada'
      case 'cancelada':
        return 'Cancelada'
      case 'bloqueada':
        return 'Bloqueada'
      case 'bloqueada_aguardando':
        return 'Bloqueada aguardando nova data'
      default:
        return 'Pendente'
    }
  }

  const reservasFiltradas = filtrosAtivos
    ? reservas.filter(reserva => {
        if (filtrosAtivos.dataInicio && reserva.data < filtrosAtivos.dataInicio) return false
        if (filtrosAtivos.dataFim && reserva.data > filtrosAtivos.dataFim) return false
        if (filtrosAtivos.status && reserva.status !== filtrosAtivos.status) return false
        if (filtrosAtivos.barco && !reserva.embarcacao.toLowerCase().includes(filtrosAtivos.barco.toLowerCase())) return false
        if (filtrosAtivos.cliente && !reserva.cliente.toLowerCase().includes(filtrosAtivos.cliente.toLowerCase())) return false
        return true
      })
    : reservas

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Reservas</h1>
            <p className="mt-2 text-sm text-gray-700">
              Lista de todas as reservas, incluindo detalhes do cliente, embarcação e status.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setReservaParaEditar(null)
                setModalAberto(true)
              }}
              className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
            >
              Nova Reserva
            </button>
          </div>
        </div>

        <FiltrosAvancados onFilter={handleFiltrar} onLimpar={handleLimparFiltros} />

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Cliente
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Embarcação
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Data
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Horário
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Valor
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservasFiltradas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {reserva.cliente}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reserva.embarcacao}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(reserva.data).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reserva.horario}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reserva.valor}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-x-2">
                          {getStatusIcon(reserva.status)}
                          <span>{getStatusText(reserva.status)}</span>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleEditar(reserva.id)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleCancelar(reserva.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <FormularioReserva
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSubmit={handleSubmitReserva}
        reservaParaEditar={reservaParaEditar ? reservas.find(r => r.id === reservaParaEditar) : undefined}
      />

      {/* Modal de Confirmação de Cancelamento */}
      {reservaParaCancelar && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <XCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Cancelar Reserva
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={confirmarCancelamento}
                  >
                    Confirmar Cancelamento
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setReservaParaCancelar(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 