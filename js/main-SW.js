window.addEventListener("load", MainRender, false);

let cntr = 0;
const indexForPlanet = 8, indexForVehicles = 11, indexForStarships = 12,//indexs of categories in storage for each hero
    categories = [`characters`, `planets`, `starships`, `vehicles`],
    placeholder = `https://starwars-visualguide.com/assets/img/big-placeholder.jpg`;

function MainRender() {
    getData(Request.main_url)
        .then((data) => {
            createTable(data);
            processingData(data);
            console.log(sessionStorage.getArr("hero_1"));
        })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        // .then(() => {
        //     return getData(Request.main_url);
        // })
        // .then((data) => {
        //     processingData(data);
        // })
        .then(() => {
            pagination();
            moreInfo();
        })
        .catch((error) => {
            throw new Error(error);
        });


}

Storage.prototype.setArr = function (key, arr) {
    return this.setItem(key, JSON.stringify(arr));
}

Storage.prototype.getArr = function (key) {
    return JSON.parse(this.getItem(key));
}

// function changeInfoAboutHero(arrWithData, keys, indexForChange) {// change url about planet, starships, vehicles to the keys
//     return arrWithData[indexForChange] = keys;
// }

function getData(my_url) {
    return new Promise((resolve, reject) => {
        Request(my_url, resolve, reject);
    })
}

function processingData(data, category = categories[0]) {// process and record data in to the storage
    clearTempData();
    for (let i = 0, temp = data.results.length; i < temp; i++, pushDataInToTheStorage.numberOfHero++) {
        let nameOfKey;
        pushDataInToTheArr(data.results[i], category, pushDataInToTheStorage.numberOfHero);
        pushDataInToTheStorage(pushDataInToTheArr.Arr, pushDataInToTheStorage.numberOfHero);
        clearTempData();
        getAndCheckInfo(data.results[i].homeworld, indexForPlanet);
        nameOfKey = `hero_${pushDataInToTheStorage.numberOfHero}_${categories[1]}_${getKeyForCategory.Key}`;
        pushDataInToTheTempArr(nameOfKey, processingData.tempArrForNameOfKey);
        switchDataInStorage(processingData.tempArrForNameOfKey, pushDataInToTheStorage.numberOfHero, indexForPlanet);
        clearTempDataForKey();
        clearTempData();

        if (data.results[i].starships.length) {
            for (let j = 0, temp1 = data.results[i].starships.length; j < temp1; j++) {
                getAndCheckInfo(data.results[i].starships[j], indexForStarships);
                nameOfKey = `hero_${pushDataInToTheStorage.numberOfHero}_${categories[2]}_${getKeyForCategory.Key}`;
                pushDataInToTheTempArr(nameOfKey, processingData.tempArrForNameOfKey);
                clearTempData();
            }
            switchDataInStorage(processingData.tempArrForNameOfKey, pushDataInToTheStorage.numberOfHero, indexForStarships);
            clearTempDataForKey();
        }

        if (data.results[i].vehicles.length) {
            for (let j = 0, temp1 = data.results[i].vehicles.length; j < temp1; j++) {
                getAndCheckInfo(data.results[i].vehicles[j], indexForVehicles);
                nameOfKey = `hero_${pushDataInToTheStorage.numberOfHero}_${categories[3]}_${getKeyForCategory.Key}`;
                pushDataInToTheTempArr(nameOfKey, processingData.tempArrForNameOfKey);
                clearTempData();
            }
            switchDataInStorage(processingData.tempArrForNameOfKey, pushDataInToTheStorage.numberOfHero, indexForVehicles);
            clearTempDataForKey();
        }
    }

    Request.url_cntr++;
    Request.main_url = `https://swapi.co/api/people/?page=${Request.url_cntr}`;
}

processingData.tempArrForNameOfKey = [];

function pushDataInToTheTempArr(name, tempArr) {
    tempArr.push(name);
}

function switchDataInStorage(in_tempArrForNameOfKey, generateKeyForHero, indexOfCategory) {
    const tempDataAboutOneHero = sessionStorage.getArr(`hero_${generateKeyForHero}`);
    tempDataAboutOneHero[indexOfCategory] = in_tempArrForNameOfKey;
    pushDataInToTheStorage(tempDataAboutOneHero, generateKeyForHero);
}

function clearTempDataForKey() {// delete information from processingData.tempArrForNameOfKey
    processingData.tempArrForNameOfKey = [];
}

function clearTempData() {// delete information from pushDataInToTheArr.Arr
    pushDataInToTheArr.Arr = [];
}

