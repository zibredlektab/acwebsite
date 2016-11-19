// Thanks to user Adjit on StackOverflow for this script! http://stackoverflow.com/users/1887101/adjit

var scrollPercent = (function() {
    "use strict";
    var initDiff;
    var module = {
        config: {

        },
        init: function() {
            var windowHeight = this.getWindowHeight();
            var docHeight = this.getDocHeight() - windowHeight;
            initDiff = (windowHeight / docHeight) * 100;
            //console.log('Difference : ' + initDiff);
            
            return this.percent();
        },
        percent: function() {
            var windowHeight = this.getWindowHeight();
            var docHeight = this.getDocHeight() - windowHeight;
            var scrollPosition = this.getScrollPosition();            
            var result = ((scrollPosition + windowHeight) / docHeight) * 100 - initDiff;
            
            //console.log('Window Height : ' + windowHeight);
            //console.log('Document Height : ' + docHeight);
            //console.log('Scroll Position : ' + scrollPosition);

            return Math.floor(result);
        },
        getScrollPosition: function() {
            return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;               
        },
        getWindowHeight: function() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        },
        getDocHeight: function() {
            return Math.max(
                document.body.scrollHeight || 0, 
                document.documentElement.scrollHeight || 0,
                document.body.offsetHeight || 0, 
                document.documentElement.offsetHeight || 0,
                document.body.clientHeight || 0, 
                document.documentElement.clientHeight || 0
            );                
        }
    };

    return module;
});