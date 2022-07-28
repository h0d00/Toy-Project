// do something!
const link = document.createElement("link");
link.href = "star-rating/theme.css";
link.rel="stylesheet";
const scriptJS = document.querySelector("script");
scriptJS.before(link);


const StarRating = $container =>{
    
    let max_rating = $container.getAttribute("data-max-rating");
    const starDiv = document.createElement("div");
    $container.append(starDiv);


    for(let i=0; i<max_rating; i++){
        starDiv.classList.add("star-rating-container")
        const star = document.createElement("i");
        star.classList.add("bx","bxs-star");
        $container.append(star);
        star.setAttribute("star-num",i);
        star.style.fontSize ="50px";
        starDiv.append(star);
    }
    let click =-1;

    const $stars = $container.querySelectorAll(".bxs-star");

    
    $stars.forEach((star) => {


        star.addEventListener('mouseover',function(e){
            let stars_num = e.target.getAttribute("star-num");

            for(let i=0; i<=stars_num; i++)
            {
                if(click <= stars_num){
                $stars[i].classList.add("hovered");
                }
            }
        });

        star.addEventListener('mouseout',function(e){
            let stars_num = e.target.getAttribute("star-num");

            for(let i=0; i<=stars_num; i++)
            {
                if(click <= stars_num){

                $stars[i].classList.remove("hovered");
                }
            }
        });

        star.addEventListener('click',function(e){
            let stars_num = e.target.getAttribute("star-num");
            for(let i=0; i<=stars_num; i++)
            {
                $stars[i].classList.add("selected");
            }

            if(stars_num<$stars.length-1)
            {
                for(let j=stars_num; j<$stars.length; j++)
                {
                    $stars[j].classList.remove("selected");
                }
            }
            $stars[stars_num].classList.add("selected");

            const event = new CustomEvent("rating-change", {
                detail: Number(stars_num)+1,
              });
              $container.dispatchEvent(event);
        });
    })
};

export default StarRating;
