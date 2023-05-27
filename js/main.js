document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("novoItens");
    const lista = document.getElementById("lista");
    const totalElement = document.getElementById("total");
    const itens = JSON.parse(localStorage.getItem("itens")) || []

    function atualizaItensCarregados() {
      const itensCarregados = lista.getElementsByTagName("li");
    
      itens.forEach((item) => {
        const elementoQuantidade = Array.from(itensCarregados).find(
          (el) => el.querySelector("strong").dataset.id === item.id
        );
        if (elementoQuantidade) {
          elementoQuantidade.querySelector("strong").innerHTML = item.quantidade;
        }
      });
    }

    itens.forEach(elemento => {
        criaElemento(elemento)
    });
    atualizaItensCarregados();
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();

      //extrai os valores dos campos de entrada do formulário "nome", "quantidade" e "valor".
      const nome = evento.target.elements["nome"];
      const quantidade = evento.target.elements["quantidade"];
      const valor = evento.target.elements["valor"];
      const existe = itens.find(elemento => elemento.nome === nome.value)

      //criar um objeto chamado itemAtual, contendo as propriedades "nome", "quantidade" e "valor".
      const itemAtual = {
        nome: nome.value,
        quantidade: quantidade.value,
        valor: valor.value
      };
      if (existe) {
        itemAtual.id = existe.id
        itemAtualizado(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        calculaTotal ();
      } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;
        //chama a função criaElemento(itemAtual), passando o objeto "itemAtual" como argumento. 
        criaElemento(itemAtual);
        //adicionado o  objeto ao array itens.
        itens.push(itemAtual);
        calculaTotal ();
        

      }
      

      //localStorage.setItem("itens", JSON.stringify(itens)), salva o array itens no armazenamento local do navegador, convertendo-o para uma string JSON.
      localStorage.setItem("itens", JSON.stringify(itens))
  
      nome.value = "" ;
      quantidade.value = "";
      valor.value = "";

      
    });
    calculaTotal ();

    function criaElemento(item) {
      const novoItem = document.createElement("li");
      novoItem.classList.add("item");
  
      const quantidadeItem = document.createElement("strong");
      quantidadeItem.innerHTML = item.quantidade;
      quantidadeItem.dataset.id = item.id;

       //adiciona o elemento <strong> como filho do elemento <li>, para que ele seja exibido dentro do item da lista.
      novoItem.appendChild(quantidadeItem);

      //adiciona o nome do item como conteúdo do elemento <li>. O operador += é usado para concatenar o nome do item ao conteúdo atual do elemento <li>.
      novoItem.innerHTML += item.nome + " | Unidade - R$:" + item.valor

      // adiciona um atributo personalizado chamado "data-valor" ao elemento <li>, com o valor da propriedade valor do objeto item.
      novoItem.setAttribute("data-valor", item.valor);

     // adiciona o elemento <li> criado à lista existente, que é assumida como uma variável global chamada "lista".
      lista.appendChild(novoItem);
      console.log(novoItem)
    }
    function itemAtualizado(item) {
      document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
    }
    function calculaTotal() {
      let total = 0;

      //obtém todos os elementos <li> que estão dentro do elemento lista. 
      const itens = lista.getElementsByTagName("li");

      for (let i = 0; i < itens.length; i++) {
          const item = itens[i];

          //obtém o elemento <strong> dentro do item atual e extrai o conteúdo desse elemento como uma string. Essa string é convertida para um número inteiro usando parseInt() e é atribuída à variável quantidade.
          const quantidade = parseInt(item.getElementsByTagName("strong")[0].innerHTML);

          //obtém o valor do atributo personalizado "data-valor" do item atual, usando o método getAttribute(). O valor é uma string, então é convertido para um número de ponto flutuante usando parseFloat() e atribuído à variável valor.
          const valor = parseFloat(item.getAttribute("data-valor"));

          //calcula o subtotal do item multiplicando a quantidade pelo valor.
          const subtotal = quantidade * valor;

          total += subtotal;
      }
      //atualiza o conteúdo do elemento identificado por totalElement com o valor total calculado. O método toFixed(2) é usado para formatar o valor com duas casas decimais.
      totalElement.textContent = `Total: R$${total.toFixed(2)}`;
  }
  
    
});