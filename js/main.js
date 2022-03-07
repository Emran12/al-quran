const loadData = () => {
    fetch('http://api.alquran.cloud/v1/quran/%7B%7Bedition%7D%7D')
        .then(res => res.json())
        .then(data => loadSurahs(data.data))
}
loadData();

const loadSurahs = surahs => {
    displaySurahs(surahs.surahs);
}

const displaySurahs = surahs => {
    const s = surahs.slice(0, 20);
    console.log(surahs);
    const displayResult = document.getElementById('display-surahs');
    s.forEach(surah => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div onclick="loadSurah('${surah.number}')" class="p-3 border bg-light text-bold">${surah.name} <br> ${surah.englishName}</div>
            </div>
            `
        displayResult.appendChild(div);
    });
    surahs.splice(0, 20);
    console.log(surahs);
    if (surahs.length != 0) {
        const btnDiv = document.getElementById('btn-div');
        btnDiv.innerHTML = '';
        const p = document.createElement('p');
        p.innerHTML = `
         <button id = 'loadBtn' type="button" class="btn btn-secondary">Load More</button>
      `
        btnDiv.appendChild(p);
        document.getElementById('loadBtn').addEventListener('click', function() {
            if (surahs.length != 0) displaySurahs(surahs);
        })
    }
}

const loadSurah = surahNumber => {
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySurah(data.data.name, data.data.ayahs));
}

const displaySurah = (name, ayahs) => {
    console.log(ayahs);
    const surahDetailsText = document.getElementById('surah-details');
    surahDetailsText.style.display = 'block';
    surahDetailsText.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card-header');
    div.innerText = `${name}`;
    surahDetailsText.appendChild(div);
    ayahs.forEach((item, index) => {
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        ul.classList.add('list-group-flush');
        ul.innerHTML = `<li class="list-group-item">${ayahs[index].text}</li>`
        surahDetailsText.appendChild(ul);
    })

}