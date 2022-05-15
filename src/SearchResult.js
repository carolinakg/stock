class SearchResult {
  constructor(element, loading) {
    this.element = element;
    this.loading = loading;
  }
  getProfile = async (profileurl) => {
    this.loading.classList.remove("d-none");
    const response = await fetch(profileurl);
    const data = await response.json();
    this.loading.classList.add("d-none");
    return data.profile;
  };
  setHighLight = (word, input) => {
    const upperWord = word.toUpperCase();
    const upperInput = input.toUpperCase();
   const newWord = upperWord.replace(upperInput, `*${upperInput}*`);
   const separated = newWord.split("*");
   const div = document.createElement("div");
   for(let i = 0; i < separated.length; i++){
       const span = document.createElement("span");
       span.innerHTML = separated[i];
       if(i % 2 !== 0){
        span.classList.add("highlight");
       }
    div.appendChild(span);
   }
   return div;
  }
  create = (tag, text, attribute, value) => {
    const element = document.createElement(tag);
    if(text){
      element.innerHTML = text;
    }
    if(attribute){
      element[attribute] = value;
    }
    return element;
  }
  kids = (parent, children) => {
    for(let i = 0; i < children.length; i++){
      parent.appendChild(children[i]);
      }
  }
  renderResults = (companies, input, addCompany) => {
    if(companies.length === 0){
      this.element.innerHTML = "No companies found";
    }else{
      companies.forEach(async (company) => {
        const li = document.createElement("li");
        const a = this.create("a", "", "href",`company.html?symbol=${company.symbol}`);
        const div1 = this.setHighLight(company.name, input);
        const div2 = this.setHighLight(company.symbol, input);
        div1.classList.add("cap");
        a.appendChild(div1);
        a.appendChild(div2);
        const profileurl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
        const profile = await this.getProfile(profileurl);
        const img = this.create("img", "", "src", profile.image);
        const changes = this.create("span", `(${profile.changes * 100}%)`, "className", "changes");
        if (profile.changes < 0) {
          changes.classList.add("red");
        }
        const btn = this.create("button", "Compare");
        btn.addEventListener("click",() => addCompany(company));
        const newDiv = this.create("div", "", "className", "d-flex");
        this.kids(newDiv, [img,a,changes]);
        this.kids(li, [newDiv, btn]);
        this.element.appendChild(li);
      });
    }
  };
  
}
