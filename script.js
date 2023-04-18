const username = prompt("What is your name: ")
const socket = io()
const ul = document.querySelector("ul")
const form = document.querySelector("form")
const input = document.querySelector("form input")

form.addEventListener('submit', event => {
    event.preventDefault()
    let userObject = {
        username: username,
        message: input.value
    }
    if (input.value) {
        socket.emit('message', userObject)

        const li = document.createElement("li")
        const p = document.createElement("p")

        p.innerHTML = `${username}: ${input.value}`

        li.appendChild(p)
        ul.appendChild(li)

        window.scrollTo(0, document.body.scrollHeight);

        input.value = ''
    }
})

socket.on('message', (username, msg) => {
    const li = document.createElement("li")
    const p = document.createElement("p")

    p.innerHTML = `${username}: ${msg}`

    li.style.textAlign = "right"
    p.style.backgroundColor = "burlywood"

    li.appendChild(p)
    ul.appendChild(li)

    window.scrollTo(0, document.body.scrollHeight);
})