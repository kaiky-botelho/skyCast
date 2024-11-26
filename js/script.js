const apiKey = "26e6abd69394cf47b1ebbb366e128e40";


document.getElementById("searchBtn").addEventListener("click", () => {
    const cidade = document.getElementById("cidade").value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Cidade não encontrada");
            return response.json();
        })
        .then((data) => {
            const previsaoHojeContainer = document.getElementById("previsao-hoje");
            const previsaoOutrosContainer = document.getElementById("previsão-outros");
            const tituloPrev = document.getElementById("tituloPrevisao");

            // Limpa previsões anteriores
            previsaoHojeContainer.innerHTML = "";
            previsaoOutrosContainer.innerHTML = "";

            const hoje = new Date().toLocaleDateString("en-CA"); // Data de hoje no formato YYYY-MM-DD
            const previsaoDiaria = {};

            // Filtrar previsões para capturar apenas as de meio-dia
            data.list.forEach((item) => {
                const date = item.dt_txt.split(" ")[0];
                const time = item.dt_txt.split(" ")[1];
                if (time === "12:00:00") {
                    previsaoDiaria[date] = item;
                }
            });

            const pais = data.city.country;

            tituloPrev.innerHTML = `
                <h2>${cidade}, ${pais}</h2>
            `;

            // Adicionar previsões ao DOM
            for (const date in previsaoDiaria) {
                const previsaoTemp = previsaoDiaria[date];
                const temp = Math.round(previsaoTemp.main.temp);
                const temp_min = Math.round(previsaoTemp.main.temp_min);
                const temp_max = Math.round(previsaoTemp.main.temp_max);
                const descricao = previsaoTemp.weather[0].description;
                const iconCode = previsaoTemp.weather[0].icon;
                const umidade = previsaoTemp.main.humidity; // Umidade
                const vento = Math.round(previsaoTemp.wind.speed); // Velocidade do vento
                const pressao = previsaoTemp.main.pressure; 

                const dataForm = new Date(date).toLocaleDateString("pt-br", {
                    day: "numeric",
                    month: "short",
                });

                if (date === hoje) {
                    // Adicionar previsão de hoje
                    previsaoHojeContainer.innerHTML = `
                        <div class="previsao-hoje-destaque">
                            <h3 class = "data">${dataForm}</h3>
                            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descricao}">
                            <p class="temperatura">${temp}°C</p>
                            <p>${descricao}</p>
                            </div>
                            <div class = "outras-previsao">
                                <div class = "itens-previsao">
                                    <img src ="/img/tempo-severo.png">
                                    <p>${temp_min}°C</p>                            
                                </div>
                                <div class = "itens-previsao">
                                    <img src ="/img/exposicao-ao-frio.png">
                                    <p>${temp_max}°C</p>                            
                                </div>
                                <div class = "itens-previsao">
                                    <img src ="/img/gota-de-agua.png">
                                    <p>${umidade}%</p>                            
                                </div>
                                <div class = "itens-previsao">
                                    <img src ="/img/vento.png">
                                    <p>${vento}m</p>                            
                                </div>
                            </div>
                    `;
                } else {
                    // Adicionar previsão para outros dias
                    previsaoOutrosContainer.innerHTML += `
                        <div class="previsao-item">
                            <h3 class = "data">${dataForm}</h3>
                            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descricao}">
                            <p>${temp}°C</p>
                            <p>${descricao}</p>
                        </div>
                    `;
                }
            }
        })
        .catch((error) => {
            console.error("Erro:", error.message);
            document.getElementById("previsao-hoje").innerHTML = `<p>${error.message}</p>`;
            document.getElementById("previsão-outros").innerHTML = "";
        });
});
