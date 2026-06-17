const newsData = [
    {
        title: "Juventus Prepare for Important League Match",
        image: "Images/gallery/Gallery3.jpg",
        shortText: "Juventus are preparing for an important league match as the team looks to continue its strong performance.",
        fullText: "Juventus are preparing for an important league match as the team looks to continue its strong performance. The players have been working hard in training, focusing on teamwork, defensive organisation and attacking movement. Supporters are expecting a competitive performance, and the match will be important for maintaining confidence during the season."
    },
    {
        title: "Fans Show Strong Support at Allianz Stadium",
        image: "Images/gallery/Gallery2.jpg",
        shortText: "Juventus fans continue to show strong support at Allianz Stadium, creating an excellent matchday atmosphere.",
        fullText: "Juventus fans continue to show strong support at Allianz Stadium, creating an excellent matchday atmosphere. Their chants, flags and passion give the team extra motivation during matches. The club has always had a strong connection with its supporters, and this fan culture remains an important part of Juventus identity."
    },
    {
        title: "Young Players Impress in Training",
        image: "Images/gallery/Gallery4.jpg",
        shortText: "Several young Juventus players have impressed coaches during recent training sessions.",
        fullText: "Several young Juventus players have impressed coaches during recent training sessions. Their energy, discipline and willingness to learn show positive signs for the future of the club. Juventus has a strong history of developing talented players, and the current group of young footballers could play an important role in upcoming seasons."
    },
    {
        title: "Fan Club Announces New Community Activities",
        image: "Images/gallery/Gallery5.jpg",
        shortText: "The Juventus Fan Hub is planning new activities to bring supporters together online and offline.",
        fullText: "The Juventus Fan Hub is planning new activities to bring supporters together online and offline. These activities may include match discussions, fan polls, social media events and community updates. The aim is to create a friendly space where Juventus supporters can share their opinions and celebrate their passion for the club."
    }
];

const newsContainer = document.getElementById("news");

newsData.forEach((item, index) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    newsCard.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="news-content">
            <h3>${item.title}</h3>
            <p class="short-text">${item.shortText}</p>
            <p class="full-text" id="full-text-${index}">${item.fullText}</p>
            <button class="read-more-btn" onclick="toggleNews(${index})">Read More</button>
        </div>
    `;

    newsContainer.appendChild(newsCard);
});

function toggleNews(index) {
    const fullText = document.getElementById(`full-text-${index}`);
    const button = fullText.nextElementSibling;

    if (fullText.style.display === "block") {
        fullText.style.display = "none";
        button.textContent = "Read More";
    } else {
        fullText.style.display = "block";
        button.textContent = "Show Less";
    }
}