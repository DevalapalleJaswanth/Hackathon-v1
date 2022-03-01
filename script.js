let searchdata="";
let mark=0;
let div1=document.createElement("div");
document.body.append(div1);
div1.setAttribute("class","center");
let container=document.createElement("div");
document.body.append(container);


async function search(){
  console.log(event.target.value);
  searchdata=event.target.value;
  if(searchdata!==""){
    container.innerHTML="";
    let res= await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchdata}`,
    {method:"GET"}
    );
    let data=await res.json();
    mark=1;
    data.forEach((item)=> displayData(item));
  }
  else {
      mark=0;
      getData();

  }
}


async function displayDetails(id) {

    let res= await fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`,
    {method:"GET"}
    );
    let item= await res.json();
    console.log(id,item);
    container.innerHTML="";
    div1.innerHTML="";
    container.innerHTML+=`<div class="container">
    <div class="margin" onclick="getData()">
         Back
    </div>
    <div >
        <img src=${item.image_link} alt="" class="container-image"  >
    </div>
    <div class="inner-card">
    <div>
        <div class="name margin">${item.name}</div>
        <div class="brand margin">${item.brand}</div>
    </div>
    <div class="price margin">
         ${item.price_sign}${item.price}
    </div>
    <div>
        <div class="brand margin">${item.description}</div>
    </div>
    <div class="margin">
       Visit:
       <a href=${item.product_link}>${item.product_link}</a>
    </div>
    </div>
    </div>`
}

function displayData(item){
   
    container.innerHTML+=`<div class="card" onclick="displayDetails(${item.id})">
    <div >
        <img src=${item.image_link} alt="" class="image"  >
    </div>
    <div class="inner-card">
    <div>
        <div class="name margin">${item.name}</div>
        ${mark===0? `<div class="brand margin">${item.brand}</div>`: `<div class="brand margin"><mark>${item.brand}</mark></div>`}
    </div>
    <div class="price margin">
         ${item.price_sign}${item.price}
    </div>
    </div>
    </div>`
    
}
async function getData(){
    mark=0;
    container.innerHTML="";
    div1.innerHTML=`<input type="text" placeholder="Search" onchange='search()'>`
    try{
   let  res= await fetch("https://makeup-api.herokuapp.com/api/v1/products.json",
   {method:"GET"}
   );
   console.log(res);
   data=await res.json();
   console.log(data); 
   container.innerHTML="";
   container.setAttribute("class","card-container");
   
   data.forEach((item)=> displayData(item));
    }
    catch(err){
        console.log(err);
    }
} 
getData();