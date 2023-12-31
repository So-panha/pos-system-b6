let btnAddproduct = document.getElementById('add_category');
let form_add = document.getElementById('add-product');
let updateForm = document.getElementById('update-product');
let concelAdd = document.getElementById('concelAdd');
let concelUpdate = document.getElementById('concelUpdate');
let viewGoods = document.getElementById('view_goods');
let close_list = document.querySelector('.infor-goods ion-icon');
let totalSold = document.querySelector('.total');


// data 
let datas = [];
let getIndex = null;
let linkImageUpdate = [];
let dataCategory = [];
let nameInput = document.getElementById('nameAdd');
let netpriceInput = document.getElementById('net-priceAdd');
let grosspriceInput = document.getElementById('gross-priceAdd');
let quantityInput = document.getElementById('quantityAdd');
let describtionInput = document.getElementById('describtionAdd');
let imageInput = document.getElementById('imageAdd');
let saveBtn = document.getElementById('save');

let nameUpdate = document.getElementById('nameUpadate');



let netpriceUpdate = document.getElementById('net-priceUpadate');
let grosspriceUpdate = document.getElementById('gross-priceUpadate');
let quantityUpdate = document.getElementById('quantityUpadate');
let describtionUpdate = document.getElementById('describtionUpadate');
let imageUpdate = document.getElementById('imageUpdate');
let updateBtn = document.getElementById('update');

// input search 
let searchData = document.getElementById('search_product');
let products = document.querySelector('.product');

// Parents of form select
let categorySearch = document.querySelector('.categorySearch')
let categoryProduct = document.querySelector('.categoryProduct');
let categoryProductUpdate = document.querySelector('.categoryProductUpdate');

// Data histories
let datahistory = [];

// Quatity Current
let qtyCurrent = 0;

// show form and close form
function show(element) {
    element.className = 'show';
}
function hide(element) {
    element.className = 'hide';
}

// Show form add
function openAdd() {
    show(form_add)
}
function closeAdd() {
    hide(form_add)
}

// Update form 
function update(e) {
    show(updateForm);
    hide(form_add);
    let indexUpdate = e.target.closest('.card').dataset.index;
    getIndex = indexUpdate;
    let data = datas[indexUpdate];
    nameUpdate.value = data.name;
    categoryUpdate.value = data.category;
    netpriceUpdate.value = data.netPrice;
    grosspriceUpdate.value = data.grossPrice;
    quantityUpdate.value = data.quantity;
}

// Start Update
function clickUpdate() {
    previewFilesUpdate(imageUpdate.files);
}

//convert like image for update
function previewFilesUpdate(files) {
    let link = [];
    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader();

            reader.addEventListener(
                "load",
                () => {
                    link.push(reader.result);
                    getLink(link[0])
                },
                false,
            );
            reader.readAsDataURL(file);
        }
    }

    if (files) {
        Array.prototype.forEach.call(files, readAndPreview);
    }
    getLink(link[0])
}
function getLink(link) {
    if (link != null) {
        let formUpdate = datas[getIndex];
        formUpdate.name = nameUpdate.value;
        formUpdate.category = categoryUpdate.value;
        formUpdate.netPrice = netpriceUpdate.value;
        formUpdate.grossPrice = grosspriceUpdate.value;
        formUpdate.quantity = quantityUpdate.value;
        formUpdate.image = link;

        // Class function
        saveLocalStorage();
        displayCard();
        hide(updateForm);
    }
}

function closeUpdate() {
    hide(updateForm);
}

// Show and close form list of goods
function closeList() {
    viewGoods.style.display = 'none';
}

function openList(e) {
    viewGoods.style.display = '';
    let index = e.target.closest('.card').dataset.index;
    let data = datas[index];
    showHistory(index);
    let lists = viewGoods.firstElementChild.firstElementChild.children;
    lists[1].children[1].textContent = data.name;
    lists[2].children[1].textContent = data.category;
    lists[3].children[1].textContent = data.quantity;
    lists[4].children[1].textContent = Number(data.quantity - qtyCurrent);
    lists[5].children[1].textContent = data.netPrice;
    lists[6].children[1].textContent = data.grossPrice;

}

