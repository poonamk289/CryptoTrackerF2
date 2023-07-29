const gridClick= document.getElementById("grid-click");
const listClick= document.getElementById("list-click");
const container= document.getElementById("container");
const listcontainer= document.getElementById("container-list");
  
const addingContainer=document.getElementById("addingContainer");
const addingListContainer1=document.querySelector("tbody");



gridClick.addEventListener("click",()=>{
    // console.log(container);

    gridClick.style.borderBottomColor ="rgb(15, 49, 217)";
    listClick.style.borderBottomColor ="black";
    container.style.display="block";
    listcontainer.style.display="none";
   
    fetchGridData();
});
listClick.addEventListener("click",()=>{
    // console.log(container);
    listClick.style.borderBottomColor ="rgb(15, 49, 217)";
    gridClick.style.borderBottomColor ="black";
    listcontainer.style.display="block";
    container.style.display="none";
    // listClick.style.borderBottomStyle ="2px solid red";
    fetchListData();
});

let url=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;

async function fetchGridData(){
    // console.log("sadas");
    const response = await fetch(url,{method: "GET"});
    const result = await response.json();
    // console.log(result.length);
    addGridData(result);
}

// fetchGridData();
function addGridData(result){
    for(let i=0;i<result.length;i++){
        const div= document.createElement("div");
        div.className="box";
        const symbol=(""+result[i].symbol).toUpperCase();
        const pricechange= (result[i].price_change_percentage_24h).toFixed(2);
        // console.log(pricechange);
     
        div.innerHTML=`
                <div class="box-head">
                    <div>
                        <image style="height: 50px;width:50px;"
                        src="${result[i].image}">

                    </div>
                    <div class="box-title">
                        <span>${symbol}</span>
                        <span>${result[i].name}</span>
                    </div>
                    </div>
                    <div class="box-middle" id="box-middle">
                        <span id="${result[i].id}">${pricechange}%</span>
                    </div>
                    <div class="box-middle2">
                        <div id="val-${result[i].id}">$${result[i].current_price}</div>
                    </div>
                    <div class="box-lower">
                        <div>Total Volume: <span>${result[i].total_volume}</span></div>
                        <div>Market Cap: <span>$${result[i].market_cap}</span></div>
                        
                </div>
            `;
            
            addingContainer.appendChild(div);
            let boxMiddle=document.getElementById(`${result[i].id}`);
            let boxMiddle2=document.getElementById(`val-${result[i].id}`);
            // console.log(boxMiddle);
            
            if(pricechange<0){
                boxMiddle.style.color="red";
                boxMiddle2.style.color="red";
                boxMiddle.style.borderColor="red";

            }
                          
    }

}
fetchGridData();

async function fetchListData(){
    // console.log("sadas");
    const response = await fetch(url,{method: "GET"});
    const result = await response.json();
    // console.log(result.length);
    addListData(result);
}
function addListData(result){
    for(let i=0;i<result.length;i++){
        const tr= document.createElement("tr");
       // div.className="box-list";
        const symbol=(""+result[i].symbol).toUpperCase();
        const pricechange= (result[i].price_change_percentage_24h).toFixed(2);
        const currentPrice= (result[i].current_price).toFixed(2);
        // console.log(pricechange);
    //     div.innerHTML=`
    //     <div class="box-head">
    //     <div>
    //         <image style="height: 40px;width:40px;"
    //         src="${result[i].image}">

    //     </div>
    //     <div class="box-title">
    //         <span>${symbol}</span>
    //         <span>${result[i].name}</span>
    //     </div>
    // </div>
    // <div class="box-middle">
    //     <span>${pricechange}</span>
    // </div>
    // <div class="box-middle2">
    //     <div>$${result[i].current_price}</div>
    // </div>
    // <div class="box-lower-list">
    //     <div><span>${result[i].total_volume}</span></div>
    //     <div><span>$${result[i].market_cap}</span></div>
        
    // </div>
    //     `;
        tr.innerHTML=`<td id="img-logo" >
                    <div class="box-head">
                        <div>
                            <image style="height: 40px;width:40px;"
                            src="${result[i].image}">
                
                        </div>
                        <span class="box-title">
                            <span>${symbol}</span>
                            <span>${result[i].name}</span>
                        </span>
                    </div>
                </td>
                <td style=" width: 15vw;">
                    <div class="box-middle">
                    <span id="list-${result[i].id}">${pricechange}%</span>
                    </div>
                </td>
                <td style=" width: 15vw;"> 
                    <div class="box-middle2">
                    <div id="val2-${result[i].id}">$${currentPrice}</div>
                    </div>
                </td>
                <td>
                    <div><span>${result[i].total_volume}</span></div>
                </td>
                <td>
                    <div><span>$${result[i].market_cap}</span></div>
                </td>

        `;
        addingListContainer1.appendChild(tr);
          
            
            if(pricechange<0){

                let tableboxMiddle=document.getElementById(`list-${result[i].id}`);
            let tableboxMiddle2=document.getElementById(`val2-${result[i].id}`);
            // console.log(tableboxMiddle);
            // console.log(tableboxMiddle2);
                tableboxMiddle.style.color="red";
                tableboxMiddle2.style.color="red";
                tableboxMiddle.style.borderColor="red";

            }
    }
}