import select from 'select-dom'
import on from 'dom-event'
import {set} from 'lib/util'

const elements = select.all('.js-video')

const breakpoints = {
  intermediate: 999,
  mobile: 600
}

const getRatio = (el) => {
  return el.offsetHeight / el.offsetWidth
}

const updateVideo = (video, container) => {
  if (getRatio(video) > getRatio(container)) {
    video.style.height = 'auto'
    video.style.width = '100%'
  } else {
    video.style.height = '100%'
    video.style.width = 'auto'
  }

  const src = videoSrc(video, window.innerWidth)

  if (src === video.src) {
    return
  }

  video.setAttribute('src', src)
}

const videoSrc = (video, windowWidth) => {
  if (
    windowWidth <= breakpoints.intermediate &&
    windowWidth > breakpoints.mobile
  ) {
    return video.dataset.intermediateSrc
  }

  if (windowWidth <= breakpoints.mobile) {
    return video.dataset.mobileSrc
  }

  return video.dataset.src
}

export default () => {
  for (let el of elements) {
    if (!el.classList.contains('is-init')) {
      const video = select('video', el) || false
      if (video) {
        const src = videoSrc(video, window.innerWidth)
        video.setAttribute('src', src)
        video.onloadedmetadata = () => {
          updateVideo(video, el)
          on(window, 'resize', () => {
            updateVideo(video, el)
          })
        }
        video.oncanplay = () => {
          set(video, 'is-loaded')
        }
      }
      el.classList.add('is-init')
    }
  }
}
