  	// --- SURVEY

  	form_properties = {
  	    // "country": {
  	    //     "type": "string",
  	    //     "title": "Current country",
  	    // },
  	    "age": {
  	        "type": "string",
  	        "title": "1. Age",
  	        'required': true
  	    },
  	    "gender": {
  	        "type": "string",
  	        "title": "2. Gender",
  	        "enum": ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
  	        'required': true
  	    },
  	    "literacy": {
  	        "type": "string",
  	        "title": "3. I have no problem understanding the visualization in the stories (timeline)?",
  	        "enum": ['Yes', 'No'],
  	        'required': true
  	    },
  	    "speed": {
  	        "type": "string",
  	        "title": "4. I think the animation speed is neither too fast nor too slow",
  	        "enum": ['Yes', 'No'],
  	        'required': true
  	    },
  	    "judgement_1": {
  	        "type": "string",
  	        "title": "5. Which story has better narrative order? (story content not taken into account)",
  	        "enum": ['Story One', 'Story Two'],
  	        'required': true
  	    },
  	    "judgement_1_why": {
  	        "type": "string",
  	        "title": "please describe your reason briefly.",
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
  	    // "replay": {
  	    //     "type": "string",
  	    //     "title": "6. Did you click the 'replay' buttons? If you did, please describe the reason briefly.",
  	    //     'required': true
  	    // },

  	    "feedback": {
  	        "type": "string",
  	        "title": "6. Please leave your feedback or comments related to this study below."
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
  	                "age": {
  	                    "size": 20,
  	                },
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

  	                "replay": {
  	                    "size": 100,
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
  	                            user_data['timestamp_end'] = Date.now()
  	                            user_data['worktime_in_seconds'] = (user_data['timestamp_end'] - user_data['timestamp_start']) / 1000
  	                            user_data['timestamp_start'] = new Date(user_data['timestamp_start']).toString()
  	                            user_data['timestamp_end'] = new Date(user_data['timestamp_end']).toString()
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