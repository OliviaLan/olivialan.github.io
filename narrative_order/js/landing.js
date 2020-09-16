  	var init_landing_page = () => {
  	    d = document.createElement('div')
  	    text = '<p><strong>Evaluation of Narrative Linearity</strong></p> <br> <p>Description: </b><br>We are conducting an academic survey about narrative linearity in time-oriented stories. <strong>Narrative linearity refers to the linear or non-linear ordering of temporal events into a telling sequence.</strong> We are interested in what narrative order can lead to better user engagement.</br>In this study, you will view 3 time-oriented stories told in different narrative orders. </p><p>First, you will answer a recall question which asks you to retell the story. Then, you will report the level of your engagement and evaluate the narrative orders.</p><p>For some subjective questions, you need to write down reasons to explain your answers or choices. The whole survey will last about 20 minutes.</p> <p><span style="color:red"><strong>Please note that your writing should make sense and explain your ratings and evaluations; OR, YOUR ANSWER WILL NOT BE ACCEPTED. </strong></span>We encourage you to provide such feedback clearly and concretely to help us distinguish qualified answers and bonus very supportive workers (up to $1).</p><p style="color:red"><strong>Attention: do not close or reload the page after this step. If you do, the study will end without being finished.</strong></p>'
  	    d.innerHTML = text
  	    d.style.textAlign = 'center'
  	    d.style.fontSize = 'large'
  	    d.style.marginTop = '10%'
  	    d.style.marginLeft = '20%'
  	    d.style.marginRight = '20%'
  	    document.body.append(d)

  	    btn = document.createElement('button')
  	    btn.innerHTML = 'Accept and Start'
  	    btn.style.margin = '3%'
  	    btn.style.class = 'large'
  	    btn.onclick = () => {
  	        document.body.innerHTML = ''
  	        find_mid()
  	        if (mID == undefined || mID == '' || mID == 'preview') end_preview()
  	        else init_questions()
  	    }
  	    document.body.append(btn)

  	}