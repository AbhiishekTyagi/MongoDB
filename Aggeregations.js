db.persons.aggregate([
{ $project:
 {
  _id:1,
  email:1,
  name:1,
  gender:1,
  birthdate:{$toDate:"$dob.date"},
  age:"$dob.age",
  location:
  {
  	type:"Point",
  	coordinates:[
  		{$convert:{input:'$location.coordinates.longitude',to:"double",onError:0.0,onNull:0.0}},
  		{$convert:{input:'$location.coordinates.latitude',to:"double",onError:0.0,onNull:0.0}}]
  }
  }},
{$project: {gender: 1,location: 1,email:1,birthdate:1,age:1, 

 fullname: {$concat: [

 {$toUpper:{$substrCP:["$name.first",0,1]}},

{$substrCP:['$name.first',1,{$subtract:[{$strLenCP:'$name.first'},1]}]}," ",

{$toUpper:{$substrCP:["$name.last",0,1]}},

{$substrCP:['$name.last',1,{$subtract:[{$strLenCP:'$name.last'},1]}]}]}}},

{$group:{_id:{birthYear:{$isoWeekYear:"$birthdate"}},numPersons:{$sum:1}}},
{$sort:{numPersons:1}}
])