// Delete Card 
function delectCard(e) {
    let index = e.target.closest('.card').dataset.index;
    datas.splice(index, 1);
    saveLocalStorage();
    displayCard();
}


// Set data of localStorage
function saveLocalStorage() {
    localStorage.setItem('data-list', JSON.stringify(datas));
}
// Get data of localStorage
function getDataLocalStorage() {
    let data_list = JSON.parse(localStorage.getItem('data-list'));
    if (data_list != null) {
        datas = data_list;
        displayCard();
    }
}


let setId = null;
// convert link imgae
function previewFiles(files) {
    let link = [];
    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader();

            reader.addEventListener(
                "load",
                () => {
                    link.push(reader.result);
                    createCard(link[0]);
                },
                false,
            );
            reader.readAsDataURL(file);
        }
    }

    if (files) {
        Array.prototype.forEach.call(files, readAndPreview);
    }
    createCard(link[0])
    // set up ID
    let uniqueId = localStorage.getItem("id");
    if (uniqueId === null || datas.length === 0) {
        uniqueId = 1
        localStorage.setItem("id", JSON.stringify(uniqueId));

    } else {
        uniqueId = parseInt(uniqueId) + 1;
        localStorage.setItem("id", JSON.stringify(uniqueId));
        console.log(uniqueId);
    };
    setId = uniqueId;
}


// Create object
function createCard(link) {


    if (link != null) {
        store = {};
        store.name = nameInput.value;
        store.category = categoryInput.value;
        store.netPrice = netpriceInput.value;
        store.grossPrice = grosspriceInput.value;
        store.quantity = quantityInput.value;
        store.image = link;
        store.id = setId;

        // add object to array
        datas.push(store);
        displayCard();
        saveLocalStorage();
    }
}


// Input validation 
function validation(element) {

    if (element != '') {
        return true
    } else {
        return false
    }
}

// Check type of input 
function checkInput(element) {
    if (Number(element)) {
        return true
    } else {
        return false

    }
}

// Prevent of number charactor in input
function allowType(element) {
    if (element < 20) {
        return true
    } else {
        return false
    }
}

// Prevent Negative Number
function preventNumber(element) {
    if (Number(element) > -1) {
        console.log(element);
        return true
    } else {
        return false
    }
}


// create cards
function clickCreate() {
    let valueCategories = categoryInput.value;
    let allowed = allowType(nameInput.value.length);
    if (validation(nameInput.value) && validation(valueCategories) && validation(netpriceInput.value)
        && validation(grosspriceInput.value) && validation(quantityInput.value) && validation(imageInput.value) && checkInput(netpriceInput.value)
        && checkInput(grosspriceInput.value) && allowed && preventNumber(netpriceInput.value) && preventNumber(grosspriceInput.value)) {
        previewFiles(imageInput.files);
        hide(form_add);
    } else {
        if (validation(nameInput.value) == false) {
            alert('Please fill name of your product!');
        }
        else if (validation(netpriceInput.value) == false) {
            alert('Please fill your net price of your product!');
        }
        else if (checkInput(netpriceInput.value) == false) {
            alert('You need to fill your net price as the number!');
        }
        else if (preventNumber(netpriceInput.value) == false) {
            alert('You need to input your price as a positive number!');
        }
        else if (validation(grosspriceInput.value) == false) {
            alert('Please fill your gross price of your product!');
        }
        else if (checkInput(grosspriceInput.value) == false) {
            alert('You need to fill your gross price as the number!');
        }
        else if (preventNumber(grosspriceInput.value) == false) {
            alert('You need to fill your net price as the number!');
        }
        else if (validation(quantityInput.value) == false) {
            alert('Please fill quantity of your product!');
        }
        else if (allowed == false) {
            alert('You do not allow for add character more than 20 in input name!');
        }
        else if (preventNumber(grosspriceInput.value) == false) {
            alert('You need to input your price as a negative number!');
        }
        else if (validation(imageInput.value) == false) {
            alert('Please input your image of your product!')
        }
        else if (checkInput(categoryInput.value) == false) {
            alert('You need to fill your category form!');
        }
    }
}

