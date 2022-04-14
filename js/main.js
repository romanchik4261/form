// const form = document.getElementById('form')

// const { duration } = require("moment")

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




// // Отправка данных на сервер
// function send(event, php){
// console.log("Отправка запроса");
// event.preventDefault ? event.preventDefault() : event.returnValue = false;
// var req = new XMLHttpRequest();
// req.open('POST', php, true);
// req.onload = function() {
// 	if (req.status >= 200 && req.status < 400) {
// 	json = JSON.parse(this.response); // Ебанный internet explorer 11
//     	console.log(json);
        
//     	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
//     	if (json.result == "success") {
//     		// Если сообщение отправлено
//     		alert("Сообщение отправлено");
//     	} else {
//     		// Если произошла ошибка
//     		alert("Ошибка. Сообщение не отправлено");
//     	}
//     // Если не удалось связаться с php файлом
//     } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// // Если не удалось отправить запрос. Стоит блок на хостинге
// req.onerror = function() {alert("Ошибка отправки запроса");};
// req.send(new FormData(event.target));
// }

const form = document.forms["form"]
const formArr = Array.from(form)
const validFormArr = []
const button = form.elements["button"]

formArr.forEach((el) => {
	if (el.hasAttribute("data-reg")) {
		el.setAttribute("is-valid", "0")
		validFormArr.push(el)
	}
})

form.addEventListener("input", inputHandler)
form.addEventListener("submit", formCheck)

function inputHandler({target}) {
	if (target.hasAttribute("data-reg")) {
		inputChek(target)
	}
}

function inputChek(el) {
	const inputValue = el.value
	const inputReg = el.getAttribute("data-reg")
	const reg = new RegExp(inputReg)
	if (reg.test(inputValue)) {
		el.setAttribute("is-valid", "1")
		el.style.border = "2px solid green"
	} else {
		el.setAttribute("is-valid", "0")
		el.style.border = "2px solid red"
	}
}

function formCheck(e) {
	e.preventDefault()
	const allValid = []
	validFormArr.forEach((el) => {
		allValid.push(el.getAttribute("is-valid"))
	})
	const isAllValid = allValid.reduce((acc, current) => {
		return acc && current
	})
	if (!Boolean(Number(isAllValid))) {
		alert("Пожалуйста, заполните поля правильно!")
		return
	}

}