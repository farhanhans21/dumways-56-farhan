function isPayDept(isPay) {
  return new Promise((resolve, rejected)=>{
    if(!isPay) return rejected('galgal'
    );
    resolve("success")
  })
}

async function isPay(){
  try {
    console.log(await isPayDept(false));
  } catch (error) {
    
  }
}

// try and catch merupakan error hendling berguna 
// untuk mengendalikan error
// jika ada 2 kondisi false dan false 
// maka yang dijalankan adalah false yang pertama
// jika true or false maka di jalankan keduanya  