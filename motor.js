/* motor.js — navegação, progresso e renderização. Lê tudo de dados.js. */
(function () {
  "use strict";
  var KEY = "labirinto.v1";
  var $ = function (s) { return document.querySelector(s); };
  var estado = carregar();

  function vazio() {
    var c = {}; CASAS.forEach(function (x) { c[x.n] = [false, false, false]; });
    return { cams: c, vet: [false, false, false] };
  }
  function carregar() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.cams && s.vet) return s;
    } catch (e) {}
    return vazio();
  }
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(estado)); } catch (e) {} }

  /* ---------- ecos: cartas que se repetem entre posições ---------- */
  var indice = {};
  TIRAGENS.forEach(function (t) {
    t.cartas.forEach(function (c, i) { add(c.id, t.sigla + " · Casa " + (i + 1)); });
    add(t.oculta.id, t.sigla + " · Oculta");
  });
  function add(id, rot) { (indice[id] = indice[id] || []).push(rot); }
  function ecos(id, atual) {
    return (indice[id] || []).filter(function (r) { return r !== atual; });
  }

  /* ---------- estado das câmaras ---------- */
  function nRev(n) { return estado.cams[n].filter(Boolean).length; }
  function completa(n) { return nRev(n) === 3; }
  function nCompletas() { return CASAS.filter(function (c) { return completa(c.n); }).length; }
  function sinteseAberta() { return nCompletas() === CASAS.length; }
  function est(n) { var k = nRev(n); return k === 0 ? 0 : k === 3 ? 2 : 1; }

  /* ---------- mapa SVG ---------- */
  function desenharMapa() {
    var W = 900, H = 640, cx = 450, cy = 320, rx = 330, ry = 235, ns = "http://www.w3.org/2000/svg";
    var pts = CASAS.map(function (c, i) {
      var a = (90 + (i + 0.5) * 360 / 7) * Math.PI / 180;
      return { n: c.n, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
    });
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Mapa do labirinto com sete câmaras">';
    [1, 0.78, 0.56].forEach(function (k) {
      s += '<ellipse class="aneis" cx="' + cx + '" cy="' + cy + '" rx="' + rx * k + '" ry="' + ry * k + '"/>';
    });
    var abertas = sinteseAberta();
    pts.forEach(function (p) {
      s += '<line class="spoke' + (abertas ? ' on' : '') + '" x1="' + p.x + '" y1="' + p.y + '" x2="' + cx + '" y2="' + cy + '"/>';
    });
    var d = "M" + pts.map(function (p) { return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" L");
    s += '<path class="corr" d="' + d + '"/>';
    pts.forEach(function (p) {
      var c = CASAS[p.n - 1], e = est(p.n);
      s += '<g class="no s' + e + '" tabindex="0" role="button" data-n="' + p.n + '" aria-label="Câmara ' + p.n + ', ' + c.nome + ', ' + nRev(p.n) + ' de 3 cartas reveladas">' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="46"/>' +
        '<text class="num" x="' + p.x + '" y="' + (p.y + 10) + '">' + p.n + '</text>' +
        '<text class="rot" x="' + p.x + '" y="' + (p.y + 72) + '">' + c.nome + '</text></g>';
    });
    s += '<g class="centro' + (abertas ? ' on' : '') + '" tabindex="0" role="button" data-n="0" aria-label="Câmara da Síntese' + (abertas ? '' : ', fechada') + '">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="62"/>' +
      '<text x="' + cx + '" y="' + (cy - 4) + '">Câmara da</text><text x="' + cx + '" y="' + (cy + 16) + '">Síntese</text></g>';
    s += '<text x="' + (pts[0].x - 10) + '" y="' + (H - 6) + '" fill="#e8dcc0" font-size="15" text-anchor="end">Entrada ↗</text>';
    s += "</svg>";
    $("#svgWrap").innerHTML = s;
    $("#svgWrap").querySelectorAll("[data-n]").forEach(function (g) {
      var n = +g.dataset.n;
      g.addEventListener("click", function () { n ? abrirCamara(n) : irSintese(); });
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); n ? abrirCamara(n) : irSintese(); }
      });
    });
  }

  function desenharLista() {
    $("#lista").innerHTML = CASAS.map(function (c) {
      return '<li><button type="button" data-n="' + c.n + '">' + c.n + ' · ' + c.nome +
        ' <span class="e">' + nRev(c.n) + '/3</span></button></li>';
    }).join("");
    $("#lista").querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { abrirCamara(+b.dataset.n); });
    });
  }

  function desenharVetores() {
    $("#vetGrid").innerHTML = TIRAGENS.map(function (t, i) {
      var r = estado.vet[i];
      return '<button type="button" class="vetBtn" data-i="' + i + '"><strong>' + t.sigla + ' · carta oculta</strong>' +
        '<small>' + (r ? t.oculta.nome : 'Por revelar') + '</small></button>';
    }).join("");
    $("#vetGrid").querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { abrirVetor(+b.dataset.i); });
    });
  }

  function progresso() {
    var k = nCompletas();
    $("#progTxt").textContent = k + " de " + CASAS.length + " câmaras exploradas";
    $("#barra").style.width = (k / CASAS.length * 100) + "%";
  }

  /* ---------- cartas ---------- */
  function cartaAberta(c, t, rot, comVetor) {
    var e = ecos(c.id, rot);
    return '<div class="carta aberta"><span class="tg">' + t.sigla + ' · ' + c.num + '</span>' +
      '<span class="nm">' + c.nome + '</span>' +
      '<p>' + c.base + '</p><p><strong>Na casa:</strong> ' + (c.casa || "") + '</p>' +
      (comVetor ? '<p class="v">' + t.vetorLinha + '</p>' : '') +
      '<div class="tags">' + (c.fonte ? '<span class="tag">' + c.fonte + '</span>' : '') +
      e.map(function (r) { return '<span class="tag eco">Eco: ' + r + '</span>'; }).join("") +
      '</div></div>';
  }
  function cartaSelada(t, ti, n) {
    return '<button type="button" class="carta selada" data-ti="' + ti + '" data-n="' + n + '" aria-label="Revelar carta da ' + t.nome + '">' +
      '<span class="st" aria-hidden="true">✦</span><span>' + t.sigla + '</span><span>Revelar</span></button>';
  }

  /* ---------- diálogos ---------- */
  function mostrar(html) {
    var d = $("#dlg");
    d.innerHTML = html;
    d.querySelectorAll("[data-fechar]").forEach(function (b) { b.addEventListener("click", function () { d.close(); }); });
    if (!d.open) d.showModal();
  }
  $("#dlg").addEventListener("close", refrescar);

  function abrirCamara(n) {
    var c = CASAS[n - 1];
    var cartas = TIRAGENS.map(function (t, ti) {
      return estado.cams[n][ti]
        ? cartaAberta(t.cartas[n - 1], t, t.sigla + " · Casa " + n, true)
        : cartaSelada(t, ti, n);
    }).join("");
    var comp = completa(n)
      ? '<div class="comp"><strong>Leitura da câmara.</strong> ' + c.leitura + '<p class="nt">Nota: ' + c.nota + '</p></div>'
      : '<p class="fun">Revela as três cartas para ler a combinação desta câmara.</p>';
    mostrar('<div class="dlgTopo"><div><h2 id="dlgTitulo">Câmara ' + n + ' · ' + c.nome + '</h2><p class="fun">' + c.funcao + '</p></div>' +
      '<button class="fechar" type="button" data-fechar>Fechar</button></div>' +
      '<div class="cartas">' + cartas + '</div>' + comp +
      '<p><button type="button" id="revTodas">Revelar as três</button> ' +
      (n < 7 ? '<button type="button" id="seguinte">Câmara seguinte →</button>' : '') + '</p>');
    var d = $("#dlg");
    d.querySelectorAll(".selada").forEach(function (b) {
      b.addEventListener("click", function () {
        estado.cams[n][+b.dataset.ti] = true; guardar(); abrirCamara(n);
        var nb = $("#dlg .selada"); if (nb) nb.focus();
      });
    });
    $("#revTodas").addEventListener("click", function () { estado.cams[n] = [true, true, true]; guardar(); abrirCamara(n); });
    var sg = $("#seguinte");
    if (sg) sg.addEventListener("click", function () { abrirCamara(n + 1); });
  }

  function abrirVetor(i) {
    var t = TIRAGENS[i], o = t.oculta;
    estado.vet[i] = true; guardar();
    var e = ecos(o.id, t.sigla + " · Oculta");
    mostrar('<div class="dlgTopo"><div><h2 id="dlgTitulo">Vetor · ' + t.sigla + '</h2><p class="fun">' + t.baralho + '</p></div>' +
      '<button class="fechar" type="button" data-fechar>Fechar</button></div>' +
      '<div class="cartas">' +
      '<div class="carta aberta"><span class="tg">Carta oculta · ' + o.num + '</span><span class="nm">' + o.nome + '</span>' +
      '<p>' + o.base + '</p><p>' + o.casa + '</p><p class="v">' + o.ressalva + '</p>' +
      '<div class="tags">' + e.map(function (r) { return '<span class="tag eco">Eco: ' + r + '</span>'; }).join("") + '</div></div></div>' +
      '<div class="comp">' + t.vetorLinha + '</div>');
  }

  function irSintese() {
    if (!sinteseAberta()) {
      mostrar('<h2 id="dlgTitulo">Câmara da Síntese</h2><p>Ainda está fechada: explora primeiro as sete câmaras (' + nCompletas() + ' de 7). Se preferires ler tudo de seguida, usa o «Modo leitura linear».</p><button type="button" data-fechar>Fechar</button>');
      return;
    }
    $("#sintese").scrollIntoView();
  }

  /* ---------- síntese ---------- */
  function lis(a) { return "<ul>" + a.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"; }
  function htmlSintese() {
    var S = SINTESE, I = S.indeterminado;
    return '<div class="sinGrid">' +
      '<div class="sinBox"><h3>01 · Convergências</h3>' + lis(S.convergencias) + '</div>' +
      '<div class="sinBox"><h3>02 · Divergências</h3>' + lis(S.divergencias) + '</div>' +
      '<div class="sinBox"><h3>03 · Temas recorrentes</h3>' + lis(S.recorrentes) + '</div>' +
      '<div class="sinBox"><h3>04 · Possibilidades interpretativas</h3>' +
      S.possibilidades.map(function (p) { return "<p><strong>" + p.titulo + ".</strong> " + p.texto + "</p>"; }).join("") + '</div></div>' +
      '<div class="sinBox indet" style="margin-top:12px"><h3>05 · O Indeterminado</h3>' +
      '<p>' + ESTUDO.pergunta + '</p><div class="sinGrid">' +
      '<div><strong>Indicadores</strong>' + lis(I.indicadores) + '</div>' +
      '<div><strong>Contra-indicadores</strong>' + lis(I.contra) + '</div>' +
      '<div><strong>Indeterminado</strong>' + lis(I.indeterminado) + '</div></div>' +
      '<p><em>' + ESTUDO.aviso + '</em></p></div>';
  }

  function desenharSintese() {
    var ab = sinteseAberta();
    $("#sinBloq").textContent = ab ? "As três leituras reunidas. Não é um veredicto: é uma matriz de convergências, tensões e incertezas."
      : "Fechada. Explora as sete câmaras para a abrir (" + nCompletas() + "/7).";
    $("#sinConteudo").innerHTML = ab ? htmlSintese() : "";
  }

  /* ---------- modo leitura linear ---------- */
  function htmlLinear() {
    var h = "<h2>Leitura linear</h2><p>Todas as cartas e interpretações, sem jogo.</p>";
    CASAS.forEach(function (c) {
      h += '<h3>Casa ' + c.n + ' · ' + c.nome + ' <small>(' + c.funcao + ')</small></h3><div class="cartas">' +
        TIRAGENS.map(function (t) { return cartaAberta(t.cartas[c.n - 1], t, t.sigla + " · Casa " + c.n, true); }).join("") +
        '</div><div class="comp">' + c.leitura + '<p class="nt">Nota: ' + c.nota + '</p></div>';
    });
    h += "<h3>Os três vetores</h3><div class=\"cartas\">" + TIRAGENS.map(function (t) {
      var o = t.oculta;
      return '<div class="carta aberta"><span class="tg">' + t.sigla + ' · oculta ' + o.num + '</span><span class="nm">' + o.nome + '</span><p>' + o.base + '</p><p class="v">' + o.ressalva + '</p></div>';
    }).join("") + "</div><h2>Síntese</h2>" + htmlSintese();
    return h;
  }

  var leitura = false;
  $("#btnLeitura").addEventListener("click", function () {
    leitura = !leitura;
    this.setAttribute("aria-pressed", leitura);
    this.textContent = leitura ? "Voltar ao labirinto" : "Modo leitura linear";
    $("#leitura").hidden = !leitura;
    $("#vista-labirinto").hidden = leitura;
    if (leitura) $("#leitura").innerHTML = htmlLinear();
    window.scrollTo(0, 0);
  });
  $("#btnReset").addEventListener("click", function () {
    if (confirm("Reiniciar o progresso de exploração?")) { estado = vazio(); guardar(); refrescar(); }
  });

  function refrescar() { desenharMapa(); desenharLista(); desenharVetores(); progresso(); desenharSintese(); }

  $("#pergunta").textContent = ESTUDO.pergunta;
  $("#aviso").textContent = ESTUDO.aviso;
  $("#ver").textContent = ESTUDO.titulo + " · v" + ESTUDO.versao;
  refrescar();
})();
