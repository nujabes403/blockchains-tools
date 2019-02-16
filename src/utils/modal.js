import { Subject } from 'rxjs'

export const modal$ = new Subject()

export const openModal = ({ title, content }) => {
  // For preventing background scrolling
  document.body.style.overflow = 'hidden'

  modal$.next({
    title,
    content,
  })
}

export const closeModal = () => {
  document.body.style.overflow = 'auto'
  modal$.next({
    title: '',
    content: '',
  })
}