function pushDataInToTheArr(dataAboutSomething, category, keyForCategory) {// push our information about SOMETHING to the arr
    clearTempData();
    for (const key in dataAboutSomething) // not the best way
        if (dataAboutSomething.hasOwnProperty(key))
            pushDataInToTheArr.Arr.push(dataAboutSomething[key]);
    pushDataInToTheArr.Arr.push(`https://starwars-visualguide.com/assets/img/${category}/${keyForCategory}.jpg`);
    console.log('what we push to the storage:' + pushDataInToTheArr.Arr[0]);
}

pushDataInToTheArr.Arr = [];

function pushDataInToTheStorage(arrWithData, generateKeyForHero, category, keyForCategory) {// push our arr in to storage
    if (!category)
        sessionStorage.setArr(`hero_${generateKeyForHero}`, arrWithData);
    else
        sessionStorage.setArr(`hero_${generateKeyForHero}_${category}_${keyForCategory}`, arrWithData);
}

pushDataInToTheStorage.numberOfHero = 1;

function getAndCheckInfo(searchData, indexOfData) {//search data from category(planets, starships, vehicles)
    if (indexOfData === indexForVehicles) {
        getKeyForCategory(searchData);
        SynchroneRequest(searchData, getInfoForCategory, categories[3], getKeyForCategory.Key);
    }
    else if (indexOfData === indexForStarships) {
        getKeyForCategory(searchData);
        SynchroneRequest(searchData, getInfoForCategory, categories[2], getKeyForCategory.Key);
    }
    else if (indexOfData === indexForPlanet) {
        getKeyForCategory(searchData);
        //console.log('info from get and check: ' + searchData + ' key: ' + getKeyForCategory.Key + ' cntr ' + getAndCheckInfo.cntr);
        // getAndCheckInfo.cntr++;//na vudalennya
        SynchroneRequest(searchData, getInfoForCategory, categories[1], getKeyForCategory.Key);
    }
}

// getAndCheckInfo.cntr = 1;//na vudalennya

function getKeyForCategory(urlForRequest) {//get key from url
    let temp = urlForRequest.split('/');
    getKeyForCategory.Key = temp[5];//index of key after method split equal 5
}

getKeyForCategory.Key = 0;

// function pushKeysToTheArr(key) {
//     pushKeysToTheArr.ArrWithKeys.push(key);
// }


function getInfoForCategory(data, category, keyForCategory) {// categories: planets, peoples(characters), starships, vehicles
    console.log('final: ' + data + ' cat: ' + category + ' key: ' + keyForCategory);
    pushDataInToTheArr(data, category, keyForCategory);
    pushDataInToTheStorage(pushDataInToTheArr.Arr, pushDataInToTheStorage.numberOfHero, category, keyForCategory);
    clearTempData();
    // getKeyForCategory.Key = 0;
}

function SynchroneRequest(my_url, callback1, category, keyForCategory) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", my_url, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            let errStatus = xhr.status;
            let errText = xhr.statusText;
            throw new Error(errStatus + ": " + errText);
        } else {
            let data = JSON.parse(xhr.responseText);
            console.log('SyncRequest:' + data);
            callback1(data, category, keyForCategory);
        }
    }
    xhr.send();
}

function Request(my_url, callback1, callback2, category, keyForCategory) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", my_url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            let errStatus = xhr.status;
            let errText = xhr.statusText;
            throw new Error(errStatus + ": " + errText);
        } else {
            let data = JSON.parse(xhr.responseText);
            if (data)
                callback1(data, category, keyForCategory);
            else {
                if (typeof callback2 === `function`)
                    callback2();
                else return 0;
            }
        }
    }
}

Request.url_cntr = 1;
Request.main_url = `https://swapi.co/api/people/?page=1`;

function showData(Data) {
    console.log(Data);
}

function moreInfo() {
    console.log("moreInfo:DECADE:" + pagination.currentDecade);
    const elementsWithName = document.querySelectorAll("tbody a"),
        table = document.querySelector(".title_and_table_flex"),
        hero_info = document.querySelector(".hero_info_none");

    console.log("alo" + elementsWithName.length);

    // let kapysta = () => console.log("haphap");
    for (let i = 0; i < elementsWithName.length; i++) {
        const tempDataAboutOneHero = sessionStorage.getArr(`hero_${pagination.currentDecade + i + 1}`);
        console.log("otdaem: " + tempDataAboutOneHero);
        elementsWithName[i].setAttribute('href', '#');
        elementsWithName[i].addEventListener('click', () => {
            switchDisplay(table, hero_info);
            showDataAboutHero(tempDataAboutOneHero);
        }, false);
    }
}

