
const RANDOM_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/random.php'

const recipeBtn = document.querySelector('.recipe-btn')

recipeBtn.addEventListener('click', e => {
  
  e.preventDefault()

  fetch(RANDOM_MEAL_API)
  .then(response => response.json())
    .then(data => {
      const meal = data.meals[0]
      console.log("meal", meal)
    
      const img = document.querySelector('.meal-img')
      img.src = meal.strMealThumb

      const ratingNumber = document.querySelector('.rating-number')
      let randomNumber = Math.floor (Math.random() * 9) + 1;
      ratingNumber.innerHTML = `<div class="rating-number">4.${randomNumber}<div class="rating-subnumber">/5</div></div>`


      const htmlTags = Array.from(document.querySelectorAll('.recipe-tag'))

      // checks to see if a category exist and if so gives its name to HTML and displays
      if(meal.strTags){
        const generatedTags = meal.strTags.split(',')
        htmlTags[0].classList.remove('invisible')
        htmlTags[0].innerText = generatedTags[0]

        if(generatedTags[1]){
          htmlTags[1].classList.remove('invisible')
          htmlTags[1].innerText = generatedTags[1]
        }else{
          htmlTags[1].classList.add('invisible')
        }

      }else if(meal.strTags == null){
        htmlTags[0].classList.add('invisible')
        htmlTags[1].classList.add('invisible')
      }

      const recipeTitle = document.querySelector('.recipe-title')
      recipeTitle.innerText = meal.strMeal

      const recipeId = document.querySelector('.recipe-id')
      recipeId.innerHTML = meal.idMeal

      const recipeArea = document.querySelector('.recipe-area')
      const recipeCategory = document.querySelector('.recipe-category')
      recipeCategory.innerText = meal.strCategory
      recipeArea.innerText = meal.strArea


      // removes previous ingredients checking if they havent the invisible class
      const ingredientParent = document.querySelector('.ingredients-grid')
      Array.from(ingredientParent.children).forEach(e => {
        if(!e.classList.contains("invisible")){
          e.remove()
        }
      });

      // verify the ingredients existent (I didn't find a better way to do this)
      for(let i=0;i<20;i++){
        // the 9 key is the first ingredient and 28 key is the last ingredient possible (20 ingredients possible to exist)
        const number = i + 9
        if((Object.values(meal)[`${number}`])){
          console.log((Object.values(meal)[`${number}`]))
          const ingredientTemplate = document.querySelector('.ingredient-item')

          const ingredientClone = ingredientTemplate.cloneNode()
          ingredientClone.innerText = (Object.values(meal)[`${number}`])
          ingredientClone.classList.remove('invisible')
          ingredientParent.appendChild(ingredientClone)
          
        }else{
          console.log("dont exist")
        }
      }

      const instructionsText = document.querySelector('.instructions-text')
      instructionsText.innerText = meal.strInstructions
      
      const video = document.querySelector('.video')
      // video.src = meal.strYoutube
      const youtubeEmbed = meal.strYoutube.replace('watch?v=', 'embed/')
      
      video.src = youtubeEmbed

    })

  })

