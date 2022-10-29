/*menu */
let userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRePassword,
    userNameAlert,
    userEmailAlert,
    userPhoneAlert,
    userAgeAlert,
    userpasswordAlert,
    userRepasswordAlert;
let mysidnav=$("#mysidnav").outerWidth()
$(document).ready(() => {
    $(".loading-container").fadeOut(3000, function() {
        $("body").css("overflow", "visible")
    })
})
$(".menu").click(()=>{
    if($(".nav-tab").css("left")=="0px"){
        $(".nav-tab").animate({"left":-mysidnav},500)
        $(".menu").animate({"left":"0px"},500);
    }
    else {
        $(".nav-tab").animate({"left":"0px"},500)
        $(".menu").animate({"left": "250px"},500);
        $(".item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1100) , $(".item2").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1200), $(".item3").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1300), $(".item4").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1400), $(".item5").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1500)
        console.log( $(".item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1100),)
    }
})
/**end */
let rowDate=document.getElementById("rowDate")
let array=[]
async function getDate(mealName){
    $(".loading-container").fadeIn(100)
    let meal= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    meal= await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
}
getDate(array)
function displayMeals(array) {
        let meals = ""
        for (let i = 0; i <array.length; i++) {
            meals += ` <div class="col-md-3">
            <div onclick="getMeal('${array[i].idMeal}')" class="">
            <div class="post">
                <img src='${array[i].strMealThumb}' class=" rounded w-100">
                <div class="layer d-flex  align-items-center">
                  <div class="info p-2">
                    <h2>${array[i].strMeal}</h2>
                  </div>
                </div>
            </div>
        </div>
        </div>`
        }
        rowDate.innerHTML = meals
    }
    async function getMeal(mealID) {
        $(".loading-container").fadeIn(100)
            let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
            meal = await meal.json()
            displayIdmeal(meal.meals[0])
            $(".loading-container").fadeOut(500)
         
        }

function displayIdmeal(meal){
     recipes = ""
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
      let mrl=""
        mrl+=`  <div class="col-md-4 text-white ">
        <img class="w-100" src="${meal.strMealThumb}">
        <h1>${meal.strMeal}</h1>
      </div>
      <div class="col-md-8 text-white text-left">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
            <p><span class="fw-bolder">Area: </span>${meal.strArea}</p>
            <p><span class="fw-bolder">Category: </span>${meal.strCategory}</p>
            <h3>Recipes :</h3>
            <ul class="d-flex flex-wrap" id="recipes">
          
            </ul>
            <h3 class="my-2 mx-2 p-1">Tags :</h3>
            <ul class="d-flex flex-wrap" id="tags">
            <li class="my-3 mx-1 p-2 bg-Danger rounded">${meal.strTags}</li>
            </ul>
            <a class="btn btn-success text-white   " href="${meal.strSource}" target="_blank">source</a>
            <a class="btn btn-danger text-white" href="${meal.strYoutube}" target="_blank">Youtub</a>
      </div>`
    
    rowDate.innerHTML = mrl
    recipes=document.getElementById("recipes").innerHTML
 
}
async function getCategories(list){
    $(".loading-container").fadeIn(100)
    let x= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let y= await x.json()
    array = y.categories; 
    displayCategories()      
    console.log(y)
    $(".loading-container").fadeOut(500)
}

function displayCategories() {
    let cat = ""
    for (let i = 0; i <array.length; i++) {
        cat += `<div class="col-md-3">
                    <div onclick="FillterCategories('${array[i].strCategory}')" class="">
                    <div class="post">
                        <img src="${array[i].strCategoryThumb}" class=" rounded w-100">
                        <div class="layer d-flex  align-items-center">
                          <div class="info p-2">
                            <h2>${array[i].strCategory}</h2>
                            <p class>${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                          </div>
                        </div>
                    </div>
                </div>
                </div>`
    }

    rowDate.innerHTML = cat
}
async function FillterCategories(category){
    $(".loading-container").fadeIn(100)
    let filter= await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    filter= await filter.json()
 console.log(filter)
 array = filter.category;
   displayMeals(filter.meals)
   $(".loading-container").fadeOut(100)
 
}
async function search(q){
    $(".loading-container").fadeIn(100)
    let meals= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals= await meals.json()
 console.log(meals)
 displayMeals(meals.meals)
 $(".loading-container").fadeOut(500)
 return meals;
}
async function getByLetter(letter) {
    if (letter) {
        
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
      
            displayMeals(meals.meals)
        
        
    }
}

   
$(".nav-item a").click(async (e) => {
    let list = e.target.getAttribute("data-list")
    if (list == "Categories") {
            $(".loading-container").fadeIn(100)
                   console.log("hello") 
                   getCategories(list)
                   $(".loading-container").fadeOut(500)
                   document.getElementById("search-container").innerHTML =search
                   search.classList.replace("d-block", "d-none")
                       
       }
       if (list == "Area") {
        $(".loading-container").fadeIn(100)
        console.log("hello") 
        getArea()
        $(".loading-container").fadeOut(500)
        document.getElementById("search-container").innerHTML =search
        search.classList.replace("d-block", "d-none")
            
}
if (list == "ingredients") {
    $(".loading-container").fadeIn(100)
    console.log("hello") 
    getIngredients()
    $(".loading-container").fadeOut(500)
    document.getElementById("search-container").innerHTML =search
    search.classList.replace("d-block", "d-none")
        
}
if(list == "search"){
    console.log("hello") 
    rowDate.innerHTML =""
    document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`
            $("#searchInput").keyup((e) => {
                search(e.target.value)
            })
            $("#letter").keyup((e) => {
                getByLetter(e.target.value)
            })
            
            // $('#letter').on("input", function () {
            //     if (this.value.length > 1)
            //         this.value = this.value.slice(0, 1);
            // });

}

if (list == "Contact") {
  
    rowDate.innerHTML=`   <section id="contact" class="container w-75 mx-auto">
    <div class="p-2">
        <h2 class="text-white text-center mb-5">ContacUs...</h2>
        <div class="row gy-4">
            <div class="col-md-6">
                <div class="form-group">
                 <input class="form-control shadow" id="name" placeholder="Enter Your Name" onkeyup="validation() ">
                 <div class="alert mt-1 d-none alert-danger" id="nameAlter" role="alert">Special Characters and Numbers not allowed</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                 <input class="form-control shadow" id="email" placeholder="Enter Your Email" onkeyup="validation() ">
                 <div class="alert mt-1 d-none alert-danger" id="emailAlter" role="alert">Enter valid email. *Ex: xxx@yyy.zzz</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                 <input class="form-control shadow" id="phone" placeholder="Enter phone" onkeyup="validation() ">
                 <div class="alert mt-1 d-none alert-danger" id="phoneAlter" role="alert">Enter valid Phone Number</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                 <input class="form-control shadow" id="age" placeholder="Enter Age" onkeyup="validation() ">
                 <div class="alert mt-1 d-none alert-danger" id="ageAlter" role="alert">Enter valid Age</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                 <input class="form-control shadow" id="Password" type="password" placeholder="Enter Password" onkeyup="validation() ">
                 <div class="alert mt-1 d-none alert-danger" id="paswwordAlter" role="alert">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                 <input class="form-control shadow" id="rePassword" placeholder="Enter Password" type="password" onkeyup="validation() ">
                 <div class="alert mt-1 d-none alert-danger" id="repasswordAlter" role="alert">Enter valid password </div>
                </div>
            </div>

        </div>
        <button class="btn btn-outline-danger m-auto mt-4 " id="sumbitBtn" disabled="true" type="button">Submit</button>
    </div>
     </section>    `
    
userName = document.getElementById("name");
userEmail = document.getElementById("email");
userPhone = document.getElementById("phone");
userAge = document.getElementById("age");
userPassword = document.getElementById("Password");
userRePassword = document.getElementById("rePassword");
userNameAlert = document.getElementById("nameAlter");
userEmailAlert = document.getElementById("emailAlter");
userPhoneAlert = document.getElementById("phoneAlter");
userAgeAlert = document.getElementById("ageAlter");
userpasswordAlert = document.getElementById("paswwordAlter");
userRepasswordAlert = document.getElementById("repasswordAlter");
// document.getElementById("search-container").innerHTML =search
// search.classList.replace("d-block", "d-none")
userName.addEventListener("focus", () => {
    nameToached = true
})
userEmail.addEventListener("focus", () => {
    emailToached = true
})
userPhone.addEventListener("focus", () => {
    phoneToached = true
})
userAge.addEventListener("focus", () => {
    ageToached = true
})
userPassword.addEventListener("focus", () => {
    passwordToached = true
})
userRePassword.addEventListener("focus", () => {
    repasswordToached = true
})

}
 })
   async function getArea(){
    $(".loading-container").fadeIn(100)
    let f= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let k= await f.json()
 console.log(k)
array=k.meals
   displayArea()
   $(".loading-container").fadeOut(500)
}


 function displayArea() {
        let e = ""
        for (var i = 0; i < array.length; i++) 
        e += `  <div class="col-md-3">
        <div onclick="(filterByArea('${array[i].strArea}'))" class="">
            <div class="post">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${array[i].strArea}</h2>
            </div>
        </div>
     </div>  `
        rowDate.innerHTML = e
       
 }
 
async function filterByArea(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
  
    
}
async function getIngredients(){
    $(".loading-container").fadeIn(100)
    let iden= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let k= await iden.json()
 console.log(k)
array=k.meals
displayIngredients()
$(".loading-container").fadeOut(500)
}

 function displayIngredients() {
        let e = ""
        for (var i = 0; i <20; i++) e += `
        <div class="col-md-3  my-3 myM  shadow">
            <div onclick="getMainIngredient('${array[i].strIngredient}')" class="movie shadow rounded position-relative">
                <div class="post text-center ">
                    <i class="fa-solid fa-bowl-food fa-3x"></i>
                    <h2 class="text-white">${array[i].strIngredient}</h2>
                    <p class="text-white">${array[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>`
        rowDate.innerHTML = e
        $("html, body").animate({
            scrollTop: 0
        }, 200)
    }
async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
    
}


function userNameValid() {
    let regex= /^[a-zA-Z ]+$/.test(userName.value)
    return regex
}

function userEmailValid() {
    let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
    return regex
}

function userPhoneValid() {
    let regex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
    return regex
}

function userAgeValid() {
    let regex=/^[1-9][0-9]?$|^100$/.test(userAge.value)
    return regex
}

function userPasswordValid() {
    let regex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
    return regex
}

function userRePasswordValid() {
   let x= userPassword.value == userRePassword.value
   return x
}

let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {
    if (nameToached) {
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailToached) {
        if (userEmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phoneToached) {
        if (userPhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (ageToached) {
        if (userAgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordToached) {
        if (userPasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordToached) {
        if (userRePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("sumbitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("sumbitBtn").setAttribute("disabled","false")
    }

}

// $(document).scroll((e) => {
//     if ($(document).scrollTop()) {
//         $(".mmm").css("backgroundColor", "#0D0D0D")
//     }
// })











































