// mycode.js
// var _ = require("lodash");
var usernames = [ 'patharryux' , 'jasonsiren' , 'nathanbennett3' , 'erikphansen' , 'donguyen' , 'adamtaitano' , 'jeffdunn' , 'kathleenkent' , 'tybrenner' ];

var badgeNames = [];
var users = {};
var badges = {};
var who = [];

usernames.forEach(function(element) {
    $.getJSON('http:/teamtreehouse.com/'+element+'.json').
        done(importUser);
});


function importUser(data, textStatus, jqXHR){

	for(var i = 0; i < data.badges.length ; i++){
    users[data.name] = {name: data.name,
                        badges: data.badges
                        };
  badgeNames.push(data.badges[i].name);
}
//badges
  for(var x = 0; x < badgeNames.length; x++){
    badges[badgeNames[x]] = { name: badgeNames[x],
                              who: who,
                            };
}

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
  $div = $('<div>', { id: data.profile_name,
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
