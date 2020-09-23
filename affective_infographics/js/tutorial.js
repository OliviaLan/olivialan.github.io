var init_tutorial_1 = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Tutorial:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<img src = "./img/tutorial_1.jpeg" style="width:70%"></img>'

    btn = document.createElement('button')
    btn.innerHTML = 'Next'
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

    d.innerHTML += '<img src = "./img/tutorial_2.jpeg" style="width:70%"></img>'

    btn = document.createElement('button')
    btn.innerHTML = 'Next'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = init_tutorial_3

    document.body.append(btn)
}

var init_tutorial_3 = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Tutorial:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<img src = "./img/tutorial_3.jpeg" style="width:70%"></img>'

    btn = document.createElement('button')
    btn.innerHTML = 'Next'
    btn.className = 'button f_button'
    btn.onclick = init_tutorial_4

    document.body.append(btn)
}

var init_tutorial_4 = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Tutorial:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<img src = "./img/tutorial_4.jpeg" style="width:70%"></img>'

    btn = document.createElement('button')
    btn.innerHTML = 'Start the Study'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = init_questions

    document.body.append(btn)
}