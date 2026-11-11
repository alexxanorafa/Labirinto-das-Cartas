/* dados.js — conteúdo do Estudo I. O motor (motor.js) não contém textos. */
const ESTUDO = {
  titulo: "Estudo I — O Vínculo",
  versao: "1.0",
  pergunta:
    "Estudo de caso: três leituras sobre a mesma relação, com a pergunta de fundo sobre vínculo, reserva e desconhecimento.",
  aviso:
    "Esta experiência não determina factos, comportamentos ou intenções de terceiros. Mostra como uma leitura simbólica se constrói — e onde deixa de responder.",
};

const CASAS = [
  { n: 1, nome: "O Presente", funcao: "Momento atual da relação",
    leitura: "Agrado e encanto (Buquê), maturidade e sensualidade (Lírios) e contenção (4 de Ouros). O momento atual é agradável e com atração, mas guardado: há prazer na ligação sem exposição aberta.",
    nota: "Atração e sensualidade não identificam terceiros nem exclusividade." },
  { n: 2, nome: "O Consulente", funcao: "Como o consulente se encontra na relação",
    leitura: "Um ciclo que se transforma (Caixão), uma condição de isolamento ou autonomia (Torre) e vontade de construir (3 de Ouros). O consulente parece sair de uma posição mais solitária e inclinar-se para edificar algo a dois.",
    nota: "Disposição para construir não é o mesmo que relação já estabelecida." },
  { n: 3, nome: "A Outra Pessoa", funcao: "Como a outra pessoa se encontra na relação",
    leitura: "O vínculo aparece na posição da outra pessoa (Aliança, que regressa como vetor da Tiragem II), acompanhado de mudança (Cegonha) e de reserva e introspeção (Eremita). Associada à ideia de ligação, mas de forma lenta e pouco explícita.",
    nota: "Estar associada ao tema do vínculo não prova intenção de compromisso nem exclusividade." },
  { n: 4, nome: "O Apoio", funcao: "Aspetos positivos que ajudam a relação",
    leitura: "Esperança e orientação (Estrelas), contacto e conversa (Pássaros) e afinidade com escolha afetiva (Amantes). É a câmara mais favorável: o que ajuda é a atração, a possibilidade de comunicar e a esperança de uma escolha que aproxime.",
    nota: "Potencial de escolha não é escolha já feita." },
  { n: 5, nome: "O Desafio", funcao: "Dificuldades da relação",
    leitura: "O que não se sabe (Livros), uma figura feminina (Cigana) e a incerteza emocional (Lua). A dificuldade é de conhecimento: o consulente não tem uma visão suficientemente clara da realidade da relação, e a imaginação pode preencher os vazios.",
    nota: "A Cigana depende da convenção adotada (a própria pessoa? uma influência feminina?). Não é automaticamente uma terceira pessoa." },
  { n: 6, nome: "O Futuro", funcao: "Tendência de evolução da relação",
    leitura: "Perseverança ou bloqueio (Montanha), força e contrariedades (Chicote) e necessidade de esclarecer (Pajem de Espadas). Um caminho que exige tempo, intensidade e comunicação; pode haver tensão pelo caminho.",
    nota: "Não é sentença de bloqueio nem garantia de consolidação." },
  { n: 7, nome: "O Conselho", funcao: "Como o consulente pode agir",
    leitura: "Força mental (Chicote), orientada pela esperança (Estrelas) e aplicada com trabalho consistente (8 de Ouros): construir com persistência, sem transformar a energia mental em conflito ou insistência improdutiva.",
    nota: "O Chicote repete-se: é conselho na Tiragem I e futuro na Tiragem II." },
];

