const baseSize = 16

function setRem() {
  const scale = document.documentElement.clientWidth / 1920

  const fontSize = Math.round(baseSize * Math.min(scale, 2))

  document.documentElement.style.fontSize = fontSize + 'px'
}

window.onresize = () => {
  setRem()
}
