let services = [];
getData("services");

let languagesContent = document.querySelector(".popup.languages .content .body");
getData("languages");
let sectorsContent = document.querySelector(".popup.sectors .content ");
getData("sectors");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("Loading").style.display = "none";
});

wow = new WOW({
  animateClass: "animate__animated"

});
wow.init();

window.addEventListener("scroll", function (e) {
  if (this.window.scrollY > 5) {
    $("nav.navbar").addClass("scrolled");
  } else {
    $("nav.navbar").removeClass("scrolled");
  }
});

$(".popup").click(function (e) {
  $(this).fadeOut(500);
});

$(window).scroll(function () {
  let headerHeight = $("header").outerHeight();

  if ($(window).scrollTop() > headerHeight) {
    $(".top-icon").addClass("scrolled");
  } else {
    $(".top-icon").removeClass("scrolled");
  }
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  });
});