const TIRAGENS = [
  { id: "bc1", sigla: "BC I", nome: "Tiragem I", baralho: "Baralho Cigano · P. Jarimba",
    vetorLinha: "Sob a Árvore, tudo tem raiz e tempo: nada é passageiro; amadurece devagar, ou demora a desenraizar.",
    oculta: { id: "bc-05", num: "05", nome: "A Árvore",
      base: "Raízes, crescimento lento, vitalidade, continuidade e tempo.",
      casa: "Vetor da Tiragem I: a dinâmica está ancorada em algo duradouro e exige paciência.",
      ressalva: "Pode ler-se como vínculo profundo, mas também como uma ilusão que se enraizou." },
    cartas: [
      { id: "bc-09", num: "09", nome: "O Buquê", base: "Agrado, encanto, simpatia, gentileza, atração.", casa: "O momento é de cortesia e harmonia, com uma base de conforto que o tempo foi consolidando.", fonte: "indicado" },
      { id: "bc-08", num: "08", nome: "O Caixão", base: "Fim de ciclo, transformação profunda, perda, transmutação.", casa: "O consulente vive um fecho ou uma metamorfose interior; algo antigo tem de terminar.", fonte: "a validar" },
      { id: "bc-25", num: "25", nome: "A Aliança", base: "Vínculo, união, compromisso, pacto, continuidade.", casa: "A outra pessoa surge associada à ideia de laço e de pacto, mantendo a estrutura da ligação.", fonte: "a validar" },
      { id: "bc-16", num: "16", nome: "As Estrelas", base: "Esperança, inspiração, orientação, proteção.", casa: "Uma visão de futuro e uma proteção subtil sustentam a relação.", fonte: "a validar" },
      { id: "bc-26", num: "26", nome: "Os Livros", base: "O que não se sabe, segredo, estudo, informação retida.", casa: "A dificuldade central é a informação guardada: dimensões que cada um desconhece do outro.", fonte: "a validar" },
      { id: "bc-21", num: "21", nome: "A Montanha", base: "Perseverança, força, equilíbrio, solidez, justiça; também obstáculo.", casa: "Caminho de esforço: os obstáculos são sólidos e não se resolvem com pressa.", fonte: "indicado" },
      { id: "bc-11", num: "11", nome: "O Chicote", base: "Poder mental, magia, força, discórdias, contrariedades.", casa: "Conselho de agir com firmeza mental e clarear a ambiguidade, sem alimentar discórdia.", fonte: "indicado" },
    ] },
  { id: "bc2", sigla: "BC II", nome: "Tiragem II", baralho: "Baralho Cigano · P. Jarimba",
    vetorLinha: "Sob a Aliança, cada carta é lida em relação ao que liga, ou pretende ligar, as duas pessoas.",
    oculta: { id: "bc-25", num: "25", nome: "A Aliança",
      base: "Vínculo, união, compromisso, pacto, continuidade.",
      casa: "Vetor da Tiragem II: o tema de fundo passa do crescimento para a ligação.",
      ressalva: "Tema de vínculo não é compromisso assumido." },
    cartas: [
      { id: "bc-30", num: "30", nome: "Os Lírios", base: "Maturidade, tranquilidade, harmonia, sensualidade, sexualidade.", casa: "O presente tem serenidade e uma dimensão sensual.", fonte: "a validar" },
      { id: "bc-19", num: "19", nome: "A Torre", base: "Isolamento, autonomia, distância, estrutura, reserva.", casa: "O consulente está numa posição de autonomia ou recolhimento.", fonte: "a validar" },
      { id: "bc-17", num: "17", nome: "A Cegonha", base: "Mudança, renovação, passagem para nova condição.", casa: "A outra pessoa está associada a uma mudança de posição.", fonte: "a validar" },
      { id: "bc-12", num: "12", nome: "Os Pássaros", base: "Comunicação, conversas, contacto, cumplicidade.", casa: "A conversa e o contacto são o que mais ajuda.", fonte: "a validar" },
      { id: "bc-29", num: "29", nome: "A Cigana", base: "Figura feminina, a pessoa; depende da convenção.", casa: "Uma presença feminina ou a identidade da própria pessoa pesa no que dificulta.", fonte: "a validar" },
      { id: "bc-11", num: "11", nome: "O Chicote", base: "Poder mental, magia, força, discórdias, contrariedades.", casa: "O futuro traz intensidade e contrariedades a gerir.", fonte: "indicado" },
      { id: "bc-16", num: "16", nome: "As Estrelas", base: "Esperança, inspiração, orientação, proteção.", casa: "O conselho é deixar a esperança orientar a conduta.", fonte: "a validar" },
    ] },
  { id: "tarot", sigla: "Tarot", nome: "Tiragem III", baralho: "Tarot",
    vetorLinha: "Sob o Cavaleiro de Copas, o fundo é afetivo: aproximação, convite — e a imagem romântica que se constrói de alguém.",
    oculta: { id: "t-cc", num: "C. Copas", nome: "Cavaleiro de Copas",
      base: "Aproximação, convite, expressão de sentimentos, romantismo, ideal afetivo.",
      casa: "Vetor da Tiragem III: a dimensão subjacente é emocional e romântica.",
      ressalva: "Tanto pode ser aproximação real como expectativa romântica." },
    cartas: [
      { id: "t-4o", num: "4", nome: "4 de Ouros", base: "Conservação, contenção, segurança, posse.", casa: "A relação é protegida e guardada, pouco aberta.", fonte: "a validar" },
      { id: "t-3o", num: "3", nome: "3 de Ouros", base: "Construção, cooperação, trabalho conjunto.", casa: "O consulente quer edificar algo com outra pessoa.", fonte: "a validar" },
      { id: "t-ix", num: "IX", nome: "O Eremita", base: "Introspeção, prudência, reserva, lentidão.", casa: "A outra pessoa mantém-se recolhida e pouco expressiva.", fonte: "a validar" },
      { id: "t-vi", num: "VI", nome: "Os Amantes", base: "Atração, afinidade, desejo, escolha afetiva.", casa: "Afinidade e atração ajudam, e coloca-se a questão de escolher.", fonte: "a validar" },
      { id: "t-xviii", num: "XVIII", nome: "A Lua", base: "Emoções, imaginação, incerteza, medos, o oculto.", casa: "Dificulta a incerteza e a mistura entre percepção e fantasia.", fonte: "a validar" },
      { id: "t-pe", num: "Pajem", nome: "Pajem de Espadas", base: "Vigilância, curiosidade, questionamento, procura de informação.", casa: "O futuro pede observação e esclarecimento pela palavra.", fonte: "a validar" },
      { id: "t-8o", num: "8", nome: "8 de Ouros", base: "Dedicação, aperfeiçoamento, persistência, construção progressiva.", casa: "Aconselha trabalho consistente e paciente.", fonte: "a validar" },
    ] },
];

