
const btn = document.querySelector("#searchBtn")
console.log(btn);
const input = document.querySelector("#searchInput")
 
console.log(input);
let items = ""
const coinss = document.querySelector(".coins")
console.log(coinss);
btn.addEventListener("click", (e) => {
    e.preventDefault()
    


    fetch(`https://api.coinranking.com/v2/coins`)
    .then((res) => {
        if (!res.ok) {
            throw new Error("data couldn't fetched")
     
        } else {
        return res.json()
        }
    })
    .then((res) => {
        items=res.data.coins
        console.log(items);
        
        getCoins(items)
        deleteSame()
    })
    .catch((err) => {
        console.log(err)
    })


    
})





const getCoins = (response) => {
    // items.map((a)=>{
    //     console.log(a.name);})
    response.map((res) => {
    const { name, iconUrl,price,change,symbol } = res
    const coinName = input.value
    const newName = res.name
    //console.log(newName.toLowerCase);
    //console.log(coinName);
    //console.log(res.name);
    if(coinName.toLowerCase()===newName.toLowerCase()){
    const newPrice = ((Number(price)).toFixed(8))
    coinss.innerHTML += `
      <li class="coin">
      <h2 class="coin-name">${name}<sup>${symbol}</sup></h2>
      <p class="coin-temp">${newPrice}</p>
      <img class="coin-icon" src="${iconUrl}" alt="Avatar" >
      <p class="change">%${change}</p>
      </li>
      `
    }
    })
  }

const deleteSame = ()=>{
    //console.log("================");
    const lists = document.querySelectorAll(".coin")
    //console.log(lists);
    let count = 0
    lists.forEach((list)=>{
        const b=list.firstElementChild.innerText.toLowerCase()
        // console.log(b);
        // console.log(input.value);
        // console.log(list);
        console.log(count);
        if(b.includes(input.value)){
            count++
            if(count>1){
            list.remove()
            count = 0}
        }

    })
}
