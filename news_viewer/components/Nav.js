// do something!
import NewsList from "./NewsList.js";

const handler = {
    get: function () {
      return Reflect.get(...arguments);
    },
  };
  const proxy = new Proxy({}, handler);


const Nav = () =>{
    const $root = document.querySelector("#root");
    const nav_category = document.createElement("nav");
    nav_category.setAttribute("class","category-list");
    nav_category.innerHTML = `
    <ul>
    <li id="all" class="category-item active">전체보기</li>
    <li id="business" class="category-item">비즈니스</li>
    <li id="entertainment" class="category-item">엔터테인먼트</li>
    <li id="health" class="category-item">건강</li>
    <li id="science" class="category-item">과학</li>
    <li id="sports" class="category-item ">스포츠</li>
    <li id="technology" class="category-item">기술</li>
  </ul>
    `
    $root.appendChild(nav_category);

    const selected = document.querySelector(".active").getAttribute("id");
    proxy.category = selected;

    const categoryItems = document.querySelectorAll(".category-item");
    for(const categoryitem of categoryItems){
        categoryitem.addEventListener("click",function (){
            categoryItems[Array.from(categoryItems).indexOf(document.querySelector('.active'))].classList.remove("active");
            categoryitem.classList.add("active");
            proxy.category = categoryitem.getAttribute("id");
            $root.querySelector(".news-list-container").remove();
            NewsList();
        })}

    }


export default Nav;
export { proxy };
