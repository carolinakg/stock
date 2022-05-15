class SearchForm {
  constructor(element, loading) {
    this.element = element;
    this.loading = loading;
  }
  endpoint = (query) =>
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`;

  onSearch = (callback) => {
    const input = document.createElement("input");
    input.type = "text";
    const btn = document.createElement("button");
    btn.innerHTML = "Search";
    btn.classList.add("searchBtn");
    this.element.appendChild(input);
    this.element.appendChild(btn);

    btn.addEventListener("click", async () => {
      this.loading.classList.remove("d-none");
      const url = this.endpoint(input.value);
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      this.loading.classList.add("d-none");
      callback(data, input.value);
    });
  };
}
