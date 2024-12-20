async function formSubmit() {
    const data = serializeForm(form); // получаем данные формы
    const response = await sendData(data); // отправляем данные на почту
    if (response.ok) {
      let result = await response.json(); // если ответ OK отвечает пользователю
      alert(result.message); // .. что данные отправлены
      formReset(); // сбрасываем поля формы
    } else {
      alert("Код ошибки: " + response.status); // если not OK - показываем код ошибки
    }
  }
  
  function serializeForm(formNode) {
    // формируем данные формы
    return new FormData(form);
  }
  
  async function sendData(data) {
    return await fetch("send_mail.php", {
      // отправляем в скрипт send_mail.php
      method: "POST", // методом POST
      body: data,
    });
  }
  
  function formReset() {
    // сброс полей формы
    form.reset();
    validFormArr.forEach((el) => {
      el.setAttribute("is-valid", 0);
      el.style.border = "none";
    });
  }