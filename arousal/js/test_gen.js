function init_test_page() {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.style.textAlign = 'center'
    d.style.margin = '2%'
    document.body.append(d)
    d.innerHTML += '<h1 style="text-align: center;">请阅读下图，然后按要求打分</h1>'
    d.innerHTML += '<br><br><img src =./data/1.png' + ' style="width: 50%;"></img>'

    d.innerHTML += '<br><br><br><p><strong>1. Please score the affective traits of the visualization</p><br>'

    sam = document.createElement('form');
    sam.style.textAlign = "center";
    // sam.className = "AffectiveSlider";
    sam.setAttribute("class", "AffectiveSlider");

    pleasure = document.createElement('div');
    pleasure.className = "AScontainer pleasure";
    pleasure.innerHTML = '<input type="number" data-type="range" name="AS-pleasure" id="AS-pleasure" value=".5" min="0" max="1" step=".01" ></div><div class="ASintensityCue"></div>'

    arousal = document.createElement('div');
    arousal.className = "AScontainer arousal";
    arousal.innerHTML = '<input type="range" name="AS-arousal" id="AS-arousal" value=".5" min="0" max="1" step=".01" /><div class="ASintensityCue"></div></div>'



    sam.append(pleasure);
    sam.append(arousal);

    d.append(sam);

    d.innerHTML += '<br><br>'

    // -----------------reason--------------------


    d.innerHTML += '<p><strong>2. Please write down your reason:</strong></p><p>if you find more than one affective design factors, we encourage you to list them one by one.</p><p>if you find the infographic design low in affective arousal, please explain why.</p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "reason"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "150px"

    d.append(textarea)

    d.innerHTML += '<br><br>'


    // -----------------preference 1--------------------
    d.innerHTML += '<p><strong>3. I feel that I like this infographic.</strong></p>'
    d.innerHTML += '<br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "preference_like";
        r1.className = "r1 preference_like";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
    }

    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    // -----------------preference 2--------------------
    d.innerHTML += '<p><strong>4. I feel that I want to share this infographic.</strong></p>'
    d.innerHTML += '<br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "preference_share";
        r1.className = "r1 preference_share";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
    }

    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'
}