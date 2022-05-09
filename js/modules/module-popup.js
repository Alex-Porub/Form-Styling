
export default class PopUp {
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
