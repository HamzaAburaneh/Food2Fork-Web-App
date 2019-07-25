function getRecipe() {

    let recipeName = document.getElementById('recipe').value
    if(recipeName === '') {
        return alert('Please enter a recipe')
    }

    let recipeDiv = document.getElementById('recipeIngredient')
    recipeDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
 			recipeDiv.innerHTML = recipeDiv.innerHTML + `
			
			
            <li>
                <h2>Recipe for ${response.recipes[0].title} </h2>
                <a href="${response.recipes[0].f2f_url}">
                    <img src="${response.recipes[0].image_url}" border="5">
                </a>
            </li>

			`
        }
    }
    xhr.open('GET', `/recipes?ingredients=${recipeName}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13
document.getElementById("recipe")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});