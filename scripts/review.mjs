////////////// Form data retrieval
const dataRetrieval = new URLSearchParams(window.location.search);
console.log(dataRetrieval);
document.querySelector("#results").innerHTML = `
<h3>Your information</h3>
<p>Name: ${dataRetrieval.get("yourname")}</p>
<p>Company Email Address: ${dataRetrieval.get("youremail")}</p>
<p>Phone Number: ${dataRetrieval.get("yourphone")}</p>
<p>Your Company: ${dataRetrieval.get("yourcompany")}</p>
<p>Your Position: ${dataRetrieval.get("yourtitle")}</p>
<h3>Product</h3>
<p>Product: ${dataRetrieval.get("productName")}</p>
<p>How did you hear about us?: ${dataRetrieval.get("hearfromus")}</p>
<p>Comments / additional information: ${dataRetrieval.get("comments")}</p>`;
