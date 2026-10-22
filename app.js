const menu=[
{category:"Бургеры",items:[
{name:"Шеф Бургер",price:195,img:"photo-1568901346375-23c9450c58cd",tag:"Хит"},
{name:"Врап Бургер",price:260,img:"photo-1553979459-d2229ba7433a"},
{name:"Бургер",price:170,img:"photo-1550547660-d9450f859349"},
{name:"Бургер Двойной",price:210,img:"photo-1571091718767-18b5b1457add"},
{name:"Чизбургер",price:185,img:"photo-1568901346375-23c9450c58cd"},
{name:"Чизбургер Двойной",price:240,img:"photo-1553979459-d2229ba7433a"},
{name:"Бургер Чили",price:170,img:"photo-1550547660-d9450f859349"},
{name:"Бургер Ассорти",price:210,img:"photo-1571091718767-18b5b1457add"}]},
{category:"Степ-роллы",items:[
{name:"Твистер-Ролл",price:250,img:"photo-1626700051175-6818013e1d4f"},
{name:"Степ-Ролл",price:220,img:"photo-1626700051175-6818013e1d4f"},
{name:"Степ-Ролл Двойной",price:260,img:"photo-1626700051175-6818013e1d4f"},
{name:"Степ-Ролл Сырный",price:280,img:"photo-1626700051175-6818013e1d4f"},
{name:"Степ-Ролл Ассорти",price:260,img:"photo-1626700051175-6818013e1d4f"}]},
{category:"Пиццы",items:[
...["Сырная","Маргарита","Пепперони","Чили","Мексиканская","Американская","Куриная","Ассорти","Мега Мясная"].map((n,i)=>({name:n,variants:[{label:"30 см",price:[450,450,490,670,590,650,580,660,700][i]},{label:"40 см",price:[560,560,590,770,710,730,700,790,810][i]}],img:["photo-1579751626657-72bc17010498","photo-1571407970349-bc81e7e96d47","photo-1628840042765-356cda07504e"][i%3],desc:"Выберите размер"}))]},
{category:"Хрустящие крылышки",items:[
...[
["Острые крылышки",[[25,860],[20,760],[10,430],[5,260]]],
["BBQ Крылышки",[[25,950],[20,850],[10,530],[5,290]]]
].flatMap(([name,vs])=>vs.map(([count,price])=>({name,variantLabel:count+" шт.",price,img:"photo-1527477396000-e27163b481c2"})))]},
{category:"Твистер Боул и другое",items:[
{name:"Твистер Боул — в сырном соусе",price:280,img:"photo-1547592180-85f173990554"},
{name:"Твистер Боул — в кисло-сладком соусе",price:290,img:"photo-1547592180-85f173990554"},
{name:"Твистер Боул — в BBQ соусе",price:290,img:"photo-1547592180-85f173990554"},
{name:"Рамен",price:260,img:"photo-1569718212165-3a8278d5f624"},
{name:"Самса с курицей",price:80,img:"photo-1601050690597-df0568f70950"},
{name:"Самса с сыром",price:80,img:"photo-1601050690597-df0568f70950"},
{name:"Кранч Дог",price:160,img:"photo-1612392062631-94dd858cba88"}]},
{category:"Гарниры",items:[
{name:"Фри",price:120,img:"photo-1573080496219-bb080dd4f877"},
{name:"Сырные палочки (5 шт.)",price:180,img:"photo-1531749668029-2db88e4276c7"},
{name:"Картошка по-деревенски",price:140,img:"photo-1518013431117-eb1465fa5752"}]},
{category:"Соусы",items:[
{name:"Чесночный соус",price:30,img:"photo-1472476443507-c7a5948772fc"},
{name:"Сырный соус",price:30,img:"photo-1472476443507-c7a5948772fc"},
{name:"Кетчуп",price:30,img:"photo-1472476443507-c7a5948772fc"},
{name:"BBQ",price:35,img:"photo-1472476443507-c7a5948772fc"},
{name:"Кисло-сладкий соус",price:35,img:"photo-1472476443507-c7a5948772fc"}]},
{category:"Чай",items:[
{name:"Ягодный чай (0,420 мл)",price:120,img:"photo-1556679343-c7306c1976bc"},
{name:"Манго-маракуйя (0,420 мл)",price:120,img:"photo-1556679343-c7306c1976bc"},
{name:"Цитрусовый чай (0,420 мл)",price:120,img:"photo-1556679343-c7306c1976bc"},
{name:"Малиновый чай (0,420 мл)",price:120,img:"photo-1556679343-c7306c1976bc"},
{name:"Чай чёрный (0,420 мл)",price:50,img:"photo-1556679343-c7306c1976bc"},
{name:"Чай зелёный (0,420 мл)",price:50,img:"photo-1556679343-c7306c1976bc"}]}
];

