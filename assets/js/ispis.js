$(document).ready(function(){


    $("#sort").change(sortiraj);
    showProducts();
    $("#brand").click(showProducts);
    

    //Meni
    $.ajax({
        url : "assets/data/menu.json",
        method : "GET",
        dataType : "json",
        success: function(meni){
            ispis= `<ul class="navbar-nav ml-auto">`;

            for(let m of meni){
                ispis += `<li class="nav-item ">
                            <a class="nav-link" href="${m.href}">${m.name}</a>
                        </li>`;
            }
            ispis += `</ul>`;
            $("#meni").html(ispis);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    })
   
    //Kategorije
    $.ajax({
        url : "assets/data/categories.json",
        method : "GET",
        dataType : "json",
        success: function(categories){
            iBrend = ``;
            iOs= `<select id="os" name="os" class="custom-select custom-select-sm bg-dark text-white"><option value="0">Choose</option>`;
            iMemory= `<select id="os" name="os" class="custom-select custom-select-sm bg-dark text-white"><option value="0">Choose</option>`;
            bBrend = ``;
            fBrend= `<select id="fBrend" name="fBrend" class="custom-select custom-select-sm mt-3"><option value="0">Choose</option>`;
            for(let cat of categories){
                if (cat.type == 'brand'){
                    iBrend += `<li class="p-2"><a data-id="${cat.id}" class="text-white filter" href="products.html">${cat.category}</a></li>`;
                    bBrend += `<li class="p-2 text-white">${cat.category}</li>`;
                    fBrend += `<option value="${cat.id}">${cat.category}</option>`;
                }
                else if (cat.type == 'os'){
                iOs += `<option value="${cat.id}">${cat.category}</option>`;
                }
                else if (cat.type == 'memory'){
                iMemory += `<option value="${cat.id}">${cat.category}</option>`;
                }
            }
            iOs+=`</select>`;
            iMemory+=`</select>`;
            fBrend += `</select>`;
            $("#brend").html(iBrend);
            $("#buy").html(bBrend);
            $("#os").html(iOs);
            $("#memory").html(iMemory);
            $("#formBrand").html(fBrend);
            $(".filter").click(filtrirajBrend);
            $("#os").change(filtrirajOs);
            $("#memory").change(filtrirajMemory);

        },
        error : function(xhr, error, status) {
            alert(status);
        }
    })

    //Zaposleni
    $.ajax({
        url : "assets/data/crew.json",
        method : "GET",
        dataType : "json",
        success: function(crew){
            ispisIndex= ``;
            ispisAbout= ``;
            for(let c of crew){
                ispisIndex += `<li class="list-inline-item p-2"><p class="text-center">${c.name}</p><img class="rounded-circle" src="${c.image}"/></li>`;
                ispisAbout += `<div class="col-sm-12 col-md-6 col-lg-4">
                            <h4 class="text-center">${c.name}</h4>
                            <img class="rounded-circle" src="${c.image}"/>
                            <p class="p-4">${c.description}</p>
                        </div>`;
            }
            $("#crew1").html(ispisIndex);
            $("#crew2").html(ispisAbout);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    })
    //Komentari
    $.ajax({
        url : "assets/data/comments.json",
        method : "GET",
        dataType : "json",
        success: function(comments){
            ispis= ``;
            for(let com of comments){
                ispis += `<div class="col-sm-12 col-md-6 col-lg-3 card-panel bg-dark">                      
                <p class="text-left p-2">"${com.comment}"</p>
                <p class="text-right p-2">${com.name}</p>
        </div>`;
            }
            $("#comments").html(ispis);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    })


    //Top proizvodi
    ajaxProducts(function(products){
            ispis= ``;
            for(let p of products){
                if(p.top)
                ispis += `<div class="col-sm-12 col-md-6 col-lg-3">
                             <div class="text-center card black grow">
                                 <a href="products.html"><img src="${p.image.src}" alt="${p.image.alt}" class="card-img-top mb-3 mt-2"/></a>
                                <p class="text-white">${p.brand.name} ${p.name} ${p.price}$</p>
                            </div>
                         </div>`;
                                       
            }
            $("#topProduct").html(ispis);
        }       
        );
   
});
function ajaxProducts(callbackSuccess){ 
    $.ajax({
        url: "assets/data/products.json",
        method: "GET",
        success: callbackSuccess
    });
}
function showProducts() {
    ajaxProducts(function(products){
            ispis= ``;
                printProduct(products);
        }       
    );
}

function filtrirajBrend(blok){
    blok.preventDefault();

    let catId = $(this).data('id');
    ajaxProducts(function(products){
            products = products.filter(x => x.brand.id == catId);
            
            ispis= ``;
            printProduct(products);          
         }       
    );
}

function printProduct(products) {

    for(let p of products){
    ispis += `<div class="col-lg-3 col-md-6 col-sm-12 p-2">
    <img class="card-img-top mb-3 mt-2" src="${p.image.src}" alt="${p.image.alt}"/>
    <p class="text-center">${p.brand.name}</p>
    <p class="text-center">${p.name}</p>               
    <p class="text-center">${p.price}$</p>
    <p class="text-center">
        <a class="btn btn-dark mt-1" data-toggle="collapse" href="#collapse${p.id}" role="button" aria-expanded="false" aria-controls="collapse${p.id}">Specification</a>
        <a class="btn btn-dark storage mt-1" data-id="${p.id}" role="button" href="#">Buy</a>
    </p>
    <div class="collapse" id="collapse${p.id}">
            <p class="text-center p-0">OS: ${p.os}</p>
            <p class="text-center p-0">Rare camera: ${p.camera.rare} MP</p>
            <p class="text-center p-0">Front camera: ${p.camera.front} MP</p>
            <p class="text-center p-0">Memory: ${p.memory} GB</p>
    </div>
    </div>`;
    

}

$("#products").html(ispis);
$(".storage").click(addToCart);
}


function filtrirajOs(){
    var os = $("#os option:selected").text();
    ajaxProducts(function(products){
            ispis= ``;
            if(os == "Choose") {
                    printProduct(products);
            }
            else {
            products = products.filter(x => x.os == os);                    
                printProduct(products);            
            }       
        }
    );
}

function filtrirajMemory(){
    var memory = $("#memory option:selected").text();
    ajaxProducts(function(products){
            ispis= ``;
            if(memory == "Choose") {
                    printProduct(products);
            }
            else {
            products = products.filter(x => x.memory == memory);
                printProduct(products);
            }               
        }
    );
}

function sortiraj(){
    let sort = $(this).find(':selected').data('sort');
    let order = $(this).find(':selected').data('order');
    var os = $("#os option:selected").text();
    var memory = $("#memory option:selected").text();
    ajaxProducts(function(products){
            
            if(os == "Choose" || memory == "Choose")
            {
                ispis = ``;
                sortiranje(products, sort, order);
                printProduct(products);
            } 
            if(os == "Choose" && memory !== "Choose")
            {
                ispis = ``;
                var x = products.filter(x => x.memory == memory);            
                sortiranje(x, sort, order);
                printProduct(x);
            }
            if(os !== "Choose" && memory == "Choose")
            {
                ispis = ``;           
                var x = products.filter(x => x.os == os); 
                sortiranje(products, sort, order);
                printProduct(x);
            }
            if(os !== "Choose" && memory !== "Choose")
            {
                ispis = ``;           
                products = products.filter(x => x.os == os);
                products = products.filter(x => x.memory == memory); 
                sortiranje(products, sort, order);
                printProduct(products);
            }
        }
    );
}
function sortiranje(products, sort, order) {
    products.sort(function(x,y){
        let first = (sort=="price")? x.price : x.name;
        let second = (sort=="price")? y.price : y.name;
        if(first > second)
            return order=='asc' ? 1 : -1;
        else if(first < second)
            return order=='asc' ? -1 : 1;
        else 
            return 0;
    });
}


function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}
function addToCart(){
    let id = $(this).data("id");

    var products = productsInCart();

    if(products) {

        if(isItInCart()){
            addOneMore();
        }else {
            addToLocalStorage();
        }
    } else {
        addItemToLocalStorage();
    }



function isItInCart(){ 
    x = products.filter(x=> x.id == id).length;
    return x;
    
    
}

function addToLocalStorage(){
    let products = productsInCart();
    products.push({
        id:id,
        q:1
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert("Item is added to cart!");
}

function addOneMore() {
    let products = productsInCart();
    for (let i in products) {
        if(products[i].id ==id){
            products[i].q++;
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
    alert("Item is added to cart!");
}

function addItemToLocalStorage(){
    let products = [];
    products[0] = {
        id:id,
        q:1
    };
    localStorage.setItem("products", JSON.stringify(products));
    alert("Item is added to cart!");
}
}


