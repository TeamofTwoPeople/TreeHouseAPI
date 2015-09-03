var _ = require('lodash');

// people
var mom  = {name:'mom',  jobs:{}},
    dad  = {name:'dad',  jobs:{}},
    billy= {name:'billy',jobs:{}},
    sally= {name:'sally',jobs:{}};

// chores
var wash=   {job:'wash',who:{}},
    dry =   {job:'dry', who:{}},
    mop =   {job:'mop', who:{}},
    cook=   {job:'cook',who:{}};

var people = {
    mom:mom,
    dad:dad,
    billy:billy,
    sally:sally
};

var jobs = {
    mop:mop,
    cook:cook,
    wash:wash,
    dry:dry
};

wash.who = {mom:mom,billy:billy};
dry.who  = {dad:dad,billy:billy,sally:sally};
cook.who = {dad:dad,sally:sally};
mop.who  = {dad:dad,mom:mom};

mom.jobs  = {wash:wash,mop:mop};
dad.jobs  = {dry:dry,cook:cook,mop:mop};
sally.jobs= {dry:dry,cook:cook};
billy.jobs= {wash:wash,dry:dry};

// hasJob('mom','mop') --> true
// hasJob('mom','dry') --> false

function hasJob(person, jobs) {
//   return people[person].jobs[jobs] ? true : false;
  if (people[person].jobs[jobs]) {
    return true;
  } else {
    return false;
  }
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
  var whoHas = badges[badgeName].who();
  var result = [];
  for (var name in whoHasit) {
    result.push(whoHasit[name]);
    //result.push(whoDoesIt)
  }
  return result;
}

function jobsDoneBy(name) {
  var arr = [];
  var badgeObjects = users[name].badges;
  for (var badgeName in badgeObjects) {
    arr.push(badgeObjects[badgeName]);
    // arr.push(badges[badgeName]);
  }
  return arr;
}


// another way to do it
// function intersectJobs(nameA, nameB) {
//   var arr = [];
//   var first = nameA.jobs;
//   var second = nameB.jobs;
//   for (var prop in first){
//     if (prop in second){
//       arr.push(prop);
//     }
//   }
//   console.log(arr);
//   return arr;
// }


// Data Processing
function intersectJobs(nameA, nameB) {
  var first = Object.keys(users[nameA]['badges']);
  var second = Object.keys(users[nameB]['badges']);
  return(_.intersection(first, second));
}

 // var here = intersectJobs(sally, billy);
 // console.log(here.length);

// receives two person objects and calculates a number from 0 to 1 representing the similarity of their jobs
function similarity(personA, personB) {
  var first = Object.keys(personA.jobs).length;
  var second =  Object.keys(personB.jobs).length;
  var combine = intersectJobs(personA, personB).length;
  if (first > second) {
    console.log(combine/ first);
    return (combine / first);
  } else {
    console.log(combine / second);
    return (combine / second);
  }
}

similarity(mom, mom);

//find similarity of person to every other member, add up the total from every member that does the job and that sum is the 'score' for person
// generates a number representing the "compatibility" of that job and that person.
function score(job,person){
    var jobArr = [];
    var arr = [];
    var arr2 = [];
  _.forOwn(people, function(value, key) {
    if(job in value.jobs){
      jobArr.push(value.name);
    }
  });
  for (var i = 0; i < jobArr.length ; i++) {
    var newPerson = people[jobArr[i]];
    arr.push(similarity(person, newPerson));
  }
  arr2 = arr.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
  });
  return _.round(arr2 , 2);
}


// return an array of objects containing possible new jobs for person with compatibility scores for each
function recommendJobsFor(person){
  var arr = [];
  var points = [];
  var final = [];
  _.forOwn(jobs, function(value, key) {
    if(!(key in person.jobs)){
      arr.push(key);
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
    final.push({job: arr[j], score: points[j]});
  }
return final;
}
// console.log(recommendJobsFor(mom));

// Display Functions

// Write a function maxLength(strings) which returns the length of the longest string in the array strings
function maxLength(strings) {
   return strings.sort(function(a, b) {
       return (b.length-a.length);
       } )[0].length;
}

// function maxLength(strings) {
//   return Math.max(strings.length);
// }

// Math.max(a, b, c)
function sizeColumns(rowNames, colNames) {

}
