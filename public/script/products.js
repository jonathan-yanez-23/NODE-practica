window.onload = function(){
    buttons = document.getElementsByClassName("allproducts")[0].getElementsByTagName("button");
    for(let btn of buttons){
        btn.addEventListener("click", function(){
            const productId = btn.parentNode.id;
            const response = (
                async function(productId){
                    const xhr = new XMLHttpRequest();
                    const urlApi = "/users/add-to-cart";
                    xhr.open("PUT", urlApi);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    return await xhr.send(JSON.stringify({"productId":productId}));
                }
            )(productId);
            if(response){
                console.log(response);
            }else{
                alert("no hay response");
            }
        });
    }
}


