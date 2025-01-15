export interface Block {
  id: number
  isVisible: boolean
  type: 'divide' | 'event' | 'normal'
  onClick: () => void
}

export interface PathWay {
  startBlockId: number
  endBlockId: number
  length: number
  operation: 'increment' | 'decrement'
  direction: 'horizontal' | 'vertical'
}

export interface Problem {
  id: number
  type: 'add' | 'subtract' | 'multiply' | 'divide'
  firstNumber: string
  secondNumber: string
  answer: string
}
