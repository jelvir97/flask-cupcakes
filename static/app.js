
const $container = $('#cupcake-container')

$(loadAllCupcakes);

async function loadAllCupcakes(){
    response = await axios.get('/api/cupcakes')
    console.log(response)
    cupcakes = response.data.cupcakes
    console.log(cupcakes)
    for(let cupcake of cupcakes){
        const $cupcake = $(`<img src="${cupcake.image}">
                            <h3 data-id="${cupcake.id}">${cupcake.flavor}</h3>
                            <ul>
                                <li>Size:${cupcake.size}</li>
                                <li>Rating:${cupcake.rating}</li>
                            </ul>`)
        $container.append($cupcake)
    }
}