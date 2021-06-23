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

// using promise

const getUser = (value) =>{
  return new Promise((resolve, reject)=>{
    console.log('reading a user');
      setTimeout(()=>{
      resolve({user_value: value});
      },2000)
  })
}

console.log('before');
const user=getUser(1)
.then(value=>console.log('user value is:', value))
console.log('after');

const err_values= Promise.reject(new Error('error to get value'))
err_values.catch(err=> console.log(err))