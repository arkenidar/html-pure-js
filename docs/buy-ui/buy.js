const availableItems = [
    { name: 'Item 1', price: 3.00 },
    { name: 'Item 2', price: 4.50 },
    { name: 'Item 3', price: 5.25 },
    { name: 'Item 4', price: 6.00 },
    { name: 'Item 5', price: 7.50 },
    { name: 'Item 6', price: 8.25 },
];

const orderItems = [
    { name: 'Item 1', price: 3.00 },
    { name: 'Item 2', price: 4.50 },
    { name: 'Item 3', price: 5.25 },
];

const orderList = $$one('ul#order-list');
const availableList = $$one('ul#available-list');
const clearAllButton = $$one('button#clear-all');

const formatPrice = (price) => '$' + parseFloat(price).toFixed(2);

function buttonTemplate(button) {
    return `<button class="${button.class}"> ${button.label} </button>`;
}

function renderItem(item, buttons) {
    const li = document.createElement('li');
    const data = li.dataset;
    Object.assign(data, item);
    const formattedPrice = formatPrice(item.price);
    const buttonsHTML = buttons.map(buttonTemplate).join('\n');
    li.innerHTML = `${item.name} - ${formattedPrice} ${buttonsHTML}`;
    return li;
}

function updateTotal() {
    const items = $$array('li', orderList);
    const total = $$one('p#total');
    let sum = 0;
    items.forEach(item => {
        sum += parseFloat(item.dataset.price);
    });
    total.textContent = `Total: ${formatPrice(sum)}`;
}

const removeButton = [{ class: 'remove', label: 'Remove' }];
const addButton = [{ class: 'add', label: 'Add' }];

function addItemToList(item) {
    const data = item.dataset;
    const { name, price } = data;
    const li = renderItem({ name, price }, removeButton);
    orderList.appendChild(li);
    updateTotal();
}

function itemsToList(items, renderFunction, listElement) {
    items.forEach(item => listElement.appendChild(renderFunction(item)));
}

const renderOrderItem = (item) => renderItem(item, removeButton);
itemsToList(orderItems, renderOrderItem, orderList);

const renderAvailableItem = (item) => renderItem(item, addButton);
itemsToList(availableItems, renderAvailableItem, availableList);

updateTotal();

availableList.addEventListener('click', (event) => {
    if (event.target.closest('button.add')) {
        addItemToList(event.target.closest('li'));
    }
});

orderList.addEventListener('click', (event) => {
    if (event.target.closest('button.remove')) {
        event.target.closest('li').remove();
        updateTotal();
    }
});

clearAllButton.addEventListener('click', () => {
    const items = $$array('li', orderList);
    items.forEach(item => item.remove());
    updateTotal();
});
