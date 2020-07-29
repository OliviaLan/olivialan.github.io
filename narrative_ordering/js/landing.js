  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<p><strong>Evaluation of Narratives</strong></p> <br> <p>Description: </b><br>In this HIT, you will view 2 stories based on fictional data and evaluate their narratives by answering several questions. </p><p>As most questions are subjective, you need to write down reasons to explain yourself. We encourage writing reasons clearly and specifically to help us distinguish qualified answers (e.g., from robots). Very careful feedback will be rewarded with $1 bonus. </p>.'
  	        d.innerHTML = text
  	        d.style.textAlign = 'center'
  	        d.style.fontSize = 'large'
  	        d.style.marginTop = '10%'
  	        d.style.marginLeft = '20%'
  	        d.style.marginRight = '20%'
  	        document.body.append(d)



  	        btn = document.createElement('button')
  	        btn.innerHTML = 'Accept and Proceed'
  	        btn.style.margin = '5%'
  	        btn.style.fontSize = 'large'
  	        btn.onclick = () => {
  	            document.body.innerHTML = ''
  	            find_mid()
  	            if (mID == undefined || mID == '' || mID == 'preview') end_preview()
  	            else init_warning()
  	                // else init_emotion()
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