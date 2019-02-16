import { Subject } from 'rxjs'

export const modal$ = new Subject()

export const openModal = ({ title, content }) => {
  // For preventing background scrolling
  document.body.className = 'locked'

  modal$.next({
    title,
    content,
  })
}

export const closeModal = () => {
  document.body.className = ''
  modal$.next({
    title: '',
    content: '',
  })
}
