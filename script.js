const dataCanvas = document.getElementById("meuEstado");
const dataCtx = dataCanvas.getContext("2d");
const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");
const graficoCanvas = document.getElementById("meuGrafico");
const graficoCtx = graficoCanvas.getContext("2d");
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;
const raio = 100;

let dadosNMNA, dadosYMNA, dadosNMYA, dadosYMYA 

let state = "NMNA"; 
let counter = -1;
let history = "";
let contadorGrafico = 0;
let intervaloGrafico; 
let violations = 0; // Initialize violations variable
let delayValue = 0; // New variable to hold the value from the 'valueDelay' input

const centros = [ 
    { x: centroX - raio, y: centroY - raio, nome: "No Mig + No Attack" },
    { x: centroX + raio, y: centroY - raio, nome: "Mig + No Attack" },
    { x: centroX + raio, y: centroY + raio, nome: "No Mig + Attack" },
    { x: centroX - raio, y: centroY + raio, nome: "Mig + Attack" }
];

function criarGradiente(x1, y1, x2, y2, cor1, cor2) {
    const gradiente = ctx.createLinearGradient(x1, y1, x2, y2);
    gradiente.addColorStop(0, cor1);
    gradiente.addColorStop(1, cor2);
    return gradiente;
}

function desenharCirculo1(highlight) {
    const centro = centros[0];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#FFFFFF", "#D3D3D3");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "16px Roboto";

    const linha1 = "No migration";
    const linha2 = "No attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }

    //ctx.fillText(centro.nome, centro.x, centro.y);
}

function desenharCirculo2(highlight) {
    const centro = centros[1];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#8B0000", "#FFC0CB");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const linha1 = "No migration";
    const linha2 = "Attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

function desenharCirculo3(highlight) {
    const centro = centros[2];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#00008B", "#ADD8E6");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const linha1 = "Migration";
    const linha2 = "No attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

function desenharCirculo4(highlight) {
    const centro = centros[3];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#D3D3D3", "#808080");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const linha1 = "Migration";
    const linha2 = "Attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

let meuChart;
let labels = [];
let mediaData = [];
let mediaMaisDesvioData = [];
let mediaMenosDesvioData = [];
let delayValueData = [];
let violationData = [];

function atualizarGrafico(dados) {
    // 1. Verificar se os dados existem
    if (!dados) {
        console.warn("Dados não fornecidos.");
        return;
    }

    // 2. Verificar se os dados não estão vazios
    if (dados.length === 0) {
        console.warn("Dados vazios.");
        return;
    }

    // 3. Verificar a estrutura dos dados
    for (const ponto of dados) {
        if (typeof ponto !== 'object' || ponto === null) {
            console.warn("Estrutura de dados inválida: ponto não é um objeto.");
            return;
        }
        if (!('data' in ponto) || !('media' in ponto) || !('desvioPadrao' in ponto)) {
            console.warn("Estrutura de dados inválida: propriedades ausentes.");
            return;
        }
        if (typeof ponto.data !== 'number' || typeof ponto.media !== 'number' || typeof ponto.desvioPadrao !== 'number') {
            console.warn("Estrutura de dados inválida: valores não são números.");
            return;
        }
        if (isNaN(ponto.data) || isNaN(ponto.media) || isNaN(ponto.desvioPadrao)) {
            console.warn("Estrutura de dados inválida: valores NaN.");
            return;
        }
    }

    const pontoAleatorio = dados[Math.floor(Math.random() * dados.length)];

    console.log("entrei atualiza grafico");

    if (pontoAleatorio.maxV > delayValue) {
        violations++;
        updateViolationsDisplay();
    }

    labels.push(`${contadorGrafico}`);
    mediaData.push(pontoAleatorio.media);
    mediaMaisDesvioData.push(pontoAleatorio.maxV);
    mediaMenosDesvioData.push(pontoAleatorio.minV);
    //mediaMaisDesvioData.push(pontoAleatorio.media + pontoAleatorio.desvioPadrao);
    //mediaMenosDesvioData.push(pontoAleatorio.media - pontoAleatorio.desvioPadrao);
    delayValueData.push(delayValue);
    violationData.push(violations);


    if (meuChart) {
        meuChart.data.labels = labels;
        meuChart.data.datasets[0].data = mediaData;
        meuChart.data.datasets[1].data = mediaMaisDesvioData;
        meuChart.data.datasets[2].data = mediaMenosDesvioData;
        meuChart.update();
    } else {
        meuChart = new Chart(graficoCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mean',
                    data: mediaData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, {
                    label: 'Maximum',
                    data: mediaMaisDesvioData,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }, {
                    label: 'Minimum',
                    data: mediaMenosDesvioData,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                }]
            },
            options: {
                scales: { y: { beginAtZero: true } },
                plugins: {
                    title: { display: true, text: `t = ${contadorGrafico}` }
                }
            }
        });
    }
}

