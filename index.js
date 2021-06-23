//without callback return value can't be shown
//output:{
// before
// reading a user
// user value is: undefined
// after}

// const getUser = (value) =>{
//   console.log('reading a user');
//   setTimeout(()=>{
//    return({user_value: value});
//   },2000)
// }

// console.log('before');
// const user=getUser(1)
// console.log('user value is:', user);
// console.log('after');

// using callback

const getUser = (value, callback) =>{
  console.log('reading a user');
  setTimeout(()=>{
   callback({user_value: value});
  },2000)
}

console.log('before');
const user=getUser(1,(user)=>{
    console.log('user value is:', user);
})
console.log('after');