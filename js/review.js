const reviewLikeButtonList = document.querySelectorAll(
  '.review-card-footer button'
)

const HELPFUL = '도움 됨'
const NOT_HELPFUL = '도움이 돼요'
// const checkIcon = '<i class="ic-check" aria-hidden=""></i>' // 간단하게 아이콘을 추가하는 방법

function toggleLikeButton() {
  const isLiked = this.classList.contains('btn-primary')
  const textElement = this.nextElementSibling
  const reviewCardFooter = this.parentNode

  if (isLiked) {
    this.innerHTML = NOT_HELPFUL
  } else {
    // this.innerHTML = checkIcon + HELPFUL // 간단하게 아이콘을 추가하는 방법
    this.innerHTML = HELPFUL
    const checkIcon = document.createElement('i')
    checkIcon.classList.add('ic-check')
    checkIcon.setAttribute('aria-hidden', true)
    this.prepend(checkIcon) // appendChild는 요소를 뒤에 붙이고, prepend는 앞에 붙이는 것
  }

  if (textElement) {
    const countSpan = textElement.querySelector('span')
    const count = Number(countSpan.innerHTML.replaceAll(',', ''))

    let newCount = count
    if (isLiked) {
      newCount = count - 1
      if (newCount == 0) {
        reviewCardFooter.removeChild(textElement)
      } else {
        countSpan.innerHTML = newCount.toLocaleString()
      }
    } else {
      newCount = count + 1
      countSpan.innerHTML = newCount.toLocaleString()
    }
  } else {
    if (!isLiked) {
      const newTextElement = document.createElement('p')
      newTextElement.innerHTML =
        '<strong><span>1</span>명</strong>에게 도움이 되었습니다.'
      reviewCardFooter.appendChild(newTextElement)
    }
  }

  this.classList.toggle('btn-primary')
  this.classList.toggle('btn-outlined')
}

reviewLikeButtonList.forEach(function (button) {
  button.addEventListener('click', toggleLikeButton)
})
