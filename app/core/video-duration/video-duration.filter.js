'use strict';

angular.
module('core').
filter('videoDuration', function() {
    return function(input) {
        var duration = '';
        var counter = 0;
        for(var i =2;i<input.length;i++) {
            if(input[i] === 'H' || input[i] === 'M'){
                if(i!==input.length-1){
                    if(input[i]==='H'){
                        if(input[i+2]==='M')
                        {
                            duration += ':0';
                        }
                        else {
                            duration += ':';
                        }
                    }
                    else if(input[i]==='M'){
                        if(input[i+2]==='S')
                        {
                            duration += ':0';
                        }
                        else{
                            duration += ':';
                        }
                    }
                }
                else if (input[i]==='H') {
                    duration += ':00:00';
                }else if (input[i]==='M') {
                    duration += ':00';
                }
            }
            else if (input[i] === 'S'){
                if(duration.length===2){
                    var str = '00:';
                    str += duration;
                    duration = str;
                }
                break;
            }
            else {
                duration += input[i];
            }
        }
        return duration;
    };
});
