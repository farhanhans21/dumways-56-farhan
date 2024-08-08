function generateStarRating(numStars) {
  const maxStars = 5;
  let starsHtml = "";
  for (let i = 0; i <= maxStars; i++) {
    if (i < numStars) {
      starsHtml += '<img src="../asset/photo/star1.png" style="max-widht:10%">';
    }
  }
  return starsHtml;
}
async function fetchTestimonials() {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          obj: () =>
            Promise.resolve([
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
                nama: "Hamzah",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
                star: 1,
              },
              {
                img: "https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg",
                nama: "Rani",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
                star: 2,
              },
              {
                img: "https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w",
                nama: "Brain",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
                star: 3,
              },
            ]),
        });
      }, 1000);
    });

    const testimonials = await response.obj();

    const testimonialsHTML = testimonials
      .map(
        (e) => `
      <div class="card-testi">
              <div class="img-testi">
                  <img src="${e.img}" />
              </div>
              <div class="nama-testi">
                  <h2>${e.nama}</h2>
                  <p>${e.desc}</p>
                  <p>${generateStarRating(e.star)}</p>
              </div>
          </div>`
      )
      .join("");

    document.getElementById("testimonial").innerHTML = testimonialsHTML;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

async function filterTestimonial(star) {
  try {
    const testimonials = [
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
        nama: "Hamzah",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
        star: 1,
      },
      {
        img: "https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg",
        nama: "Rani",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
        star: 2,
      },
      {
        img: "https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w",
        nama: "Brain",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eliex at turpis condimentum condimentum. Nulla facilisi. Sed vel massavel velit consectetur",
        star: 3,
      },
    ];

    const filteredTestimonialByRating = testimonials.filter((testimonial) => {
      return testimonial.star == star;
    });

    const testimonialHTML = filteredTestimonialByRating.map((e) => {
      return ` <div class="card-testi">
              <div class="img-testi">
                  <img src="${e.img}" />
              </div>
              <div class="nama-testi">
                  <h2>${e.nama}</h2>
                  <p>${e.desc}</p>
                  <p>${generateStarRating(e.star)}</p>
                  <img src>
              </div>
          </div>`;
    });

    document.getElementById("testimonial").innerHTML = testimonialHTML;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}
fetchTestimonials();
