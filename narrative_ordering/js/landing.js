  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<b>Title:</b> Evaluation of Narratives<br> <b>Description: </b><br>In this HIT, you will view 2 fictional stories and evaluate their narratives by setting scores to several rating questions. As the questions are mostly subjective, you need to write down reasons to explain your ratings, and we encourage writing reasons clearly and specifically to help us distinguish qualified answers (e.g., from robots). Very careful feedback will be rewarded with a bonus. The HIT must be completed in one session. <br><br><b>HIT acceptance criteria: </b>You need to first accept the HIT on MTurk, then finish all the task on this page, copy your unique code, return to MTurk, paste your code to the input, and submit the HIT. Since we have to check the answers manually to see whether your reasons can explain your ratings, your HIT acceptance and bonus assignment may take up to 48 hours to process.'
  	        d.innerHTML = text
  	        d.style.textAlign = 'left'
  	        d.style.margin = '2%'
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