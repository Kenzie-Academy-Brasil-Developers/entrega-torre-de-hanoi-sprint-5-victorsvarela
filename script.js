const rulesButton = document.getElementById('rules')
const rules = document.querySelector('.rules')
const ruleCloseButton = document.querySelector('.rules__exit')


rulesButton.addEventListener('click', () => {
    rules.classList.remove('hidden');
    setTimeout(() => {
        rules.classList.remove('rules--opacity')
    }, 100);
})

ruleCloseButton.addEventListener('click', () => {
    rules.classList.add('rules--opacity');
    setTimeout(() => {
        rules.classList.add('hidden')
    }, 900);
})