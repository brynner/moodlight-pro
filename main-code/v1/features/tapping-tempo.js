var TapTempo = (function(){

  var listOfTapDates = [];
  var listOfTapsDelays = [];
  var triggerTimer;

  var pushDate = function() {
    listOfTapDates.push(Date.now());
  };

  var pushDelay = function() {
    $.each(listOfTapDates, function(index, value) {
      if (index > 0) {
        var thisTapDate = value;
        var previousTapDate = listOfTapDates[index - 1];
        var delayAfterPreviousTap = thisTapDate - previousTapDate;

        listOfTapsDelays.push(delayAfterPreviousTap);
      }
    });
  };  

  var getAvgFromArray = function(array) {
    var sum = array.reduce(function (p, c) {
      return p + c;
    });

    var avg = sum / array.length;

    return avg;
  }

  var calculateResultBpm = function() {
    var averageDelayBetweenTaps = getAvgFromArray(listOfTapsDelays);
    var numberOfMillisecondsInMinute = 60000;
    var resultBpm = (numberOfMillisecondsInMinute/averageDelayBetweenTaps);
    return resultBpm;
  }

  var resetAllGatheredTappingData = function() {
     listOfTapDates = [];
     listOfTapsDelays = [];
  };
  
  var triggerCalculation = function() {
    clearTimeout(triggerTimer);

    pushDate();

    if (listOfTapDates.length > 1) {
      pushDelay();
      var resultBpm = calculateResultBpm();
      $(document).trigger('tempoSetByTapping', resultBpm)
    }

    triggerTimer = setTimeout(function() {
        resetAllGatheredTappingData();
    }, 1800);
  }

  return {
    triggerCalculation: triggerCalculation
  }

})();

$(document).on('mousedown.taptempo', '[action-tap-tempo]', function(event) {
  TapTempo.triggerCalculation();
});

$(document).on('touchstart', '[action-tap-tempo]', function(event) {
  TapTempo.triggerCalculation();
  $(document).off('mousedown.taptempo');
});

$(document).on('tempoSetByTapping', function(event, bpm) {
  ReactiveLocalStorage.setParam('tempo', bpm);
});