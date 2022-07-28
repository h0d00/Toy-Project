
(function(){
    const get = (target) => {
        return document.querySelector(target);
    }

    const $toggle = get('.toggle');
    const nav = get('nav');
    const body = get('body');

    const status = () =>{
        if(nav.className === 'active')
            {
                localStorage.setItem('status',"open")
            }
            else
            {
                localStorage.setItem('status',"non-open")
            }
    };

    const toggle= () =>{
        body.classList.remove('preload');
        nav.classList.toggle('active');
        status();
    };

    const init = () =>{
        body.style.visibility ="visible";
        
        if(localStorage.getItem('status') === "open"){
        nav.classList.add("active");
    }
        $toggle.addEventListener("click",()=>{
            toggle();
        });
    };

    init();
})();