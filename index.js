const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

//Sessãodo menu
function menuHandler(){
    //Abrir menu
    document.querySelector("#open-nav-menu").addEventListener("click", ()=>{
        document.querySelector(".wrapper").classList.add("nav-open");
    });

    //Fechar menu
    document.querySelector("#close-nav-menu").addEventListener("click", ()=>{
        document.querySelector(".wrapper").classList.remove("nav-open");
    });

}

//Converter Celsius para fahr
function celsiusToFahr(temperature){
    let fahr = (temperature * 9 / 5) + 32;
    return fahr;
}

//Saudação
function greetingHandler(){
  
    let greetingText;
    let currentHour = new Date().getHours();
    if(currentHour < 12){
        greetingText = "Good Morning!";
    }else if(currentHour < 19){
        greetingText = "Good Afternoon!";
    }else if(currentHour < 24){
        greetingText = "Good Evening!";
    }else{
        greetingText = "Welcome!"
    }

    document.querySelector("#greeting").innerHTML = greetingText;
    
}


//Relógio
function clockHandler(){
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").innerHTML = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").innerHTML = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").innerHTML = localTime.getSeconds().toString().padStart(2,"0");
    },1000);
}

const galleryImages = [
    {
        "src": "./assets/gallery/img1.png",
        "alt": "Thumbnail ImagePng 1"
    },
    {
        "src": "./assets/gallery/image2.jpg",
        "alt": "Thumbnail Image 2"
    },
    {
        "src": "./assets/gallery/image1.jpg",
        "alt": "Thumbnail Image 1"
    },
    {
        "src": "./assets/gallery/image3.jpg",
        "alt": "Thumbnail Image 3"
    }
]

//Galeria

function galleryHanlder(){
    let mainImage = document.querySelector("#gallery > img");
    let thumbNails = document.querySelector("#gallery .thumbnails");
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    galleryImages.forEach((image, index) => {
        let thumb = document.createElement("img");

        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected =  index == 0 ? true : false;

        thumb.addEventListener("click", (event)=>{
            let selectedIndex = event.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];

            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbNails.querySelectorAll("img").forEach(img =>{
                img.dataset.selected = false;
            });

            event.target.dataset.selected = true;
        });

        thumbNails.appendChild(thumb);
    });

}

function populateProducts(productList){
    let producsSection = document.querySelector(".products-area");
        producsSection.textContent = "";

    productList.forEach((product, index) =>{

        let productElement = document.createElement("div");
        productElement.classList.add("product-item");

        let productImage = document.createElement("img");
        productImage.src = product.image;
        productElement.alt = "Image for " + product.title;

        productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        productPriceTitle = document.createElement("p");
        productPriceTitle.classList.add("price-title");
        productPriceTitle.textContent = "Price";

        productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(productPriceTitle);
        productDetails.append(productPrice);


        productElement.append(productImage);
        productElement.append(productDetails);
        producsSection.append(productElement);
        
    });

}

//Products
function productsHandler(){
    
    let totalProducts = products.length;

    let freeProdutus = products.filter(item =>{
        return !item.price || item.price <= 0;
    });

    let paidProdutus = products.filter(item =>{
        return item.price > 0;
    });

    populateProducts(products);
    
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totalProducts;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProdutus.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProdutus.length;

    let productsFilter = document.querySelector(".products-filter");

    productsFilter.addEventListener("click", (event)=>{
        if(event.target.id == 'all'){
            populateProducts(products);
        }else if((event.target.id == 'paid')){
            populateProducts(paidProdutus);
        }else if(event.target.id == 'free'){
            populateProducts(freeProdutus);
        }
    });
}


function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved`;
}


function weatherHandler(){
    const weatherAPIKey = "49d59f9723a736e1bc15186bbfc3239b";
    const weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric";

    navigator.geolocation.getCurrentPosition((position)=>{
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIURL
        .replace("{lat}", latitude)
        .replace("{lon}", longitude)
        .replace("{API key}", weatherAPIKey);

        fetch(url).then( response => response.json())
        .then(data => {
            let condition = data.weather[0].description;
            let location = data.name;
            let temperature = data.main.temp;

            let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
            let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;
            
            
            document.querySelector("#weather").innerHTML = celsiusText;
            
            document.querySelector(".weather-group").addEventListener("click", (event)=>{
                if(event.target.id == 'celsius'){
                    document.querySelector("#weather").innerHTML = celsiusText;
                }else if(event.target.id == 'fahr'){
                    document.querySelector("#weather").innerHTML = fahrText;
                }
            });
        }).catch(error =>{
            document.querySelector("#weather").innerHTML = "Unable to get weather info. Try again later.";
        })
    });
}

//Page Load

menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHanlder();
productsHandler();
footerHandler();
