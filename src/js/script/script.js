const listaDeContatos = [
  {
    id: 1,
    nome: "Ana Maria",
    ultimaMensagem: "Olá vamos progamar",
    horárioUtimaMensagem: "20:20",
    avatar: "./src/assets/images/jessica--drew.png",
    conversas: [
      { mensagem: "Oi, eu sou o novo Progamador", tipo: "recebida", hora: "20:20" },
      { mensagem: "que legal, eu também sou", tipo: "enviada", hora: "20:20" },
      { mensagem: "Vamos codar juntos", tipo: "recebida", hora: "20:20" },
    ],
  },
  {
    id: 2,
    nome: "Maria",
    ultimaMensagem: "Eu sou um novo progamadora",
    horárioUtimaMensagem: "20:20",
    avatar: "./src/assets/images/emily--dorson.png",
    conversas: [
      { mensagem: "Oi, eu sou o novo Progamador", tipo: "recebida", hora: "20:20" },
      { mensagem: "que legal, eu também sou", tipo: "enviada", hora: "20:20" },
      { mensagem: "Vamos codar junto", tipo: "recebida", hora: "20:20" },
    ],
  },
  {
    id: 3,
    nome: "João",
    ultimaMensagem: "Olá vamos progamar",
    horárioUtimaMensagem: "20:20",
    avatar: "./src/assets/images/david--moore.png",
    conversas: [
      { mensagem: "Oi, eu sou o novo Progamador", tipo: "recebida", hora: "20:20" },
      { mensagem: "que legal, eu também sou", tipo: "enviada", hora: "20:20" },
      { mensagem: "Vamos codar juntos", tipo: "recebida", hora: "20:20" },
    ]
  },
  {
    id: 4,
    nome: "José",
    ultimaMensagem: "Tem café",
    horárioUtimaMensagem: "20:20",
    avatar: "./src/assets/images/greg--james.png",
    conversas: [
      { mensagem: "Poxa acho que vou fazer um café!", tipo: "recebida", hora: "20:20" },
      { mensagem: "que legal, eu também sou", tipo: "enviada", hora: "20:20" },
      { mensagem: "Tem café ai", tipo: "recebida", hora: "20:20" },
    ]
  },
];

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // console.log('Minha página carregou!');

  //Quando trabalahamos com ID utilizamos o #
  //Quando trabalahamos com Class utilizamos o .
