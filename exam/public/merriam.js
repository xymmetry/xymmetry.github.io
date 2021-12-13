const app = {
  init: () => {
    document
      .getElementById('defbtn')
      .addEventListener('click', app.fetchWord);
  },
  fetchWord: (ev) => {
    let deff = document.getElementById('deff').value;
    let key = '84685596-3f26-4dab-af6c-2fd96c3753d4';
    let lang = 'en';
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${deff}?key=84685596-3f26-4dab-af6c-2fd96c3753d4`;
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showWord(data);
      })
      .catch(console.err);
  },
  showWord: (resp) => {
    console.log(resp);
    let row = document.querySelector('.definition.row');
    if(Array.isArray(resp)){
      let firstDef = resp[0]?.shortdef[0];
      let defo = resp[0].def[0].sseq[0][0][1].dt[0][1]
      row.innerHTML = firstDef;
      console.log(firstDef);
      row.innerHTML = `<div class="card" style="width: 30vw">
      <h5 class="card-title p-2">${deff.value}</h5>
      <img
      src="https://www.merriam-webster.com/assets/mw/static/art/dict/${deff.value}.gif"
      class="card-img-top"
      onerror = "this.onerror=null; this.src='https://i.imgur.com/D1nM11A.png'"
      alt="${deff.value} Image"
    />
      <div class="card-body">
        <p class="card-text">Definition: ${defo}</p>
        <p class="card-text">Short definition: ${firstDef}</p>
      </div>
    </div>`
    }
  },
};

app.init();