function showDataAboutHero(in_tempDataAboutOneHero) {
    const table = document.querySelector(".title_and_table_none"),
        hero_info = document.querySelector(".hero_info_flex"),
        elP = document.querySelector('.content'),
        elImg = document.createElement('img'),
        parentElForImg = document.querySelector('.img_info'),
        planetInfo = in_tempDataAboutOneHero[indexForPlanet][0],
        starShipInfo = in_tempDataAboutOneHero[indexForStarships],
        vehicelInfo = in_tempDataAboutOneHero[indexForVehicles];
    console.log("data yaka prushla: " + planetInfo + " hop " + starShipInfo + " hop " + vehicelInfo);
    elImg.setAttribute('src', in_tempDataAboutOneHero[16]);
    elImg.setAttribute('ng-src', in_tempDataAboutOneHero[16]);
    parentElForImg.appendChild(elImg);
    elP.innerHTML = `
            <strong>Name: </strong> ${in_tempDataAboutOneHero[0]} ;<br>
            <strong>Birth year: </strong> ${in_tempDataAboutOneHero[6]} ;<br>
            <strong>Eye color: </strong> ${in_tempDataAboutOneHero[5]} ;<br>
            <strong>Gender: </strong> ${in_tempDataAboutOneHero[7]} ;<br>
            <strong>Hair color: </strong> ${in_tempDataAboutOneHero[3]} ;<br>
            <strong>Height: </strong> ${in_tempDataAboutOneHero[1]} ;<br>
            <strong>Mass: </strong> ${in_tempDataAboutOneHero[2]} ;<br>
            <strong>Skin color: </strong> ${in_tempDataAboutOneHero[4]} ;<br>
            <strong>Homeworld: </strong> <a href="#" style = 'color: #0056b3' class="homeworld"> ${sessionStorage.getArr(planetInfo)[0]} </a>;<br>
            `;

    if (vehicelInfo.length) {
        let elA = document.createElement('a'),
            elBr = document.createElement('br');
        console.log("nash aparat:" + vehicelInfo);
        elA.setAttribute('href', '#');
        elA.setAttribute('class', 'vehicle');
        elA.style.color = '#0056b3';
        elP.innerHTML += `<strong>Vehicles: </strong>`;
        for (let i = 0, max = vehicelInfo.length; i < max; i++) {
            let newNode = elA.cloneNode(true), tempDataForVehicle = sessionStorage.getArr(vehicelInfo[i]);
            newNode.innerHTML = tempDataForVehicle[0];
            elP.appendChild(newNode);
            if (vehicelInfo[i + 1])
                elP.innerHTML += ` , `;
        }
        elP.appendChild(elBr);
    }

    if (starShipInfo.length) {
        let elA = document.createElement('a'), elBr = document.createElement('br');
        console.log("nash aparat:" + starShipInfo);
        elA.setAttribute('href', '#');
        elA.setAttribute('class', 'starShip');
        elA.style.color = '#0056b3';
        elP.innerHTML += `<strong>Star Ships: </strong>`;
        for (let i = 0, max = starShipInfo.length; i < max; i++) {
            let newNode = elA.cloneNode(true), tempDataForStarShip = sessionStorage.getArr(starShipInfo[i]);
            newNode.innerHTML = tempDataForStarShip[0];
            elP.appendChild(newNode);
            if (starShipInfo[i + 1])
                elP.innerHTML += ` , `;
        }

        elP.appendChild(elBr);
    }

    let tempForPlanet = elP.querySelector('.homeworld');
    console.log('planeta:' + planetInfo);
    addEventContentOnClick(tempForPlanet, sessionStorage.getArr(planetInfo), categories[1]);

    let tempVehicels = elP.querySelectorAll('.vehicle');

    for (let i = 0; i < tempVehicels.length; i++)
        addEventContentOnClick(tempVehicels[i], sessionStorage.getArr(vehicelInfo[i]), categories[3]);

    let tempShips = elP.querySelectorAll('.starShip');

    for (let i = 0; i < tempShips.length; i++)
        addEventContentOnClick(tempShips[i], sessionStorage.getArr(starShipInfo[i]), categories[2]);

    btnBack(table, hero_info);
}

function addEventContentOnClick(in_newNode, in_tempData, in_category) {
    in_newNode.addEventListener('click', () => showDataAboutCategory(in_tempData, in_category), false);
}

