window.addEventListener("load", MainRender, false);

let cntr = 0;
const indexForPlanet = 8, indexForVehicles = 11, indexForStarships = 12,//indexs of categories in storage for each hero
    categories = [`characters`, `planets`, `starships`, `vehicles`];

function MainRender() {
    getData(Request.main_url)
        .then((data) => {
            createTable(data);
            processingData(data);
            console.log(sessionStorage.getArr("hero_1"));
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
        })
        .then(() => {
            return getData(Request.main_url);
        })
        .then((data) => {
            processingData(data);
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

function changeInfoAboutHero(arrWithData, keys, indexForChange) {// change url about planet, starships, vehicles to the keys
    return arrWithData[indexForChange] = keys;
}

function getData(my_url) {
    return new Promise((resolve, reject) => {
        Request(my_url, resolve, reject);
    })
}

function processingData(data, category = categories[0]) {// process and record data in to the storage
    clearTempData();
    for (let i = 0, temp = data.results.length; i < temp; i++, pushDataInToTheStorage.numberOfHero++) {
        pushDataInToTheArr(data.results[i], category, pushDataInToTheStorage.numberOfHero);
        pushDataInToTheStorage(pushDataInToTheArr.Arr, pushDataInToTheStorage.numberOfHero);
        clearTempData();
        getAndCheckInfo(data.results[i].homeworld, indexForPlanet);
        clearTempData();
        if (data.results[i].starships.length) {
            for (let j = 0, temp1 = data.results[i].starships.length; j < temp1; j++) {
                getAndCheckInfo(data.results[i].starships[j], indexForStarships);
                clearTempData();
            }
        }
        if (data.results[i].vehicles.length) {
            for (let j = 0, temp1 = data.results[i].vehicles.length; j < temp1; j++) {
                getAndCheckInfo(data.results[i].vehicles[j], indexForVehicles);
                clearTempData();
            }
        }
    }

    // for (let i = 0, temp = data.results.length; i < temp; i++) {
    //     getAndCheckInfo(data.results[i].homeworld, indexForPlanet, false);
    //     clearTempData();
    //     if(data.results[i].starships.length){
    //         for(let j =0, temp1 = data.results[i].starships.length; j < temp1; j++){
    //             getAndCheckInfo(data.results[i].starships, indexForPlanet, true);
    //             clearTempData();
    //         }
    //     }
    //     clearTempData();
    // }

    Request.url_cntr++;
    Request.main_url = `https://swapi.co/api/people/?page=${Request.url_cntr}`;
}

function clearTempData() {// delete information from pushKeysToTheArr.ArrWithKeys and pushDataInToTheArr.Arr
    pushDataInToTheArr.Arr = [];
    pushKeysToTheArr.ArrWithKeys = [];
}

function pushDataInToTheArr(dataAboutSomething, category, keyForCategory) {// push our information about SOMETHING to the arr
    pushDataInToTheArr.Arr = [];
    for (const key in dataAboutSomething) // not the best way
        if (dataAboutSomething.hasOwnProperty(key))
            pushDataInToTheArr.Arr.push(dataAboutSomething[key]);
    pushDataInToTheArr.Arr.push(`https://starwars-visualguide.com/assets/img/${category}/${keyForCategory}.jpg`);
    console.log('what we push to the storage:' + pushDataInToTheArr.Arr[0]);
}

// Object.entries(obj).forEach(([key, value]) => ...)
// Object.values(obj).forEach(value => ...)
pushDataInToTheArr.Arr = [];

function pushDataInToTheStorage(arrWithData, generateKeyForHero, category, keyForCategory) {// push our arr in to storage
    if (!category)
        sessionStorage.setArr("hero_" + generateKeyForHero, arrWithData);
else
        sessionStorage.setArr("hero_" + `${generateKeyForHero}_${category}_${keyForCategory}`, arrWithData);
}

pushDataInToTheStorage.numberOfHero = 1;

function getAndCheckInfo(searchData, indexOfData) {//search data from category(planets, starships, vehicles)
    if (indexOfData === indexForVehicles) {
        // if (isArr) {
        //     for (let i = 0; i < searchData.length; i++) {
        getKeyForCategory(searchData);
        // pushKeysToTheArr(getKeyForCategory.Key);
        SynchroneRequest(searchData, getInfoForCategory, categories[3], getKeyForCategory.Key);
        // }
        // }
        // else {
        //     getKeyForCategory(searchData);
        //     // pushKeysToTheArr(getKeyForCategory.Key);
        //     SynchroneRequest(searchData, getInfoForCategory, showData, categories[3], getKeyForCategory.Key);
        // }
    }
    else if (indexOfData === indexForStarships) {
        getKeyForCategory(searchData);
        // pushKeysToTheArr(getKeyForCategory.Key);
        SynchroneRequest(searchData, getInfoForCategory, categories[2], getKeyForCategory.Key);
    }
    else if (indexOfData === indexForPlanet) {
        getKeyForCategory(searchData);
        console.log('info from get and check: ' + searchData + ' key: ' + getKeyForCategory.Key + ' cntr ' + getAndCheckInfo.cntr);
        getAndCheckInfo.cntr++;//na vudalennya
        // pushKeysToTheArr(getKeyForCategory.Key);
        SynchroneRequest(searchData, getInfoForCategory, categories[1], getKeyForCategory.Key);
    }
}

getAndCheckInfo.cntr = 1;//na ydalenie

function getKeyForCategory(urlForRequest) {//get key from url
    let temp = urlForRequest.split('/');
    getKeyForCategory.Key = temp[5];//index of key after method split equal 5
}

getKeyForCategory.Key = 0;

function pushKeysToTheArr(key) {
    pushKeysToTheArr.ArrWithKeys.push(key);
}

pushKeysToTheArr.ArrWithKeys = [];

function getInfoForCategory(data, category, keyForCategory) {// categories: planets, peoples(characters), starships, vehicles
    console.log('final: ' + data + ' cat: ' + category + ' key: ' + keyForCategory);
    pushDataInToTheArr(data, category, keyForCategory);
    // getInfoForCategory.numberOfCalls++;
    pushDataInToTheStorage(pushDataInToTheArr.Arr, pushDataInToTheStorage.numberOfHero, category, keyForCategory);
    pushDataInToTheArr.Arr = [];
    getKeyForCategory.Key = 0;
}

getInfoForCategory.numberOfCalls = 0;

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
            // if (data)
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

function MoreInfo(data) {
    console.log("moreInfo");
    let elementsWithName = document.querySelectorAll("tbody a"), table = document.querySelector(".title_and_table"),
        hero_info = document.querySelector(".hero_info");
    console.log("alo" + elementsWithName.length + " " + table);
    for (var i = 0; i < elementsWithName.length; i++)
        CreateBigRequest(data, elementsWithName[i], table, hero_info);
}

function CreateBigRequest(data, element_click, element_d_none, element_d_block) {
    element_click.addEventListener("click", function () {
        element_d_none.style.display = "none";
        showMoreInfo(data, element_d_block);
    }, false);
}

function showMoreInfo(data, element_with_info) {

}


function pagination() {

    let next = document.querySelector(".next"), prev = document.querySelector(".prev"), current_page = 1;
    next.addEventListener("click", function () {
        starShips.clone_or_reRender = false;
        if (current_page >= pagination.min_page && current_page < pagination.max_page) {
            current_page++;
            Request.main_url = `https://swapi.co/api/people/?page=${current_page}`;
            console.log(Request.main_url);
            Request(ReRender, Request.main_url);
        }
        else if (current_page === pagination.max_page)
            current_page = pagination.min_page;
    });

    prev.addEventListener("click", function () {
        starShips.clone_or_reRender = false;
        if (current_page <= pagination.max_page && current_page > pagination.min_page) {
            current_page--;
            Request.main_url = `https://swapi.co/api/people/?page=${current_page}`;
            console.log(Request.main_url);
            Request(ReRender, Request.main_url);
        }
        else if (current_page === pagination.min_page)
            current_page = pagination.max_page;
    });
}

pagination.min_page = 1;
pagination.max_page = 9;

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

        // if (data.results[i].starships.length) {
        //     Request.starship_url = data.results[i].starships;
        //
        //     console.log("mass of ships:" + Request.starship_url);
        //
        //     getStarshipsInfo(trEl, tdElAther);
        // }
        // else cloneAndAppendNewNode(trEl, tdElAther, "none");
    }
    // MoreInfo(data);
}


function ReRender(data) {
    console.log(data);
    let arrOftd = document.querySelectorAll("td");
    console.log("td elementov:" + arrOftd.length);
    let cntr_1 = 0;
    for (let i = 0; i < data.results.length; i++) {
        if (arrOftd[cntr_1].querySelector("a"))
            arrOftd[cntr_1++].querySelector("a").innerHTML = data.results[i].name;
        arrOftd[cntr_1++].innerHTML = data.results[i].birth_year;
        arrOftd[cntr_1++].innerHTML = data.results[i].gender;
        // ReRender.catchEl = arrOftd[cntr_1++];
        // getStarshipsInfo();
        console.log("cntr:" + cntr_1);
    }
}

ReRender.catchEl = null;