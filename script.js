const id = (x) => {
    return document.getElementById(x);
}
let input = id('input');
let addBtn = id('add_btn');
let honestBtn = id('honest_btn');
let oddBtn = id('odd_btn');
let deleteFirstElemBtn = id('delete_first_elem_btn');
let deleteLastElemBtn = id('delete_last_elem_btn');
let listContainer = id('item_list_container');
let itemList = localStorage.itemList ? JSON.parse(localStorage.itemList) : [];

const renderList = () => {
        listContainer.innerHTML = ``;
        let completedItemHtml = '';
        for (let i = 0; i <= itemList.length - 1; i++) {
            listContainer.innerHTML += `
                <div class="list-item">
                    <div class="item-name" id="${i}">
                        ${itemList[i]}
                    </div>
                    <div class="item-actions">
                        <button onclick="completedItem(${i})">Complete</button>
                        <button onclick="editItem(${i})">Изменить</button>
                        <button onclick="deleteItem(${i})">Удалить</button>
                    </div>
                </div>
            `;

        }
}

const addEvent = () => {
    let value = input.value;
    if (value.length > 0) {
        itemList.push(value);
        input.value = "";
    } else {
        alert("Please specify a name for your task");
    }
    localStorage.itemList = JSON.stringify(itemList);
    renderList();
}

const deleteItem = (index) => {
    let item = itemList[index];
    if (item != undefined) {
        itemList.splice(index, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    } else {
        alert("Элемент был успешно удален");
    }
}
const completedItem = (index) => {
    let item = itemList[index];
    let tmp = "";
    let flag = true;
    if (item != undefined) {
        tmp = item;
        itemList.splice(index, 1);
        itemList.push(tmp);
        var elem = document.getElementById(index);
        elem.classList.toggle("completed");
        localStorage.itemList = JSON.stringify(itemList);
        renderList(flag);
    }
}

const editItem = (index) => {
    let item = itemList[index];
    if (item != undefined) {
        let ask = prompt(`Изменяем "${item}" на : `);
        if (ask.length > 0) {
            itemList[index] = ask;
            localStorage.itemList = JSON.stringify(itemList);
            renderList();
        }
    } else {
        alert("Item not available in list.");
    }
}

const honestItem = () => {

    for (var i = 0; i < itemList.length; i++) {

        if (((i + 1) % 2) === 0) {
            var elem = document.getElementById(i);
            elem.style.backgroundColor = "#AA0000";
        }
    }
}

const oddItems = () => {

    for (var i = 0; i < itemList.length; i++) {

        if (((i + 1) % 2) !== 0) {
            console.log(i);
            var elem = document.getElementById(i);
            elem.style.backgroundColor = '#AA0000';
        }
    }
}

const deleteFirstElem = () => {

    if (itemList[0] != undefined) {
        itemList.splice(0, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    }
}

const deleteLastElem = () => {
    if ((itemList.length - 1) != undefined) {
        itemList.splice(itemList.length - 1, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    }
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
})
honestBtn.addEventListener("click", (e) => {
    honestItem();
})
oddBtn.addEventListener("click", (e) => {
    oddItems();
})
deleteFirstElemBtn.addEventListener("click", (e) => {
    deleteFirstElem();
})
deleteLastElemBtn.addEventListener("click", (e) => {
    deleteLastElem();
})



renderList();