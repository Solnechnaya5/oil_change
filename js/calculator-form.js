
const carSelect = document.querySelector("#car_make");
const modelSelect = document.querySelector("#car_model");
const carSelectedValue = carSelect.value;
const openModals = document.querySelectorAll(".open-popup");
const modalWindow = document.getElementById("modal_window");
const closeModalBtn = document.querySelector(".modal_close_btn");
const modalForm = document.querySelector(".modal_form");
const langSelect = document.getElementById("lang_select");
const modalResult = document.getElementById("result");
const modalPhoneInput = document.querySelector(".input_phone");
const lang = localStorage.getItem("selectedLang");

// Close Modal
function closeModal() {
  const lang = localStorage.getItem("selectedLang");
  modalWindow.classList.remove("active");
  closeModalBtn.classList.remove("active");
  resetFormFields();
  modalResult.textContent =
    lang === "en"
      ? "Total cost from: €0.00"
      : lang === "de"
      ? "Summe ab: €0.00"
      : lang === "ua"
      ? "Сума від: €0.00"
      : "Language not supported";
  modalPhoneInput.style.border = "";
}

function resetFormFields() {
  const form = modalWindow.querySelector(".modal_form");
  form.reset();
  form.querySelector('input[type="tel"]').value = "+000000000000";
  document.getElementById("car_model").innerHTML =
  lang === "en"
  ? '<option value="" disabled selected>Choose your car model!</option>'
  :lang==="de"
  ?'<option value="" disabled selected>Wählen Sie Ihr Automodell!</option>'
  :lang==="ua"
  ?'<option value="" disabled selected>Виберіть свою модель автомобіля!</option>'
  : "Language not supported";
}
// open modal
openModals.forEach((button) => {
  button.addEventListener("click", () => {
    modalWindow.classList.add("active");
  });
});

closeModalBtn.addEventListener("click", () => {
  closeModal();
});


// Selects with Cars
carSelect.addEventListener("change", () => {
  const selectedMake = carSelect.value;
  const modelOptions = [];

  switch (selectedMake) {
    case "toyota":
      modelOptions.push(
        "Corolla",
        "Camry",
        "RAV4",
        "Land Cruiser",
        "Hilux",
        "Yaris",
        "Supra",
        "Prius",
        "Avalon",
        "Highlander",
        "Tacoma",
        "Sequoia"
      );
      break;
    case "volkswagen":
      modelOptions.push(
        "Golf",
        "Passat",
        "Tiguan",
        "Polo",
        "Jetta",
        "Arteon",
        "ID.4",
        "ID.3",
        "Touareg",
        "Beetle",
        "Amarok"
      );
      break;
    case "ford":
      modelOptions.push(
        "Focus",
        "Mustang",
        "Explorer",
        "F-150",
        "Escape",
        "Fusion",
        "Edge",
        "Expedition",
        "Bronco",
        "Ranger",
        "Maverick"
      );
      break;
    case "honda":
      modelOptions.push(
        "Civic",
        "Accord",
        "CR-V",
        "Pilot",
        "Fit",
        "Odyssey",
        "Ridgeline",
        "HR-V",
        "Passport",
        "Insight"
      );
      break;
    case "bmw":
      modelOptions.push(
        "X5",
        "3 Series",
        "5 Series",
        "7 Series",
        "X3",
        "X1",
        "X7",
        "M3",
        "M5",
        "i4",
        "iX"
      );
      break;
    case "mercedes":
      modelOptions.push(
        "C-Class",
        "E-Class",
        "GLE",
        "S-Class",
        "GLC",
        "GLS",
        "A-Class",
        "CLA-Class",
        "EQB",
        "EQC",
        "AMG GT"
      );
      break;
    case "hyndai":
      modelOptions.push(
        "Elantra",
        "Santa Fe",
        "Tucson",
        "Accent",
        "Kona",
        "Sonata",
        "Palisade",
        "Ioniq 5",
        "Kona Electric",
        "Veloster",
        "Nexo"
      );
      break;
    case "nissan":
      modelOptions.push(
        "Altima",
        "Rogue",
        "Murano",
        "Pathfinder",
        "Sentra",
        "Maxima",
        "Armada",
        "Juke",
        "Titan",
        "Leaf"
      );
      break;
    case "tesla":
      modelOptions.push(
        "Model S",
        "Model 3",
        "Model X",
        "Model Y",
        "Cybertruck"
      );
      break;
    case "kia":
      modelOptions.push(
        "Sportage",
        "Sorento",
        "Rio",
        "Optima",
        "Soul",
        "Telluride",
        "Stinger",
        "Forte",
        "Carnival",
        "Niro"
      );
      break;
    default:
      modelOptions.push("Please select a car make");
  }
  modelSelect.innerHTML = "";

  modelOptions.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.text = model;
    modelSelect.appendChild(option);
  });
});

