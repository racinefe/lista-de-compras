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
      const nome = evento.target.elements["nome"];
      const quantidade = evento.target.elements["quantidade"];
      const valor = evento.target.elements["valor"];
  
      const itemAtual = {
        nome: nome.value,
        quantidade: quantidade.value,
        valor: valor.value
      };
  
      criaElemento(itemAtual);
      itens.push(itemAtual);
      

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
      novoItem.appendChild(quantidadeItem);

      novoItem.innerHTML += item.nome

      novoItem.setAttribute("data-valor", item.valor);
  
      lista.appendChild(novoItem);
    }
    function calculaTotal () {
        let total = 0;

        const itens = lista.getElementsByTagName("li");

        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            const quantidade = parseInt(item.getElementsByTagName("strong")[0].innerHTML);
            const valor = parseFloat(item.getAttribute("data-valor"));
            const subtotal = quantidade * valor;
            total += subtotal;
        }
        totalElement.textContent = `Total: R$${total.toFixed(2)}`;
    }
    
  });