# Previsão do Tempo - SKYCAST

O SKYCAST é uma aplicação simples para mostrar a previsão do tempo de uma cidade, utilizando a API do OpenWeatherMap. O projeto é focado em fornecer informações como a temperatura atual, mínima, máxima, umidade e velocidade do vento. Além disso, exibe a previsão para os próximos dias.

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página.
- **CSS3**: Estilização da interface.
- **JavaScript**: Lógica de interação e consumo da API.
- **API do OpenWeatherMap**: Para obter as previsões do tempo.

## Funcionalidades

- Exibe a previsão do tempo para a cidade inserida.
- Mostra a temperatura atual, mínima, máxima, umidade e velocidade do vento.
- Exibe a previsão para os próximos dias.
- Permite busca por cidade e estado (opcional).

## Como Usar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/skycast.git
2 Crie uma chave de API do OpenWeatherMap:

## Como Obter a Chave de API

Siga os passos abaixo para gerar uma chave de API do OpenWeatherMap e integrá-la no projeto:

### Passo 1: Acesse o OpenWeatherMap
- Vá até o site do [OpenWeatherMap](https://openweathermap.org/).

### Passo 2: Crie uma conta ou faça login
- Se você ainda não tem uma conta, clique em "Sign Up" para se cadastrar.
- Se você já possui uma conta, clique em "Login" para entrar.

### Passo 3: Acesse a seção "API Keys"
- Após fazer login, vá até a seção "API keys" ou "Minhas Chaves de API", que pode ser encontrada no painel de controle.

### Passo 4: Gere sua chave de API
- Clique em "Generate API key" para criar uma nova chave de API.
- Após a criação, copie a chave gerada.

### Passo 5: Substitua a chave no código
- No arquivo `script.js`, localize a linha onde a chave de API está definida.
- Substitua a chave de API existente pela chave gerada no OpenWeatherMap.

```javascript
const apiKey = 'SUA_CHAVE_DE_API_AQUI'; // Substitua pela chave gerada
