const apiKey = "sua Chave Aqui";

document.getElementById("searchBtn").addEventListener("click", () => {
  const localInput = document.getElementById("local").value.trim();
  let [cidade, estado] = localInput.split(",").map(str => str.trim());

  if (!cidade) {
    alert("Por favor, digite uma cidade.");
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},BR&units=metric&appid=${apiKey}&lang=pt_br`;

  if (estado) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},${estado},BR&units=metric&appid=${apiKey}&lang=pt_br`;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Cidade não encontrada");
      return response.json();
    })
    .then(data => {
      const previsaoHojeContainer = document.getElementById("previsao-hoje");
      const previsaoOutrosContainer = document.getElementById("previsao-outros");
      const tituloPrev = document.getElementById("tituloPrevisao");

      previsaoHojeContainer.innerHTML = "";
      previsaoOutrosContainer.innerHTML = "";

      const hoje = new Date();
      const hojeFormatado = hoje.toISOString().split("T")[0];
      let previsaoHoje = null;

      data.list.forEach((item) => {
        const [date, time] = item.dt_txt.split(" ");

        if (time === "12:00:00" && date === hojeFormatado) {
          previsaoHoje = item;
        }

        if (date === hojeFormatado && !previsaoHoje) {
          previsaoHoje = item;
        }
      });

      if (previsaoHoje) {
        const { temp, temp_min, temp_max, humidity } = previsaoHoje.main;
        const descricao = previsaoHoje.weather[0].description;
        const iconCode = previsaoHoje.weather[0].icon;
        const vento = Math.round(previsaoHoje.wind.speed);
        const dataForm = hoje.toLocaleDateString("pt-br", { day: "numeric", month: "short" });

        const pais = data.city.country;

        tituloPrev.innerHTML = `<h2>${cidade}${estado ? `, ${estado}` : ""} - ${pais}</h2>`;

        previsaoHojeContainer.innerHTML = `
                <div class="hoje-destaque">
                    <h3>${dataForm}</h3>
                    <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descricao}">
                    <p class="temperatura">${Math.round(temp)}°C</p>
                    <p>${descricao}</p>
                </div>
                <div class="outras-previsao">
                    <div class="itens-previsao">
                        <i class="fas fa-temperature-low"></i> 
                        <p>${Math.round(temp_min)}°C</p>
                    </div>
                    <div class="itens-previsao">
                        <i class="fas fa-temperature-high"></i>
                        <p>${Math.round(temp_max)}°C</p>
                    </div>
                    <div class="itens-previsao">
                        <i class="fas fa-tint"></i>
                        <p>${humidity}%</p>
                    </div>
                    <div class="itens-previsao">
                        <i class="fas fa-wind"></i>
                        <p>${vento}m/s</p>
                    </div>
                </div>
            `;

      } else {
        previsaoHojeContainer.innerHTML = `<p>Não foi possível obter a previsão para hoje.</p>`;
      }

      const previsaoDiaria = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (date !== hojeFormatado && !previsaoDiaria[date]) {
          previsaoDiaria[date] = item;
        }
      });

      let count = 0;
      for (const date in previsaoDiaria) {
        if (count >= 4) break;

        const previsaoTemp = previsaoDiaria[date];
        const temp = Math.round(previsaoTemp.main.temp);
        const descricao = previsaoTemp.weather[0].description;
        const iconCode = previsaoTemp.weather[0].icon;

        const dataForm = new Date(date).toLocaleDateString("pt-br", {
          day: "numeric",
          month: "short",
        });

        previsaoOutrosContainer.innerHTML += `
                    <div class="previsao-item">
                        <h3 class="data">${dataForm}</h3>
                        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descricao}">
                        <div>
                        <p>${temp}°C</p>
                        <p>${descricao}</p>
                        </div>
                    </div>
                `;

        count++;
      }
    })
    .catch((error) => {
      console.error("Erro:", error.message);
      document.getElementById("previsao-hoje").innerHTML = `<p>${error.message}</p>`;
      document.getElementById("previsao-outros").innerHTML = "";
    });
});
