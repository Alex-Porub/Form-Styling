const body = document.querySelector("body");
const mainContent = document.querySelector(".mainContent");
const formWrapper = document.querySelector(".formWrapper");
const formBody = document.querySelector(".form__body");
const customSelectOptions = document.querySelector(".customSelect__options");
const optionsCollection = customSelectOptions.querySelectorAll("li");
const selectWindow = document.querySelector(".customSelect__window");
const selectWindowText = selectWindow.querySelector("span");
const checkboxLabel = formBody.querySelector(".checkbox__label");
const checkboxInput = formBody.querySelector(".checkbox__input");
const li_list = customSelectOptions.querySelectorAll("li");
const li_1st = customSelectOptions.querySelector("li:nth-child(1)");
const showFormButton = document.querySelector(".showForm_button");
const closeFormButton = formBody.querySelector(".closeForm-button");

body.scrollIntoView({
    behavior: "smooth",
    block: "start",
});

showFormButton.addEventListener("click", showForm);

function showForm() {
    let bodyScrollBarWidth = window.innerWidth - body.clientWidth;
    body.style.paddingRight = parseInt(getComputedStyle(mainContent).paddingRight) + bodyScrollBarWidth + "px";
    body.classList.add("freezed");
    mainContent.classList.add("freezed");
    formWrapper.classList.add("active");
}

formWrapper.addEventListener("click", hideForm);
closeFormButton.addEventListener("click", hideForm);

function hideForm(event) {
    if (!event.target.closest(".form__body") || event.target.closest(".closeForm-button")) {
        body.classList.remove("freezed");
        mainContent.style.paddingRight = "";
        mainContent.classList.remove("freezed");
        formWrapper.classList.remove("active");
        formBody.classList.remove("active");
        formBody.classList.add("deactivation");
        body.style.paddingRight = "";
        setTimeout(() => {
            formBody.classList.remove("deactivation");
        }, 800);
    }
}

formBody.addEventListener("submit", formSend);
function formSend(event) {
    event.preventDefault();
    alert("Действие по умолчанию отменено!");
}

formBody.addEventListener("click", formZoomer);
function formZoomer(event) {
    formBody.classList.add("active");
}

const optionsLabels = document.querySelectorAll(".options__label");
optionsLabels.forEach((label) => {
    label.addEventListener("click", checker);
    label.addEventListener("keypress", checker);
});

function checker(event) {
    if (event.type == "keypress" && !(event.code == "Space" || event.code == "Enter")) return;
    event.target.previousElementSibling.checked = true;
}

formBody.addEventListener("click", optionsCloser);
function optionsCloser(event) {
    if (event.target != selectWindow) {
        let customSelectOptionsOpened = document.querySelector(".customSelect__options-opened");
        if (customSelectOptionsOpened) {
            customSelectOptionsOpened.classList.remove("customSelect__options-opened");
        }
    }
}

function optOpener(event) {
    if (event.target == selectWindow) {
        customSelectOptions.classList.toggle("customSelect__options-opened");
    }
}

selectWindow.addEventListener("keydown", selectorLi);
selectWindow.addEventListener("mousedown", optOpener);
function selectorLi(event) {
    let currentEl = event.target;
    let liSelected = customSelectOptions.querySelector("li.selected");

    if (currentEl == selectWindow && ["ArrowUp", "ArrowDown", "Space", "Enter"].includes(event.code)) {
        customSelectOptions.classList.add("customSelect__options-opened");
        if (liSelected) {
            liSelected.tabIndex = "0";
            liSelected.focus();
        } else {
            currentEl.tabIndex = 0;
            li_1st.focus();
            selectWindowText.innerHTML = 'control - ↓↑,     select - "SPACE"';
        }
        document.activeElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    if (event.code == "ArrowUp" && currentEl.previousElementSibling) {
        currentEl.tabIndex = "-1";
        currentEl.previousElementSibling.tabIndex = 0;
        currentEl.previousElementSibling.focus();
        event.preventDefault();
    }
    if (event.code == "ArrowDown" && currentEl.nextElementSibling) {
        currentEl.tabIndex = "-1";
        currentEl.nextElementSibling.tabIndex = 0;
        currentEl.nextElementSibling.focus();
        event.preventDefault();
    }
    if ((event.code == "Space" || event.code == "Enter") && currentEl.tagName == "LI") {
        currentEl.click();
    }
    if (event.code == "Tab") {
        currentEl.blur();
        customSelectOptions.classList.remove("customSelect__options-opened");
    }
}

customSelectOptions.addEventListener("click", optChecker);
function optChecker(event) {
    let elem = event.target;
    if (elem.tagName != "LI") {
        return;
    }
    optionsCollection.forEach((el) => {
        el.classList.remove("selected");
        el.tabIndex = "-1";
    });
    elem.classList.add("selected");
    selectWindow.querySelector("span").textContent = elem.textContent;
    selectWindow.dataset.value = elem.dataset.value;
    elem.blur();
    customSelectOptions.classList.remove("customSelect__options-opened");
}

const fileInput = document.querySelector(".file__input");
const filePreview = document.querySelector(".file__preview");
fileInput.addEventListener("change", uploadFile);
function uploadFile(event) {
    let file = this.files[0];
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        alert("Разрешены только изображения!");
        this.value = "";
        return;
    }
    if (file.size > 20 * 1024 * 1024) {
        alert("Файл должен быть не более 20Мb!");
        this.value = "";
        return;
    }
    let reader = new FileReader();
    reader.onload = (event) => {
        filePreview.innerHTML = `<img src="${event.currentTarget.result}" alt="Фото">`;
    };
    reader.onerror = (er) => {
        alert("Ошибка!");
    };
    reader.readAsDataURL(file);
}

checkboxLabel.addEventListener("keypress", agrementChecker);
function agrementChecker(event) {
    if (event.code == "Space" || event.code == "Enter") {
        checkboxInput.checked = !checkboxInput.checked;
    }
}

class PopUp {
    constructor (selector_container, selector_content, selector_mainContent) {
        this.popupDiscription_container = document.querySelector(selector_container);
        this.popupDiscription_content = document.querySelector(selector_content);
        this.mainContent = document.querySelector(selector_mainContent);
        this.body = document.querySelector("body");
    }

    up () {        
        let bodyScrollBarWidth = window.innerWidth - this.body.clientWidth;
        this.body.style.paddingRight = parseInt(getComputedStyle(this.mainContent).paddingRight) + bodyScrollBarWidth + "px";
        this.popupDiscription_container.classList.add("active");
        this.popupDiscription_container.addEventListener("click", this.down.bind(this), { once: true });
        this.mainContent.classList.add("freezed");
        this.body.classList.add("freezed");
    }
    
    down () {        
        this.popupDiscription_container.classList.remove("active");
        this.mainContent.classList.remove("freezed");
        this.body.classList.remove("freezed");
        this.body.style.paddingRight = "";
    }
}

let popupDiscription = new PopUp (".popupDiscription-container", ".popupDiscription-content", ".mainContent");

window.onload = popupDiscription.up.bind(popupDiscription);
