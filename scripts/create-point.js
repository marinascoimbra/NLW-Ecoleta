document
    .querySelector("select[name=uf]")
    .addEventListener("change", (event) => {
        const citySelect = document.querySelector("select[name=city]");
        const stateInput = document.querySelector("input[name=state]");

        let ufSelected = event.target.value;

        let indexOfSelectedState = event.target.selectedIndex;
        stateInput.value = event.target.options[indexOfSelectedState].text;

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`)
        .then(res => res.json())
        .then(data => {
            for (city of data) {
                citySelect.innerHTML += `<option value=${city.id}>${city.nome}</option>`
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

