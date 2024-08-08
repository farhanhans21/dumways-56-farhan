const testimonials = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
    nama: "Hamzah",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
    star: "bintang 1 ",
  },
  {
    img: "https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg",
    nama: "Rani",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
    star: "bintang 2",
  },
  {
    img: "https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w",
    nama: "Brain",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
    star: "bintang 3",
  }
];


const testimonialsHTML = testimonials.map(e =>{
return ` 
  <div class="card-testi">
        <div class="img-testi">
          <img src="${e.img}"/>
        </div>
        <div class="nama-testi">
          <h2>${e.nama}</h2>
          <p>
            ${e.desc}
          </p>
          <p>${e.star}</p>
        </div>
    </div>`
})
console.log(testimonialsHTML);
document.getElementById("testimonial").innerHTML = testimonialsHTML
