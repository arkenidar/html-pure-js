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

const orderList = $$one('#item-list');
const availableList = $$one('#available-items');
const clearAllButton = $$one('#clear-all');

function renderItem(item, buttonClass, buttonLabel) {
    const li = document.createElement('li');
    li.dataset.name = item.name;
    li.dataset.price = item.price.toFixed(2);
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)}<button class="${buttonClass}">${buttonLabel}</button>`;
    return li;
}

function updateTotal() {
    const items = $$array('li', orderList);
    const total = $$one('#total');
    let sum = 0;
    items.forEach(item => {
        sum += parseFloat(item.dataset.price);
    });
    total.textContent = `Total: $${sum.toFixed(2)}`;
};

function addItemToList(item) {
    const li = renderItem({ name: item.dataset.name, price: parseFloat(item.dataset.price) }, 'remove', 'Remove');
    orderList.appendChild(li);
    updateTotal();
}

orderItems.forEach(item => orderList.appendChild(renderItem(item, 'remove', 'Remove')));
availableItems.forEach(item => availableList.appendChild(renderItem(item, 'add', 'Add')));
updateTotal();

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

availableList.addEventListener('click', (event) => {
    if (event.target.closest('button.add')) {
        addItemToList(event.target.closest('li'));
    }
});
