class CompanyInfo {
  constructor(element, symbol) {
    this.element = element;
    this.symbol = symbol;
  }
  
  loading = document.getElementById("spinner-border");
  getProfile = async () => {
    const endpoint = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.profile;
  };
  load = () => {
    const canvas = document.createElement("canvas");
    this.element.appendChild(canvas);
    canvas.id = `myChart${this.symbol}`;
    const division = document.createElement("div");
    this.getProfile().then((profile) => {
      const h2 = document.createElement("h2");
      h2.innerHTML = `${profile.companyName}`;
      const img = document.createElement("img");
      img.src = profile.image;
      const p = document.createElement("p");
      p.innerHTML = profile.description;
      const p2 = document.createElement("p");
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      span1.innerHTML =`Price: ${profile.price}, `;
      span2.innerHTML =`Changes: ${profile.changes * 100}%`;
      p2.appendChild(span1);
      p2.appendChild(span2);
      span2.classList.add("changes");
    
      
      if (profile.changes < 0) {
        span2.classList.add("red");
      }
      const aElement = document.createElement("a");
      aElement.href = profile.website;
      aElement.innerHTML = profile.website;
      const header = document.createElement("header");
      header.classList.add("d-flex");
      header.appendChild(h2);
      header.appendChild(img);
      division.appendChild(header);
      division.appendChild(p);
      division.appendChild(p2);
      division.appendChild(aElement);
      this.element.appendChild(division);
      this.element.insertBefore(division, canvas);
    });
  };
  getHistory = async () => {
    const historyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}?serietype=line`;
    this.loading.classList.remove("d-none");
    const response = await fetch(historyUrl);
    const data = await response.json();
    this.loading.classList.add("d-none");
    return data.historical;
  };
  // getHistory().then(data => console.log(data));
  addChart = () => {
    this.getHistory().then((data) => {
      const labels = data.map((day) => day.date);
      const closes = data.map((day) => day.close);
      const graph = {
        labels: labels,
        datasets: [
          {
            label: "History chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: closes,
          },
        ],
      };

      const config = {
        type: "line",
        data: graph,
        options: {},
      };
      const myChart = new Chart(document.getElementById(`myChart${this.symbol}`), config);
    });
  };
}
