fetch('js/backend.json')
  .then(response => response.json())
  .then(data => {
    // Save backend data locally using localStorage
    localStorage.setItem('products', JSON.stringify(data));
    console.log('Data fetched successfully');
    setTimeout(() => {
        $("#produtos").empty(); //clear existing products
        // Simular carrregamento de página
        data.forEach(produto => {
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
        $(".item").on("click", function() {
            var id = $(this).attr('data-id');
            localStorage.setItem('details', id);
            app.views.main.router.navigate('/details/');
        });
    }, 1000);
  })

  .catch(error => console.error('Error fetching data: '+error));

// ver quantos itens tem no carrinho
setTimeout(() => {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    //alimentar contador da sacola
    $('.btn-cart').attr('data-count', cart.length);
}, 300);