// CALCULATOR
const changeOil = 20;
const changeFilter = 25;
const additional = 30;


const multipliers = {
  Corolla: 1,
  Camry: 1.1,
  RAV4: 1.2,
  "Land Cruiser": 1.5,
  Hilux: 1.3,
  Yaris: 1,
  Supra: 1.8,
  Prius: 1.2,
  Avalon: 1.3,
  Highlander: 1.4,
  Tacoma: 1.3,
  Sequoia: 1.5,
  Golf: 1,
  Passat: 1.1,
  Tiguan: 1.2,
  Polo: 1,
  Jetta: 1.1,
  Arteon: 1.3,
  "ID.4": 1.4,
  "ID.3": 1.3,
  Touareg: 1.5,
  Beetle: 1.2,
  Amarok: 1.4,
  Focus: 1,
  Mustang: 1.6,
  Explorer: 1.4,
  "F-150": 1.5,
  Escape: 1.2,
  Fusion: 1.1,
  Edge: 1.3,
  Expedition: 1.5,
  Bronco: 1.4,
  Ranger: 1.3,
  Maverick: 1.2,
  Civic: 1,
  Accord: 1.1,
  "CR-V": 1.2,
  Pilot: 1.4,
  Fit: 1,
  Odyssey: 1.2,
  Ridgeline: 1.3,
  "HR-V": 1.1,
  Passport: 1.3,
  Insight: 1.1,
  X5: 1.6,
  "3 Series": 1.4,
  "5 Series": 1.5,
  "7 Series": 1.8,
  X3: 1.4,
  X1: 1.3,
  X7: 1.8,
  M3: 2,
  M5: 2.2,
  i4: 1.9,
  iX: 1.8,
  "C-Class": 1.4,
  "E-Class": 1.5,
  GLE: 1.6,
  "S-Class": 1.8,
  GLC: 1.5,
  GLS: 1.7,
  "A-Class": 1.3,
  "CLA-Class": 1.4,
  EQB: 1.6,
  EQC: 1.7,
  "AMG GT": 2,
  Elantra: 1,
  "Santa Fe": 1.2,
  Tucson: 1.2,
  Accent: 1,
  Kona: 1.1,
  Sonata: 1.1,
  Palisade: 1.4,
  "Ioniq 5": 1.5,
  "Kona Electric": 1.4,
  Veloster: 1.3,
  Nexo: 1.5,
  Altima: 1,
  Rogue: 1.2,
  Murano: 1.3,
  Pathfinder: 1.4,
  Sentra: 1,
  Maxima: 1.2,
  Armada: 1.5,
  Juke: 1.1,
  Titan: 1.4,
  Leaf: 1.3,
  "Model S": 1.8,
  "Model 3": 1.5,
  "Model X": 1.9,
  "Model Y": 1.7,
  Cybertruck: 2,
  Sportage: 1.2,
  Sorento: 1.3,
  Rio: 1,
  Optima: 1.1,
  Soul: 1,
  Telluride: 1.4,
  Stinger: 1.6,
  Forte: 1,
  Carnival: 1.2,
  Niro: 1.1,
};