const cartKey="obzhorka_cart_v1";
let cart=JSON.parse(localStorage.getItem(cartKey)||"[]");
let orderType="delivery";
let activeCategory="Все";

const money=n=>new Intl.NumberFormat("ru-RU").format(n);
const imgUrl=id=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=700&q=78";

function renderCats(){
  const names=["Все",...menu.map(s=>s.category)];
  document.getElementById("catbar").innerHTML=names.map(n=>'<button class="cat '+(activeCategory===n?"active":"")+'" onclick="chooseCategory('+JSON.stringify(n)+')">'+n+'</button>').join("");
}

function chooseCategory(n){
  activeCategory=n;
  renderCats();
  if(n!=="Все")document.getElementById("section-"+slug(n))?.scrollIntoView({behavior:"smooth",block:"start"});
  else document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}

function slug(s){return s.toLowerCase().replace(/[^a-zа-я0-9]+/gi,"-")}

function renderMenu(){
  const q=document.getElementById("search").value.trim().toLocaleLowerCase("ru");
  let html="";
  menu.forEach(section=>{
    if(activeCategory!=="Все"&&section.category!==activeCategory)return;
    const items=section.items.filter(i=>(i.name+" "+section.category).toLocaleLowerCase("ru").includes(q));
    if(!items.length)return;
    html+='<section class="menu-section" id="section-'+slug(section.category)+'"><h3 class="menu-title">'+section.category+'</h3><div class="grid">'+items.map(i=>cardHTML(i,section.category)).join("")+'</div></section>';
  });
  document.getElementById("menuRoot").innerHTML=html||'<div class="empty">Ничего не найдено. Попробуйте изменить запрос.</div>';
}

function cardHTML(i,category){
  const variants=i.variants||null;
  const chosen=variants?variants[0]:null;
  const variantLabel=i.variantLabel||"";
  const currentPrice=chosen?chosen.price:i.price;
  const options=variants
    ?'<div class="options">'+variants.map((v,n)=>'<button class="option '+(!n?"selected":"")+'" data-var="'+n+'" onclick="selectVariant(this)">'+v.label+'</button>').join("")+'</div>'
    :(variantLabel?'<div class="options"><span class="option selected">'+variantLabel+'</span></div>':"");
  const info={name:i.name,category,price:currentPrice,img:i.img,variant:chosen?chosen.label:variantLabel,variants};
  const data=encodeURIComponent(JSON.stringify(info));
  return '<article class="card"><div class="photo" style="background-image:url('+imgUrl(i.img)+')">'+(i.tag?'<span class="tag">'+i.tag+'</span>':"")+'</div><div class="card-body"><h3>'+i.name+'</h3><div class="desc">'+(i.desc||"Приготовлено с заботой · Халяль")+'</div>'+options+'<div class="card-foot"><span class="price" data-price>'+money(currentPrice)+' с</span><button class="add" aria-label="Добавить '+i.name+'" data-item="'+data+'" onclick="addFromCard(this)">+</button></div></div></article>';
}

function selectVariant(btn){
  const card=btn.closest(".card");
  const idx=Number(btn.dataset.var);
  const info=JSON.parse(decodeURIComponent(card.querySelector(".add").dataset.item));
  const v=info.variants[idx];
  card.querySelectorAll(".option").forEach((b,n)=>b.classList.toggle("selected",n===idx));
  card.querySelector("[data-price]").textContent=money(v.price)+" с";
  info.price=v.price;
  info.variant=v.label;
  card.querySelector(".add").dataset.item=encodeURIComponent(JSON.stringify(info));
}

