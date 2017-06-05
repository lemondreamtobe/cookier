var cookier = (function init(){
				function cookierWorker () {
					
					//私有方法
					function timeHandler(time) {
						var ex = time.substring(0, time.length-1);
						var pire = time.substring(time.length-1);
						
						switch (pire) {
							
							case 's':
								ex *= 1000;
							    break;
							
							case 'm':
								ex *= 60*1000; 
								break;
								
							case 'h':
								ex *= 60*60*1000;
								break;
							
							case 'd':
								ex *= 24*60*60*1000;
						};
						var timeHanle = new Date(); 
						var timeSetted = ex;
    					timeHanle.setTime(timeHanle.getTime() + timeSetted);
    					return ";expires=" + timeHanle.toGMTString();
					};
					this.getTime = function(ex) {
						return timeHandler(ex);
					};
				};
				cookierWorker.prototype.setCookie = function(name, value, expire) {
					var cookieAim = this.getCookie(name);
					
					//不存在名为name的cookie
					if (cookieAim == undefined) {
						var cookieString = '';
						cookieString += name + '=' + value;
					
						if (expire == undefined) {
							document.cookie = cookieString;
						} else {
    						cookieString += this.getTime(expire);
    						document.cookie = cookieString;
						};
					} else { //已存在名为name的cookie
						var query = confirm("已存在名为" + name + "的cookie,请问是否修改该cookie");
						
						if (query) {
							this.removeCookie(name);
							this.setCookie(name, value, expire);
						} else {
							return;
						}
					};
				};
				cookierWorker.prototype.getCookie = function(name) {
					var cookieArray = document.cookie.split(';');
					var cookieAccept = new Array();
					var cookieRegex = new RegExp(name + "=", "g");
					for(var i = 0; i < cookieArray.length; i++) 
					  	{
					    	var c;
					    	
					    	if (cookieArray[i].trim) {
					    		c = cookieArray[i].trim();
					    	} else {
					    		c = cookieArray[i].replace(/(^\s*)|(\s*$)/g, "");
					    	};
			    		 
					    	if (cookieRegex.test(c)) {
					    		cookieAccept.push(c);
					    	} else {
					    		continue;
					    	};	
					  	};
					
					if (cookieAccept.length == 0) {
						return undefined;
					} else {
						return cookieAccept;
					};
				};
				cookierWorker.prototype.modifyCookie = function(name, value, expire) {
					var cookieAim = this.getCookie(name);
					
					if (cookieAim == undefined) {
						var query = confirm("并未找到要修改的cookie项,是否需要创建新的cookie");
						
						if (query) {
							this.setCookie(name, value, expire);
						};
					} else {
						this.removeCookie(name);
						this.setCookie(name, value, expire);
					};
				};
				cookierWorker.prototype.removeCookie = function(name) {
					var cookieAim = this.getCookie(name);
					
					if (cookieAim == undefined) {
						return;
					} else {
						var cookieCover = cookieAim[0].split("=");	
					};	
					
					if (cookieCover[0].trim) {
						document.cookie = name + "=" + cookieCover[1].trim() + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
					} else {
						document.cookie = name + "=" + cookieCover[1].replace(/(^\s*)|(\s*$)/g, "") + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
					}
				};
				return new cookierWorker();
			})();