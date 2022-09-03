const loadCatagory= async()=>{
    const url="https://openapi.programming-hero.com/api/news/categories";
    try{
        const res = await fetch(url)
        const data= await res.json()
        //return data;
        showCatagory(data.data.news_category)

    }catch(error){
       console.log(error);
    }
    
}
 
const showCatagory = (data)=>{
  // console.log(data);
  // const data=await loadCatagory();
   //const d=data.data.news_categor
   //console.log(data);
   const showCatagory=document.getElementById("showcatagory");
   for( const c of data){
    //console.log(c.category_name);
    showCatagory.classList.add('col');
    const div=document.createElement('div');
    div.innerHTML=`
       <p class=" mx-4 text-bold pt-2"  onclick="loadonDtails('${c.category_id }','${c.category_name }')"> ${c.category_name}</P>
    
    `
    showCatagory.appendChild(div);
   }
   
}
//showCatagory()
const loadonDtails = async(id,cName)=>{
    //console.log(id);
    //const url=` https://openapi.programming-hero.com/api/phone/${id}`
    const url=`https://openapi.programming-hero.com/api/news/category/${id}`
    const res=await fetch(url)
    const data=await res.json()
   // console.log(url);
    displayNews(data.data,cName);
   
}
const displayNews=(catagorys,cName)=>{
    //console.log(catagorys);
    let count=0
     catagorys.sort(({total_view:a}, {total_view:b}) => b-a);
    
    const spinner=document.getElementById("spenner");
  const mainSection=document.getElementById("main-section");
  mainSection.innerText='';
  //spiner start
   spinner.classList.remove('d-none')
   //for(const catagory of catagorys){
   catagorys.forEach(catagory=>{
   
  const div =document.createElement('div');
  
    div.innerHTML=`
    <div class="card mt-3" style="max-width: 800px mx-auto;">
            <div class="row g-0">
              <div class="col-md-4 ">
                <img src=${catagory.thumbnail_url} class=" img-fluid rounded h-100 "
                
                " alt="...">
              </div>
              <div class="col-md-8 ">
                <div class="card-body mt-4 pt-4">
                <h4 class="card-text">${catagory.title}.</h4>
                  <p class="card-text">${catagory.details.slice(0,300)}......</p>
                  <p class="card-text me-4 mt-4"> <span><img src=${catagory.author.img} class="img-fluid  rounded-circle m-2"
                  height="30" width="40" alt="...">${catagory.author.name?catagory.author.name:'N/A'}.</span>
                   <span class=" ms-4 ps-4 mt-4">
                   <img src=https://as2.ftcdn.net/v2/jpg/01/32/94/59/1000_F_132945953_OocCtBw9bTS7gz9C0jz0BAPDQktREyrS.jpg class="img-fluid rounded-start
                  "height="30" width="40" alt="..."><span >${catagory.total_view?catagory.total_view:0}
                   </span class="  mt-4">
                   <span onclick="loadNewsDtails('${catagory._id}')"
                   data-bs-toggle="modal" data-bs-target="#exampleModal" class=" ms-4 ps-4">
                   <img src="./images/arrow.png" height="30" width="30" class="">
                   
                   </span>
                  </P>
                 
                </div>
              </div>
            </div>
          </div>
        
    
    `
   count++;
   
    mainSection.appendChild(div);
    //stope spiner
     spinner.classList.add('d-none')
})
  // console.log(count);
   const foundItem=document.getElementById("found_item");
   const catagoryName=document.getElementById("showcatagory").innerText;
  
   foundItem.innerHTML=`
    <h3>${count} items found for catagory ${cName}</h3>
   `
  }


const loadNewsDtails = async(id)=>{
  const url=`https://openapi.programming-hero.com/api/news/${id}`
  const res=await fetch(url)
  const data=await res.json()
  
  displayNewsDtails(data.data[0]);
 
}
const displayNewsDtails =(news)=>{
  //console.log(news)
  const modalBody=document.getElementById('modal-body');
  modalBody.innerHTML=`
  <div class="card p-4">
  <img src=${news.image_url?news.image_url:'N/A'} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Title:${news.title}</h5>
    <p class="card-title">Title:${news.details.slice(0,200)}...</p>
  </div>
  <div class=" d-flex flex-row  mt-2">
  <small>
  <p class="card-text me-4"><img src=${news.author.img?news.author.img:'N/A'} class="img-fluid  rounded-circle m-2"
  height="30" width="40" alt="...">${news.author.name?news.author.name:'N/A'}<br>
    <span>${news.author.published_date?news.author.published_date:'N/A'}</span>
  </p>
 
 
  </small>
  <p class="card-text mt-2"><img src=https://as2.ftcdn.net/v2/jpg/01/32/94/59/1000_F_132945953_OocCtBw9bTS7gz9C0jz0BAPDQktREyrS.jpg class="img-fluid rounded-start
 "height="30" width="40" alt="..."><span >${news.total_view?news.total_view:0}</span></p>
 
  </div>  
</div>          
  
  
  `

}
loadonDtails('01','Breaking News')
loadCatagory();
