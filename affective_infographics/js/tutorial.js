var init_tutorial_1 = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Tutorial:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<img src = "./img/tutorial_1.png"></img>'

    btn = document.createElement('button')
    btn.innerHTML = 'Start the Study'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = init_tutorial_2

    document.body.append(btn)
}

var init_tutorial_2 = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Tutorial:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<img src = "./img/tutorial_1.png"></img>'

    btn = document.createElement('button')
    btn.innerHTML = 'Start the Study'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = init_questions

    document.body.append(btn)


}