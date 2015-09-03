// mycode.js
var usernames = [ 'patharryux' , 'jasonsiren' , 'nathanbennett3' , 'erikphansen' , 'donguyen' , 'adamtaitano' , 'jeffdunn' , 'kathleenkent' , 'tybrenner' ];



usernames.forEach(function(element) {
    $.getJSON('http:/teamtreehouse.com/'+element+'.json').
        done(importUser);
});

function importUser(data, textStatus, jqXHR){
	console.log(data);

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

console.log($img);
$img.appendTo($div);
}
