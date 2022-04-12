// const form = document.getElementById('form')

// form.addEventListener('submit', (e) => {
//   e.preventDefault()
//   let formValidate = (form) => {
//     let error = 0
//     let formReq = document.querySelectorAll('._req')
//     for (let index = 0; index < formReq.length; index++) {
//       const input = formReq[index]
//       formRemoveError(input)
//     }
//   }
// })

// const formAddError = (input) => {
//   input.parentElement.classList.add('_error')
//   input.classList.add('_error')
// }

// const formRemoveError = (input) => {
//   input.parentElement.classList.remove('_error')
//   input.classList.remove('_error')
// }

// Отправка данных на сервер
function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
	if (req.status >= 200 && req.status < 400) {
	json = JSON.parse(this.response); // Ебанный internet explorer 11
    	console.log(json);
        
    	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
    	if (json.result == "success") {
    		// Если сообщение отправлено
    		alert("Сообщение отправлено");
    	} else {
    		// Если произошла ошибка
    		alert("Ошибка. Сообщение не отправлено");
    	}
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса");};
req.send(new FormData(event.target));
}