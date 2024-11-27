// wikidepia apisi
const url =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="

// dom elemanlarını seç
const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

// form gönerildiğinde çalışacak olay
formDOM.addEventListener("submit", (e) => {
    //formun varsayılan davranışını engeller(sayfanın yeniden yüklenmesini engeller)
    e.preventDefault();

    const value = inputDOM.value;
    if (!value) {
        resultsDOM.innerHTML = `<div>Lütfen geçerli bir değer girin</div>`;
        return;
    }
    // değer varsa wikipedia api sine sorgu yap
    fetchPages(value);
});

// wikidedia apisine sorgu yapıcak olan fonksiyon
const fetchPages = async (searchValue) => {
    resultsDOM.innerHTML = `<div>Yükleniyor...</div>`;

    try {
        //wikipedia apisine istek gönder
        const response = await fetch(`${url}${searchValue}`);
        //
        const data = await response.json();
        const results = data.query.search; // sonuçları al

        if (results.length < 1) {//1 den küçükse sonuç yok
            // eğer sonuç yoksa mesajı göster
            resultsDOM.innerHTML = `<div>Böyle bir sonuç yok</div>`;
            return;
        }

        renderResults(results);
    } catch (error) {
        // hata durumunda mesajı göster
        resultsDOM.innerHTML = `<div>Bir hata var!</div>`;
    }
};

//wikipedia sonuçlarını html olarak oluşturacak fonksiyon
const renderResults = (list) => {
    const cardList = list.map((item) => {
        const { title, snippet, pageid } = item;
        return `<a href=http://en.wikipedia.org/?cruid=${pageid} 
        target="_blank">
          <h4>${title}</h4>
          <p>
            ${snippet}
          <p>
        </a>`;
    })
        .join("");
    resultsDOM.innerHTML = `<div class="articles">
    ${cardList}
    </div>`;
};
