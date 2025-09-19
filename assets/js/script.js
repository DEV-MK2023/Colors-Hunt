import Categories from "./data/category.js";
import Colors from "./data/colors.js";
import SearchColors from "./data/searchTags.js";
// import colorpage from "./color.js";

const sortByColor = document.getElementById("sort-by-color"),
  platter = document.getElementById("platter"),
  colorDetail = document.getElementById("color-detail"),
  searchColor = document.getElementById("searchColor"),
  colortags = document.getElementById("color-tags"),
  searchBox = document.getElementById("searchBox");

let allPlatterBtn = document.createElement("button");
allPlatterBtn.classList.add("sidebar-btn");
allPlatterBtn.textContent = "All";
sortByColor.appendChild(allPlatterBtn);
allPlatterBtn.addEventListener("click", () => {
  getPlatters();
});

Categories.forEach((category) => {
  let button = document.createElement("button");
  button.classList.add("sidebar-btn");
  button.textContent = category.name;
  button.addEventListener("click", () => {
    let cat = button.textContent.toLowerCase();
    getPlatters(cat);
  });
  sortByColor.appendChild(button);
});

function platters(color) {
  platter.innerHTML += `
    <a href="./color-details.html?colorId=${color.id}" class="card">
            <div class="card-colors">
              <div class="color"  style="background-color: ${color.colors[0]}">
                <button class="color-code">${color.colors[0]}</button>
              </div>
              <div class="color"  style="background-color: ${color.colors[1]}">
                <button class="color-code">${color.colors[1]}</button>
              </div>
              <div class="color"  style="background-color: ${color.colors[2]}">
                <button class="color-code">${color.colors[2]}</button>
              </div>
              <div class="color"  style="background-color: ${color.colors[3]}">
                <button class="color-code">${color.colors[3]}</button>
              </div>
            </div>
            <div class="card-footer">
              <div class="primary-btn">
                <img src="./assets/icons/like.svg" alt="Like Icon" />
                <span class="like-count">${color.likes.toLocaleString()}</span>
              </div>
              <div class="time">
  ${color.time >= 30
      ? `${Math.floor(color.time / 30)} month${Math.floor(color.time / 30) > 1 ? "s" : ""
      } ago`
      : color.time >= 7
        ? `${Math.floor(color.time / 7)} week${Math.floor(color.time / 7) > 1 ? "s" : ""
        } ago`
        : color.time >= 1
          ? `${color.time} day${color.time > 1 ? "s" : ""} ago`
          : `${Math.round(color.time * 24)} hour${Math.round(color.time * 24) > 1 ? "s" : ""
          } ago`
    }
</div>

            </div>
          </a>
    `;
}

function getPlatters(cat) {
  platter.innerHTML = "";
  Colors.forEach((color) => {
    if (cat) {
      if (color.category == cat) {
        platters(color);
      }
    } else {
      platters(color);
    }
  });
  if (platter.innerHTML == "") {
    platter.innerHTML = `<p style="font-size: 1.25rem; color: #b0b0b0; text-align: center; padding: 2rem; width: 100%;">No match found.</p>`;
  }
}

if (platter) {
  getPlatters();
  SearchColors.forEach((color) => {
    let button = document.createElement("button");
    button.classList.add("primary-button");
    let div1 = document.createElement("div");
    div1.classList.add("color");
    div1.style.backgroundColor = color.tagColors;
    let div2 = document.createElement("div");
    div2.classList.add("color-name");
    div2.innerText = color.tags;
    colortags.appendChild(button);
    button.appendChild(div1);
    button.appendChild(div2);
    button.addEventListener("click", () => {
      let tag = button.textContent.toLowerCase();
      getPlatters(tag);
    });
  });

  document.addEventListener("click", () => {
    searchColor.classList.remove("show");
  });

  searchBox.addEventListener("click", (event) => {
    searchColor.classList.toggle("show");
    event.stopPropagation();
  });
}

// colorpage();

