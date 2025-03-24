'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface FormularioReservaProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  reservaParaEditar?: any
}

// Dados de exemplo - depois virão do banco de dados
const embarcacoesExemplo = [
  { id: 1, nome: 'Saveiro Estrela do Mar', capacidade: 12 },
  { id: 2, nome: 'Saveiro Baía Azul', capacidade: 8 },
  { id: 3, nome: 'Saveiro Mar Azul', capacidade: 10 }
]

const basesOperacionais = [
  'Marina da Glória',
  'Urca',
  'Botafogo'
]

const modalidades = [
  'Tour Regular',
  'Tour Privativo',
  'Evento',
  'Transfer'
]

const locaisAlmoco = [
  'A bordo',
  'Restaurante',
  'Não incluso'
]

export default function FormularioReserva({
  isOpen,
  onClose,
  onSubmit,
  reservaParaEditar
}: FormularioReservaProps) {
  const [formData, setFormData] = useState({
    cliente: '',
    embarcacao: '',
    data: '',
    horario: '',
    pessoas: '',
    valor: '',
    observacoes: '',
    baseOperacional: '',
    modalidade: '',
    localAlmoco: '',
    voucher: '',
    notaFiscal: '',
    agente: '',
    contato: '',
    telefone: '',
    email: '',
    documento: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (reservaParaEditar) {
      setFormData({
        cliente: reservaParaEditar.cliente || '',
        embarcacao: reservaParaEditar.embarcacao || '',
        data: reservaParaEditar.data || '',
        horario: reservaParaEditar.horario || '',
        pessoas: reservaParaEditar.pessoas?.toString() || '',
        valor: reservaParaEditar.valor?.replace('R$ ', '') || '',
        observacoes: reservaParaEditar.observacoes || '',
        baseOperacional: reservaParaEditar.baseOperacional || '',
        modalidade: reservaParaEditar.modalidade || '',
        localAlmoco: reservaParaEditar.localAlmoco || '',
        voucher: reservaParaEditar.voucher || '',
        notaFiscal: reservaParaEditar.notaFiscal || '',
        agente: reservaParaEditar.agente || '',
        contato: reservaParaEditar.contato || '',
        telefone: reservaParaEditar.telefone || '',
        email: reservaParaEditar.email || '',
        documento: reservaParaEditar.documento || ''
      })
    }
  }, [reservaParaEditar])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.cliente) newErrors.cliente = 'Nome do cliente é obrigatório'
    if (!formData.embarcacao) newErrors.embarcacao = 'Embarcação é obrigatória'
    if (!formData.data) newErrors.data = 'Data é obrigatória'
    if (!formData.horario) newErrors.horario = 'Horário é obrigatório'
    if (!formData.pessoas) newErrors.pessoas = 'Número de pessoas é obrigatório'
    if (!formData.valor) newErrors.valor = 'Valor é obrigatório'
    if (!formData.baseOperacional) newErrors.baseOperacional = 'Base operacional é obrigatória'
    if (!formData.modalidade) newErrors.modalidade = 'Modalidade é obrigatória'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      ...formData,
      valor: `R$ ${formData.valor}`,
      pessoas: parseInt(formData.pessoas)
    })
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    onClick={onClose}
                  >
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {reservaParaEditar ? 'Editar Reserva' : 'Nova Reserva'}
                    </Dialog.Title>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
                              Nome do Cliente
                            </label>
                            <input
                              type="text"
                              name="cliente"
                              id="cliente"
                              value={formData.cliente}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.cliente
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            />
                            {errors.cliente && (
                              <p className="mt-1 text-sm text-red-600">{errors.cliente}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="embarcacao" className="block text-sm font-medium text-gray-700">
                              Embarcação
                            </label>
                            <select
                              name="embarcacao"
                              id="embarcacao"
                              value={formData.embarcacao}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.embarcacao
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            >
                              <option value="">Selecione uma embarcação</option>
                              {embarcacoesExemplo.map((embarcacao) => (
                                <option key={embarcacao.id} value={embarcacao.nome}>
                                  {embarcacao.nome} (até {embarcacao.capacidade} pessoas)
                                </option>
                              ))}
                            </select>
                            {errors.embarcacao && (
                              <p className="mt-1 text-sm text-red-600">{errors.embarcacao}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                              Data
                            </label>
                            <input
                              type="date"
                              name="data"
                              id="data"
                              value={formData.data}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.data
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            />
                            {errors.data && (
                              <p className="mt-1 text-sm text-red-600">{errors.data}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
                              Horário
                            </label>
                            <input
                              type="time"
                              name="horario"
                              id="horario"
                              value={formData.horario}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.horario
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            />
                            {errors.horario && (
                              <p className="mt-1 text-sm text-red-600">{errors.horario}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="pessoas" className="block text-sm font-medium text-gray-700">
                              Número de Pessoas
                            </label>
                            <input
                              type="number"
                              name="pessoas"
                              id="pessoas"
                              value={formData.pessoas}
                              onChange={handleInputChange}
                              min="1"
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.pessoas
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            />
                            {errors.pessoas && (
                              <p className="mt-1 text-sm text-red-600">{errors.pessoas}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="baseOperacional" className="block text-sm font-medium text-gray-700">
                              Base Operacional
                            </label>
                            <select
                              name="baseOperacional"
                              id="baseOperacional"
                              value={formData.baseOperacional}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.baseOperacional
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            >
                              <option value="">Selecione a base</option>
                              {basesOperacionais.map((base) => (
                                <option key={base} value={base}>
                                  {base}
                                </option>
                              ))}
                            </select>
                            {errors.baseOperacional && (
                              <p className="mt-1 text-sm text-red-600">{errors.baseOperacional}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="modalidade" className="block text-sm font-medium text-gray-700">
                              Modalidade
                            </label>
                            <select
                              name="modalidade"
                              id="modalidade"
                              value={formData.modalidade}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                errors.modalidade
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                              }`}
                              required
                            >
                              <option value="">Selecione a modalidade</option>
                              {modalidades.map((modalidade) => (
                                <option key={modalidade} value={modalidade}>
                                  {modalidade}
                                </option>
                              ))}
                            </select>
                            {errors.modalidade && (
                              <p className="mt-1 text-sm text-red-600">{errors.modalidade}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="localAlmoco" className="block text-sm font-medium text-gray-700">
                              Local do Almoço
                            </label>
                            <select
                              name="localAlmoco"
                              id="localAlmoco"
                              value={formData.localAlmoco}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="">Selecione o local</option>
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
                            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                              Valor
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">R$</span>
                              </div>
                              <input
                                type="text"
                                name="valor"
                                id="valor"
                                value={formData.valor}
                                onChange={handleInputChange}
                                className={`block w-full rounded-md pl-9 sm:text-sm ${
                                  errors.valor
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                                }`}
                                placeholder="0,00"
                                required
                              />
                            </div>
                            {errors.valor && (
                              <p className="mt-1 text-sm text-red-600">{errors.valor}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="agente" className="block text-sm font-medium text-gray-700">
                              Agente
                            </label>
                            <input
                              type="text"
                              name="agente"
                              id="agente"
                              value={formData.agente}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
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
                              value={formData.voucher}
                              onChange={handleInputChange}
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
                              value={formData.notaFiscal}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="contato" className="block text-sm font-medium text-gray-700">
                              Contato
                            </label>
                            <input
                              type="text"
                              name="contato"
                              id="contato"
                              value={formData.contato}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                              Telefone
                            </label>
                            <input
                              type="tel"
                              name="telefone"
                              id="telefone"
                              value={formData.telefone}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              E-mail
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="documento" className="block text-sm font-medium text-gray-700">
                            Documento (CPF/CNPJ)
                          </label>
                          <input
                            type="text"
                            name="documento"
                            id="documento"
                            value={formData.documento}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                            Observações
                          </label>
                          <textarea
                            name="observacoes"
                            id="observacoes"
                            rows={3}
                            value={formData.observacoes}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>

                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                          >
                            {reservaParaEditar ? 'Salvar Alterações' : 'Criar Reserva'}
                          </button>
                          <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 