// mycode.js
// var _ = require("lodash");
var usernames = [ 'patharryux' , 'jasonsiren' , 'nathanbennett3' , 'erikphansen' , 'donguyen' , 'adamtaitano' , 'jeffdunn' , 'kathleenkent' , 'tybrenner' ];

var badgeNames = [];
var users = {};
var badges = {};
var who = [];
badgeUrl = [];

usernames.forEach(function(element) {
    $.getJSON('http:/teamtreehouse.com/'+element+'.json').
        done(importUser);
});


function importUser(data, textStatus, jqXHR){

	for(var i = 0; i < data.badges.length ; i++){
    users[data.name] = {name: data.name,
                        badges: data.badges,
                        };

  badgeNames.push(data.badges[i].name);
  badgeUrl.push(data.badges[i].icon_url);

}
//badges
  for(var x = 0; x < badgeNames.length; x++){
    badges[badgeNames[x]] = { name: badgeNames[x],
                              who: who,
                              url: badgeUrl[x]
                            };
}
console.log(data);

  function who(){
    var badge = [];

    for(person in users){
      for (var i = 0; i < users[person].badges.length; i++) {
        if(users[person].badges[i]['name'] == this.name){
        badge.push(users[person]);
        }
      }
    }
    return badge;
  }

	buildUser(data);
}


function buildUser(data){
  $div = $('<div>', { id: data.name.replace(/\s/g, ''),
                      class: 'user_box'
                    });

  $h1 = $('<h1>', { id: data.name,}).text(data.name);



  $h1.appendTo($div);
  data.badges.forEach(buildImages);
  $div.appendTo('body');
}

function buildImages(element, index, array){

$img = $('<img>' , { src: element.icon_url ,
                     id: "badge_" + element.name ,
                     class: "badge_img" ,
                     alt: element.name
                   });

// console.log($img);
$img.appendTo($div);
}


//>>>>>>>>>>>> Data Processing Functions <<<<<<<<<<<<<<<<<<

function intersectJobs(nameA, nameB) {
  var first = Object.keys(users[nameA]['badges']);
  var second = Object.keys(users[nameB]['badges']);
  return(_.intersection(first, second));
}

function similarity(personA, personB) {
  var first = Object.keys(users[personA].badges).length;
  var second =  Object.keys(users[personB].badges).length;
  var combine = intersectJobs(personA, personB).length;
  if (first > second) {
    // console.log(combine/ first);
    return _.round((combine / first), 2);
  } else {
    // console.log(combine / second);
    return _.round((combine / second), 2);
  }
}

function score(badge,person){
    var badgeArr = [];
    var arr = [];
    var arr2 = [];
  _.forOwn(users, function(value, key) {
    for (var i = 0; i < value.badges.length; i++) {
      if(badge === value.badges[i].name){
        badgeArr.push(value.name);
      }
    }
  });
  for (var i = 0; i < badgeArr.length ; i++) {
    var newPerson = users[badgeArr[i]].name;
    arr.push(similarity(person, newPerson));
  }
  arr2 = arr.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
  });
  return _.round(arr2 , 2);
}

function hasJob(name, badge) {
//   return people[person].jobs[jobs] ? true : false;
  for(var i = 0; i <users[name].badges.length; i++ ){
  if (users[name].badges[i].name == badge) {
    return true;
  }
  }
  return false;
}

function peopleDoing(badgeName) {
  var whoHasit = badges[badgeName].who();
  var result = [];
  for (var name in whoHasit) {
    result.push(whoHasit[name]);
    //result.push(whoDoesIt)
  }
  return result;
}
//
function jobsDoneBy(name) {
  var arr = [];
  var badgeObjects = users[name].badges;
  for (var badgeName in badgeObjects) {
    arr.push(badgeObjects[badgeName]);
    // arr.push(badges[badgeName]);
  }
  return arr;
}

function recommendBadgesFor(person){
  var arr = [];
  var points = [];
  var final = [];
  var personJobs = [];
  urlArray = [];

  users[person].badges.map(function(element, index, array){
  personJobs.push(element.name);
  });
console.log(personJobs);

  _.forOwn(badges, function(value, key) {
    if(personJobs.indexOf(key) == -1){
      arr.push(key);
      urlArray.push(badges[key].url);
    }
  });

  for (var i = 0; i < arr.length ; i++) {
    var job = arr[i];
    points.push(score(job, person));
  }
    points.sort(function compareNumbers(a, b) {
    return b - a;
  });
  for ( var j = 0; j < points.length; j++ ) {
    final.push({badges: arr[j], score: points[j], icon_url: urlArray[j]});
  }
  buildRecommend(final, person);
  return final;
  }


  function buildRecommend(final, person){
    var elementName = ('#'+person.replace(/\s/g, ''));
    $div = $('<div>', { id: person.replace(/\s/g, '') + "_recomended",
                        class: 'recommend_box'
                      });
    $h1 = $('<h1>', { id: person,}).text(person);
    console.log(elementName);

    $h1.appendTo($div);
    final.forEach(buildImages);
    $div.appendTo(elementName);

    // $h1 = $('<h1>', { id: data.name,}).text(data.name);

  }
