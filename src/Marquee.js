
class Marquee{
    constructor(element){
        this.element = element;
    };
    stockurl ="https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list";
    getStockList = async () => {
        const response = await fetch(this.stockurl);
        const data = await response.json();
        return data;
      };
      
    showstocklist = data =>  {
        for (let i = 0; i < 24; i++) {
          const span1 = document.createElement("span");
          const span2 = document.createElement("span");
          span1.innerHTML = data[i].symbol;
          span2.innerHTML = data[i].price;
          span1.classList.add("listsymbol");
          span2.classList.add("listprice");
          this.element.appendChild(span1);
          this.element.appendChild(span2);
        }
      }
    load = () => {
        this.getStockList().then(this.showstocklist);
    }

}