const resultDisplay = document.getElementById("result");
const carModelSelect = document.getElementById("car_model");

function calculateTotal() {
  const selectedModel = carModelSelect.value;
  const multiplier = multipliers[selectedModel] || 1;

  let total = 0;

  if (document.getElementById("changeoil_input").checked) {
    total += changeOil * multiplier;
  }
  if (document.getElementById("changefilter_input").checked) {
    total += changeFilter * multiplier;
  }
  if (document.getElementById("additional_input").checked) {
    total += additional * multiplier;
  }

  resultDisplay.textContent = `Total cost from: €${total.toFixed(2)}`;
}

document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", calculateTotal);
});

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Зупиняємо стандартне відправлення форми

  // Перевірка на заповненість полів
  const name = document.querySelector('#modal_name_input').value;
  const phone =  modalPhoneInput.value;
  const carMake = carSelect.value;
  const carModel = modelSelect.value;
  const selectedServices = []; // Твій список послуг
  const totalPrice = resultDisplay.textContent;

  if (!name || !phone || !carMake || !carModel || selectedServices.length === 0) {
    alert('Будь ласка, заповніть всі поля!');
    return; // Виходимо з функції, якщо є порожні поля
  }

  // Формуємо повідомлення
  const message = `Нова заявка:\nІм'я: ${name}\nТелефон: ${phone}\nМарка авто: ${carMake}\nМодель авто: ${carModel}\nПослуги: ${
    selectedServices.length > 0 ? selectedServices.join(", ") : "Не обрані"
  }\nСума: ${totalPrice}\n\nUTM-мітки: ${clickedLinks
    .map(
      (link, index) =>
        `${index + 1}. Ссилка: ${link.href}\n  UTM Source: ${link.utm_source}\n  UTM Medium: ${link.utm_medium}\n  UTM Campaign: ${
          link.utm_campaign
        }\n  Час: ${link.timestamp}` 
    )
    .join("\n\n")}`;

  // Хешуємо номер телефону
  const phoneNumber = iti.getNumber(); // Отримуємо номер телефону в форматі E.164
  const hashedPhone = await hashPhoneNumber(phoneNumber); // Хешуємо номер

  // Створюємо дані для Facebook API
  const eventData = [
    {
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        ph: hashedPhone,
      },
      custom_data: {
        currency: "EUR",
        value: parseFloat(totalPrice.replace(/[^\d.-]/g, "")) || 0,
        services:
          selectedServices.length > 0
            ? selectedServices
            : ["No services selected"],
      },
    },
  ];

  // Відправляємо дані на Facebook
  const apiVersion = "v12.0";
  const pixelId = "927079089087237"; 
  const token = "EAA2CZAuNcWIABO2teerfXDNZBl8JVBckLyweuI4I4hy528XsJXjE3dfNZCd64XROdKGRZBNQKx1FMcijLGr0AddqZARHid3kZA9psJP7VYWS6dTkZAAihJkRRZCBCtbRfP5REZCVqPGD4DqF3yvzBi3cHCs0AaDEU6X5nHWYa4pHxHhHN53ZAzQbDZBG7UAsD00Yr7ZAsQZDZD";
  await sendPostRequest(apiVersion, pixelId, token, eventData);

  // Відправка AJAX запиту до PHP скрипта
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('car_make', carMake);
  formData.append('car_model', carModel);
  formData.append('services', selectedServices.join(", "));
  formData.append('total_price', totalPrice);
  formData.append('utm_data', JSON.stringify(clickedLinks.map(link => ({
    href: link.href,
    utm_source: link.utm_source,
    utm_medium: link.utm_medium,
    utm_campaign: link.utm_campaign,
    timestamp: link.timestamp
  }))));

  const response = await fetch('send_email.php', {
    method: 'POST',
    body: formData
  });

  const result = await response.text();
  if (result === 'Лист успішно відправлений') {
    modalForm.reset();
    closeModal();
    alert('Заявка успішно надіслана!');
  } else {
    alert('Сталася помилка при відправці заявки!');
  }
});
