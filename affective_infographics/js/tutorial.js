var init_tutorial = () => {
    console.log('hi')
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Tutorial:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    btn = document.createElement('button')
    btn.innerHTML = 'Submit'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = init_questions

    document.body.append(btn)


}