function addFromCard(btn){addItem(JSON.parse(decodeURIComponent(btn.dataset.item)))}

function addItem(info){
  const existing=cart.find(x=>x.name===info.name&&x.variant===info.variant);
  if(existing)existing.qty++;
  else cart.push({...info,qty:1});
  saveCart();
  toast("Добавлено в корзину");
}

function saveCart(){
  localStorage.setItem(cartKey,JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const count=cart.reduce((n,x)=>n+x.qty,0);
  const total=cart.reduce((n,x)=>n+x.qty*x.price,0);
  document.getElementById("navCount").textContent=count;
  document.getElementById("fabCount").textContent=count;
  document.getElementById("fabTotal").textContent=money(total);
  document.getElementById("cartFab").classList.toggle("show",count>0);
  document.getElementById("total").textContent=money(total)+" с";
  document.getElementById("cartItems").innerHTML=cart.length
    ?cart.map((x,i)=>'<div class="cart-row"><div><strong>'+x.name+(x.variant?" · "+x.variant:"")+'</strong><small>'+money(x.price)+' с × '+x.qty+' = '+money(x.price*x.qty)+' с</small></div><div class="qty"><button onclick="changeQty('+i+',-1)">−</button><span>'+x.qty+'</span><button onclick="changeQty('+i+',1)">+</button></div></div>').join("")
    :'<div class="cart-empty">Корзина пока пуста.<br>Добавьте что-нибудь вкусное из меню 🍔</div>';
}

function changeQty(i,d){
  cart[i].qty+=d;
  if(cart[i].qty<=0)cart.splice(i,1);
  saveCart();
}

function openCart(){
  document.getElementById("shade").classList.add("open");
  document.getElementById("drawer").classList.add("open");
  document.body.style.overflow="hidden";
}

function closeCart(){
  document.getElementById("shade").classList.remove("open");
  document.getElementById("drawer").classList.remove("open");
  document.body.style.overflow="";
}

function setType(t){
  orderType=t;
  document.getElementById("deliveryBtn").classList.toggle("selected",t==="delivery");
  document.getElementById("pickupBtn").classList.toggle("selected",t==="pickup");
  document.getElementById("addressField").style.display=t==="delivery"?"flex":"none";
  document.getElementById("address").required=t==="delivery";
  document.getElementById("entrance").parentElement.style.display=t==="delivery"?"flex":"none";
  document.getElementById("floor").parentElement.style.display=t==="delivery"?"flex":"none";
}

function toast(s){
  const t=document.getElementById("toast");
  t.textContent=s;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1700);
}

document.getElementById("search").addEventListener("input",renderMenu);

document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!cart.length){toast("Сначала добавьте блюда в корзину");return}
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const address=document.getElementById("address").value.trim();
  const entrance=document.getElementById("entrance").value.trim();
  const floor=document.getElementById("floor").value.trim();
  const comment=document.getElementById("comment").value.trim();
  const total=cart.reduce((n,x)=>n+x.qty*x.price,0);
  const orderNo=String(Date.now()).slice(-6);
  const lines=[
    "Здравствуйте! Хочу оформить заказ №"+orderNo+".",
    "",
    "Мой заказ:",
    ...cart.map((x,i)=>(i+1)+". "+x.name+(x.variant?" ("+x.variant+")":"")+" × "+x.qty+" — "+money(x.price*x.qty)+" сом"),
    "",
    "Итого: "+money(total)+" сом",
    "Способ получения: "+(orderType==="delivery"?"Доставка":"Самовывоз"),
    "Имя: "+name,
    "Телефон: "+phone
  ];
  if(orderType==="delivery"){
    lines.push("Адрес: "+address);
    if(entrance)lines.push("Подъезд: "+entrance);
    if(floor)lines.push("Этаж / квартира: "+floor);
  }
  if(comment)lines.push("Комментарий: "+comment);
  lines.push("Стоимость доставки прошу подтвердить.");
  const url="https://wa.me/996501777232?text="+encodeURIComponent(lines.join("\n"));
  window.open(url,"_blank","noopener");
  cart=[];
  saveCart();
  closeCart();
  e.target.reset();
  setType("delivery");
});

renderCats();
renderMenu();
renderCart();
setType("delivery");