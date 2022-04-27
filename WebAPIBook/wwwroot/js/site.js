const uri = "/api/Book"
let books = []

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addAuthorTextbox = document.getElementById('add-author');
    const addCategoryTextbox = document.getElementById('add-category');
    const addPriceTextbox = document.getElementById('add-price');
    

    const item = {
        name: addNameTextbox.value.trim(),
        autor: addAuthorTextbox.value.trim(),
        category: addCategoryTextbox.value.trim(),
        price: addPriceTextbox.value.trim()
    };   

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addAuthorTextbox.value = '';
            addCategoryTextbox.value = '';
            addPriceTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);
    
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-name').value = item.BookName;
    document.getElementById('edit-author').checked = item.Author;
    document.getElementById('edit-category').checked = item.Category;
    document.getElementById('edit-price').checked = item.Price;
    
    document.getElementById('editForm').style.display = 'block';
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';   
    
    data.forEach(item => {
        console.log(item);
        let inputbookName = document.createElement('input');
        inputbookName.type = 'text';
        inputbookName.value = item.BookName;
        
        
        let inputbookAuthor = document.createElement('input');
        inputbookAuthor.type = 'text';
        inputbookAuthor.value = item.Author;

        let inputbookPrice = document.createElement('input');
        inputbookPrice.type = 'text';
        inputbookPrice.value = item.Price;

        let inputbookCategory = document.createElement('input');
        inputbookCategory.type = 'text';
        inputbookCategory.value = item.Category;

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(inputbookName);

        let td2 = tr.insertCell(1);
        td2.appendChild(inputbookAuthor);

        let td3 = tr.insertCell(2);
        td3.appendChild(inputbookCategory);    

        let td4 = tr.insertCell(3);
        td4.appendChild(inputbookPrice);

          
        

    });

    todos = data;
}