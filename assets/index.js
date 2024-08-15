const main = document.querySelector('main')
const input = document.getElementById('input')
const result = document.getElementById('result')
const root = document.querySelector(':root')
const buttonClear = document.getElementById('copyToClipboard')

input.focus()

// adicionando funcionalidade de digitar apenas números no Input

const canKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// adicionando funcionalidade aos botões da tela

// seleciona todos os botões para atribuir o evento de click e adicionar seu valor ao input
document.querySelectorAll('.charKey').forEach((charKeyButton) => {
    charKeyButton.addEventListener('click', () =>{
        const valueButton = charKeyButton.dataset.value
        input.value += valueButton
    })
})
// adicionando funcionalidade ao botão (c) de limpar o input
document.getElementById('clear').addEventListener('click', () => {
    input.value = ''
    result.value = ''
    input.focus()
    buttonClear.innerText = 'Copy'
    buttonClear.classList.remove('success')
    result.classList.remove('error')
})

// adicionando funcionalidade ao botão de igual (da tela)
document.getElementById('equal').addEventListener('click', calculate)


input.addEventListener('keydown', (ev) => { 
    ev.preventDefault()

    // verifica se a tecla digitada em ev, está dentro da lisca canKeys
    if (canKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }
    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
        return
    }
    if (ev.key === 'Enter') {
        calculate()
    }
})  

function calculate() {
    if (input.value !== '') {
        try {
            const valueToCalculate = eval(input.value)
            result.value = valueToCalculate
            input.value = valueToCalculate  
        } catch (error){
            result.value = 'Error'
            result.classList.add('error')
        }
    }
    return
}
// implementando funcionalidade do botão mudança de theme
document.getElementById('themeSwitcher').addEventListener('click', () => {
    if (main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9') 
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
    } else{
        root.style.setProperty('--bg-color', '#212529') 
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})

// implementando funcionalidade do botão copiar
document.getElementById('copyToClipboard').addEventListener('click', (ev) => {
    const button = ev.currentTarget
    if (button.innerText === 'Copy' || button.innerText === 'Copiar') {
        button.innerText =  'Copied!'
        button.classList.add('success')

        navigator.clipboard.writeText(result.value)
    } 
})