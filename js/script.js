function cursNBU() {
    let cursData =  document.querySelector('.data-end').value.split('T');
    cursData = cursData[0].split('-');
    cursData = cursData.join('');
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=${cursData}&json`)
        .then(function (response) {
            response.json().then(function (data) {
                document.querySelector('.kurs').value = data[0]['rate'];
            })
        });
}

document.querySelector('.data-end').onchange = cursNBU;


function t1() {
    let kurs = document.querySelector('.kurs').value;
    let cat = +document.querySelector('.category').value;
    let dataStart = document.querySelector('.data-start').value;
    let dataEnd = document.querySelector('.data-end').value;
    let pauza1 = document.querySelector('.pauza1').value;
    let pauza2 = document.querySelector('.pauza2').value;
    let km = document.querySelector('.km').value;
    let kmH = document.querySelector('.km-h').value;
    let timeDrive = km / kmH;
    
    



    pauza1 = pauza1 * 24;
    pauza2 = pauza2 * 45;
    let date1 = moment(dataStart);
    let date2 = moment(dataEnd);
    let diff = date2.diff(date1, 'hour');
    let timeWork = diff - pauza1 - pauza2 - timeDrive;
    if (km < 2500) {
        let kofStop = 1.2;
        let cofDrive = 0.133;
    } else if(km < 5000){
        kofStop = 1.1;
        cofDrive = 0.131;
    }else if(km < 7000){
        kofStop = 1;
        cofDrive = 0.129;
    } else {
        kofStop = 0.9;
        cofDrive = 0.127;
    }
    let zpDrive = km * cofDrive * cat;
    let zpWork = timeWork * kofStop;
    let ollZp = (zpDrive + zpWork) * kurs;
    document.querySelector('.out').innerHTML = Math.round(ollZp);

    
}

document.querySelector('.btn').onclick = t1;