class Testi{

  constructor(img, nama,star,message) {
    this.img = img;
    this.nama = nama;
    this.star = star;
    this.message = message;
  }
  html() {
    return `
    <div class="card-testi">
        <div class="img-testi">
          <img src="${this.img}"/>
        </div>
        <div class="nama-testi">
          <h2>${this.nama}</h2>
          <p>
            ${this.message}
          </p>
          <p>${this.star}</p>
        </div>
    </div>`
  }

}
// const testimonials = [
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
//     nama: "Hamzah",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
//     star: "bintang 1 ",
//   },
//   {
//     img: "https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg",
//     nama: "Rani",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
//     star: "bintang 2",
//   },
//   {
//     img: "https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w",
//     nama: "Brain",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
//     star: "bintang 3",
//   }
// ];
const testimonial1 = new Testi("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s","Hamzah","Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur","bintang 1 ")
const testimonial2 = new Testi("https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg","Rani","Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur","bintang 2")
const testimonial3 = new Testi("https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w","Brain","Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur","bintang 1 ")

let testimonialsHTML = ''
const testimonials = [testimonial1, testimonial2, testimonial3];
// console.log(testimonials.length);
for (let index = 0; index < testimonials.length; index++) {
  testimonialsHTML += testimonials[index].html()
  
}
console.log(testimonials);

document.getElementById("testimonial").innerHTML = testimonialsHTML
