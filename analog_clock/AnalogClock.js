const AnalogClock = $container => {
  // do something!
  

  const $hour = document.createElement('div');
  $hour.classList.add('hand','hour');
  const $minute = document.createElement('div');
  $minute.classList.add('hand','minute');
  const $second = document.createElement('div');
  $second.classList.add('hand','second');

  $container.append($hour,$minute,$second);

  for(let i=0; i<12; i++)
  {
    const time = document.createElement('div');
    time.classList.add(`time`, `time${i}`);
    time.innerText="|";
    $container.append(time);
  }

  const nowtime = () =>{
    const today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();

    $hour.style.setProperty("--deg",(hour + minute / 60) * 30);
    $minute.style.setProperty("--deg",(minute+second/60)*6);
    $second.style.setProperty("--deg",6*second);
  }

  setInterval(nowtime,1000);
  };

export default AnalogClock;
