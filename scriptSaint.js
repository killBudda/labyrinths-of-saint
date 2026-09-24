// 1. массив моих шедевротоваров ‧₊˚❀༉‧₊˚.
const products = [
    { id: 1, name: 'Какая-то древняя японская чушь. Возможно, Инуяша', price: 199, quantity: 1 },
    { id: 2, name: 'Jet Set Radio!', price: 699, quantity: 5 },
    { id: 3, name: 'Sonic the Hedgehog', price: 799, quantity: 12 },
    { id: 4, name: 'Katekyo Hitman Reborn!', price: 1599, quantity: 11 },
    { id: 5, name: 'Soul Eater', price: 1999, quantity: 20 }
];

// 2. массив моей шедеврокорзины ‧₊˚❀༉‧₊˚.
let cart = [];

const MAX_QUANTITY_IN_CART = 10; // максимальное количество товара в корзине ‧₊˚❀༉‧₊˚.

// это поиск товара в каталоге по его id ‧₊˚❀༉‧₊˚.
function findProductById(productId) {
    return products.find(product => product.id === productId); }

// это он делает то же самое, но в корзине ‧₊˚❀༉‧₊˚.
function findCartItemById(productId) {
    return cart.find(item => item.pid === productId); }

// это он мне цену форматирует ‧₊˚❀༉‧₊˚.
function formatPrice(price) {
    return price.toFixed(2) + ' руб.'; }

// функция добавления товара в корзину ‧₊˚❀༉‧₊˚.
function addToCart(productId, quantity = 1) {
    try {
        const product = findProductById(productId);
        if (!product) {
            throw new Error('Хе-хе, похоже, "собака съела товар"!'); } // если что, это строчка из песни ноггано
        if (product.quantity <= 0) {  
            throw new Error('Хм, похоже, товар закончился...'); }

        const cartItem = findCartItemById(productId);

        if (cartItem) {
            const newQuantity = cartItem.quantity + quantity;  

            if (newQuantity > MAX_QUANTITY_IN_CART) {
                throw new Error(`Ты собрался выкупить весь мой магазин? 
                    Сожалею, но максимальное количество товара в корзине - ${MAX_QUANTITY_IN_CART} шт.`); }
            if (newQuantity > product.quantity) {  
                throw new Error(`Ты собрался выкупить весь мой магазин? 
                    Сожалею, но на складе не хватает товара. Осталось всего: ${product.quantity} шт.`); }

            cartItem.quantity = newQuantity;  
            return {
                success: true,
                message: `Хе-хе, количество товара "${product.name}" обновлено до: ${cartItem.quantity} шт.` };
        } 
        else {
            if (quantity > MAX_QUANTITY_IN_CART) {
                throw new Error(`Ох, похоже кто-то все же выкупил весь мой магазин... 
                    Сожалею, но максимальное количество товара в корзине - ${MAX_QUANTITY_IN_CART} шт.`); }
            if (quantity > product.quantity) {  
                throw new Error(`Ох, похоже кто-то все же выкупил весь мой магазин... 
                    Сожалею, но на складе не хватает товара. Осталось всего: ${product.quantity} шт.`); }

            cart.push({
                pid: productId,
                quantity: quantity });

            return {
                success: true,
                message: `Та-да-ам! Товар "${product.name}" добавлен в корзину в количестве: ${quantity} шт.` };
        }
    } 
    catch (error) {
        return {
            success: false,
            message: error.message };
    }
}

// функция поштучного удаления товара ‧₊˚❀༉‧₊˚.
function removeFromCart(productId) {
    try {
        const cartItem = findCartItemById(productId);
        if (!cartItem) {
            throw new Error('Хм, не могу найти товар... Возможно, его "съела собака"? ;)'); }

        cartItem.quantity -= 1;
        
        if (cartItem.quantity <= 0) {
            const index = cart.findIndex(item => item.pid === productId);
            if (index !== -1) {
                cart.splice(index, 1); }
            return {
                success: true,
                message: 'Ну вот, товар полностью удалён из корзины... Может, все же передумаешь?' };
        }

        const product = findProductById(productId);
        return {
            success: true,
            message: `Хм, количество товара "${product.name}" уменьшено до: ${cartItem.quantity} шт. 
                Видимо, "собака" потихоньку "поедает" его...` };
    } 
    catch (error) {
        return {
            success: false,
            message: error.message };
    }
}

