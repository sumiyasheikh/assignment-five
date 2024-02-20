let selectedSeatsCount = 0;
const selectedSeatsList = document.getElementById('seat');
const classList = document.getElementById('class');
const priceList = document.getElementById('price');
const supTag = document.getElementById('seat-count');
const seatsLeftSpan = document.getElementById('seats-left');
const totalPriceSpan = document.getElementById('total-price');
const grandTotalSpan = document.getElementById('grand-total');

document.addEventListener('click', 
function(event){
    if(event.target.classList.contains('seat')){
        const seatId = event.target.id;
        const seat = document.getElementById(seatId);
        if(!seat.classList.contains('disabled') && selectedSeatsCount < 4){
            seat.style.color = 'white';
            seat.style.backgroundColor = '#1DD100';
            seat.classList.add('disabled');
            seat.classList.remove('opacity-50');
            selectedSeatsCount++;

            const selectedSeatItem = document.createElement('li');
            selectedSeatItem.textContent = seatId;
            selectedSeatsList.appendChild(selectedSeatItem);

            const classItem = document.createElement('li');
            classItem.textContent = 'Economy';
            classList.appendChild(classItem);

            const priceItem = document.createElement('li');
            priceItem.textContent = '550';
            priceList.appendChild(priceItem);

            const currentCount = parseInt(supTag.textContent);
            supTag.textContent = currentCount + 1;

            const seatsLeft = parseInt(seatsLeftSpan.textContent);
            seatsLeftSpan.textContent = seatsLeft - 1;

            const currentTotalPrice = parseInt(totalPriceSpan.textContent);
            totalPriceSpan.textContent = currentTotalPrice + 550;
            grandTotalSpan.textContent = currentTotalPrice + 550;
        }
        else if(selectedSeatsCount >= 4){
            alert('Not more than four seats can be booked.');
        }
        else{
            alert(seatId + ' is already booked.');
        }
    }
});

const couponInput = document.getElementById('coupon-input');
const applyButton = document.getElementById('apply-button');
const couponDiv = document.getElementById('coupon-div');

couponInput.addEventListener('input', 
function(){
    const couponCode = couponInput.value;
    const validCouponCodes = ['NEW15', 'Couple 20'];

    if(!validCouponCodes.includes(couponCode)){
        document.getElementById('coupon-message').textContent = 'Please enter a valid coupon code';
    }
    else{
        document.getElementById('coupon-message').textContent = '';
    }

    if(selectedSeatsCount === 4 && (couponCode === 'NEW15' || couponCode === 'Couple 20')){
        applyButton.disabled = false;
        applyButton.classList.remove('disabled');
        applyButton.style.backgroundColor = '#27AE60';
    }
    else{
        applyButton.disabled = true;
        applyButton.classList.add('disabled');
        applyButton.style.backgroundColor = '#1DD100';
    }
});

applyButton.addEventListener('click', 
function(){
    const couponCode = couponInput.value;
    let discountPercentage = 0;

    if(couponCode === 'NEW15'){
        discountPercentage = 0.15;
    }
    else if(couponCode === 'Couple 20'){
        discountPercentage = 0.20;
    }
    if(discountPercentage > 0){
        const discount = parseInt(totalPriceSpan.textContent) * discountPercentage;
        const grandTotal = parseInt(totalPriceSpan.textContent) - discount;

        grandTotalSpan.textContent = grandTotal;
        couponDiv.style.display = 'none';
        appendDiscountItem('Discount', discount);
    }
});

function appendDiscountItem(discountText, discountValue){
    const priceHeadingList = document.getElementById('price-heading');
    const discountItem = document.createElement('li');

    discountItem.textContent = discountText;
    priceHeadingList.appendChild(discountItem);

    const priceDiscountAddList = document.getElementById('price-discount-add');
    const discountValueItem = document.createElement('li');

    discountValueItem.textContent = 'BDT ' + discountValue;
    priceDiscountAddList.appendChild(discountValueItem);
}

const phoneNumberInput = document.getElementById('phone-number-input');
const nextButton = document.getElementById('next-button');

phoneNumberInput.addEventListener('input', 
function(){
    checkInputs();
});

document.addEventListener('click', 
function(event){
    if(event.target.classList.contains('seat')){
        checkInputs();
    }
});

function checkInputs(){
    const selectedSeatsCount = document.querySelectorAll('.seat.disabled').length;
    const phoneNumber = phoneNumberInput.value;

    if(selectedSeatsCount >= 1 && phoneNumber !== ''){
        nextButton.disabled = false;
        nextButton.style.backgroundColor = '#27AE60';
    }
    else{
        nextButton.disabled = true;
        nextButton.style.backgroundColor = '#1DD100';
    }

    nextButton.addEventListener('click', 
    function(){
        if(selectedSeatsCount >= 1 && phoneNumber !== ''){
            document.querySelector('.seat-selection-section').style.display = 'none';
            document.querySelector('.success-message-section').style.display = 'block';
        }
    });
}