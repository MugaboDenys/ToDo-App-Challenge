import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      appName: 'ToDo',
      sidebar: {
        search: 'Search',
        inbox: 'Inbox',
        calendar: 'Calendar',
        settings: 'Settings & Preferences',
        sharedPages: 'Shared Pages',
        privatePages: 'Private Pages',
        accounts: 'Accounts',
        upgrade: 'Upgrade',
        upgradeTitle: 'Maximize your productivity',
        upgradeSubtitle: 'Boost your task management with advanced tools & features.',
      },
      header: {
        sharedPages: 'Shared Pages',
        hrHub: 'Tasks Hub',
        share: 'Share',
        welcome: 'Welcome to your task hub',
      },
      views: {
        kanban: 'Kanban',
        list: 'List',
        calendar: 'Calendar',
      },
      toolbar: {
        searchPlaceholder: 'Search here',
        filter: 'Filter',
        sort: 'Sort',
      },
      columns: {
        todo: 'To-do',
        onProgress: 'On Progress',
        needReview: 'Need Review',
        done: 'Done',
      },
      task: {
        add: 'Add task',
        name: 'Name',
        dates: 'Dates',
        status: 'Status',
        attachment: 'Attachment',
        people: 'People',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        checklist: 'Checklist',
        comments: 'Comments',
        attachments: 'Attachments',
        delete: 'Delete',
        edit: 'Edit',
        moveTo: 'Move to',
      },
      common: {
        loading: 'Loading…',
        error: 'Something went wrong',
        empty: 'No tasks yet',
        new: 'New',
      },
    },
  },
  fr: {
    translation: {
      appName: 'ToDo',
      sidebar: {
        search: 'Rechercher',
        inbox: 'Boîte de réception',
        calendar: 'Calendrier',
        settings: 'Paramètres et préférences',
        sharedPages: 'Pages partagées',
        privatePages: 'Pages privées',
        accounts: 'Comptes',
        upgrade: 'Mettre à niveau',
        upgradeTitle: 'Maximisez votre productivité',
        upgradeSubtitle: 'Améliorez votre gestion des tâches avec des outils avancés.',
      },
      header: {
        sharedPages: 'Pages partagées',
        hrHub: 'Hub des tâches',
        share: 'Partager',
        welcome: 'Bienvenue dans votre hub de tâches',
      },
      views: {
        kanban: 'Kanban',
        list: 'Liste',
        calendar: 'Calendrier',
      },
      toolbar: {
        searchPlaceholder: 'Rechercher ici',
        filter: 'Filtrer',
        sort: 'Trier',
      },
      columns: {
        todo: 'À faire',
        onProgress: 'En cours',
        needReview: 'À revoir',
        done: 'Terminé',
      },
      task: {
        add: 'Ajouter',
        name: 'Nom',
        dates: 'Dates',
        status: 'Statut',
        attachment: 'Pièce jointe',
        people: 'Personnes',
        high: 'Haute',
        medium: 'Moyenne',
        low: 'Basse',
        checklist: 'Checklist',
        comments: 'Commentaires',
        attachments: 'Pièces jointes',
        delete: 'Supprimer',
        edit: 'Modifier',
        moveTo: 'Déplacer vers',
      },
      common: {
        loading: 'Chargement…',
        error: 'Une erreur est survenue',
        empty: 'Aucune tâche',
        new: 'Nouveau',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  })

export default i18n
