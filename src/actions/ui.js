import {
  START_LOADING,
  FINISH_LOADING,
  OPEN_POPUP,
  CLOSE_POPUP,
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  TOGGLE_OVERLAY,
} from 'actions/actionTypes'

/**
 * finish loading.
 * @usage ui.finishLoading()
 */
export const finishLoading = () => ({
  type: FINISH_LOADING,
})

/**
 * start loading.
 * @usage ui.startLoading()
 */
export const startLoading = () => ({
  type: START_LOADING,
})

/**
 * open Popup with content
 * @param  {object} popup - set content on popup.content
 *                  It can handle React JSX component.
 *                  ex: var popup = { content: (<div>...</div>) }
 * @usage ui.openPopup({ content: (<div>...</div>) })
 */
export const openPopup = (popup) => ({
  type: OPEN_POPUP,
  payload: {
    popup,
  },
})

/**
 * close Popup.
 * @usage ui.closePopup()
 */
export const closePopup = () => ({
  type: CLOSE_POPUP,
})

/**
 * show Toast with content.
 * @param  {object} toast - set msg on toast.msg
 * @usage ui.showToast({ msg: 'hello world' })
 */
export const showToast = (toast) => ({
  type: SHOW_TOAST,
  payload: {
    toast,
  },
})

/**
 * hide Toast.
 * @usage ui.hideToast()
 */
export const hideToast = () => ({
  type: HIDE_TOAST,
})

export const showOverlay = (hideCallback) => {
  // Register callback which will fire when overlay hides.
  return {
    type: SHOW_OVERLAY,
    payload: {
      overlayHideCallback: hideCallback,
    },
  }
}

export const hideOverlay = () => ({
  type: HIDE_OVERLAY,
})

export const toggleOverlay = () => ({
  type: TOGGLE_OVERLAY,
})
