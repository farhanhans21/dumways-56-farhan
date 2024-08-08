const xhr = new XMLHttpRequest() 
// ajak

// HTTP REQUEST => suatu cara untuk melakukan proses
// ke server /API

// menggunakan MOCK API 
xhr.open("GET","https://api.npoint.io/e320fa70a61a3c02310b", true)

xhr.onerror = () => {
  console.log("Network Error");
}

xhr.onload = () =>{
  console.log(xhr.responseText);
}

xhr.send()
//cari mengenai JSON.func()