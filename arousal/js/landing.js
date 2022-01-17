  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<p><strong>What Triggers Affective Arousal in Infographic Design?</strong></p> <br> <p>Description: </b><br>Infographics use visualizations, texts, and embellishments to represent information, data, or knowledge. We are interested in what design factors can trigger <strong>strong affective arousal (i.e., high-intensity feelings, emotions, or moods)</strong> in infographics.</br><br>The study consists of 3 sessions. In the first session, you will view a tutorial that guides you to complete the study correctly. In the second session, you will view 10 infographics randomly chosen from our corpus. After viewing each infographic, you will rate the affective arousal of its design, explain reasons, and demonstrate whether you like or are willing to share the infographic. In the third session, you will fill out a survey to provide demographic information and leave feedback. The whole survey will last about 30 minutes. </p><br><p><strong>Acceptance Criteria: the reasons you write down should make sense and can explain your ratings; IRRELEVANT OR INCOMPLETE ANSWERS WILL NOT BE ACCEPTED. </strong></p>We encourage you to provide such feedback clearly and concretely to help us distinguish qualified answers and pay bonuses to very supportive workers (up to $1).</p> <p style="color:red"><strong>Attention: do not close or reload the page after this step. If you do, the study will end without being finished.</p>'
  	        d.innerHTML = text
  	        d.style.textAlign = 'center'
  	        d.style.fontSize = 'large'
  	        d.style.marginTop = '5%'
  	        d.style.marginLeft = '20%'
  	        d.style.marginRight = '20%'
  	        document.body.append(d)


  	        btn = document.createElement('button')
  	        btn.innerHTML = 'Accept and Proceed'
  	            // btn.style.margin = '3%'
  	            // btn.style.class = 'large'
  	        btn.style.width = "200px"
  	        btn.style.margin = "2em auto"
  	        btn.className = "begin"

  	        btn.onclick = () => {
  	            // document.body.innerHTML = ''
  	            //首页点击接受后，查询其id是否在数据库中（已做过测试）
  	            // find_mid()
  	            if (mID == undefined || mID == '' || mID == 'preview') end_preview()
  	                // else init_warning()
  	                // else init_survey()
  	                // else init_tutorial_1()
  	                //else init_questions()
  	            else init_questions()
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