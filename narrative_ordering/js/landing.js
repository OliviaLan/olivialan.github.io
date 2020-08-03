  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<p><strong>Evaluation of Narratives</strong></p> <br> <p>Description: </b><br>We are conducting an academic survey about story narratives. We are interested in what kind of narrative strategy can lead to better user engagement.</br>In this HIT, you will view 2 stories based on fictional data and answer a set of questions. </p><p>First, you will answer a recall question which asks you to retell the story. Then, you will report the level of your engagement and evaluate the narratives.</p><p>For some subjective questions, you need to write down reasons to explain your answers or choices. We encourage you to provide such feedback clearly and specifically to help us distinguish qualified answers (e.g., from robots) and bonus very supportive workers (up to $1).</p> <p>The whole HIT will last about 20 minutes. <strong>Please note that if the reasons are nonsense or cannot explain your answers, the HIT will not be accepted.</p>.'
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
  	            find_mid()
  	            if (mID == undefined || mID == '' || mID == 'preview') end_preview()
  	                // else init_warning()
  	            else init_survey()
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