// функция полного удаления товара ‧₊˚❀༉‧₊˚.
function removeItemCompletely(productId) {
    try {
        const initialLength = cart.length;
        cart = cart.filter(item => item.pid !== productId);
        
        if (cart.length === initialLength) {
            throw new Error('Хм, не могу найти товар... Возможно, его "съела собака"? ;)'); }

        const product = findProductById(productId);
        return {
            success: true,
            message: `Ну вот, товар "${product.name}" полностью удалён из корзины... Может, все же передумаешь?` };
    } 
    catch (error) {
        return {
            success: false,
            message: error.message };
    }
}

// это расчет полной стоимости корзины ‧₊˚❀༉‧₊˚.
function calculateTotalPrice() {
    return cart.reduce((total, cartItem) => {
        const product = findProductById(cartItem.pid);
        return total + (product.price * cartItem.quantity);
    }, 0);
}

// это полная очистка корзины ‧₊˚❀༉‧₊˚.
function clearCart() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cart = [];
    return {
        success: true,
        message: `Эх, корзина пуста. Удалено товаров: ${itemCount} шт.` };
}

// вывод списка товаров в корзине ‧₊˚❀༉‧₊˚.
function getCartItems() {
    return cart.map(cartItem => {
        const product = findProductById(cartItem.pid);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantityInCart: cartItem.quantity,
            totalPrice: product.price * cartItem.quantity,
            available: product.quantity,
            maxAllowed: Math.min(product.quantity, MAX_QUANTITY_IN_CART) }; });
}

// это получение статистики по корзине ‧₊˚❀༉‧₊˚.
function getCartSummary() {
    const items = getCartItems();
    const totalPrice = calculateTotalPrice();
    const totalItems = items.reduce((sum, item) => sum + item.quantityInCart, 0);
    
    return {
        items: items,
        totalItems: totalItems,
        totalPrice: totalPrice,
        formattedTotalPrice: formatPrice(totalPrice),
        isEmpty: cart.length === 0 };
}

// начинается ебатория ‧₊˚❀༉‧₊˚.
function showNotification(message, type = 'info') {
    const notification = $(`
        <div class="notification notification-${type}">
            ${message}
        </div> `);
    
    $('body').append(notification);
    notification.fadeIn(300);
    
    setTimeout(() => {
        notification.fadeOut(300, () => notification.remove());
    }, 3000);
}

function updateCartDisplay() { // злоебучие кнопки добавления и удаления из корзины
    const summary = getCartSummary();
    const cartContainer = $('#cart-container');
    const cartSummary = $('#cart-summary');
    
    cartContainer.empty();
    
    if (summary.isEmpty) {
        cartContainer.html('<p class="empty-cart-message">Хм... корзина пуста. Вперёд за покупками!</p>');
        cartSummary.html(`
            <div class="cart-total">
                <p>Итого: <strong>0.00 руб.</strong></p>
            </div> `); } 
    else {
        summary.items.forEach(item => {
            cartContainer.append(`
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${formatPrice(item.price)} × ${item.quantityInCart} шт.</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn-cart-remove" data-id="${item.id}">-</button> 
                        <span class="cart-quantity">${item.quantityInCart}</span>
                        <button class="btn-cart-add" data-id="${item.id}">+</button>
                        <button class="btn-cart-delete" data-id="${item.id}">🗑</button>
                    </div> 
                    <div class="cart-item-total">${formatPrice(item.totalPrice)}</div>
                </div> `); }); // Я УЖЕ КРАААААСНЫЙ КУЛЬТУРНО НЕ ПОЛУЧИТСЯ БРАТАН
        
        cartSummary.html(`
            <div class="cart-total">
                <p>Товаров: <strong>${summary.totalItems} шт.</strong></p>
                <p>Итого: <strong>${summary.formattedTotalPrice}</strong></p>
            </div>
            <div class="cart-buttons">
                <button class="btn-clear-cart" id="btn-clear-cart">Очистить корзину</button>
                <button class="btn-checkout" id="btn-checkout">Оформить заказ</button>
            </div> `); }
}