let abaFocada = true;
const tituloOriginal = document.title;

  const inputMsg = document.querySelector('#inputMensagem');

  inputMsg.placeholder = "Digite a sua Mensagem";

  const buttons = document.querySelectorAll(".cursor--pointer");
  //console.log(buttons);

  const buttonSend = document.querySelector(".cursor--pointer[src*='send']");
  //console.log(buttonSend);

  let listaMensagens = document.querySelector(".div--messages");

  //console.log(listaMensagens);

  const inputBuscaContato = document.querySelector(".div--search input[type='search']");
  //console.log(inputBuscaContato);

  const inputBuscaMenssagem = document.getElementById("search--message");
  //console.log(inputBuscaMenssagem);

  inputBuscaMenssagem.addEventListener("input", () => {
    const termoDeBusca = inputBuscaMenssagem.value;
    console.log(`O termo de busca é: ${termoDeBusca}`);
    buscarMensagem(termoDeBusca);
  });

  inputBuscaContato.addEventListener("input", () => {
    const termoDeBusca = inputBuscaContato.value;
    console.log(`O termo de busca é: ${termoDeBusca}`);
    carregarContatos(termoDeBusca);
  });
  //const listaEmoji = ["&#128507;", "&#128525;", "&#128525;", "&#128527;", "&#128536;"];
  const listaEmoji2 = ["🗻", "😍", "😍", "😏", "😘"];

  listaMensagens.addEventListener("click", (event) => {
    if (event.target.classList.contains("emojis--reaction")) {
      const mensagem = event.target.closest(".message");
      abrirMenuReacao(mensagem);
    }
  });
  // let => 

  window.addEventListener("blur", () => {
    abaFocada = false;
    document.title = "O Chat saiu";
  });

  window.addEventListener("focus", () => {
    abaFocada = true;
    document.title = "O chat voltou"
  });

  function abrirMenuReacao(mensagem) {
    console.log(mensagem);
   
    const areaEmojis = mensagem.querySelector(".area--emojis");
    //areaEmojis.innerHTML = "";
    //console.log(mensagem);


    listaEmoji2.forEach((emoji) => {
      const emojiElement = document.createElement("span");
      
      emojiElement.classList.add("emoji--opcao", "cursor--pointer");
      emojiElement.textContent = emoji;
      
      emojiElement.addEventListener("click", () => {
        alternarEmoji(mensagem, emoji);
      });
      areaEmojis.appendChild(emojiElement);
      
    });
  };
  function alternarEmoji(mensagem, emoji) {
    let reacaoExistente = mensagem.querySelector(".emoji--selecionado");
    
    if (reacaoExistente && reacaoExistente.textContent.includes(emoji)) {
      reacaoExistente.textContent = reacaoExistente.textContent.replace(emoji,"");
      //const texto = "";
      //const texto2 = " ";

      if (reacaoExistente.textContent.trim() === ""){
        reacaoExistente.remove();
      }
    } else{
     if(!reacaoExistente){
      reacaoExistente = document.createElement("div");
      reacaoExistente.classList.add("emoji--selecionado");
      mensagem.appendChild(reacaoExistente);
    };
      reacaoExistente.textContent += emoji;
    };
  };

  const respostaParaOBot = [
    "olá, tudo bem?",
    "Como você está?",
    "Qual seu nome?",
    "Meu nome é O BOT",
    "Eu faço curso do Novo Progamador",
    "Você quer conversar comigo?"
  ];
  // includes => verifica se existe o termo dentro do array

  function buscarMensagem(termo) {
    let encontrouMensagem = false;
    //console.log(listaMensagens);
    const mensagemElement = document.querySelectorAll(".message");

    mensagemElement.forEach((mensagem) => {
      const textoOriginal = mensagem.innerText;
      const textoNormalizado = textoOriginal.toLowerCase();
      const termoNormalizado = termo.toLowerCase();


      if (textoNormalizado.includes(termoNormalizado)) {
        encontrouMensagem = true;
        const textoDestacado = textoOriginal.replace(
          new RegExp(`(${termo})`, "gi"),
          "<span class='highlight'>$1</span>"
        );
        console.log(textoDestacado);
        mensagem.innerHTML = textoDestacado;
        mensagem.style.display = "block";
      } else {
        mensagem.style.display = "none";
      }

    });
    if (!encontrouMensagem) {
      listaMensagens.innerHTML = `<div>Não houve resultados</div>`;
    } else if (termo === "") {
      mensagemElement.forEach((mensagem) => {
        mensagem.style.display = "block";
        mensagem.innerHTML = mensagem.innerText;
      });
    }
  };

  function enviarMensagem() {
    const texto = inputMsg.value.trim();
    if (texto === "") {
      alert("Não possui nada ainda");
    } else {
      const mensagemRenderizada = renderizarMensagem("enviada", texto, "20:20");
      listaMensagens.appendChild(mensagemRenderizada);
      inputMsg.value = "";

      // setTimeout => Execulta alguma coisa uma unica vez, após um intervalo de tempo. 
      // setInterval => Execulta alguma coisa em um intervalo de tempo mais ele fica requisitando até ser finalizado 
      setTimeout(responderMensagem, 3000);
    }
  };
  function responderMensagem() {
    const posicao = Math.floor(Math.random() * respostaParaOBot.length);
    const mensagemDoBot = respostaParaOBot[posicao];
    const mensagemRenderizada = renderizarMensagem("recebida", mensagemDoBot, "21:10");
    listaMensagens.appendChild(mensagemRenderizada);
    notificarNovaMensagem();
  };

  buttonSend.addEventListener("click", () => {
    enviarMensagem();
  });

  inputMsg.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      enviarMensagem();
    }
  });

  function renderizarMensagem(tipo, mensagem, horario) {
    const divMensagem = document.createElement("div");
    const direcao = tipo === "enviada" ? "end" : "start";
    const stylesDiv = tipo === "enviada" ? "you" : "other";
    divMensagem.classList.add(
      "flex",
      "flex--direction--row",
      "width--100",
      `justify--content--${direcao}`,
      "fade-in"
    );
    divMensagem.innerHTML = `
     
        <div class="flex flex--direction--column message ${stylesDiv} fade-in">
            <div class="flex--6">
                ${mensagem}
            </div>
            <div class="flex--1 flex flex--direction--row justify--content--end align--items--center font--size--12 infos--message">
            <div class="emojis--reaction cursor--pointer">&#128525;</div>
                <div class= "area--emojis"></div>
                <img src="./src/assets/icons/heart.svg" />
                <div>${horario}</div>
                <img src="./src/assets/icons/viewed.svg" />
            </div>    
        </div>
    `;
    return divMensagem;
  };

  function carregarMensagemContato(index) {
    const contato = listaDeContatos[index];
    listaMensagens.innerHTML = ""; // Limpa as mensagens anteriores
    contato.conversas.forEach((conversa) => {
      const mensagemRenderizada = renderizarMensagem(
        conversa.tipo,
        conversa.mensagem,
        conversa.hora);
      listaMensagens.appendChild(mensagemRenderizada);
    });
  };

  function carregarContatos(filtro = "") {
    const divContatosElements = document.querySelector(".div--contacts")
    divContatosElements.innerHTML = ""; // Limpa os contatos anteriores

    // toLowerCase() => transforma tudo em minusculo
    // toUpperCase() => transforma tudo em maiusculo

    // length, find, reduce, map, filter

    const contatosFiltrados = listaDeContatos.filter((contato) =>
      contato.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (contatosFiltrados.length === 0) {
      divContatosElements.innerHTML = `<div><span>Contato não Encontrado</span></div>`;
      return;
    };

    contatosFiltrados.forEach((contato, index) => {

      //console.log(contato);
      //innerText e innerHTML
      const divParentElements = document.createElement("div");
      divParentElements.classList.add("flex", "area--contact", "fade-in");

      divParentElements.innerHTML = `
     
                        <div class="flex justify--content--center align--items--center flex--1">
                            <img class="avatar--left--bar" src="${contato.avatar}" />
                        </div>

                        <div class="flex flex--direction--column justify--content--center flex--3">
                            <div class="flex align--items--center infos--contact">
                                <div class="font--family font--weight--bold">${contato.nome}</div>
                            </div>

                            <div class="last--message">${contato.ultimaMensagem}</div>
                            
                        </div>

                        <div class="flex flex--direction--column justify--content--center align--items--end flex--1 div--last--messages--info">
                            <div class="hour--last--message">${contato.horárioUtimaMensagem}</div>
                        </div>
                    
      `;

      divParentElements.addEventListener("click", () => {
        carregarMensagemContato(index);
      });

      divContatosElements.appendChild(divParentElements);

    });

  };

  function notificarNovaMensagem() {
    const somNotificacao = new Audio("./src/assets/audio/livechat.mp3");
    somNotificacao.play();
    let contador = 0;

    const intervalo = setInterval(() => {
      document.title =
       contador % 2 === 0 ? `(${contador})Nova Mensagem` : tituloOriginal;
      //contador = contador + 1;
      //contador +=1;

      // 1 / 2 = 0 

      contador++;
      // if(!abaFocada){
      //   document.title = "Mensagem chegando";
      // }
     
      if (abaFocada){
        clearInterval(intervalo);
        document.title = tituloOriginal;
      }
    }, 1000);
  };

  setTimeout(() => {
    carregarContatos();
  }, 2.500);

  // div--contacts
});
