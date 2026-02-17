// Recuperar o id do localStorage
var id = parseInt(localStorage.getItem('details'));

// Recuperar produtos do localStorage
var products = JSON.parse(localStorage.getItem('products'));
var item = products.find(products => products.id === id);

// Alimentar página de detalhes
$("#image-detail").attr("src", item.image);
$("#name-detail").html(item.name);
$("#rating-detail").html(item.rating);
$("#like-detail").html(item.likes);
$("#reviews-detail").html(item.reviews + ' reviews');
$("#description-detail").html(item.description);
$("#price-detail").html(item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
$("#price-promotional-detail").html(item.promotional_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

// Montando a tabela de características
var table = $('#tab-detail');
item.details.forEach(element => {
    var line = `
    <tr>
        <td>${element.feature}</td>
        <td>${element.details}</td>
    </tr>
    `
    table.append(line);
});

var cart = JSON.parse(localStorage.getItem('cart')) || [];
//Função de add itens ao carrinho
function addToCart(item, quantity) {
    var existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        //item já existe no carrrinho
        existingItem.quantity += quantity;
        existingItem.total_price = existingItem.quantity * existingItem.promotional_price;
    }else{
        cart.push ({
            item: item,
            quantity: quantity,
            total_price: item.promotional_price * quantity
        })
    }
    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Após clicar em add ao carrinho
$(".add-cart").on("click", function() {
    addToCart(item, 1);
    //alert(`${item.name} added to cart!`);
    var toastCenter = app.toast.create ({
        text: `${item.name} added to cart!`,
        position: 'center',
        closeTimeout: 2000
    });
    toastCenter.open();
});

