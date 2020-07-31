  	// --- SURVEY

  	form_properties = {
  	    // "country": {
  	    //     "type": "string",
  	    //     "title": "Current country",
  	    // },
  	    "age": {
  	        "type": "string",
  	        "title": "Age",
  	        'required': true
  	    },
  	    "gender": {
  	        "type": "string",
  	        "title": "Gender",
  	        "enum": ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
  	        'required': true
  	    },
  	    "literacy": {
  	        "type": "string",
  	        "title": "I can understand the visualization in the stories (timeline & line chart)?",
  	        "enum": ['Yes', 'No'],
  	        'required': true
  	    },
  	    "speed": {
  	        "type": "string",
  	        "title": "I think the animation speed is neither too fast nor too slow",
  	        "enum": ['Yes', 'No'],
  	        'required': true
  	    },
  	    "judgement_1": {
  	        "type": "string",
  	        "title": "Which story has better narratives?",
  	        "enum": ['Story One', 'Story Two'],
  	        'required': true
  	    },
  	    "judgement_1_why": {
  	        "type": "string",
  	        "title": "Please describe your reason briefly.",
  	        'required': true
  	    },
  	    // "img": {
  	    //     "title": "Which story do you prefer?"
  	    // },
  	    // "judgement_2": {
  	    //     "type": "string",
  	    //     "title": "Which story is more engaging?",
  	    //     "enum": ['Story One', 'Story Two'],
  	    //     'required': true
  	    // },
  	    // "judgement_2_why": {
  	    //     "type": "string",
  	    //     "title": "Please describe why briefly.",
  	    //     'required': true
  	    // },
  	    "feedback": {
  	        "type": "string",
  	        "title": "Please leave your feedback or comments related to this study below."
  	    },
  	}

  	var init_survey = () => {
  	        time_out = true
  	        document.body.innerHTML = ''
  	        d = document.createElement('div')
  	        d.id = 'form'
  	        document.body.append(d)

  	        var schema = {
  	            "title": "Survey",
  	            "description": "Demographic information",
  	            "type": "object",
  	            "properties": form_properties
  	        }

  	        var options = {
  	            'fields': {
  	                // 'country': {
  	                //     'type': 'country',
  	                //     'label': 'Current country'
  	                // },
  	                "gender": {
  	                    'type': 'radio',
  	                    'hideNone': true
  	                },
  	                "literacy": {
  	                    'sort': function(a, b) { return 0 },
  	                    'type': 'radio',
  	                    'hideNone': true
  	                },
  	                "speed": {
  	                    'sort': function(a, b) { return 0 },
  	                    'type': 'radio',
  	                    'hideNone': true
  	                },
  	                "judgement_1": {
  	                    'sort': function(a, b) { return 0 },
  	                    'type': 'radio',
  	                    'hideNone': true
  	                },
  	                // 'judgement_1_why': {
  	                //     "type": "textarea",
  	                //     "rows": 1,
  	                //     "cols": 60,
  	                //     "label": "",
  	                // },
  	                // "judgement_2": {
  	                //     'sort': function(a, b) { return 0 },
  	                //     'type': 'radio',
  	                //     'hideNone': true
  	                // },
  	                // 'judgement_2_why': {
  	                //     "type": "textarea",
  	                //     "rows": 1,
  	                //     "cols": 60,
  	                //     "label": "",
  	                // },
  	                'feedback': {
  	                    "type": "textarea",
  	                    "rows": 5,
  	                    "cols": 60,
  	                    "label": "",
  	                    "wordlimit": 1000
  	                },
  	                // "img": {
  	                //     "type": "image",
  	                //     // "label": "History dataset",
  	                //     "view": "bootstrap-display"
  	                // },
  	            },
  	            "form": {
  	                "buttons": {
  	                    "submit": {
  	                        "value": "Submit the Form",
  	                        "click": (a) => {
  	                            val = $('#form').alpaca('get');
  	                            //存数据-property
  	                            for (prop of Object.keys(form_properties)) {
  	                                //如果是放图片的，略过
  	                                // if (prop == 'img') continue;
  	                                if (val.getValue()[prop] != undefined) user_data[prop] = val.getValue()[prop]
  	                                else user_data[prop] = 'null'
  	                            }

  	                            init_end()
  	                        }
  	                    }
  	                }
  	            }
  	        }

  	        var data = {
  	            "img": './tutorial/history_surveypic.png',
  	            // "img_plant": './tutorial/plant_surveypic.png',
  	            // "img_schedule": './tutorial/schedule_surveypic.png'
  	        }

  	        $("#form").alpaca({
  	            'options': options,
  	            "schema": schema,
  	            'data': data,
  	            // "view": "bootstrap-display"
  	        });

  	        $(document).ready(function() {
  	            $(window).keydown(function(event) {
  	                if (event.keyCode == 13) {
  	                    event.preventDefault();
  	                    return false;
  	                }
  	            });
  	        });
  	    }
  	    // --- END SURVEY