// Display card 
function displayCard() {
    let main_card = document.querySelector('.scroll');
    main_card.remove();
    main_card = document.createElement('div');
    main_card.className = 'scroll';
    for (let index = 0; index < datas.length; index++) {
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;

        let infor = document.createElement('div');
        infor.className = 'infor';

        let detail = document.createElement('div');
        detail.className = 'detail';

        let imageCard = document.createElement('img');
        imageCard.className = 'image-product';
        imageCard.src = datas[index].image;

        let productId = document.createElement('p');
        productId.textContent = 'Product ID : '

        let id = document.createElement('span');
        id.textContent = datas[index].id;
        productId.appendChild(id);
        detail.appendChild(productId);

        let productName = document.createElement('p');
        productName.textContent = 'Product Name : '
        let name = document.createElement('span');
        name.textContent = datas[index].name;
        productName.appendChild(name);
        detail.appendChild(productName);

        let categories = document.createElement('p');
        categories.textContent = 'category : '
        let category = document.createElement('span');
        category.textContent = datas[index].category;
        categories.appendChild(category);
        detail.appendChild(categories);

        let Quantity = document.createElement('p');
        Quantity.textContent = 'Quantity : '
        let numbers = document.createElement('span');
        numbers.textContent = datas[index].quantity;
        Quantity.appendChild(numbers);
        detail.appendChild(Quantity);

        let Price = document.createElement('p');
        Price.textContent = 'Price : ';
        let cost = document.createElement('span');
        cost.textContent = datas[index].grossPrice + '$';
        Price.appendChild(cost);
        detail.appendChild(Price);

        let action = document.createElement('div');
        action.className = 'actionCard';

        let deleteBtn = document.createElement('img');
        deleteBtn.className = 'btnAction'
        deleteBtn.src = "../IMG/image/delete-removebg-preview.png";
        deleteBtn.addEventListener('click', delectCard)

        let editBtn = document.createElement('img');
        editBtn.className = 'btnAction'
        editBtn.src = "../IMG/image/edit-removebg-preview.png";
        editBtn.addEventListener('click', update)

        let viewBtn = document.createElement('img');
        viewBtn.className = 'btnAction'
        viewBtn.src = '../IMG/image/eye-removebg-preview.png';
        viewBtn.addEventListener('click', openList)

        action.appendChild(deleteBtn);
        action.appendChild(editBtn);
        action.appendChild(viewBtn);

        infor.appendChild(detail);
        infor.appendChild(action);

        card.appendChild(imageCard);
        card.appendChild(infor);
        main_card.appendChild(card);
    }
    let contain = document.querySelector('.product');
    contain.appendChild(main_card)
    // reset 
    imageInput.value = '';
}

// Find data by search 
function findData(e) {
    let texts = e.target.value;
    let allProduct = products.firstElementChild.children;
    for (let product of allProduct) {
        let textProduct = product.firstElementChild.nextElementSibling.firstElementChild.children;
        let textlist = textProduct[1].lastElementChild.textContent.toLocaleLowerCase();
        if (textlist.includes(texts.toLocaleLowerCase()) == true || texts.lenght === 0) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    }
}

// Storage of catagories
// Save data of storage
function saveDataStorage() {
    localStorage.setItem('mainData', JSON.stringify(dataCategory));
}

// Get data of storage category
function getDataStorageCategory() {
    let data = JSON.parse(localStorage.getItem('mainData'));
    if (data != null) {
        dataCategory = data;
        createOption();
    }
}



