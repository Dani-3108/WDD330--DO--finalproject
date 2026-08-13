//variables
const CaseStudiesArray = "data/case-studies.json";
const CaseStudiesCards = document.querySelector("#case-studies-cards");
//function to create cards and append the information to it
const DisplayCaseStudies = (caseStudies) => {
    caseStudies.forEach((caseStudie) => {
        //creating elements
        let card = document.createElement("section");
        card.innerHTML = `
            <div>
                <h2>${caseStudie.title}</h2>
                <img src="images/${caseStudie.image}" alt="${caseStudie.title}" loading="lazy">
                <ul>
                    <li>${caseStudie.description}</li>
                    <li class="key-metric">${caseStudie.keyMetric}</li>
                    <li>Industry: ${caseStudie.industry}</li>
                </ul>
            </div>`;
        //appending elements
        CaseStudiesCards.appendChild(card);
    });
}
//Function to get data from json file
async function getCaseStudies() {
    try {
        const response = await fetch(CaseStudiesArray);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            DisplayCaseStudies(data.caseStudies);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error){
        console.log(error);
    }
}
getCaseStudies();