if (colorDetail) {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let colorId = urlParams.get("colorId");
  Colors.forEach((color) => {
    if (color.id == colorId) {
      colorDetail.innerHTML = `
    <div class="card details">
            <div class="card-colors">
              <div class="color" style="background-color: ${color.colors[0]}">
                <button class="color-code">${color.colors[0]}</button>
              </div>
              <div class="color" style="background-color: ${color.colors[1]}">
                <button class="color-code">${color.colors[1]}</button>
              </div>
              <div class="color" style="background-color: ${color.colors[2]}">
                <button class="color-code">${color.colors[2]}</button>
              </div>
              <div class="color" style="background-color: ${color.colors[3]}">
                <button class="color-code">${color.colors[3]}</button>
              </div>
            </div>
            <div class="card-footer">
              <div class="btns">
                <div class="primary-btn">
                  <img src="./assets/icons/like.svg" alt="Like Icon" />
                  <span class="like-count">${color.likes.toLocaleString()}</span>
                </div>
                <div class="primary-btn">
                  <img src="./assets/icons/download.svg" alt="Download Icon" />
                  <span class="like-count">image</span>
                </div>
                <div class="primary-btn">
                  <img src="./assets/icons/link.svg" alt="Like Icon" />
                  Link
                </div>
              </div>
              <div class="time">${color.time}</div>
            </div>
            <div class="tags">
              <button class="primary-btn">
                <div class="color" style="background-color: ${color.tagColors[0]
        }"></div>
                <div class="color-name">${color.tags[0]}</div>
              </button>
              <button class="primary-btn">
                <div class="color" style="background-color: ${color.tagColors[1]
        }"></div>
                <div class="color-name">${color.tags[1]}</div>
              </button>
              <button class="primary-btn">
                <div class="color" style="background-color: ${color.tagColors[2]
        }"></div>
                <div class="color-name">${color.tags[2]}</div>
              </button>
              <button class="primary-btn">
                <div class="color" style="background-color: ${color.tagColors[3]
        }"></div>
                <div class="color-name">${color.tags[3]}</div>
              </button>
            </div>
          </div>
    `;
    }
  });
  SearchColors.forEach((color) => {
    let button = document.createElement("button");
    button.classList.add("primary-button");
    let div1 = document.createElement("div");
    div1.classList.add("color");
    div1.style.backgroundColor = color.tagColors;
    let div2 = document.createElement("div");
    div2.classList.add("color-name");
    div2.innerText = color.tags;
    colortags.appendChild(button);
    button.appendChild(div1);
    button.appendChild(div2);
  });
  document.addEventListener("click", () => {
    searchColor.classList.remove("show");
  });

  searchBox.addEventListener("click", (event) => {
    searchColor.classList.toggle("show");
    event.stopPropagation();
  });
}

// ========================================================
// document.addEventListener("DOMContentLoaded", () => {
//   const randomBtn = document.querySelector(".randomBtn");
//   randomBtn.addEventListener("click", () => {
//     console.log("asd");
//   });
// })

const randomBtn = document.getElementById("randomBtn");
randomBtn.addEventListener("click", () => {
  platter.innerHTML = "";
  let shuffled = Colors.sort(() => Math.random() - 0.5);
  shuffled.forEach((color) => {
    platters(color);
  });
});

const popularBtn = document.getElementById("popularBtn");
popularBtn.addEventListener("click", () => {
  platter.innerHTML = "";
  let popularColors = Colors.sort((a, b) => b.likes - a.likes);
  popularColors.forEach((color) => {
    platters(color);
  });
});

const newBtn = document.getElementById("newBtn");
newBtn.addEventListener("click", () => {
  platter.innerHTML = "";
  let popularColors = Colors.sort((a, b) => a.time - b.time);
  popularColors.forEach((color) => {
    platters(color);
  });
});

searchBox.addEventListener("change", (e) => {
  console.log(e.target.value);
});

function debouncing(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  platter.innerHTML = "";

  let foundMatch = false;

  Colors.forEach((color) => {
    const tagMatch = color.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
    const categoryMatch = color.category?.toLowerCase().includes(searchTerm);
    const codeMatch = color.colors?.some(code => code.toLowerCase().includes(searchTerm));

    if (tagMatch || categoryMatch || codeMatch) {
      platters(color);
      foundMatch = true;
    }
  });

  if (!foundMatch) {
    platter.innerHTML = `<p style="font-size: 1.25rem; color: #b0b0b0; text-align: center; padding: 2rem; width: 100%;">No match found.</p>`;
  }
}

searchBox.addEventListener("input", debouncing(handleSearch, 1000));




