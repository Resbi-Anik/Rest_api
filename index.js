//sync

console.log('course1');
console.log('course2');
console.log('course3');
console.log('course4');

//async

console.log('course1');
setTimeout(()=>{
  console.log('course2');
},2000)
console.log('course3');
console.log('course4');



