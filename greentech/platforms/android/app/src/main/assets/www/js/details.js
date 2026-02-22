
/**
 * Recupera o id do produto selecionado do localStorage.
 * Retrieve selected product id from localStorage.
 */
var id = parseInt(localStorage.getItem('details'));

/**
 * Recupera a lista de produtos do localStorage e encontra o produto pelo id.
 * Retrieve product list from localStorage and find product by id.
 */
var products = JSON.parse(localStorage.getItem('products'));
var item = products.find(products => products.id === id);

/**
 * Alimenta os campos da página de detalhes com as informações do produto.
 * Fill details page fields with product information.
 */
$("#image-detail").attr("src", item.image);
$("#name-detail").html(item.name);
$("#rating-detail").html(item.rating);
$("#like-detail").html(item.likes);
$("#reviews-detail").html(item.reviews + ' reviews');
$("#description-detail").html(item.description);
$("#price-detail").html(item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
$("#price-promotional-detail").html(item.promotional_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

/**
 * Monta a tabela de características do produto.
 * Build product features table.
 */
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

// Recupera o carrinho do localStorage ou inicializa vazio
// Retrieve cart from localStorage or initialize empty
var cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Adiciona um item ao carrinho ou atualiza a quantidade se já existir.
 * Add item to cart or update quantity if already exists.
 * @param {Object} item - Produto a ser adicionado / Product to add
 * @param {number} quantity - Quantidade a adicionar / Quantity to add
 */
function addToCart(item, quantity) {
    var existingItem = cart.find(cartItem => cartItem.item.id === item.id);
    if (existingItem) {
        // Item já existe no carrinho / Item already exists in cart
        existingItem.quantity += quantity;
        existingItem.total_price = existingItem.quantity * existingItem.item.promotional_price;
    } else {
        cart.push ({
            item: item,
            quantity: quantity,
            total_price: item.promotional_price * quantity
        })
    }
    // Salva o carrinho atualizado no localStorage / Save updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Evento ao clicar no botão de adicionar ao carrinho.
 * Event when clicking add to cart button.
 */
$(".add-cart").on("click", function() {
    addToCart(item, 1);
    // Exibe toast de confirmação / Show confirmation toast
    var toastCenter = app.toast.create ({
        text: `${item.name} added to cart!`,
        position: 'center',
        closeTimeout: 2000
    });
    toastCenter.open();
});

