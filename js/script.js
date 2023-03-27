window.addEventListener('DOMContentLoaded', function() {

  
  // Timer

  const deadline = Date.parse(new Date()) + 7200000;
  console.log(deadline);

  function getTimeRemaining(endtime) {
      const t = endtime - Date.parse(new Date()),
          days = Math.floor( (t/(1000*60*60*24)) ),
          seconds = Math.floor( (t/1000) % 60 ),
          minutes = Math.floor( (t/1000/60) % 60 ),
          hours = Math.floor( (t/(1000*60*60) % 24) );

      return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
      };
  }

  function getZero(num){
      if (num >= 0 && num < 10) { 
          return '0' + num;
      } else {
          return num;
      }
  }

  function setClock(selector, endtime) {

      const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
          const t = getTimeRemaining(endtime);

          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.minutes);
          seconds.innerHTML = getZero(t.seconds);

          if (t.total <= 0) {
              clearInterval(timeInterval);
          }
      }
  }

  setClock('.timer', deadline);


  // Form 
//   var form = document.querySelectorAll("form");
// var thankyou = document.getElementById("thankyou");
// var overlay1 = document.querySelector('.overlay1');

// // Обрабатываем отправку формы
// form.forEach(function(form) {
//   form.addEventListener("submit", function(event) {
//   event.preventDefault();
  
//   // Отправляем данные формы на сервер
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "mail.php");
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4) {
//       // Если ответ получен, обрабатываем его
//       var response = JSON.parse(xhr.responseText);
//       if (response.status === "success") {
//         // Если отправка прошла успешно, показываем блок "thankyou"
//         thankyou.style.display = "block";
//         overlay1.style.display = "block";
//         // Скрываем блок через 2 секунды
//         setTimeout(function() {
//           thankyou.style.display = "none";
//           overlay1.style.display = "none";
//           // Перенаправляем пользователя на страницу index.html
//           window.location.href = "index.html";
//         }, 2000);
//       } else {
//         // Если произошла ошибка при отправке, показываем сообщение с ошибкой
//         alert(response.message);
//       }
//     }
//   };
//   xhr.send("name=" + encodeURIComponent(form.name.value) + "&phone=" + encodeURIComponent(form.phone.value));
//   });
//   });
const form = document.querySelectorAll("form");
const thankyou = document.getElementById("thankyou");
const overlay1 = document.querySelector(".overlay1");

form.forEach(element => {
  element.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
  
      const data = await response.json();
      if (data.status === "success") {
        thankyou.style.display = "block";
        overlay1.style.display = "block";
  
        setTimeout(() => {
          thankyou.style.display = "none";
          overlay1.style.display = "none";
          form.reset();
        }, 2000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при отправке формы");
    }
  });
  
});








});