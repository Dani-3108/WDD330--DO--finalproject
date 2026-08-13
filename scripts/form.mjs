//Form section 
const products = ["OptiX", "CorteX", "FleX-Gen"];
const selectElement = document.getElementById("productName");
//foor loop section
if (selectElement) {
    products.forEach(product => {
        let option = document.createElement("option");
        option.setAttribute("value", product)
        option.textContent = product;
        selectElement.appendChild(option);

    });
}
///