function hideInfo() {
    const elDivBG = document.querySelector('.bg_for_data'), elDivInfo = document.querySelector('.main_info');
    elDivBG.remove();
    elDivInfo.remove();
}

function showDataAboutCategory(in_tempData, in_categories) {
    console.log('showDataAbout');
    const elDivBG = document.createElement('div'), elP = document.createElement('p'),
        elImg = document.createElement('img'), parentForBG = document.querySelector('body'),
        elDivInfo = document.createElement('div'), elDivForCloseWindow = document.createElement('a'),
        elDivImg = document.createElement('div'), elDivText = document.createElement('div'),
        infoTitle = document.createElement('h2');
    if (in_categories === categories[3]) {
        elImg.setAttribute('src', in_tempData[16]);
        elImg.setAttribute('ng-src', in_tempData[16]);
    }
    else if (in_categories === categories[2]) {
        elImg.setAttribute('src', in_tempData[18]);
        elImg.setAttribute('ng-src', in_tempData[18]);
    }
    else {
        elImg.setAttribute('src', in_tempData[14]);
        elImg.setAttribute('ng-src', in_tempData[14]);
    }
    elImg.setAttribute('onerror', placeholder);
    elDivImg.setAttribute('class', 'img_info');
    elDivImg.appendChild(elImg);
    elDivText.setAttribute('class', 'text_info');
    infoTitle.innerText = `${in_tempData[0]}`;
    elDivText.appendChild(infoTitle);
    if (in_categories === categories[3] || in_categories === categories[2]) {
        console.log("vehicle or ship");
        elP.innerHTML = `
            <strong>Model: </strong> ${in_tempData[1]} ;<br>
            <strong>Manufacturer: </strong> ${in_tempData[2]} ;<br>
            <strong>Cost in credits: </strong> ${in_tempData[3]} ;<br>
            <strong>Length: </strong> ${in_tempData[4]} ;<br>
            <strong>Max atmosphering speed: </strong> ${in_tempData[5]} ;<br>
            <strong>Crew: </strong> ${in_tempData[6]} ;<br>
            <strong>Passengers: </strong> ${in_tempData[7]} ;<br>
            <strong>Cargo capacity: </strong> ${in_tempData[8]} ;<br>
            <strong>Consumables: </strong> ${in_tempData[9]} ;<br>
    `;
        if (in_categories === categories[3])
            elP.innerHTML += `<strong>Vehicle class: </strong> ${in_tempData[10]} ;<br>`;
        else if (in_categories === categories[2]) {
            console.log("ship");
            elP.innerHTML += `
            <strong>Hyperdrive rating: </strong> ${in_tempData[10]} ;<br>
            <strong>Starship class: </strong> ${in_tempData[12]} ;<br>
    `;
        }
    }
    else {
        elP.innerHTML = `
            <strong>Rotation period: </strong> ${in_tempData[1]} ;<br>
            <strong>Orbital period: </strong> ${in_tempData[2]} ;<br>
            <strong>Diameter: </strong> ${in_tempData[3]} ;<br>
            <strong>Climate: </strong> ${in_tempData[4]} ;<br>
            <strong>Gravity: </strong> ${in_tempData[5]} ;<br>
            <strong>Terrain: </strong> ${in_tempData[6]} ;<br>
            <strong>Surface water: </strong> ${in_tempData[7]} ;<br>
            <strong>Population: </strong> ${in_tempData[8]} ;<br>
    `;
    }
    elDivText.appendChild(elP);
    elDivBG.setAttribute('class', 'bg_for_data');
    parentForBG.appendChild(elDivBG);
    elDivInfo.setAttribute('class', 'main_info');
    elDivInfo.appendChild(elDivImg);
    elDivInfo.appendChild(elDivText);
    elDivForCloseWindow.innerText = '+';
    elDivForCloseWindow.setAttribute('href', '#');
    elDivForCloseWindow.setAttribute('class', 'closeWindow');
    elDivForCloseWindow.addEventListener('click', hideInfo, false);
    elDivInfo.appendChild(elDivForCloseWindow);
    parentForBG.appendChild(elDivInfo);
}

function switchDisplay(in_table, in_hero_info) {
    console.log('tyt switchDisplay ' + switchDisplay.trigger);
    if (!switchDisplay.trigger) {
        console.log("table none");
        let tempImg = document.querySelector('.img_info');
        tempImg.removeChild(tempImg.children[0]);
        in_table.className = 'title_and_table_flex w-75';
        in_hero_info.className = 'hero_info_none';
        switchDisplay.trigger = true;
        // tempContent.innerHTML = '';
    }
    else {
        console.log("table flex");
        in_table.className = 'title_and_table_none';
        in_hero_info.className = 'hero_info_flex';
        switchDisplay.trigger = false;
    }
}