const SINTESE = {
  convergencias: [
    "Vínculo e continuidade: Aliança (I e vetor II), Lírios, Montanha, 4 e 8 de Ouros.",
    "Reserva e desconhecimento: Livros, Torre, Eremita, Lua.",
    "Eixo afetivo: Buquê, Estrelas, Amantes, Cavaleiro de Copas.",
    "Mudança: Caixão, Cegonha e, em outra chave, o 3 e 8 de Ouros.",
  ],
  divergencias: [
    "O vínculo é afirmado (Aliança) mas expresso com reserva (Eremita, 4 de Ouros).",
    "A Montanha e o Chicote indicam obstáculo e contrariedade; as Estrelas e os Amantes indicam esperança e escolha.",
    "A Tiragem III coloca a dificuldade na imaginação e emoção (Lua); as duas primeiras na informação em falta (Livros).",
  ],
  recorrentes: [
    "O Chicote: conselho na Tiragem I, futuro na Tiragem II.",
    "As Estrelas: apoio na Tiragem I, conselho na Tiragem II.",
    "A Aliança: casa 3 na Tiragem I, vetor da Tiragem II.",
    "Repetição é tema recorrente, não prova independente: o mesmo leitor e a mesma pergunta podem reforçar um padrão.",
  ],
  possibilidades: [
    { titulo: "Um vínculo em construção", texto: "Aliança, Cegonha, Amantes e Cavaleiro de Copas sugerem aproximação e potencial de compromisso, ainda reservado." },
    { titulo: "Uma ilusão enraizada", texto: "Buquê sob a Árvore, o Caixão como ciclo por fechar, os Livros e a Lua apontam para o consulente ter pouca consciência da situação e para a idealização: um encanto antigo que ocupa o lugar do conhecimento." },
    { titulo: "Ambas em tensão", texto: "A relação pode ter ao mesmo tempo atração real e informação em falta; as cartas não escolhem entre estas leituras." },
  ],
  indeterminado: {
    indicadores: [
      "Atração e sensualidade (Buquê, Lírios, Amantes).",
      "Intensidade física ou mental (Chicote).",
      "Vínculo e mudança na posição da outra pessoa (Aliança, Cegonha).",
    ],
    contra: [
      "Reserva e recolhimento na posição da outra pessoa (Eremita, 4 de Ouros).",
      "Nenhuma carta identifica claramente um terceiro.",
    ],
    indeterminado: [
      "Livros + Cigana + Lua deixam em aberto uma parte da realidade íntima da outra pessoa.",
      "Compatibilidade simbólica com reserva não é prova de exclusividade.",
      "As cartas não permitem verificar o comportamento íntimo de ninguém; para isso é preciso diálogo e informação fiável.",
    ],
  },
};
