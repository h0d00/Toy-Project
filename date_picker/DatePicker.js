const DatePicker = $date_bar =>
{   
    let selectmonth = new Date().getMonth();
    let selectyear = new Date().getFullYear();
    let selectday=0;
    
    const dayArr = [];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weeks =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const $container = document.querySelector('.container');
    const $calendar = document.createElement('div');
    const $calendar_nav = document.createElement('div');
    let $calendar_grid;
    make_calendar()


    function make_calendar()
    {
        $calendar.classList.add('calendar');
        $calendar_nav .classList.add('calendar-nav');
        $calendar_nav.innerHTML = `
        <button class="left_btn btn">◀</button>
        <div class="calendar-nav-middle">
        <div class="month">${months[selectmonth]}</div>
        <div class="year">${selectyear}</div>
        </div>
        <button class="right_btn btn">▶</button>
        `
        $container.appendChild($calendar);
        $calendar.append($calendar_nav);
        changeCalendar()
        fillday(selectyear,selectmonth)
    }


    function fillday(y,m)
    {
        $calendar_grid = document.createElement('div');
        $calendar_grid.classList.add("calendar-grid");
        $calendar.appendChild($calendar_grid);
        const $week_zone = document.createElement("div");
        $week_zone.classList.add("week-zone");
        const $day_zone = document.createElement("div");
        $day_zone.classList.add("day-zone");
        $calendar_grid.append($week_zone,$day_zone);

        let prevlastweek = new Date(y,m,0).getDay();
        let prevlastday = new Date(y,m,0).getDate();

        let firstDay=new Date(y,m,1);
        const lastDay = new Date(y,m+1,0);

    

        for(let i=0; i<prevlastweek+1; i++)
        {
            dayArr.unshift(prevlastday);
            prevlastday--;
        }
        for(let i=0; i<7; i++)
        {
            const week= document.createElement('div');
            $week_zone.append(week);
            week.innerText = weeks[i];
        }


        for(let i=0; i<lastDay.getDate()+firstDay.getDay()+(6-lastDay.getDay());i++)
           {
          
               dayArr[i+firstDay.getDay()]=i+1;
               const day= document.createElement('button');
               day.classList.add("day");
               $day_zone.append(day);
               day.value=dayArr[i];
               day.innerText=dayArr[i];

               if(selectmonth == new Date().getMonth() && selectyear == new Date().getFullYear() && day.value ==  new Date().getDate())
               {
                   day.classList.add("today");
               }
              if(i>30 && dayArr[i]>lastDay.getDate())
               {
                   dayArr.push
                   day.classList.add("gray");
                  day.innerText=dayArr[i]-lastDay.getDate();
               }

               if(i-dayArr[i]<-1)
               {
                day.classList.add("gray");
               }

               if(i-dayArr[i]>-2 && i%7===0 )
               {
                   day.classList.add("red");
               }

               day.addEventListener("click",() => {
                selectday = day.innerText;
                for(let i=0; i<$day_zone.childElementCount; i++){
                    let day_zoneBtn = $day_zone.querySelectorAll("button");
                    day_zoneBtn.forEach((e) => {
                        e.classList.remove("active");
                        }
                    )
                }

                console.log($date_bar.value)


                if(selectday > dayArr.indexOf(Number(day.innerText))+20)
                {
                    $date_bar.value=selectyear + "/" + (selectmonth) +"/" + selectday;
                    if(selectmonth===0)
                    {
                        $date_bar.value=selectyear-1 + "/" + Number(selectmonth+12) +"/" + selectday;                        
                        selectyear-1;
                    }
                }
                else if(day.value-day.innerText!==0)
                {
                    $date_bar.value=selectyear + "/" + (selectmonth+2) +"/" + selectday;
                    if(selectmonth===11)
                    {
                        $date_bar.value=selectyear+1 + "/" + Number(selectmonth-10) +"/" + selectday;  
                    }
                }
                else 
                {
                    $date_bar.value=selectyear + "/" + (selectmonth+1) +"/" + selectday;
                }
                day.classList.add("active");
                $calendar.classList.toggle('open');
              })
            }
            
    
    }

    function changeCalendar()
    {
        const left_btn = document.querySelector('.left_btn');
        const right_btn = document.querySelector('.right_btn');
        left_btn.addEventListener("click",prev);
        right_btn.addEventListener("click",next);
    }


function prev(){
    const month = document.querySelector('.month');
    const year = document.querySelector('.year');
    $calendar_grid.remove();
            selectmonth--;
            if(selectmonth<0)
            {
                selectmonth=11;
                selectyear--;
            }
            month.innerText = months[selectmonth];
            year.innerText = selectyear;
            fillday(selectyear,selectmonth)

        }

        function next(){
            const month = document.querySelector('.month');
            const year = document.querySelector('.year');
            $calendar_grid.remove();
            selectmonth++;
            if(selectmonth>11)
            {
                selectmonth=0;
                selectyear++;
            }
            month.innerText = months[selectmonth];
            year.innerText = selectyear;
            fillday(selectyear,selectmonth)
        }

    



    $date_bar.addEventListener("click", () => {
        $calendar.classList.toggle('open');
    })

   
    document.addEventListener("click",function (e){
        if((e.target.parentNode === document.querySelector("html")))
        {
            $calendar.classList.remove('open');
        }

        if((e.target.parentNode === document.querySelector("body")))
        {
            $calendar.classList.remove('open');
        }
        if((e.target.className === "title"))
        {
            $calendar.classList.remove('open');
        }
    });


}
export default DatePicker;

