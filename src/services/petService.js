var moment = require('moment');

var yearsToText = function(years) {
    if (years > 1) {
        return years + ' years';
    }
    if (years === 1) {
        return '1 year';
    }
    else {
        return '';
    }
};

var monthsToText = function(months) {
    if (months > 1) {
        return  months + ' months';
    }
    if (months === 1) {
        return '1 month';
    }
    else {
        return '';
    }
};

var petService = function (pet) {
    
    var yearsAlive =  function() {
        var years = moment.years(pet.died, pet.birthday);
        return yearsToText(years);
    };
    
    var monthsAlive = function() {
        var months = moment.remainderMonths(pet.died, pet.birthday);
        console.log('months: ' + months);
        if (months === 0) {
            console.log(yearsAlive);
            yearsAlive.slice(0, -1);
            console.log(yearsAlive);
        }
        return monthsToText(months);
    };
    
    var yearsWithMe =  function() {
         var years = moment.years(pet.died, pet.adopted); 
         return yearsToText(years);
    };
    
    var monthsWithMe = function() {
        var months = moment.remainderMonths(pet.died, pet.adopted);
        console.log('months: ' + months);
        if (months === 0) {
            console.log('Years with me: ' + yearsWithMe());
            yearsWithMe = yearsWithMe().toString().slice(0, -1);
            console.log('Years with me: ' + yearsWithMe);
        }
        return monthsToText(months);
    };

    return {
        yearsAlive: yearsAlive,
        monthsAlive: monthsAlive,
        yearsWithMe: yearsWithMe,
        monthsWithMe: monthsWithMe
    };
};

module.exports = petService;