import '@testing-library/jest-dom'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        appName: 'ToDo',
        sidebar: {},
        header: {},
        views: { kanban: 'Kanban', list: 'List' },
        toolbar: {},
        columns: { todo: 'To-do', onProgress: 'On Progress', needReview: 'Need Review', done: 'Done' },
        task: {},
        common: {},
      },
    },
  },
})
