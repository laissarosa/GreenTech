
/**
 * Recupera o carrinho do localStorage e inicializa a renderização.
 * Retrieve cart from localStorage and initialize rendering.
 */
var localCart = localStorage.getItem('cart');

if (localCart) {
    var cart = JSON.parse(localCart);
    
    if (cart.length > 0) {
        // Tem item no carrinho / There are items in the cart
        renderCart(); // Renderiza o carrinho / Render cart
        calculeTotal(); // Soma total de produtos / Sum total products
    } else {
        // Mostra mensagem de carrinho vazio / Show empty cart message
        emptyCart();
    }
} else {
    // Mostra mensagem de carrinho vazio / Show empty cart message
    emptyCart();
}

/**
 * Renderiza os itens do carrinho na página.
 * Render cart items on the page.
 */
function renderCart() {
    $("#list-cart").empty(); // Esvazia área dos itens / Clear items area
    // Percorre o carrinho e alimenta a área / Loop through cart and fill area
    $.each(cart, function(index, itemCart) {
        var itemDiv = `
            <!--ITEM DO CARRINHO-->
            <div class="item-cart" data-index="${index}">
                <div class="area-img">
                    <img src="${itemCart.item.image}">  
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">${itemCart.item.name}</span>
                        <a data-index="${index}" class="delete-item" href="#">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemCart.item.main_feature}</span>
                    </div>
                    <div class="price-quantity">
                        <span>${itemCart.item.promotional_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <div class="count">
                            <a class="minus" data-index="${index}" href="#">-</a>
                            <input readonly class="quantity-item" type="text" value="${itemCart.quantity}">
                            <a class="plus" data-index="${index}" href="#">+</a>
                        </div>
                    </div>
                </div>
            </div>
        `
        $("#list-cart").append(itemDiv);
    });

    // Evento para remover item do carrinho / Event to remove cart item
    $(".delete-item").on('click', function () {
        var index = $(this).data('index');
        app.dialog.confirm('Are you sure?', 'Remove', function () {
            // Remove item do carrinho / Remove item from cart
            cart.splice(index, 1);
            // Atualiza o carrinho no localStorage / Update cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Atualiza a página / Refresh page
            app.views.main.router.refreshPage();
        })
    });
    // Evento para diminuir quantidade / Event to decrease quantity
    $(".minus").on('click', function () {
        var index = $(this).data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            cart[index].total_price = cart[index].quantity * cart[index].item.promotional_price;
            localStorage.setItem('cart', JSON.stringify(cart));
            app.views.main.router.refreshPage();
        } else {
            var itemName = cart[index].item.name;
            app.dialog.confirm(`Are you sure you want to remove <strong>${itemName}</strong> from your cart?`, `Remove`, function() {
                cart.splice(index,1);
                localStorage.setItem('cart', JSON.stringify(cart));
                app.views.main.router.refreshPage();
            });
        }
    });
    // Evento para aumentar quantidade / Event to increase quantity
    $(".plus").on('click', function () {
        var index = $(this).data('index');
        cart[index].quantity++;
        cart[index].total_price = cart[index].quantity * cart[index].item.promotional_price;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        calculeTotal();
    });
}

/**
 * Calcula e exibe o valor total do carrinho.
 * Calculate and display cart total value.
 */
function calculeTotal(){
    var totalCart = 0
    $.each(cart, function (index, itemCart) {
        totalCart += itemCart.total_price;
    });
    // Mostra o subtotal / Show subtotal
    $("#subtotal").html(totalCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}

/**
 * Exibe mensagem e layout de carrinho vazio.
 * Show empty cart message and layout.
 */
function emptyCart() {
    $("#list-cart").empty();

    // Esconde botões de totais / Hide total buttons
    $("#toolbarTotal").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    // Mostra imagem de sacola vazia / Show empty bag image
    $("#list-cart").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span>Nothing for now... </span>
        </div>     
        `)
}

/**
 * Evento para esvaziar o carrinho ao clicar no botão.
 * Event to empty cart when clicking the button.
 */
$('#empty').on('click', function() {
    app.dialog.confirm('Are you sure you want to empty your cart?', 'Empty cart', 
        function () {
            // Apaga o localStorage do carrinho / Remove cart from localStorage
            localStorage.removeItem('cart');
            app.views.main.router.refreshPage();
        }
    )
})