function gerarTexto(history) {
    return history;
}

function baixarTexto(texto, nomeArquivo) {
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function gerarCSV(labels, mediaData, mediaMaisDesvioData, mediaMenosDesvioData, delayValueData, violationData) {
    let csv = "Labels,Media,Max,Min,Delay,AccumulatedViolations\n";
    for (let i = 0; i < labels.length; i++) {
        csv += `${labels[i]},${mediaData[i]},${mediaMaisDesvioData[i]},${mediaMenosDesvioData[i]}, ${delayValueData[i]}, ${violationData[i]}\n`;
    }
    return csv;
}

function baixarCSV(csv, nomeArquivo) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Get the input element for delayValue
const valueDelayInput = document.getElementById("valueDelay");

document.getElementById("play").addEventListener("click", function() {
    console.log("Play button clicked!");
    if (!intervaloGrafico) { // Verifica se o intervalo já está em execução
        intervaloGrafico = setInterval(function() {
            contadorGrafico++;
            atualizarTituloGrafico();
            if (state === "NMNA") {
                atualizarGrafico(dadosNMNA);
            }
            else if (state === "NMYA") {
                atualizarGrafico(dadosNMYA)
            } else if (state === "YMYA"){
                atualizarGrafico(dadosYMYA)
            }  else if (state === "YMNA"){
                atualizarGrafico(dadosYMNA)
            } 
        }, 1000); // Atualiza a cada segundo (1000 ms)
        if (valueDelayInput) {
            valueDelayInput.disabled = true; // Disable the input field
        }
    }
});

document.getElementById("pause").addEventListener("click", function() {
    console.log("Pause clicked!");
    clearInterval(intervaloGrafico); // Interrompe o intervalo
    intervaloGrafico = null; // Limpa o ID do intervalo
    if (valueDelayInput) {
        valueDelayInput.disabled = false; // Enable the input field
    }
});

document.getElementById("stop").addEventListener("click", function() {
    console.log("Stop clicked!");
    clearInterval(intervaloGrafico); // Interrompe o intervalo
    intervaloGrafico = null; // Limpa o ID do intervalo
    contadorGrafico = 0; // Reinicia o contador
    atualizarTituloGrafico(); // Atualiza o título com o valor inicial
    baixarCSV(gerarCSV(labels, mediaData, mediaMaisDesvioData, mediaMenosDesvioData, delayValueData, violationData), "simulation_output.csv");
    baixarTexto(gerarTexto(history), "history.txt");
    if (valueDelayInput) {
        valueDelayInput.disabled = false; // Enable the input field
    }
    violations = 0;
    updateViolationsDisplay();
});


// Inicialização do estado dos botões
const botoes = {
    startMigration: true,
    stopMigration: false,
    startAttack: true,
    stopAttack: false
};


function atualizarTituloGrafico() {
    if (meuChart && typeof meuChart.update === 'function') {
        meuChart.options.plugins.title.text = `t = ${contadorGrafico}`;
        meuChart.update('none');
    }
}


// Function to update the violations display
function updateViolationsDisplay() {
    document.getElementById("violationsDisplay").textContent = violations;
}


// Função para atualizar o estado dos botões
function atualizarBotoes() {
    document.getElementById("startMigration").disabled = !botoes.startMigration;
    document.getElementById("stopMigration").disabled = !botoes.stopMigration;
    document.getElementById("startAttack").disabled = !botoes.startAttack;
    document.getElementById("stopAttack").disabled = !botoes.stopAttack;
}

// Manipuladores de eventos de clique para os botões
document.getElementById("startMigration").addEventListener("click", function() {
    botoes.startMigration = false;
    botoes.stopMigration = true;
    atualizarBotoes();
    console.log("Start Migration clicado!");
    redesenharCirculos(true, false);

});

document.getElementById("stopMigration").addEventListener("click", function() {
    botoes.startMigration = true;
    botoes.stopMigration = false;
    atualizarBotoes();
    console.log("Stop Migration clicado!");
    redesenharCirculos(true, false);
});

document.getElementById("startAttack").addEventListener("click", function() {
    botoes.startAttack = false;
    botoes.stopAttack = true;
    atualizarBotoes();
    console.log("Start Attack clicado!");
    redesenharCirculos(false, true);

});

document.getElementById("stopAttack").addEventListener("click", function() {
    botoes.startAttack = true;
    botoes.stopAttack = false;
    atualizarBotoes();
    console.log("Stop Attack clicado!");
    redesenharCirculos(false, true);
});


// Função para redesenhar todos os círculos
function redesenharCirculos(mig, attk) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    if (mig === true) {
        if (state === "NMNA") {
            desenharCirculo1(false);
            desenharCirculo2(false);
            desenharCirculo3(true);
            desenharCirculo4(false);
            state = "YMNA";
            printState(state);
        }
        else if (state === "NMYA") {
            desenharCirculo1(false);
            desenharCirculo2(false);
            desenharCirculo3(false);
            desenharCirculo4(true);
            state = "YMYA";
            printState(state);

        } else if (state === "YMYA"){
            desenharCirculo1(false);
            desenharCirculo2(true);
            desenharCirculo3(false);
            desenharCirculo4(false);
            state = "NMYA";
            printState(state);
        }  else if (state === "YMNA"){
            desenharCirculo1(true);
            desenharCirculo2(false);
            desenharCirculo3(false);
            desenharCirculo4(false);
            state = "NMNA";
            printState(state);
        } 
     
    }

    if (attk === true) {
        if (state === "NMNA") {
            desenharCirculo1(false);
            desenharCirculo2(true);
            desenharCirculo3(false);
            desenharCirculo4(false);
            state = "NMYA";
            printState(state);
        }
        else if (state === "NMYA") {
            desenharCirculo1(true);
            desenharCirculo2(false);
            desenharCirculo3(false);
            desenharCirculo4(false);
            state = "NMNA";
            printState(state);

        } else if (state === "YMYA"){
            desenharCirculo1(false);
            desenharCirculo2(false);
            desenharCirculo3(true);
            desenharCirculo4(false);
            state = "YMNA";
            printState(state);
        }  else if (state === "YMNA"){
            desenharCirculo1(false);
            desenharCirculo2(false);
            desenharCirculo3(false);
            desenharCirculo4(true);
            state = "YMYA";
            printState(state);
        } 
     
    }


    
}

