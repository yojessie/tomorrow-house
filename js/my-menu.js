const myMenu = document.querySelector('.my-menu')
const myMenuButton = document.querySelector('.my-menu-button')

function toggleMyMenu() {
  myMenu.classList.toggle('is-active')

  if (myMenu.classList.contains('is-active')) {
    window.addEventListener('click', closeMyMenuOnClickOutside)
  }
}

function closeMyMenuOnClickOutside(e) {
  if (!myMenu.contains(e.target)) {
    myMenu.classList.remove('is-active')
    window.removeEventListener('click', closeMyMenuOnClickOutside)
    // 마이메뉴를 닫은 이후에 필요없는 이벤트가 발생하지 않도록 제거함
  }
}

myMenuButton.addEventListener('click', toggleMyMenu)
