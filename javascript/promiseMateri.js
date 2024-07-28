// pending => menunggu
// resolve => penyelesaian
// rejected => tolak

const promise = new Promise((resolve, rejected) => {
  const isPay = true;

  if (isPay == false) {
    rejected("Gagal Bayar Hutang!");
  } else {
    resolve("Saya Sudah Bayar Hutang");
  }
});


promise.then((value) => {
  console.log(value);
})
.catch((value)=>{
  console.log(value);
})
