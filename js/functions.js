async function getData(dataName) {
  let response = await fetch(`https://semicode.tech/api/v1/l10nhouse/${dataName}`),
    data = await response.json();

  if (dataName == "services") {
    services = data;
    Services(data);
  }
  if (dataName == "languages") {
    let flags = await (await fetch("https://flagcdn.com/en/codes.json")).json();
    let countryCodes = {};

    Object.entries(flags).forEach(([code, country]) => {
      countryCodes[country.toLowerCase()] = code;
    });
    languagesShow(data, countryCodes);
  }
  if (dataName == "sectors") {
    showSectors(data);
  }
}

async function Services(data) {
  data.forEach((item, index) => {
    $("#Services .row").append(
      `
       <div class="col-lg-6" ondblclick="openPopup('services')">
            <div class="item">
              <img src="./images/${item.icon}" />
              <h4 class="mb-0">${item.title}</h4>
              <p class="mb-0">
                ${prepareSpans(item.description.slice(0, 150))}... <span class="firstColor clickable-pointer" onclick="servciesPopup(${index})">Read More</span>
              </p>
            </div>
          </div>
          `,
    );
  });
}

function servciesPopup(index) {
  let data = services[index];
  $(".services.popup").html(`
    
<div class="content">
<i class="fa-solid fa-xmark close" onclick="closePopup('services')"></i>
        <div class="head px-4"><h4>Services</h4></div>
        <div class="body p-4">
          <div class="row mb-4 top">
            <div class="col-lg-6 col-12">
              <h4 class="secondColor mb-2">${data.title}</h4>
              <p>
                ${prepareSpans(data.description)}
              </p>
            </div>
            <div class="col-lg-6 col-12">
              <img src="./images/${data.img}" class="img-fluid m-auto d-block rounded-3" />
            </div>
          </div>
          <div class="sections">

                ${prepareSections(data.sections)}
  
          </div>
        </div>
      </div>
    `);
  openPopup("services");
  stopPopupPropagation();
}

function prepareSpans(description) {
  let rex = /L10N HOUSE/gim;
  return description.replaceAll(rex, '<span><span class="firstColor">L10N</span> <span class="secondColor">House</span></span>');
}

function changeNavActive(that, event) {
  event.preventDefault();
  $("nav.navbar .active").removeClass("active");
  $(that).addClass("active");

  let navbarHeight = $("nav.navbar").outerHeight();

  window.scrollTo({
    top: $($(that).attr("href")).offset().top - navbarHeight,
    behavior: "smooth",
  });
}

function openPopup(name) {
  $(`.popup[data-popup-name='${name}']`).fadeIn(500);
}
function closePopup(name) {
  $(`.popup[data-popup-name='${name}']`).fadeOut(500);
}

function prepareSections(data) {
  let sections = "";
  data.forEach(function (section, index) {
    sections += `
          <div class="row points p-3  ${index >= 1 ? "mt-3" : ""}">
        <h5 class="col-12 col secondColor">${section.title}</h5>
        ${prepareList(section.points)}
      </div>
      `;
  });
  return sections;
}

function prepareList(data) {
  let points = "";
  data.forEach(function (point, index) {
    points += `<div style="--index: '${index + 1}'" class="col-12 col-lg-6 px-3 point"><span>${point}</span></div> `;
  });
  return points;
}

function stopPopupPropagation() {
  $(".popup").on("click", ".content", function (e) {
    e.stopPropagation();
  });
}

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// the languages data showing
function languagesShow(data, flags) {
  data.forEach(function (item, index) {
    languagesContent.innerHTML += `
          <div class="section ${index >= 1 ? "mt-4" : ""}">


            <div class="country mb-5">
              <h3>Languages From <span class="colored">${item.continent}</span></h3>
              <div class="counter">${item.languages.length} Languages</div>
            </div>


            <div class="row row-gap-4 lists">
              ${prepareLanguages(item.languages, flags)}
            </div>



          </div>
  
  `;
  });
}

function prepareLanguages(languages, flags) {
  let list = "";

  languages.forEach(function (language) {
    if (language === "Hebrew") {
      return;
    }
    list += `
              <div class="col-12 col-md-4">
                <div class="list">
                <div class="language-name">
                <i class="fa-solid fa-circle"></i>
                <span>${language}</span>
                  </div>
                  <div class="img">
                    ${prepareFlags(language.toLowerCase(), flags)}

                  </div>
                </div>
              </div>
  `;
  });
  return list;
}

function prepareFlags(lang, countryCodes) {
  let country = languageCountries[lang.toLowerCase()];

  if (!country) {
    return "";
  }
  let code = countryCodes[country.toLowerCase()];

  return `<img src="https://flagcdn.com/${code}.svg"class="img-fluid"/>`;
}

//search lang
function searchLanguage() {
  let value = $(".right input").val().trim().toLowerCase();

  $(".lists .list").each(function () {
    let language = $(this).find(".language-name span").text().trim().toLowerCase();

    if (value === "") {
      $(this).removeClass("searched");
    } else if (language.includes(value)) {
      $(this).addClass("searched");
    } else {
      $(this).removeClass("searched");
    }
  });
}

// SECTORS
function showSectors(data) {
  console.log(data);
  sectorsContent.innerHTML = `
  
          <i class="fa-solid fa-xmark close" onclick="closePopup('sectors')"></i>

        <div class="head mb-5">
          <div class="row">
            <div class="col-md-6 col-12 text-start">
              <h2 class="sectors-title">SECTORS</h2>
              <p>
                Explore and choose a sector to discover relevant <br />
                languages from around the world.
              </p>
            </div>
            <div class="col-md-6 col-12 icons">
              <div class="icon">
                <i class="fa-solid fa-globe"></i>
                <p class="status">
                  <span class="fw-bold">${data.length}</span> <br />
                  Sectors
                </p>
              </div>
              <div class="icon">
                <i class="fa-solid fa-language"></i>
                <p class="status"><span class="fw-bold">100+</span> <br />Languages</p>
              </div>
              <div class="icon">
                <i class="fa-solid fa-globe"></i>
                <p class="status"><span class="fw-bold">Global</span> <br />Opportunities</p>
              </div>
            </div>
          </div>
        </div>

        <div class="body">
          <div class="row row-gap-4">
            ${prepareSectors(data)}
          </div>

        </div>
  `;
}

function prepareSectors(data) {
  let sectors = "";

  data.forEach(function (sector, index) {
    let currentSector = sectorColors[sector.name];

    sectors += `
      <div class="col-md-6 col-12 col-lg-4 col-xl-3 part">
        <div
          class="item"
          style="
            --sector-color: ${currentSector.colorName};
            background-image: url('../images/sectors/${currentSector["bg-img"]}');
          "
        >
          <div class="order mb-2">${index + 1}</div>
          <h5 class="mb-4">${sector.name}</h5>
          <div class="arrow">
  <i class="fa-solid fa-chevron-right"></i>
</div>
        </div>
      </div>
    `;
  });

  return sectors;
}