function printState(state) {
    dataCtx.clearRect(0, 0, dataCanvas.width, dataCanvas.height);
    dataCtx.font = "20px Roboto";
    dataCtx.fillStyle = "black";
    dataCtx.textAlign = "center";
    dataCtx.textBaseline = "top"; // Alinha ao topo
    counter++;
    history = history + '\n' + counter + "; " + state + "; t = " + contadorGrafico;

    const linhas = history.split('\n');
    const alturaLinha = 20;
    const linhasVisiveis = Math.floor(dataCanvas.height / alturaLinha); // Calcula quantas linhas cabem

    const linhasParaDesenhar = linhas.slice(-linhasVisiveis);
    for (let i = 0; i < linhasParaDesenhar.length; i++) {
        dataCtx.fillText(linhasParaDesenhar[i], dataCanvas.width / 2, i * alturaLinha);
    }
}


async function loadData() {
    try {
        dadosNMNA = await carregarDadosArquivo('NMNA-final.csv');
        dadosYMNA = await carregarDadosArquivo('YMNA-final.csv');
        dadosNMYA = await carregarDadosArquivo('NMYA-final.csv');
        dadosYMYA = await carregarDadosArquivo('YMYA-final.csv');

        //console.log("Dados NMNA:", dadosNMNA);
        //console.log("Dados YMNA:", dadosYMNA);
        //console.log("Dados NMYA:", dadosNMYA);
        //console.log("Dados YMYA:", dadosYMYA);

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
    }
}
async function carregarDadosArquivo(nomeArquivo) {
    //console.log("Nome do arquivo:", nomeArquivo);
    const resposta = await fetch(nomeArquivo);
    //console.log("passei resposta:", nomeArquivo);
    //console.log("Status da resposta:", resposta.status); // Adicione este log
    const texto = await resposta.text();
    //console.log("passei R", resposta);
    const linhas = texto.trim().split('\n').slice(1);

    return linhas.map(linha => {
        const [data, avgrun, minV, maxV, media, desvioPadrao, avgBW, timeSt] = linha.split(',').map(Number);
        return { data, avgrun, minV, maxV, media, desvioPadrao, avgBW, timeSt};
    });
}


loadData();
atualizarBotoes();
printState(state);
desenharCirculo1(true);
desenharCirculo2(false);
desenharCirculo3(false);
desenharCirculo4(false);
atualizarGrafico(dadosNMNA); 
updateViolationsDisplay(); 

if (valueDelayInput) {
    // Set initial value
    delayValue = parseFloat(valueDelayInput.value) || 0; 
    valueDelayInput.addEventListener("input", function() {
        delayValue = parseFloat(this.value) || 0; // Convert to number, default to 0 if invalid
        console.log("delayValue updated to:", delayValue); // For debugging
    });
} else {
    console.error("Element with ID 'valueDelay' not found.");
}
