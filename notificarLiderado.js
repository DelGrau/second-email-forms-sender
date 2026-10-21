function notificarLiderado(e) {
  // ATENÇÃO: Coloque aqui o título EXATO da pergunta onde o líder informa o e-mail do liderado
  var tituloPerguntaEmail = "E-mail do Liderado"; 
  
  var emailDestino = "";
  var corpoEmail = "Olá! \n\nSegue a cópia da sua avaliação/registro preenchido pela liderança:\n\n";
  
  // Pega todas as respostas enviadas nesta submissão
  var respostas = e.response.getItemResponses();
  
  for (var i = 0; i < respostas.length; i++) {
    var pergunta = respostas[i].getItem().getTitle();
    var resposta = respostas[i].getResponse();
    
    // Verifica se a pergunta atual é a que contém o e-mail do liderado
    if (pergunta === tituloPerguntaEmail) {
      emailDestino = resposta;
    } else {
      // Monta o corpo do e-mail com as demais perguntas e respostas
      corpoEmail += "■ " + pergunta + ":\n" + resposta + "\n\n";
    }
  }
  
  // Se encontrou um e-mail válido, dispara a mensagem
  if (emailDestino !== "" && emailDestino.indexOf("@") !== -1) {
    MailApp.sendEmail({
      to: emailDestino,
      subject: "Cópia do seu formulário de feedback",
      body: corpoEmail
    });
  }
}