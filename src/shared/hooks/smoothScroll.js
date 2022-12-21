import $ from 'jquery'

export function smoothScroll(section, padding = 0) {
  const coord = section.offsetTop;
  window.scrollTo({ top: coord + padding, behavior: 'smooth' })
}