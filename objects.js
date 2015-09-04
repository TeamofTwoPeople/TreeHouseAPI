// mycode.js
// var _ = require("lodash");
var usernames = [ 'patharryux' , 'jasonsiren' , 'nathanbennett3' , 'erikphansen' , 'donguyen' , 'adamtaitano' , 'jeffdunn' , 'kathleenkent' , 'tybrenner', 'josephfraley2', 'mkelley2', 'bosuntom', 'jenniferminetree' ];

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
// console.log(data);

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

  $button = $('<button>', { id:data.name + "button",
                            class:'butt',}).text('Recommended');

$(document).ready(function(){
  $button.click(function() {
    recommendBadgesFor(data.name);
  });
});

  $button.appendTo($h1);
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
