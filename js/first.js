
const seatPrice = 550;
const maxSeats = 4;
let seatsLeft = 40;
let selectedSeats = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    const seatsContainer = document.getElementById('seats');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    rows.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('flex');
        
        const rowHeading = document.createElement('h1');
        rowHeading.classList.add('row');
        rowHeading.innerText = row;
        rowElement.appendChild(rowHeading);
        
        for (let i = 1; i <= 4; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.id = row + i;
            seat.innerText = row + i;
            seat.addEventListener('click', () => selectSeat(seat));
            rowElement.appendChild(seat);
        }
        
        seatsContainer.appendChild(rowElement);
    });
});
function selectSeat(seat) {
    if (!seat.classList.contains('disabled') && selectedSeats.length < maxSeats) {
        selectedSeats.push(seat.id);
        totalPrice += seatPrice;
        seatsLeft--;
        updateSeatsLeft();
        updateSelectedSeats();
        updateTotalPrice();
        seat.classList.add('disabled');
        seat.classList.add('selected');
        if (selectedSeats.length === maxSeats) {
            document.getElementById('applyCouponButton').disabled = false;
        }
    } else {
        alert('You can select a maximum of 4 seats.');
    }
}
function updateSeatsLeft() {
    document.getElementById('seatsLeft').innerText = 'Seats Left: ' + seatsLeft;
}
function updateSelectedSeats() {
    document.getElementById('selectedSeats').innerText = 'Selected Seats: ' + selectedSeats.join(', ');
}
function updateTotalPrice() {
    document.getElementById('totalPrice').innerText = 'Total Price: $' + totalPrice;
}
const couponInput = document.getElementById('couponInput');
const applyCouponButton = document.getElementById('applyCouponButton');

couponInput.addEventListener('input', () => {
    applyCouponButton.disabled = !(couponInput.value === 'NEW15' || couponInput.value === 'Couple20');
});

applyCouponButton.addEventListener('click', () => {
    let discount = 0;
    if (couponInput.value === 'NEW15') {
        discount = totalPrice * 0.15;
    } else if (couponInput.value === 'Couple20') {
        discount = totalPrice * 0.20;
    }
    const grandTotal = totalPrice - discount;
    document.getElementById('totalPrice').innerText = 'Grand Total after Discount: $' + grandTotal;
    couponInput.style.display = 'none';
    applyCouponButton.style.display = 'none';
});