// Veiw product by categories
function viewCategory() {
    let search = categoryMain.value.toLocaleLowerCase();
    console.log(search);
    let allProduct = products.firstElementChild.children;
    for (let product of allProduct) {
        let textProduct = product.firstElementChild.nextElementSibling.firstElementChild.children;
        let textlist = textProduct[2].lastElementChild.textContent.toLocaleLowerCase();
        if (textlist.includes(search.toLocaleLowerCase()) == true || search === '') {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    }
}


// category
let categoryMain = document.getElementById('category_main')
let categoryInput = document.getElementById('categoryForm');
let categoryUpdate = document.getElementById('categoryFormUpdate');

// Create option selection of categories
function createOption() {

    categoryMain.remove();
    categoryInput.remove();
    categoryUpdate.remove();
    // create form main category
    categoryMain = document.createElement('select');
    categoryMain.id = 'category_main';

    // create form form add category
    categoryInput = document.createElement('select');
    categoryInput.id = 'categoryForm';

    // create form update category
    categoryUpdate = document.createElement('select');
    categoryUpdate.id = 'categoryFormUpdate';


    let optionMainFirst = document.createElement('option');
    optionMainFirst.value = '';
    optionMainFirst.textContent = 'Categories';
    categoryMain.appendChild(optionMainFirst);
    for (let data of dataCategory) {
        let optionAddFirst = document.createElement('option');
        let optionUpdateFirst = document.createElement('option');

        let optionMain = document.createElement('option');
        optionMain.value = data.category;
        optionMain.textContent = data.category;

        let optionAdd = document.createElement('option');
        optionAdd.value = data.category;
        optionAdd.textContent = data.category;

        let optionUpdate = document.createElement('option');
        optionUpdate.value = data.category;
        optionUpdate.textContent = data.category;

        categoryInput.appendChild(optionAddFirst);
        categoryUpdate.appendChild(optionUpdateFirst);


        categoryMain.appendChild(optionMain);
        categoryInput.appendChild(optionAdd);
        categoryUpdate.appendChild(optionUpdate);
    }
    categorySearch.appendChild(categoryMain);
    categoryProduct.appendChild(categoryInput);
    categoryProductUpdate.appendChild(categoryUpdate);
}



// Save history of sold
function saveHistoryOfSold() {
    localStorage.setItem('history', JSON.stringify(datahistory));
}

function getTotalPrice() {
    let AllHistory = JSON.parse(localStorage.getItem('history'));
    if (AllHistory != null) {
        datahistory = AllHistory;
    }
}


// Create card of history
function showHistory(index) {
    let allSold = 0;
    let priceGoods = 0;
    let AllHistory = document.querySelector('.allList');
    AllHistory.remove();
    AllHistory = document.createElement('div');
    AllHistory.className = 'allList';
    for (let history of datahistory) {
        let goodsHistory = datas[index].name.toLocaleLowerCase();
        let goodsCurrentPlace = history.name.toLocaleLowerCase();
        console.log(history);
        if (goodsHistory.includes(goodsCurrentPlace) == true) {
            // Create list
            let list = document.createElement('div');
            list.className = 'list';
            // Create paragrash
            let date = document.createElement('p');
            date.textContent = "Sold Out : " + history.date;

            let amount = document.createElement('p');
            amount.textContent = 'Amount : ' + history.quantity;
            qtyCurrent += Number(history.quantity);
            allSold += Number(history.quantity);

            let price = document.createElement('p');
            price.textContent = 'Price : ' + history.price*history.quantity + '$';
            priceGoods = history.price;
           

            let br = document.createElement('br');

            // Append into list
            list.appendChild(date);
            list.appendChild(amount);
            list.appendChild(price);
            list.appendChild(br);
            // Append into mainList
            AllHistory.appendChild(list);
        }
        document.querySelector('.history').appendChild(AllHistory);
    }
    let totalSoldOut = totalSold.firstElementChild.firstElementChild;
    totalSoldOut.textContent = priceGoods + "-" + allSold;
}

// Class data
getDataLocalStorage();
getDataStorageCategory();
getTotalPrice();
// Element's action
btnAddproduct.addEventListener('click', openAdd);
concelAdd.addEventListener('click', closeAdd);
concelUpdate.addEventListener('click', closeUpdate);
close_list.addEventListener('click', closeList);
saveBtn.addEventListener('click', clickCreate);
updateBtn.addEventListener('click', clickUpdate);
searchData.addEventListener('input', findData);
categoryMain.addEventListener('change', viewCategory);

