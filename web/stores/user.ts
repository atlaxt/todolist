import type { User } from '~/types'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: 0,
      name: 'Atlas Yiğit',
      email: 'atlas@gmail.com',
      photo: 'https://github.com/atlaxt.png',
    },
    {
      id: 1,
      name: 'Benjamin Canac',
      email: 'benjamin@gmail.com',
      photo: 'https://github.com/benjamincanac.png',
    },
    {
      id: 2,
      name: 'Romain Hamel',
      email: 'romain@gmail.com',
      photo: 'https://github.com/romhml.png',
    },
    {
      id: 3,
      name: 'Neil Richter',
      email: 'neil@gmail.com',
      photo: 'https://github.com/noook.png',
    },
  ])

  return {
    users,
  }
})
