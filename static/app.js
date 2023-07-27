
const $container = $('#cupcake-container')
const $form = $('#cupcake-form')
const $addBtn = $('#add-button')
const $cancel = $('#cancel-add')
const $submit = $('#submit')

$(loadAllCupcakes);
$addBtn.on('click',handleAddBtnClick)
$cancel.on('click', handleCancelClick)
$submit.on('click', handleAddCupcakeSubmit)

async function loadAllCupcakes(){
    response = await axios.get('/api/cupcakes')
    console.log(response)
    cupcakes = response.data.cupcakes
    console.log(cupcakes)
    for(let cupcake of cupcakes){
        const $cupcake = $(`<img src="${cupcake.image}" style="max-height: 150px;">
                            <h3 data-id="${cupcake.id}">${cupcake.flavor}</h3>
                            <ul>
                                <li>Size:${cupcake.size}</li>
                                <li>Rating:${cupcake.rating}</li>
                            </ul>`)
        $container.append($cupcake)
    }
}

function handleAddBtnClick(){
    $form.show()
    $addBtn.hide()
}

function handleCancelClick(e){
    e.preventDefault()
    $form.hide()
    $addBtn.show()
}

// form input variables
const $image = $('#image')
const $flavor = $('#flavor')
const $size = $('#size')
const $rating = $('#rating')

async function handleAddCupcakeSubmit(e){
    e.preventDefault()
    if (!validateFormInputs()) return
    console.log('Passed Validation')
    jsonResp = getJSON();
    await axios.post('/api/cupcakes', jsonResp, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    $container.empty()
    loadAllCupcakes()
}

function validateFormInputs(){
    console.log('in validation')
    if (!$flavor.val()) return false
    if (!$size.val()) return false
    if (!$rating.val()) return false
    return true
}
function getJSON(){
    obj ={
        flavor: $flavor.val(),
        size: $size.val(),
        rating: $rating.val(),
        image: $image.val()
    }

    return JSON.stringify(obj);
}