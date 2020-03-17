$(document).ready(function () {

    checkForProducts();
});

function displayCartData() {
    let products = JSON.parse(localStorage.getItem("products"));

    $.ajax({
        url : "assets/data/products.json",
        success : function(data) {
            let showProducts = [];
            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.q = prod.q;
                        return true;
                    }
                        
                }
                return false;
            });
            itemCreation(data)
        }
    });
}

function itemCreation(products) {
    let html = ``;
    let br=1;
    for(let p of products) {
        html += "<tr><td>"+br+"</td>";
        
        html += `<td><img src="${p.image.src}" style='height:20px' alt="${p.image.alt}" class="img-responsive center">${p.name}</td>
        <td>$${p.price}</td>
        <td>${p.q}</td>
        <td>$${p.price * p.q}</td>
        <td>
            <div>
                <div class="p-1"><button onclick='removeFromCart(${p.id})'>X</button> </div>
            </div>
        </td>
    </tr>`;
    br++;
    }

    $("#itemsInCart").html(html);
}

function showEmptyCart() {
    $("#itemsInCart").html("<tr><td class='center' colspan='6'><h5>Your cart is empty!</h5></td></tr>")
}




function removeFromCart(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    checkForProducts();
}
function checkForProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    if(products == null || products == 0)
        showEmptyCart();
    else
        displayCartData();
}