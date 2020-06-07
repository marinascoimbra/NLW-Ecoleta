document
    .querySelector("select[name=uf]")
    .addEventListener("change", (event) => {
        const citySelect = document.querySelector("select[name=city]");
        const stateInput = document.querySelector("input[name=state]");

        let ufSelected = event.target.value;

        let indexOfSelectedState = event.target.selectedIndex;
        stateInput.value = event.target.options[indexOfSelectedState].text;

        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`)
        .then(res => res.json())
        .then(data => {
            for (city of data) {
                citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
            }

            citySelect.disabled = false
        })
    });

function populateUFs() {
    const ufSelect = document
        .querySelector("select[name=uf]");
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(data => {
        for (state of data) {
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
        }
    })
}

populateUFs()

const itemsToCollect = document.querySelectorAll(".items-grid li");

const collectedItems = document.querySelector("input[name=items]");

for (let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItens = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItens.findIndex(item => item == itemId)

    if (alreadySelected >= 0) {
        const filteredItems = selectedItens.filter(item => item != itemId)
        selectedItens = filteredItems;
    } else {
        selectedItens.push(itemId);
    }

    collectedItems.value = selectedItens;
}