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
                <div class="p-3 border bg-light text-bold">${surah.name} <br> ${surah.englishName}</div>
            </div>
            `
        displayResult.appendChild(div);
    });
    surahs.splice(0, 20);
    console.log(surahs);
    if (surahs.length != 0) {

        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
         <button id = 'loadBtn' type="button" class="btn btn-secondary">Load More</button>
      `
        displayResult.appendChild(btnDiv);
        document.getElementById('loadBtn').addEventListener('click', function() {
            if (surahs.length != 0) displaySurahs(surahs);
        })
    }
}