const blance = document.getElementById('blance');
const money_income = document.getElementById('money-income');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


let transection = [];

function removedata(id){
    transection = transection.filter(transection=>transection.id !==id)
    init()
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function autoID(){
    return Math.floor(Math.random()*1000000)
}

function init(){
    list.innerHTML='';
    transection.forEach(addDataToList);
    calulate();
}

function addDataToList(transection){
    const symbol = transection.amount < 0 ? '-':'+';
    const check = transection.amount < 0 ? 'minus':'plus'
    const item=document.createElement('li');
    const result = numberWithCommas(Math.abs(transection.amount));
    item.classList.add(check);
    item.innerHTML = `${transection.text}<span>${symbol}${result}</span>
    <button class="delete-btn" onclick="removedata(${transection.id})">x</button>`;
    console.log(item);
    list.appendChild(item)
}

function calulate(){
    const amounts = transection.map(transection => transection.amount);
    //คำนวณยอดคงเหลือ
    const total = amounts.reduce((result,item)=>(result+= item),0).toFixed(2);
    //คำนวณนายรับ
    const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+= item),0).toFixed(2);
    //คำนวณรายจ่าย
    const expense = (amounts.filter(item=>item<0).reduce((result,item)=>(result+= item),0)*-1).toFixed(2);
    
    //display balance
    blance.innerText=`฿`+numberWithCommas(total);
    money_income.innerText=`฿`+numberWithCommas(income);
    money_minus.innerText=`฿`+numberWithCommas(expense);

}

function addTransection(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("โปรดรุบุข้อมูลให้ครบถ้วน...");
    }else{
      const data={
        id:autoID(),
        text:text.value,
        amount:+amount.value
      }
      transection.push(data);
      addDataToList(data);
      calulate();
      text.value='';
      amount.value='';
    }
}


form.addEventListener('submit',addTransection);
init();