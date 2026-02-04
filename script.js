document.addEventListener('DOMContentLoaded', () => {
  const weatherData = [
    { day: 'MON', temp: -1 },
    { day: 'TUE', temp: 3  },
    { day: 'WED', temp: 5  },
    { day: 'THU', temp: 4  },
    { day: 'FRI', temp: 3  },
    { day: 'SAT', temp: -3 },
    { day: 'SUN', temp: -1 }
  ]

  const root = document.documentElement
  const tempValue = document.querySelector('.temp-value')
  const textArea = document.querySelector('.text_area')
  const days = document.querySelectorAll('.dayweather')
  const points = document.querySelectorAll('.pt')

  let index = 0
  let timer = null
  let hoverLock = null

  function setActive(i) {
    index = i

    days.forEach(d => d.classList.remove('is-active'))
    days[i]?.classList.add('is-active')

    points.forEach(p => p.classList.remove('is-active'))
    points[i]?.classList.add('is-active')

    const temp = weatherData[i].temp
    tempValue.textContent = `${temp}℃`

    const ratio = (temp + 10) / 20
    const hue = 210 - ratio * 60
    root.style.setProperty('--temp-hue', hue)

    textArea.classList.remove('is-cold', 'is-mild', 'is-warm')
    if (temp < 0) textArea.classList.add('is-cold')
    else if (temp < 4) textArea.classList.add('is-mild')
    else textArea.classList.add('is-warm')
  }

  function startAuto() {
    clearInterval(timer)
    timer = setInterval(() => {
      setActive((index + 1) % weatherData.length)
    }, 3000)
  }

  function stopAuto() {
    clearInterval(timer)
    timer = null
  }

  setActive(0)
  startAuto()

  days.forEach((el, i) => {
    el.addEventListener('mouseenter', () => {
      clearTimeout(hoverLock)
      stopAuto()
      setActive(i)
    })

    el.addEventListener('mouseleave', () => {
      clearTimeout(hoverLock)
      hoverLock = setTimeout(() => startAuto(), 250)
    })
  })
})