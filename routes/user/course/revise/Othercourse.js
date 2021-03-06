var utils = require('../../../../utils');
var Othercourse = {};

Othercourse.processOther = function(req, res, next){
    
    if(req.session.profile){
        var courseResult = [];
	    var compulsory = {
                title: '共同必修',
                credit: 0,
                require: 0,
                course: []
        }
        var coreClass = {
                title: '核心課程',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }
        var otherClass = {
                title: '副核心與他組核心',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }
	    var elective = {
                title: '專業選修',
                credit: 0,
                require: 0,
                course: []
        }
	    var language = {
                title: '外語',
                credit: 0,
                require: 8,
                course: []
        }
        var general = {
                title: '通識',
                credit: 0,
                require: 20,
                course: []
        }
        var otherElect = {
                title: '其他選修',
                credit: 0,
                require: 0,
                course: []
        }
	    var peClass = {
                title: '體育',
                credit: 0,
                require: 6,
                course: []
        }
        var service = {
                title: '服務學習',
                credit: 0,
                require: 2,
                course: []
        }
        var art = {
                title: '藝文賞析',
                credit: 0,
                require: 2,
                course: []
        }
        var graduate = {
                title: '抵免研究所課程',
                credit: 0,
                course: []
        }
	    var rules = JSON.parse(req.rules);
	    var program = req.profile[0].program;
        var pass = JSON.parse(req.pass);
       // console.log("pass ");
        //console.log(pass);
        var profile = JSON.parse(req.profile);
        //console.log(req.profile);
        var englishState = profile[0].en_certificate;
        var noEnglish = 0;
	    var offset = JSON.parse(req.free);
        //console.log("offset");
       // console.log(offset);
        var compulse = req.course.compulse;
        var compulseCodeCheck = [];
        //record the complulse course code
        for(var i = 0; i<compulse.length; i++)
            for(var q = 0; q<compulse[i].cos_codes.length; q++)
                compulseCodeCheck[compulse[i].cos_codes[q]] = true;
      // console.log(offset);
        var TeacherTime = [];
	    var generalCourse = JSON.parse(req.general);
	    var generalCheck = [];
        var generalDetail = [];
	    var rule = [];
	    var free = [];
	    var CSname = [];
    	var notCS = [];
	    var EnglishCourse = [];
	    var total = req.course.total;
        var advanceEnglish = 0;
        var basicEnglish = [];
        var dimension = [];
        var dimension_complete = 0;
        var dimension_count = 0;
		var studentId = res.locals.studentId;
	    var temp = parseInt(studentId.substring(0,2));
	    var school_year = (100 + temp);
        var englishFree = [];
        var offsetTeacherTime = [];
        var repeatCounter = [];
        var taken = [];
        var offsetNameCheck = [];
        var offsetInfo = [];
        var offsetTaken = [];
        var offsetTakenCheck = [];
        
        for(var i = 0; i<offset.length; i++){
            if(offset[i].score !=null){
                if(offsetTaken[offset[i].cos_code] == true){
                    //console.log("find the same");
                    if(parseInt(offset[i].score) > parseInt(offsetInfo[offset[i].cos_code].score)){
                        //console.log(offset[i].score);
                        offsetInfo[offset[i].cos_code] = offset[i];
                    }
                }
                else{
                    offsetTaken[offset[i].cos_code] = true;
                    offsetInfo[offset[i].cos_code] = offset[i];
                }
            }
            else{
                offsetInfo[offset[i].cos_code] = offset[i];
                offsetTaken[offset[i].cos_code] = true;
            }
        }
        
        for(var i = 0; i<offset.length; i++){
            offset[i] = offsetInfo[offset[i].cos_code];
            offsetNameCheck[offset[i].cos_cname] = true;
        }
        //console.log("after");
        //console.log(offset);

		for(var i = 0; i<offset.length; i++){
			if(offsetTakenCheck[offset[i].cos_code] != true){
            var cosInfo = {
                    cn:'',
                    en:'',
                    score: -1,
                    reason: 'CS',
                    realCredit:0,
                    type:'',
                    originalCredit:0,
                    complete:'0',
                    code:'',
                    grade:'0',
                    year: '',
                    semester: ''
             };
             var codeBrief = offset[i].cos_code.substring(0,3);
             cosInfo.complete = true;
             cosInfo.cn = offset[i].cos_cname;
             cosInfo.year = parseInt(offset[i].apply_year) - school_year + 1;
             cosInfo.realCredit = parseInt(offset[i].credit);
             cosInfo.originalCredit = parseInt(offset[i].credit);
             cosInfo.semester = parseInt(offset[i].apply_semester);
             cosInfo.type = offset[i].cos_type;
             cosInfo.code = offset[i].cos_code;
             if(offset[i].offset_type == '抵免')
                cosInfo.reason = 'free1';
             else if(offset[i].offset_type == '免修')
                 cosInfo.reason = 'free2';
            if(offset[i].cos_type == '必修'){
                if(offset[i].cos_cname.substring(0,2) == '物理'){
                    cosInfo.realCredit = parseInt(offset[i].credit) - 1;
                    var cosAdd = JSON.stringify(cosInfo);
                    cosAdd = JSON.parse(cosAdd);
                    cosAdd.realCredit = 1;
                    cosAdd.code = offset[i].cos_code + '_one';
                    elective.credit++;
                    elective.course.push(cosAdd);
                }
                if(codeBrief == 'ART'){
                    if(taken[cosInfo.code] == true){
                        if(repeatCounter[cosInfo.code] == null)
                            repeatCounter[cosInfo.code] = 1;
                        else
                            repeatCounter[cosInfo.code]++;
                        var temp = cosInfo.code + '_' + repeatCounter[cosInfo.code];
                        cosInfo.code = temp;
                    }
                    else
                        taken[cosInfo.code] = true;
                    art.course.push(cosInfo);
                    art.credit += parseInt(offset[i].credit);
                }
                else if(offset[i].cos_cname == '服務學習(一)' || offset[i].cos_cname == '服務學習(二)'){
                    cosInfo.type = offset[i].cos_typeext;
                    service.course.push(cosInfo);
                    service.credit += parseInt(offset[i].credit);
                }
                else{    
                    if(offset[i].cos_cname == '導師時間'){
                        if(taken[cosInfo.code] == true){
                            if(repeatCounter[cosInfo.code] == null)
                                repeatCounter[cosInfo.code] = 1;
                            else
                                repeatCounter[cosInfo.code]++;
                            var temp = cosInfo.code + '_' + repeatCounter[cosInfo.code];
                            cosInfo.code = temp;
                        }
                        else
                            taken[cosInfo.code] = true;
                        offsetTeacherTime.push(cosInfo);
                    }
                    compulsory.course.push(cosInfo);
                    compulsory.credit += cosInfo.realCredit;
                }
            }
			else if(offset[i].cos_type == '選修'){
                if(compulseCodeCheck[offset[i].cos_code] === true){
                    if(offset[i].cos_cname.substring(0,2) == '物理'){
                        cosInfo.realCredit = parseInt(offset[i].credit) - 1;
                        var cosAdd = JSON.stringify(cosInfo);
                        cosAdd = JSON.parse(cosAdd);
                        cosAdd.realCredit = 1;
                        cosAdd.code = offset[i].cos_code + '_one';
                        elective.credit++;
                        elective.course.push(cosAdd);
                    }
                    compulsory.course.push(cosInfo);
                    compulsory.credit += cosInfo.realCredit;
                }
                else{
                    var temp = offset[i].cos_code.substring(0,3);
                    if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE' || temp == 'IDS'){
                        elective.course.push(cosInfo);
                        elective.credit += parseInt(offset[i].credit);
                    }
                    else{
                        otherElect.course.push(cosInfo);
                        otherElect.credit += parseInt(offset[i].credit);
                    }
                }
            }
                        else if(offset[i].cos_type == '外語'){
                                if(offset[i].cos_cname == '外語榮譽學分'){
                                    englishFree.push(cosInfo);
                                }
                                else{
                                    language.course.push(cosInfo);
                                    language.credit += parseInt(offset[i].credit);
                                }
                        }
                       else if(offset[i].cos_type == '通識'){
                                cosInfo.dimension = offset[i].brief.substring(0,2);
                                if(cosInfo.dimension == '當代')
                                    dimension[0] = true;
                                else if(cosInfo.dimension == '公民')
                                    dimension[1] = true;
                                else if(cosInfo.dimension == '群己')
                                    dimension[2] = true;
                                else if(cosInfo.dimension == '文化')
                                    dimension[3] = true;
                                else if(cosInfo.dimension == '歷史')
                                    dimension[4] = true;
                                else if(cosInfo.dimension == '自然')
                                    dimension[5] = true;
                                general.course.push(cosInfo);
                                general.credit += parseInt(offset[i].credit);
                        }
                        else if(offset[i].cos_type == '服務學習'){
                                cosInfo.type  = offset[i].cos_typeext;
                                service.course.push(cosInfo);
                                service.credit += parseInt(offset[i].credit);
                        }
                        else if(offset[i].cos_type == '體育'){
                            if(taken[cosInfo.code] == true){
                                if(repeatCounter[cosInfo.code] == null)
                                    repeatCounter[cosInfo.code] = 1;
                                else
                                    repeatCounter[cosInfo.code]++;
                                var temp = cosInfo.code + '_' + repeatCounter[cosInfo.code];
                                cosInfo.code = temp;
                            }
                            else
                                taken[cosInfo.code] = true;
                            peClass.course.push(cosInfo);
                            peClass.credit += parseInt(offset[i].credit);
                        }
                        offsetTakenCheck[offset[i].cos_code] = true;
                    }
		}
        if(englishFree.length != 0){
            for(var i = 0; i<englishFree.length; i++){
                if(i != 0)
                    englishFree[0].realCredit += englishFree[i].realCredit;
            }
            englishFree[0].originalCredit = englishFree[0].realCredit;
            language.credit += parseInt(englishFree[0].realCredit);
            language.course.push(englishFree[0]);
        }

        //record other courses that can be regarded as general courses
		for(var g = 0; g<generalCourse.length; g++){
            generalCheck[generalCourse[g].cos_code] = true;
            generalDetail[generalCourse[g].cos_code] = generalCourse[g];
        }
		//////console.log("After checking free");
		compulsory.require = parseInt(rules[0].require_credit);
	    coreClass.require = parseInt(rules[0].core_credit);
	    otherClass.require = parseInt(rules[0].sub_core_credit);
	    elective.require = parseInt(rules[0].pro_credit);
	    otherElect.require = parseInt(rules[0].free_credit);
	    language.require = parseInt(rules[0].foreign_credit);

        //record the cs table courses and cs courses' names
		for(var x = 0; x<total.length; x++){
	        CSname[total[x].cos_cname] = true;
          	for(var a = 0; a<total[x].cos_codes.length; a++){
	            rule[total[x].cos_codes[a]] = true;
	        }
	    }
		for(var q = 0; q<pass.length; q++){
	        var cosInfo = {
	            	cn:'',
	                en:'',
				    score: -1,
			    	reason: 'CS',
	                complete:'0',
				    grade:'0',
                    code:'',
				    realCredit: 0,
				    originalCredit: 0,
				    english: false,
				    year: '',
				    semester: '',
				    move: false
	         };
	         var temp = pass[q].cos_code.substring(0,3);
			 if(pass[q].pass_fail == '通過'){
	            cosInfo.cn = pass[q].cos_cname;
                cosInfo.en = pass[q].cos_ename;
                cosInfo.originalCredit = parseInt(pass[q].cos_credit);
                cosInfo.complete = true;
                cosInfo.realCredit = parseInt(pass[q].cos_credit);
                cosInfo.score = parseInt(pass[q].score);
                cosInfo.grade = pass[q].score_level;
                cosInfo.year = parseInt(pass[q].year) - school_year + 1;
                cosInfo.semester = parseInt(pass[q].semester);
                cosInfo.type = pass[q].cos_type;
                cosInfo.code = pass[q].cos_code;
            }
			else
				cosInfo.complete = false;
	        if(rule[pass[q].cos_code] != true){
		        if(cosInfo.complete === true){
				    if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE'){
	                    if(pass[q].cos_cname == '服務學習(一)' || pass[q].cos_cname == '服務學習(二)'){
	                        if(offsetNameCheck[pass[q].cos_cname] == true);
                            else{
                            cosInfo.type = pass[q].cos_typeext;
                            for(var w = 0; w< service.course.length; w++){
                                if(service.course[w].cn == pass[q].cos_cname){
                                    if(pass[q].score >= service.course[w].score)
                                        service.course[w] = cosInfo;
                                    break;
                                 }
                            }
                            if(w == service.course.length){
                                cosInfo.type = pass[q].cos_typeext;
                                service.credit += parseInt(pass[q].cos_credit);
                                service.course.push(cosInfo);
                            }
                            }
					    }
	                    else{
	                        if(pass[q].cos_cname != '導師時間'){
							    for(var x = 0; x< elective.course.length; x++){
                                    if(elective.course[x].cn == pass[q].cos_cname){
                                        if(pass[q].score >= elective.course[x].score)
                                            elective.course[x] = cosInfo;
                                        break;
                                    }
                                }
                                if(x == elective.course.length){
                                    if(pass[q].cos_typeext == '英文授課'){
                                        cosInfo.english = true;
									    EnglishCourse.push(cosInfo);
								    }
								    if(elective.credit >= elective.require){
                                        cosInfo.move = true;
									    otherElect.credit += parseInt(pass[q].cos_credit);
                                        otherElect.course.push(cosInfo);
								    }
								    else{
									    elective.credit += parseInt(pass[q].cos_credit);
                                        elective.course.push(cosInfo);
								    }
                                }
						    }
                            
                            /*else{
                                //compulsory.course.push(cosInfo);
	                            //compulsory.credit += parseInt(pass[q].cos_credit);
						    }*/
	                    }
	             }
				 else if(temp == 'ART'){
                    if(taken[cosInfo.code] == true){
                       if(repeatCounter[cosInfo.code] == null)
                           repeatCounter[cosInfo.code] = 1;
                       else
                           repeatCounter[cosInfo.code]++;
                       var temp  = cosInfo.code + '_' + repeatCounter[cosInfo.code];
                       cosInfo.code = temp;
                    }
                    else
                        taken[cosInfo.code] = true;
                    art.credit += parseInt(pass[q].cos_credit);
                    art.course.push(cosInfo);
				 }
	             else{
	                if(pass[q].cos_type == '外語'){
				        var reg = pass[q].cos_cname.substring(0,4);
                        for(var h = 0; h< language.course.length; h++){
                            if(language.course[h].cn == pass[q].cos_cname){
                                if(pass[q].score >= language.course[h].score)
                                    language.course[h] = cosInfo;
                                break;
                            }
                        }
                        if(h == language.course.length){
                            if(reg == '進階英文')
                                advanceEnglish ++;
                            else{
                                if(pass[q].cos_cname == '大一英文（一）')
                                    basicEnglish[0] = true;
                                else if(pass[q].cos_cname == '大一英文（二）')
                                    basicEnglish[1] = true;
                            }
                            if(englishState == '0'){
                                if(advanceEnglish <=2){
                                    if(reg == '進階英文'){
                                        cosInfo.realCredit = 0;
                                        cosInfo.reason = 'english';
                                        language.course.push(cosInfo);
                                    }
                                    else{
                                        if(language.credit >= language.require){
                                            cosInfo.move = true;
                                            otherElect.course.push(cosInfo);
                                            otherElect.credit += parseInt(pass[q].cos_credit);
                                        }
                                        else{
                                            language.course.push(cosInfo);
                                            language.credit += parseInt(pass[q].cos_credit);
                                        }
                                    }
                                }
                                else{
                                    if(language.credit >= language.require){
                                        cosInfo.move = true;
                                        otherElect.course.push(cosInfo);
                                        otherElect.credit += parseInt(pass[q].cos_credit);
                                    }
                                    else{
                                        language.course.push(cosInfo);
                                        language.credit += parseInt(pass[q].cos_credit);
                                    }
                                }
                           }
                           else{
                                if(language.credit >= language.require){
                                    cosInfo.move = true;
                                    otherElect.course.push(cosInfo);
                                    otherElect.credit += parseInt(pass[q].cos_credit);
                                }
                                else{
                                    language.course.push(cosInfo);
                                    language.credit += parseInt(pass[q].cos_credit);
                                }
                           }
					    }
                    }
                    else if(pass[q].brief == '軍訓'){
                        cosInfo.originalCredit = 0;
                        cosInfo.realCredit = 0;
                        otherElect.course.push(cosInfo);   
                    }           
	                else if(pass[q].cos_type == '通識'){
				            var brief = pass[q].brief.substring(0,2);
                            dimension_count = 0;
                            cosInfo.dimension = brief;
                            for(var z = 0; z< general.course.length; z++){
                                if(general.course[z].cn == pass[q].cos_cname){
                                    if(pass[q].score >= general.course[z].score)
                                        general.course[z] = cosInfo;
                                    break;
                                }
                            }
                            if(z == general.course.length){
                                if(pass[q].cos_typeext == '服務學習'){
                                    var cosInfoNew = JSON.stringify(cosInfo);
                                    cosInfoNew = JSON.parse(cosInfoNew);
                                    cosInfoNew.type += pass[q].cos_typeext;
                                    cosInfoNew.realCredit = 0;
                                    service.course.push(cosInfoNew);
                                }
                                if(dimension_complete == 1){
                                    if(general.credit >= general.require){
								        cosInfo.move = true;
								        otherElect.course.push(cosInfo);
								        otherElect.credit += parseInt(pass[q].cos_credit);
							        }
                                    else{
                                        general.course.push(cosInfo);
                                        general.credit += parseInt(pass[q].cos_credit);
                                    }
                                }
							    else{
	                                if(brief == '當代')
                                        dimension[0] = true;
                                    else if(brief == '公民')
                                        dimension[1] = true;
                                    else if(brief == '群己')
                                        dimension[2] = true;
                                    else if(brief == '文化')
                                        dimension[3] = true;
                                    else if(brief == '歷史')
                                        dimension[4] = true;
                                    else if(brief == '自然')
                                        dimension[5] = true;
                                    general.course.push(cosInfo);
	                                general.credit += parseInt(pass[q].cos_credit);
                                    for(var j =0; j<6; j++)
                                        if(dimension[j] == true)
                                            dimension_count++;
                                    if(dimension_count == 6)
                                        dimension_complete = 1;
							    }
						    }
	                }
				    else{
	                    if(temp == 'PYY'){
						    if(taken[cosInfo.code] == true){
                                if(repeatCounter[cosInfo.code] == null)
                                    repeatCounter[cosInfo.code] = 1;
                                else
                                    repeatCounter[cosInfo.code]++;
                                var temp = cosInfo.code + '_' + repeatCounter[cosInfo.code];
                                cosInfo.code = temp;
                            }
                            else
                                taken[cosInfo.code] = true;
                            cosInfo.type = pass[q].cos_typeext;
                            peClass.course.push(cosInfo);
	                        peClass.credit += parseInt(pass[q].cos_credit);
	                    }
	                    else{
	                        if(pass[q].cos_typeext == '服務學習'){
								if(pass[q].cos_cname == '服務學習(一)')
                                    cosInfo.reason = 'notCS';
                                cosInfo.type = pass[q].cos_typeext;
                                service.course.push(cosInfo);
	                            service.credit += parseInt(pass[q].cos_credit);
	                    }
						/*else if(pass[q].cos_cname == '導師時間'){
	                         compulsory.course.push(cosInfo);
	                         compulsory.credit += parseInt(pass[q].cos_credit);
					    }*/
	                    else{
	                        if(CSname[cosInfo.cn] == true){
							    cosInfo.complete = true;
	                            cosInfo.reason = 'CS';
							    notCS[cosInfo.cn] = true;
								free[cosInfo.cn] = cosInfo;
							}
                            if(pass[q].cos_cname != '導師時間'){
							    for(var m = 0; m< otherElect.course.length; m++){
                                    if(otherElect.course[m].cn == pass[q].cos_cname){
                                        if(pass[q].score >= otherElect.course[m].score)
                                            otherElect.course[m] = cosInfo;
                                        break;
                                    }
                                }
                                if(m == otherElect.course.length){
                                    if(generalCheck[pass[q].cos_code] === true){
                                        cosInfo.reason = 'general';
                                        cosInfo.dimension = generalDetail[pass[q].cos_code].brief.substring(0,2);
                                    }
                                   // //console.log(cosInfo);
								    otherElect.course.push(cosInfo);
                                    otherElect.credit += parseInt(pass[q].cos_credit);
						        }
                            }
                            else{
                                if(taken[cosInfo.code] == true){
                                    if(repeatCounter[cosInfo.code] == null)
                                        repeatCounter[cosInfo.code] = 1;
                                    else
                                        repeatCounter[cosInfo.code]++;
                                    var temp = cosInfo.code + '_' + repeatCounter[cosInfo.code];
                                    cosInfo.code = temp;
                                    ////console.log(cosInfo);
                                }
                                else
                                    taken[cosInfo.code] = true;
                                TeacherTime.push(cosInfo);
                                //cosInfo.reason = 'CS';
                                ////console.log(cosInfo);
                                otherElect.course.push(cosInfo);
                                otherElect.credit += parseInt(pass[q].cos_credit);
                            }
	                     }
	                 }
	              }
	          }
		    }
	      }
	    }

		if(englishState == '0' || englishState == '3' || englishState == '4'){
            for(var i = 0; i<2; i++){
               if(basicEnglish[i] != true){
                   var cosInfo = {
                            cn:'',
                            en:'',
                            score:-1,
                            reason:'CS',
                            complete:false,
                            grade:'',
                            realCredit:0,
                            originalCredit:2,
                            english:false,
                            year:'',
                            semester:'',
                            move:false   
                    };
                    if(i == 0){
                        cosInfo.cn = '大一英文（一）';
                        cosInfo.en = 'Freshman English (I)';
                    }
                    else{
                        cosInfo.cn = '大一英文（二）';
                        cosInfo.en = 'Freshman English (II)';
                    }
                    language.course.push(cosInfo);
                 }
              }
        }
        courseResult.push(compulsory);
	    courseResult.push(coreClass);
	    courseResult.push(otherClass);
		courseResult.push(elective);
	    courseResult.push(otherElect);
	    courseResult.push(language);
	    courseResult.push(general);
	    courseResult.push(peClass);
	    courseResult.push(service);
	    courseResult.push(art);
        courseResult.push(graduate);
	}
	else {
			res.redirect('/');
	}
	res.locals.courseResult = courseResult;
	res.locals.notCS = notCS;
	res.locals.English = EnglishCourse;
	res.locals.free = free;
    res.locals.dimension = dimension;
    res.locals.teacher = TeacherTime;
    res.locals.offsetTeacher = offsetTeacherTime;
 	next();
}

exports.Othercourse = Othercourse;