switchDisplay.trigger = true;

function btnBack(in_table, in_hero_info) {
    let btn = document.querySelector('.back');
    btn.addEventListener('click', () => {
        switchDisplay(in_table, in_hero_info);
    }, false);
}

function pagination() {

    let next = document.querySelector(".next"),
        prev = document.querySelector(".prev"),
        currentPage = 1;
    next.addEventListener("click", function () {
        if (currentPage >= pagination.minPage && currentPage < pagination.maxPage) {
            currentPage++;
            ReRender(setCurrentDecade(currentPage));
        }
        else if (currentPage === pagination.maxPage) {
            currentPage = pagination.minPage;
            ReRender(setCurrentDecade(currentPage));
        }
    });

    prev.addEventListener("click", function () {
        if (currentPage <= pagination.maxPage && currentPage > pagination.minPage) {
            currentPage--;
            ReRender(setCurrentDecade(currentPage));
        }
        else if (currentPage === pagination.minPage) {
            currentPage = pagination.maxPage;
            ReRender(setCurrentDecade(currentPage));
        }
    });
}

pagination.minPage = 1;
pagination.maxPage = 9;
pagination.currentDecade = 0;

function setCurrentDecade(page) {
    return pagination.currentDecade = (page - 1) * 10;
}


function cloneAndAppendNewNode(parent, nodeForClone, innerContent) {
    let NewNode = nodeForClone.cloneNode(true);
    NewNode.innerHTML = innerContent;
    parent.appendChild(NewNode);
}

function starShips(data, parentEl, childEl, numberOfStarships) {
    console.log(data);
    cntr++;
    starShips.ship_name += (`${cntr}) name:${data.name}, model:${data.model};`);
    if (starShips.clone_or_reRender) {
        if (cntr === numberOfStarships) {
            cloneAndAppendNewNode(parentEl, childEl, starShips.ship_name);
            console.log("hip" + starShips.ship_name);
            cntr = 0;
            starShips.ship_name = ``;
        }
    }
    else {
        console.log("Nash element ->" + ReRender.catchEl);
        ReRender.catchEl.innerHTML = starShips.ship_name;
        console.log("hip else" + starShips.ship_name);
        cntr = 0;
        starShips.ship_name = ``;
    }
}

starShips.ship_name = ``;
starShips.clone_or_reRender = true;

function createTable(data) {// stvorennya tabluci
    showData(data);

    let parentEl = document.querySelector('.main_table_content');

    for (let i = 0; i < data.results.length; i++) {
        let trEl = document.createElement("tr"), tdElWithName = document.createElement("td"),
            aEl = document.createElement("a"), tdElAther = document.createElement("td");
        parentEl.appendChild(trEl);
        aEl.innerHTML = data.results[i].name;
        tdElWithName.appendChild(aEl);
        trEl.appendChild(tdElWithName);

        cloneAndAppendNewNode(trEl, tdElAther, data.results[i].birth_year);
        cloneAndAppendNewNode(trEl, tdElAther, data.results[i].gender);
    }
}

function ReRender(currentDecade) {
    const arrOftd = document.querySelectorAll("td");
    console.log("td elementov:" + arrOftd.length);
    let cntr_1 = 0;
    console.log("DECADE:" + pagination.currentDecade);
    for (let i = 1; i <= ReRender.maxPeopleOnThePage; i++) {

        const tempNumberOfHero = i + currentDecade;

        if (tempNumberOfHero > ReRender.maxPeopleInTheTable) {
            arrOftd[cntr_1++].querySelector("a").innerHTML = `-`;
            arrOftd[cntr_1++].innerHTML = `-`;
            arrOftd[cntr_1++].innerHTML = `-`;

        }
        else {
            const tempDataAboutOneHero = sessionStorage.getArr(`hero_${currentDecade + i}`);

            if (arrOftd[cntr_1].querySelector("a"))
                arrOftd[cntr_1++].querySelector("a").innerHTML = tempDataAboutOneHero[0];

            arrOftd[cntr_1++].innerHTML = tempDataAboutOneHero[6];
            arrOftd[cntr_1++].innerHTML = tempDataAboutOneHero[7];
            console.log("cntr:" + cntr_1);
        }
    }
    moreInfo();
}

ReRender.catchEl = null;
ReRender.maxPeopleOnThePage = 10;
ReRender.maxPeopleInTheTable = 87;