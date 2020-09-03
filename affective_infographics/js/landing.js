  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<p><strong>Evaluation of Affective Infographics</strong></p> <br> <p>Description: </b><br>We are conducting an academic survey about how design influence affective arousal in infographics. We are interested in what design factors can lead to stronger affective feelings.</br>In this study, you will view 10 infographics, set scores to their design, and write down reasons. The whole survey will last about 30 minutes. </p><p style = "color:red"><strong>Please note that your writing should make sense and explain your ratings and evaluations; OR, YOUR ANSWER WILL NOT BE ACCEPTED. </strong></p>We encourage you to provide such feedback clearly and concretely to help us distinguish qualified answers and bonus very supportive workers (up to $1).</p> <p style="color:red"><strong>Attention: do not close or reload the page after this step. If you do, the study will end without being finished.</p>'
  	        d.innerHTML = text
  	        d.style.textAlign = 'center'
  	        d.style.fontSize = 'large'
  	        d.style.marginTop = '10%'
  	        d.style.marginLeft = '20%'
  	        d.style.marginRight = '20%'
  	        document.body.append(d)


  	        btn = document.createElement('button')
  	        btn.innerHTML = 'Accept and Proceed'
  	        btn.style.margin = '3%'
  	        btn.style.class = 'large'
  	        btn.onclick = () => {
  	            document.body.innerHTML = ''
  	                // find_mid()
  	            if (mID == undefined || mID == '' || mID == 'preview') end_preview()
  	                // else init_warning()
  	                // else init_survey()
  	            else init_tutorial_1()
  	        }
  	        document.body.append(btn)

  	        // btn = document.createElement('button')
  	        // btn.innerHTML = 'Go to consent form'
  	        // btn.style.margin = '5%'
  	        // btn.style.fontSize = 'large'
  	        // btn.onclick = () => {
  	        // 	init_consent()
  	        // }
  	        // document.body.append(btn)

  	        //startTimer(allowed_time_in_minutes * 60);
  	    }
  	    // --- END CONSENT FORM