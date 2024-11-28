async function loadProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    // Find the container where products will be displayed
    const container = document.querySelector('#all-products .container');

    // Iterate over each product and create the HTML structure safely
    products.forEach((product) => {
        // Create the main product div
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Create the product picture div
        const pictureDiv = document.createElement('div');
        pictureDiv.classList.add('product-picture');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = `product: ${product.title}`;
        img.loading = 'lazy';
        img.width = '150px';
        img.height = '150px';
        pictureDiv.appendChild(img);

        // Create the product info div
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');

        const category = document.createElement('h5');
        category.classList.add('categories');
        category.textContent = product.category;

        const title = document.createElement('h4');
        title.classList.add('title');
        title.textContent = product.title;

        const price = document.createElement('h3');
        price.classList.add('price');
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `US$ ${product.price}`;
        price.appendChild(priceSpan);

        const button = document.createElement('button');
        button.textContent = 'Add to bag';

        // Append elements to the product info div
        infoDiv.appendChild(category);
        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(button);

        // Append picture and info divs to the main product element
        productElement.appendChild(pictureDiv);
        productElement.appendChild(infoDiv);

        // Append the new product element to the container
        container.appendChild(productElement);
    });
}

// 무거운 계산을 비동기적으로 처리하는 함수
async function heavyCalculation() {
    // Promise를 반환하여 비동기 처리를 가능하게 합니다
    return new Promise((resolve) => {
        // setTimeout을 사용해 다음 이벤트 루프로 계산을 미룹니다
        setTimeout(() => {
            let result = 0;
            for (let i = 0; i < 10000000; i++) {
                result += Math.sqrt(i) * Math.sqrt(i);
            }
            // 계산이 완료되면 Promise를 이행합니다
            resolve(result);
        }, 0);
    });
}

window.onload = () => {
    let status = 'idle';
    let productSection = document.querySelector('#all-products');

    window.onscroll = async () => {
        let position =
            productSection.getBoundingClientRect().top -
            (window.scrollY + window.innerHeight);

        if (status == 'idle' && position <= 0) {
            status = 'loading'; // 상태를 변경하여 중복 실행 방지

            try {
                await loadProducts();
                // 비동기적으로 무거운 계산 실행
                const result = await heavyCalculation();
                console.log('계산 결과:', result);
            } catch (error) {
                console.error('오류 발생:', error);
            } finally {
                status = 'idle'; // 작업 완료 후 상태 복원
            }
        }
    };
};
