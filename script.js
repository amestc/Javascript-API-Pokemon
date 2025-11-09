// Seleciona o container onde os cards ficarão
const container = document.getElementById('cards-container');

// Função para buscar os dados dos 12 primeiros pokémons
async function fetchPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

    const response = await fetch(url); // Consome API principal
    const data = await response.json(); // Extrai os pokémons
    const pokemons = data.results;

    // Para cada pokémon, busca detalhes do personagem
    for (let pokemon of pokemons) {
        fetchPokemonData(pokemon.url);
    }
}

// Função para buscar os dados de um Pokémon específico e criar o card
async function fetchPokemonData(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const data = await response.json();

    // Criação dos elementos do CARD
    const card = document.createElement('div');
    card.className = 'card';

    // Imagem do Pokémon
    const img = document.createElement('img');
    img.src = data.sprites.front_default || 'https://via.placeholder.com/140x140?text=Sem+Imagem';
    img.alt = data.name;

    // Nome do Pokémon
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = data.name;

    // Tipos do Pokémon
    const types = document.createElement('div');
    types.className = 'types';
    types.textContent = 'Tipo: ' + data.types.map(t => t.type.name).join(', ');

    // Adiciona os elementos ao card
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(types);

    // Adiciona o card ao container principal
    container.appendChild(card);
}

// Inicia a busca dos pokémons quando a página carrega
fetchPokemons();