import { proxy } from "./Nav.js";

const NewsList = () =>{
    const $root = document.querySelector("#root");
    const newsContainer = document.createElement("div");
    newsContainer.classList.add("news-list-container");
    newsContainer.innerHTML=
    `
    <article class="news-list">
    </article>
    <div class="scroll-observer">
      <img src="img/ball-triangle.svg" alt="Loading..." />
    </div>
    `;
    $root.appendChild(newsContainer);


    const apiKey = "4a8ec2898dad480fbabceb65207dd136";
    let page =1;
    let pageSize=5;
    let category = proxy.category;

	const getNews = async () => {
		await fetch(`https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`)
			.then((a) => a.json())
			.then((response) => {
       viewNews(response);
      })
	}



  const viewNews = (array) =>{
    array.articles.forEach((e)=>{
      const $list = document.querySelector(".news-list");
      const $section = document.createElement("section");
      $section.classList.add("news-item");
      $section.innerHTML = `
          <div class="thumbnail">
            <a href="${e.url}" target="_blank" rel="noopener noreferrer">
              <img
                src="${e.urlToImage}"
                alt="thumbnail" />
            </a>
          </div>
          <div class="contents">
            <h2>
              <a href="${e.url}" target="_blank" rel="noopener noreferrer">
               ${e.title}
              </a>
            </h2>
            <p>
              ${e.description}
            </p>
          </div>
      `;
      $list.appendChild($section);
    })
  }

  const scroll = new IntersectionObserver((news) => {
    news.forEach((e) => {
      if (e.intersectionRatio > 0) {
        page++;
        getNews();
      }
    });
  });

  const $observer = document.querySelectorAll(".scroll-observer");
  $observer.forEach((e) => {
    scroll.observe(e);
  });

}



export default NewsList;


