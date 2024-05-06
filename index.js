function converterParaDecimal(graus, minutos, segundos, precisao = 6) {
    const sinal = graus < 0 ? -1 : 1;
    const resultado = sinal * (Math.abs(graus) + minutos / 60 + segundos / 3600);
    return Number(resultado.toFixed(precisao));
}

function radianosParaGraus(radianos, precisao = 6) {
    const graus = radianos * (180 / Math.PI);
    return Number(graus.toFixed(precisao));
}

function decimalParaHorasMinutosSegundos(horasDecimais, precisaoSegundos = 0) {
    const horas = Math.floor(horasDecimais);
    const minutosDecimais = (horasDecimais - horas) * 60;
    const minutos = Math.floor(minutosDecimais);
    const segundos = Number(
        ((minutosDecimais - minutos) * 60).toFixed(precisaoSegundos),
    );

    return `${horas}° ${minutos}' ${segundos}''`;
}

function calcularFotoperiodo(latitude, diaDoAno, precisao = 6) {
    const latitudeRad = latitude * (Math.PI / 180);

    const declinacao =
        23.45 * Math.sin((360 / 365) * (diaDoAno - 81) * (Math.PI / 180));

    console.log(
        "Declinação calculada : ",
        decimalParaHorasMinutosSegundos(declinacao),
    );

    var h2 = document.createElement('h2');
    h2.textContent = `Declinação: ${decimalParaHorasMinutosSegundos(declinacao)}`;
    document.getElementById('result').appendChild(h2)


    const declinacaoRad = declinacao * (Math.PI / 180);

    console.log("Tangente da latitude:", Math.tan(latitudeRad));
    console.log("Tangente da declinação:", Math.tan(declinacaoRad));

    const part1 = Math.tan(latitudeRad) * Math.tan(declinacaoRad);

    console.log(Math.tan(declinacaoRad), "*", Math.tan(latitudeRad), "= ", part1);

    console.log("N = 0.13333 * (Arcocosseno[-1 * (", part1, ")])");

    const part2 = Math.acos(-1 * part1);

    const fotoperiodo = radianosParaGraus(0.13333 * part2, precisao);

    console.log("N = 0.13333 * ", part2, ")]");

    return decimalParaHorasMinutosSegundos(fotoperiodo, precisao);
}




document.getElementById('calcForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission


    // Coloque aqui os parâmetros do calculo
    const precisaoDecimal = 8;

    let graus =  parseInt(document.getElementById('degrees').value);
    let minutos = parseInt(document.getElementById('minutes').value);
    let segundos =  parseInt(document.getElementById('seconds').value);
    let NDA = parseInt(document.getElementById('day').value);

    // Coloque aqui os parâmetros do calculo

    let grausDecimais = converterParaDecimal(
        graus,
        minutos,
        segundos,
        precisaoDecimal,
    );

    // console.log("Latitude(Teta): ", grausDecimais);

    const fotoperiodo = calcularFotoperiodo(grausDecimais, NDA, precisaoDecimal);

    var h2 = document.createElement('h2');
    h2.textContent = `Fotoperiodo: ${fotoperiodo}`;
    document.getElementById('result').appendChild(h2)

    console.log("\n\nFotoperíodo:", fotoperiodo);
});