document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const buttons = document.querySelectorAll(".header--list button")

    async function populate() {
        const requestURL = "data.json";
        const request = new Request(requestURL);

        try {
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    const timeframe = button.textContent.toLowerCase();
                    populateCards(data, timeframe)
                });
            });
            populateCards(data, "weekly")
        } catch (error) {
            console.error("Error fetching the data:", error);
        } 
    }

    const populateCards = (data, timeframe) => {
        content.innerHTML='';

        data.forEach((item) =>{
            const card = document.createElement("div");
            const sanitizedTitle = item.title.toLowerCase().replace(/\s+/g, '-');
            card.classList.add("card", sanitizedTitle);

            const cardContent = document.createElement("div");
            cardContent.classList.add("cardContent");

            const titleAndImageWrapper = document.createElement("div");
            titleAndImageWrapper.classList.add("title-image-wrapper");

            const title = document.createElement("h2");
            title.textContent = item.title;

            const image = document.createElement("img")
            image.src = `images/icon-ellipsis.svg`;
            image.alt = item.title
            image.classList.add("card-image");

            titleAndImageWrapper.appendChild(title);
            titleAndImageWrapper.appendChild(image);
            cardContent.appendChild(titleAndImageWrapper);

            const times = item.timeframes[timeframe];
            const timeframeDiv = document.createElement("div");
            timeframeDiv.classList.add("timeframe");

            const current = document.createElement("p");
            current.textContent = `${times.current}hrs`;

            const previous = document.createElement("p");
            const span = document.createElement("span");
            span.textContent = `Last Week - ${times.previous}hrs`;
            previous.appendChild(span);

            timeframeDiv.appendChild(current);
            timeframeDiv.appendChild(previous);
            cardContent.appendChild(timeframeDiv);

            card.appendChild(cardContent);

            content.appendChild(card);
        })
    }

    populate();
})