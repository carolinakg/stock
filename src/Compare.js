class Compare{
    constructor(element) {
        this.element = element;
      }

load = () => {
const h1= document.createElement("h1");
h1.innerHTML = "Search Nasdaq Stocks";
h1.classList.add("title");
const div = document.createElement("div");
div.id = "compareDiv";
const btn = document.createElement("a");
btn.innerHTML = "Compare";
btn.classList.add("d-none");
btn.id = "compareBtn";
div.appendChild(btn);
this.element.appendChild(h1);
this.element.appendChild(div);
}
addCompany = (company) =>{
const btnCompare = document.getElementById("compareBtn");
const btn = document.createElement("button");
btnCompare.classList.remove("d-none");
btn.innerHTML = `${company.symbol} X`;
btn.addEventListener("click", this.removeCompany);
btnCompare.href = `compare.html?symbols=${company.symbol}`;
const otherBtns = document.getElementsByClassName("selected");
if(otherBtns.length > 2){
    console.error("Can't compare more than 3!");
}else{
for(let i = 0; i < otherBtns.length; i++){
    const symbol = otherBtns[i].innerHTML.split(" ")[0];
    btnCompare.href += `,${symbol}`;
}
btn.className = "selected";
const compareDiv = document.getElementById("compareDiv");
compareDiv.classList.add("d-flex");
compareDiv.appendChild(btn);
compareDiv.insertBefore(btn, btnCompare);
}
}
removeCompany = (event) => {
event.target.remove();
}
}