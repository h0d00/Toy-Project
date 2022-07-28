import DatePicker from "./DatePicker.js";

const date_bar = document.querySelectorAll('.date-bar');

date_bar.forEach(($date_bar)=>{
    DatePicker($date_bar);
});


