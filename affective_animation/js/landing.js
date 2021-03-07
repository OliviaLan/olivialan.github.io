  	// --- CONSENT FORM
  	var init_landing_page = () => {
  	        d = document.createElement('div')
  	        text = '<p><strong>Evaluating Animation Design for Data Stories</strong></p> <br> <p>Description: </b><br>Data stories are stories based on data. In this study, we are interested in: <strong>how should we design animation for data visualizations (e.g., bar charts, line charts, and pie charts) to make the data stories more emotionally expressive? </strong> Thus, we prepare a set of animated charts and invite you to evaluate the animation design of these charts.</br><br>You will view 10 charts randomly chosen from our corpus. To avoid the influence of color, we made all the charts grey. After viewing each chart, you will be asked to recall the chart content and answer a set of questions to evaluate the animation design. After viewing all the 10 charts, you will fill out a survey to provide demographic information and choose your favorite charts. The whole study will last about 30 minutes. </p><br><p><strong>Acceptance Criteria: the texts you write down should make sense and prove that you have viewed the charts carefully; IRRELEVANT OR INCOMPLETE ANSWERS WILL NOT BE ACCEPTED. </strong>We encourage you to provide feedback clearly and concretely to help us distinguish qualified answers and pay bonuses to very supportive workers (up to $1).</p> <p style="color:red"><strong>Attention: do not close or reload the page after this step. If you do, the study will end without being finished.</p>'
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
  	            else init_survey()
  	                // else init_questions()
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