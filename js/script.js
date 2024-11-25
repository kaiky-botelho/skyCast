const apiKey = '26e6abd69394cf47b1ebbb366e128e40';

document.getElementById("searchBtn").addEventListener("click", () => {

    const cidade = document.getElementById("cidade").value;

    // URL da API para buscar a previsão
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Cidade não encontrada");
            return response.json();
        })
        .then((data) => {
            const previsaoContainer = document.getElementById("previsao");
            previsaoContainer.innerHTML = ""; // Limpar previsões anteriores

            const previsaoDiaria = {};

            // Filtra as previsões para pegar uma por dia, por exemplo, as de meio-dia
            data.list.forEach((item) => {
                const date = item.dt_txt.split(" ")[0]; // Data (YYYY-MM-DD)
                const time = item.dt_txt.split(" ")[1]; // Hora (HH:MM:SS)

                // Se for o meio-dia (12:00:00), adiciona ao objeto previsaoDiaria
                if (time === "12:00:00") {
                    previsaoDiaria[date] = item;
                }
            });

            const tituloPrev = document.getElementById("tituloPrevisao");
            const pais = data.city.country;
            
            tituloPrev.innerHTML = `
            <h2>${cidade}, ${pais}</h2>
            `

            // Exibe as previsões diárias
            for (const date in previsaoDiaria) {
                const previsaoTemp = previsaoDiaria[date];
                const temp = Math.round(previsaoTemp.main.temp);
                const sensTerm = previsaoTemp.main.feels_like;
                const descricao = previsaoTemp.weather[0].description;
                const iconCode = previsaoTemp.weather[0].icon; 
                const dataForm = new Date(date).toLocaleDateString("pt-br", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                });



                previsaoContainer.innerHTML += `
                <div class="previsao-item">
                    <h3>${dataForm}</h3>
                    <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descricao}">
                    <p class = "temperatura">${temp}°C</p>
                    <p>Sensação Térmica: ${sensTerm}</p>
                    <p>${descricao}</p>
                </div>
                `;
            }
        })
        .catch((error) => {
            console.error("Erro:", error.message);
            document.getElementById("previsao").innerHTML = `<p>${error.message}</p>`;
        });
});
