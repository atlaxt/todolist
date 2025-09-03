export interface User {
  id: number
  name: string
  photo: string
  email: string
}

export type Severity = 'low' | 'medium' | 'high' | undefined

export interface Todo {
  id: string
  text: string
  completed: boolean
  date: string
  dueDate: string
  responsibles: User[]
  severity: Severity
}
