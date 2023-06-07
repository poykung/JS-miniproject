//เข้าถึง element ต่างๆในหน้าเว็บโดยอ้างอิงผ่าน id

//select dropdown menu
const currency_origin = document.getElementById('currency-origin');
const currency_destination = document.getElementById('currency-destination');

//input text
const amount_origin = document.getElementById('amount-origin');
const amount_destination = document.getElementById('amount-destination');

//rate
const rate = document.getElementById('rate');
//switch currency
const swap = document.getElementById('btn');

currency_origin.addEventListener('change',calculate); //กำหนด event ให้กับ select dropdown menu
currency_destination.addEventListener('change',calculate);
amount_origin.addEventListener('input',calculate)
amount_destination.addEventListener('input',calculate)

//งง โว้ยยยยยย!!!

function calculate(){
    const get_origin = currency_origin.value; 
    const get_destination = currency_destination.value; 
    fetch(`https://v6.exchangerate-api.com/v6/67fb1fa705fea323888c5cdc/latest/${get_origin}`)
    .then(res=>res.json()).then(data=>{
        const ratetext = data.conversion_rates[get_destination]
        rate.innerText = `1 ${get_origin} = ${ratetext} ${get_destination}`
        amount_destination.value=(amount_origin.value*ratetext).toFixed(2);
    })
    
}

swap.addEventListener('click',()=>{
    const temp = currency_origin.value;
    currency_origin.value=currency_destination.value;
    currency_destination.value = temp;
    calculate();
})

calculate();
