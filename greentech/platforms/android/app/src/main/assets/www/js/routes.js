/**
 * Inicialização do Framework7 quando o dispositivo está pronto.
 * Framework7 initialization when device is ready.
 */
document.addEventListener('deviceready', onDeviceReady, false);

/**
 * Instância principal do Framework7 e definição das rotas do app.
 * Main Framework7 instance and app routes definition.
 */
var app = new Framework7({
  // Elemento raiz do app / App root element
  el: '#app',
  // Nome do app / App Name
  name: 'GreenTech',
  // ID do app / App id
  id: 'com.myapp.test',
  // Habilita painel lateral por swipe / Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Rotas do app / App routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      animate: false,
      on: {
        /**
         * Executa antes da página ser exibida.
         * Runs before the page is shown.
         */
        pageBeforeIn: function (event, page) {
          $("#mainMenu").show("fast");
        },
        /**
         * Executa depois da página ser exibida.
         * Runs after the page is shown.
         */
        pageAfterIn: function (event, page) {
        },
        /**
         * Executa na inicialização da página.
         * Runs on page initialization.
         */
        pageInit: function (event, page) {
          // Carrega script da página inicial / Load home page script
          $.getScript('js/index.js');
          // Carrossel automático de produtos / Automatic product carousel
          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            delay: 3000,
            autoplay: true,
            loop: true,
            breakpoints: {
              50: { slidesPerView: 1, spaceBetween: 30 },
              640: { slidesPerView: 2, spaceBetween: 30 },
              992: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 4, spaceBetween: 30 }
            }
          });
          // Carrossel de categorias / Categories carousel
          var swiper2 = new Swiper(".categories", {
            slidesPerView: 3,
            spaceBetween: 10,
            freeMode: true,
            breakpoints: {
              50: { slidesPerView: 3, spaceBetween: 10 },
              640: { slidesPerView: 5, spaceBetween: 10 },
              992: { slidesPerView: 7, spaceBetween: 10 },
              1200: { slidesPerView: 9, spaceBetween: 10 }
            }
          });
        },
        /**
         * Executa antes da página ser removida do DOM.
         * Runs before the page is removed from DOM.
         */
        pageBeforeRemove: function (event, page) {
        },
      }
    },
    {
      path: '/search_page/',
      url: 'search_page.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/favorite_page/',
      url: 'favorite_page.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/user_page/',
      url: 'user_page.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
      //Página do carrinho de compras
     {
      path: '/cart/',
      url: 'cart.html',
      options: {
        transition: 'f7-push',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#mainMenu").hide("fast");
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
    $.getScript('js/cart.js');
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    //Detalhes do produto escolhido
     {
      path: '/details/',
      url: 'details.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#mainMenu").hide("fast");
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
    $.getScript('js/details.js');
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
  ],
  // ... other parameters
});


// Para testes direto no navegador / For direct browser tests
// var mainView = app.views.create('.view-main', { url: '/index/' });

/**
 * Evento para saber o item do menu atual e ativar a aba correta.
 * Event to know the current menu item and activate the correct tab.
 */
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});

/**
 * Função chamada quando o dispositivo está pronto.
 * Function called when device is ready.
 */
function onDeviceReady() {
  // Cria a view principal ao rodar no celular / Create main view when running on mobile
  var mainView = app.views.create('.view-main', { url: '/index/' });

  // Comando para ouvir o botão voltar nativo do Android
  // Listen to Android native back button
  document.addEventListener("backbutton", function (e) {
    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);
}