function updateProductCard(productId) {
    const product = findProductById(productId);
    const cartItem = findCartItemById(productId);
    const inCart = cartItem ? cartItem.quantity : 0;
    
    $(`.product-card[data-id="${productId}"] .stock-count`).text(product.quantity);
    
    const cartStatus = $(`.cart-status[data-id="${productId}"]`);
    if (inCart > 0) {
        cartStatus.html(`<span class="in-cart-badge">В корзине: ${inCart} шт.</span>`);
        $(`.product-card[data-id="${productId}"] .btn-add-to-cart`).hide();
        $(`.product-card[data-id="${productId}"] .quantity-controls`).show();
        $(`.quantity-display[data-id="${productId}"]`).text(inCart); } 
    else {
        cartStatus.empty();
        $(`.product-card[data-id="${productId}"] .btn-add-to-cart`).show();
        $(`.product-card[data-id="${productId}"] .quantity-controls`).hide(); }
}

$(document).ready(function() {
    console.log('goddammit');
    
    $('.quantity-controls').hide();
    
    $('.btn-add-to-cart').click(function() {
        const productId = $(this).data('id');
        const result = addToCart(productId, 1);
        
        if (result.success) {
            showNotification(result.message, 'success');
            updateCartDisplay();
            updateProductCard(productId); } 
        else {
            showNotification(result.message, 'error'); }
    });
    
    $('.btn-plus').click(function() {
        const productId = $(this).data('id');
        const result = addToCart(productId, 1);
        
        if (result.success) {
            showNotification(result.message, 'success');
            updateCartDisplay();
            updateProductCard(productId); } 
        else {
            showNotification(result.message, 'error'); }
    });
    
    $('.btn-minus').click(function() {
        const productId = $(this).data('id');
        const result = removeFromCart(productId);
        
        if (result.success) {
            showNotification(result.message, 'info');
            updateCartDisplay();
            updateProductCard(productId); } });
    
    $(document).on('click', '.btn-cart-add', function() {
        const productId = $(this).data('id');
        const result = addToCart(productId, 1);
        
        if (result.success) {
            showNotification(result.message, 'success');
            updateCartDisplay();
            updateProductCard(productId); } 
        else {
            showNotification(result.message, 'error'); } });
    
    $(document).on('click', '.btn-cart-remove', function() {
        const productId = $(this).data('id');
        const result = removeFromCart(productId);
        
        if (result.success) {
            showNotification(result.message, 'info');
            updateCartDisplay();
            updateProductCard(productId); } });
    
    $(document).on('click', '.btn-cart-delete', function() {
        const productId = $(this).data('id');
        const result = removeItemCompletely(productId);
        
        if (result.success) {
            showNotification(result.message, 'info');
            updateCartDisplay();
            updateProductCard(productId); } });
    
    $(document).on('click', '#btn-clear-cart', function() {
        const result = clearCart();
        showNotification(result.message, 'info');
        updateCartDisplay();
        $('.product-card').each(function() {
            const productId = $(this).data('id');
            updateProductCard(productId); });
    });
    
    $(document).on('click', '#btn-checkout', function() {
        showNotification('Ох, славно! Чем платить будете: картой, наличными... Натурой? ( •̀ .̫ •́ )✧', 'info'); });
    
    setTimeout(() => {
        showNotification('Хм, добро пожаловать в Santana Medley.', 'info'); }, 500);
});