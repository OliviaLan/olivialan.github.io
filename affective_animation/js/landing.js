  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<p><strong>Evaluating Animation Design for Data Stories</strong></p> <br> <p>Description: </b><br>Animation is a design technique that has been widely applied in visual storytelling. In this study, we are particularly interested in: <strong>how should we design animation to facilitate the storytelling of data? </strong> Thus, we prepared a set of animated charts and invite you to evaluate the animation design of these charts.</br><br>You will view 10 charts randomly chosen from our corpus. After viewing each chart, you will rate its animation design by answering a set of evaluation questions, and some questions will ask you to write down reasons. After viewing all the 10 charts, you will fill out a survey to provide demographic information and provide overall judgements for the charts. The whole study will last about 30 minutes. </p><br><p><strong>Acceptance Criteria: the reasons you write down should make sense and can explain your ratings; IRRELEVANT OR INCOMPLETE ANSWERS WILL NOT BE ACCEPTED. </strong>We encourage you to provide such feedback clearly and concretely to help us distinguish qualified answers and pay bonuses to very supportive workers (up to $1).</p> <p style="color:red"><strong>Attention: do not close or reload the page after this step. If you do, the study will end without being finished.</p>'
  	        d.innerHTML = text
  	        d.style.textAlign = 'center'
  	        d.style.fontSize = 'large'
  	        d.style.marginTop = '5%'
  	        d.style.marginLeft = '20%'
  	        d.style.marginRight = '20%'
  	        document.body.append(d)


  	        btn = document.createElement('button')
  	        btn.innerHTML = 'Accept and Proceed'
  	        btn.style.margin = '3%'
  	        btn.style.class = 'large'
  	        btn.onclick = () => {
  	            document.body.innerHTML = ''
  	                //注释掉即不连接云数据库，正式测试记得加回来
  	            find_mid()
  	            if (mID == undefined || mID == '' || mID == 'preview') end_preview()
  	                // else init_survey()
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