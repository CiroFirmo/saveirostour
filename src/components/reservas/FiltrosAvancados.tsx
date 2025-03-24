'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface FiltrosAvancadosProps {
  onFilter: (filtros: any) => void
  onLimpar: () => void
}

const statusOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'confirmada', label: 'Confirmada' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'cancelada', label: 'Cancelada' },
  { value: 'bloqueada', label: 'Bloqueada' },
  { value: 'bloqueada_aguardando', label: 'Bloqueada aguardando nova data' }
]

const basesOperacionais = [
  'Todas',
  'Marina da Glória',
  'Urca',
  'Botafogo'
]

const modalidades = [
  'Todas',
  'Tour Regular',
  'Tour Privativo',
  'Evento',
  'Transfer'
]

const locaisAlmoco = [
  'Todos',
  'A bordo',
  'Restaurante',
  'Não incluso'
]

const embarcacoesExemplo = [
  { id: 1, nome: 'Saveiro Estrela do Mar', capacidade: 12 },
  { id: 2, nome: 'Saveiro Baía Azul', capacidade: 8 },
  { id: 3, nome: 'Saveiro Mar Azul', capacidade: 10 }
]

export default function FiltrosAvancados({ onFilter, onLimpar }: FiltrosAvancadosProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    status: 'todos',
    statusExceto: '',
    excecao: false,
    faturada: 'todas',
    recebida: 'todas',
    agente: '',
    usuario: '',
    cliente: '',
    barco: '',
    destino: '',
    baseOperacional: 'Todas',
    modalidade: 'Todas',
    localAlmoco: 'Todos',
    voucher: '',
    notaFiscal: '',
    reserva: '',
    ordem: 'data_servico',
    crescente: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(filtros)
    setIsOpen(false)
  }

  const handleLimpar = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      status: 'todos',
      statusExceto: '',
      excecao: false,
      faturada: 'todas',
      recebida: 'todas',
      agente: '',
      usuario: '',
      cliente: '',
      barco: '',
      destino: '',
      baseOperacional: 'Todas',
      modalidade: 'Todas',
      localAlmoco: 'Todos',
      voucher: '',
      notaFiscal: '',
      reserva: '',
      ordem: 'data_servico',
      crescente: true
    })
    onLimpar()
  }

  return (
    <div className="mt-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Filtros Avançados
          </button>
        </div>
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Fechar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Filtros Avançados
                      </Dialog.Title>

                      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">
                              Data Inicial
                            </label>
                            <input
                              type="date"
                              name="dataInicio"
                              id="dataInicio"
                              value={filtros.dataInicio}
                              onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">
                              Data Final
                            </label>
                            <input
                              type="date"
                              name="dataFim"
                              id="dataFim"
                              value={filtros.dataFim}
                              onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              value={filtros.status}
                              onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="statusExceto" className="block text-sm font-medium text-gray-700">
                              Status (Exceto)
                            </label>
                            <select
                              id="statusExceto"
                              name="statusExceto"
                              value={filtros.statusExceto}
                              onChange={(e) => setFiltros({ ...filtros, statusExceto: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                              disabled={!filtros.excecao}
                            >
                              {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="mt-2">
                              <input
                                id="excecao"
                                name="excecao"
                                type="checkbox"
                                checked={filtros.excecao}
                                onChange={(e) => setFiltros({ ...filtros, excecao: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <label htmlFor="excecao" className="ml-2 text-sm text-gray-500">
                                Usar exceção de status
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="faturada" className="block text-sm font-medium text-gray-700">
                              Faturada
                            </label>
                            <select
                              id="faturada"
                              name="faturada"
                              value={filtros.faturada}
                              onChange={(e) => setFiltros({ ...filtros, faturada: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="todas">Todas</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="recebida" className="block text-sm font-medium text-gray-700">
                              Recebida
                            </label>
                            <select
                              id="recebida"
                              name="recebida"
                              value={filtros.recebida}
                              onChange={(e) => setFiltros({ ...filtros, recebida: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="todas">Todas</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="agente" className="block text-sm font-medium text-gray-700">
                              Agente
                            </label>
                            <input
                              type="text"
                              name="agente"
                              id="agente"
                              value={filtros.agente}
                              onChange={(e) => setFiltros({ ...filtros, agente: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                              Usuário
                            </label>
                            <input
                              type="text"
                              name="usuario"
                              id="usuario"
                              value={filtros.usuario}
                              onChange={(e) => setFiltros({ ...filtros, usuario: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
                              Cliente
                            </label>
                            <input
                              type="text"
                              name="cliente"
                              id="cliente"
                              value={filtros.cliente}
                              onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="barco" className="block text-sm font-medium text-gray-700">
                              Embarcação
                            </label>
                            <select
                              id="barco"
                              name="barco"
                              value={filtros.barco}
                              onChange={(e) => setFiltros({ ...filtros, barco: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="">Todas</option>
                              {embarcacoesExemplo.map((embarcacao) => (
                                <option key={embarcacao.id} value={embarcacao.nome}>
                                  {embarcacao.nome}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="baseOperacional" className="block text-sm font-medium text-gray-700">
                              Base Operacional
                            </label>
                            <select
                              id="baseOperacional"
                              name="baseOperacional"
                              value={filtros.baseOperacional}
                              onChange={(e) => setFiltros({ ...filtros, baseOperacional: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              {basesOperacionais.map((base) => (
                                <option key={base} value={base}>
                                  {base}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="modalidade" className="block text-sm font-medium text-gray-700">
                              Modalidade
                            </label>
                            <select
                              id="modalidade"
                              name="modalidade"
                              value={filtros.modalidade}
                              onChange={(e) => setFiltros({ ...filtros, modalidade: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              {modalidades.map((modalidade) => (
                                <option key={modalidade} value={modalidade}>
                                  {modalidade}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="localAlmoco" className="block text-sm font-medium text-gray-700">
                              Local do Almoço
                            </label>
                            <select
                              id="localAlmoco"
                              name="localAlmoco"
                              value={filtros.localAlmoco}
                              onChange={(e) => setFiltros({ ...filtros, localAlmoco: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              {locaisAlmoco.map((local) => (
                                <option key={local} value={local}>
                                  {local}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="voucher" className="block text-sm font-medium text-gray-700">
                              Voucher
                            </label>
                            <input
                              type="text"
                              name="voucher"
                              id="voucher"
                              value={filtros.voucher}
                              onChange={(e) => setFiltros({ ...filtros, voucher: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="notaFiscal" className="block text-sm font-medium text-gray-700">
                              Nota Fiscal
                            </label>
                            <input
                              type="text"
                              name="notaFiscal"
                              id="notaFiscal"
                              value={filtros.notaFiscal}
                              onChange={(e) => setFiltros({ ...filtros, notaFiscal: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="reserva" className="block text-sm font-medium text-gray-700">
                            Nº da Reserva
                          </label>
                          <input
                            type="text"
                            name="reserva"
                            id="reserva"
                            value={filtros.reserva}
                            onChange={(e) => setFiltros({ ...filtros, reserva: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="ordem" className="block text-sm font-medium text-gray-700">
                              Ordenar por
                            </label>
                            <select
                              id="ordem"
                              name="ordem"
                              value={filtros.ordem}
                              onChange={(e) => setFiltros({ ...filtros, ordem: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="data_servico">Data do Serviço</option>
                              <option value="cliente">Cliente</option>
                              <option value="barco">Embarcação</option>
                              <option value="status">Status</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="crescente" className="block text-sm font-medium text-gray-700">
                              Ordem
                            </label>
                            <select
                              id="crescente"
                              name="crescente"
                              value={filtros.crescente.toString()}
                              onChange={(e) => setFiltros({ ...filtros, crescente: e.target.value === 'true' })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="true">Crescente</option>
                              <option value="false">Decrescente</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                          >
                            Aplicar Filtros
                          </button>
                          <button
                            type="button"
                            onClick={handleLimpar}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          >
                            Limpar Filtros
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
} 