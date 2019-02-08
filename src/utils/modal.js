import { Subject } from 'rxjs'

export const modal$ = new Subject()

export const openModal = ({ title, content }) => {
  modal$.next({
    title,
    content,
  })
}

export const closeModal = () => {
  modal$.next({
    title: '',
    content: '',
  })
}

window.openModal = openModal
window.closeModal = closeModal
