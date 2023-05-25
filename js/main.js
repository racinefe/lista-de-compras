document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("novoItens");
    const lista = document.getElementById("lista");
    const totalElement = document.getElementById("total");
    const itens = JSON.parse(localStorage.getItem("itens")) || []

    itens.forEach(elemento => {
        criaElemento(elemento)
    });
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();

      //extrai os valores dos campos de entrada do formulário "nome", "quantidade" e "valor".
      const nome = evento.target.elements["nome"];
      const quantidade = evento.target.elements["quantidade"];
      const valor = evento.target.elements["valor"];

      //criar um objeto chamado itemAtual, contendo as propriedades "nome", "quantidade" e "valor".
      const itemAtual = {
        nome: nome.value,
        quantidade: quantidade.value,
        valor: valor.value
      };

      //chama a função criaElemento(itemAtual), passando o objeto "itemAtual" como argumento. 
      criaElemento(itemAtual);

      //adicionado o  objeto ao array itens.
      itens.push(itemAtual);

      //localStorage.setItem("itens", JSON.stringify(itens)), salva o array itens no armazenamento local do navegador, convertendo-o para uma string JSON.
      localStorage.setItem("itens", JSON.stringify(itens))
  
      nome.value = "";
      quantidade.value = "";
      valor.value = "";

      calculaTotal ();
    });
    calculaTotal ();
    function criaElemento(item) {
      const novoItem = document.createElement("li");
      novoItem.classList.add("item");
  
      const quantidadeItem = document.createElement("strong");
      quantidadeItem.innerHTML = item.quantidade;

       //adiciona o elemento <strong> como filho do elemento <li>, para que ele seja exibido dentro do item da lista.
      novoItem.appendChild(quantidadeItem);

      //adiciona o nome do item como conteúdo do elemento <li>. O operador += é usado para concatenar o nome do item ao conteúdo atual do elemento <li>.
      novoItem.innerHTML += item.nome

      // adiciona um atributo personalizado chamado "data-valor" ao elemento <li>, com o valor da propriedade valor do objeto item.
      novoItem.setAttribute("data-valor", item.valor);

     // adiciona o elemento <li> criado à lista existente, que é assumida como uma variável global chamada "lista".
      lista.appendChild(novoItem);
      console.log(novoItem)
    }
    
});