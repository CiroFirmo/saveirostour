import { useState } from 'react'

interface Embarcacao {
  id: number
  nome: string
  capacidade: number
}

interface ReservaFormData {
  cliente: string
  embarcacao: string
  data: string
  horario: string
  pessoas: string
  valor: string
  observacoes: string
}

interface ValidationErrors {
  cliente?: string
  embarcacao?: string
  data?: string
  horario?: string
  pessoas?: string
  valor?: string
}

export function useReservaForm(embarcacoes: Embarcacao[]) {
  const [formData, setFormData] = useState<ReservaFormData>({
    cliente: '',
    embarcacao: '',
    data: '',
    horario: '',
    pessoas: '',
    valor: '',
    observacoes: ''
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  // Formata o valor para moeda brasileira
  const formatarValor = (valor: string) => {
    // Remove tudo que não é número
    const numbers = valor.replace(/\D/g, '')
    
    // Converte para centavos
    const cents = parseInt(numbers)
    
    if (isNaN(cents)) {
      return ''
    }
    
    // Formata para reais
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(cents / 100)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === 'valor') {
      setFormData(prev => ({
        ...prev,
        [name]: formatarValor(value)
      }))
    } else if (name === 'pessoas') {
      // Limita a números positivos
      const numeroPositivo = Math.max(0, parseInt(value) || 0)
      setFormData(prev => ({
        ...prev,
        [name]: numeroPositivo.toString()
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Limpa o erro do campo quando ele é alterado
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    
    // Validação do cliente
    if (!formData.cliente.trim()) {
      newErrors.cliente = 'Nome do cliente é obrigatório'
    }

    // Validação da embarcação
    if (!formData.embarcacao) {
      newErrors.embarcacao = 'Selecione uma embarcação'
    }

    // Validação da data
    if (!formData.data) {
      newErrors.data = 'Data é obrigatória'
    } else {
      const selectedDate = new Date(formData.data)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.data = 'A data não pode ser no passado'
      }
    }

    // Validação do horário
    if (!formData.horario) {
      newErrors.horario = 'Horário é obrigatório'
    }

    // Validação do número de pessoas
    if (!formData.pessoas) {
      newErrors.pessoas = 'Número de pessoas é obrigatório'
    } else {
      const numeroPessoas = parseInt(formData.pessoas)
      const embarcacaoSelecionada = embarcacoes.find(e => e.nome === formData.embarcacao)
      
      if (embarcacaoSelecionada && numeroPessoas > embarcacaoSelecionada.capacidade) {
        newErrors.pessoas = `A embarcação comporta no máximo ${embarcacaoSelecionada.capacidade} pessoas`
      }
    }

    // Validação do valor
    if (!formData.valor) {
      newErrors.valor = 'Valor é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      cliente: '',
      embarcacao: '',
      data: '',
      horario: '',
      pessoas: '',
      valor: '',
      observacoes: ''
    })
    setErrors({})
  }

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
    resetForm,
    setFormData
  }
} 