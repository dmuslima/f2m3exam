let kartochki = document.querySelector('.kartochki');
let categoryInput = document.getElementById('categoryInput');
let priceSort = document.getElementById('priceSort');
let searchInput = document.getElementById('searchInput');

let products = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json(); 
        products = data;
        filterAndDisplay();
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        kartochki.innerHTML = '<p>Не удалось загрузить товары. Попробуйте позже.</p>';
    }
}

function genaratorProduct(productList) {
    kartochki.innerHTML = '';
    productList.forEach(element => {
        let shortDescription = element.description.slice(0, 100);

        let divCard = document.createElement('div');
        divCard.classList.add('card');

        divCard.innerHTML = `
            <img src="${element.image}" alt="" class="img">
            <h2 class="title">${element.title}</h2>
            <p class="description">${shortDescription}...</p>
            <p class="category"><span class="span">Kategoriya:</span> ${element.category}</p>
            <p class="price">${element.price} $</p>
        `;

        kartochki.appendChild(divCard);
    });
}

function filterAndDisplay() {
    let selectedCategory = categoryInput.value;
    let filtered = products.filter(item => {
        let categoryOk = selectedCategory == "Barcha kategoriyalar" || item.category == selectedCategory;

        let searchValue = searchInput.value.toLowerCase();
        let searchOk = !searchValue || item.title.toLowerCase().includes(searchValue);

        return categoryOk && searchOk;
    });

    let sortValue = priceSort.value;
    if (sortValue == "Osish tartibida") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue == "Kamayish tartibida") {
        filtered.sort((a, b) => b.price - a.price);
    }

    genaratorProduct(filtered);
}

categoryInput.addEventListener('change', filterAndDisplay);
priceSort.addEventListener('change', filterAndDisplay);
searchInput.addEventListener('input', filterAndDisplay);

fetchProducts();

