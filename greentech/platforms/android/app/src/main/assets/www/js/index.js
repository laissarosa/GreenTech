/**
 * Carrega os produtos do backend e renderiza na página inicial.
 * Load products from backend and render on the home page.
 */
fetch('js/backend.json')
  .then(response => response.json())
  .then(data => {
    // Salva os dados do backend localmente usando localStorage
    // Save backend data locally using localStorage
    localStorage.setItem('products', JSON.stringify(data));
    console.log('Data fetched successfully');
    setTimeout(() => {
        $("#produtos").empty(); // Limpa produtos existentes / Clear existing products
        // Simula carregamento de página / Simulate page loading
        data.forEach(produto => {
            // Monta o HTML de cada produto / Build each product HTML
            var produtoHTML =  `
            <!--Item Card-->
                            <div class="item-card">
                                <a data-id="${produto.id}" href="#" class="item">
                                    <div class="img-container">
                                        <img src="${produto.image}">
                                    </div>
                                    <div class="nome-rating">
                                        <span class="color-gray">${produto.name}</span>
                                        <span class="bold">
                                            <i class="mdi mdi-star"></i>
                                            ${produto.rating}
                                        </span>
                                    </div>
                                    <div class="price">${produto.promotional_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                </a>
                            </div>
            `;
            $("#produtos").append(produtoHTML);
        });
        // Evento de clique no produto para abrir detalhes
        // Click event on product to open details page
        $(".item").on("click", function() {
            var id = $(this).attr('data-id');
            // Salva o id do produto selecionado / Save selected product id
            localStorage.setItem('details', id);
            // Navega para a página de detalhes / Navigate to details page
            app.views.main.router.navigate('/details/');
        });
    }, 1000);
  })
  // Captura erro ao buscar dados do backend
  // Catch error fetching backend data
  .catch(error => console.error('Error fetching data: '+error));

/**
 * Atualiza o contador de itens no ícone do carrinho.
 * Update cart item counter on cart icon.
 */
setTimeout(() => {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Alimenta contador da sacola / Update cart counter
    $('.btn-cart').attr('data-count', cart.length);
}, 300);