window.onload = () => {

    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {

            const newsDiv = document.getElementById('news');

            newsDiv.innerHTML = '';

            data.forEach(news => {

                newsDiv.innerHTML += `
                    <div class="news-card">

                        <img src="${news.image}"
                             alt="${news.title}"
                             class="news-image">

                        <div class="news-content">

                            <span class="news-category">
                                ${news.category}
                            </span>

                            <h3>${news.title}</h3>

                            <p class="news-date">${news.date}</p>

                            <p>${news.description}</p>

                            <a href="#" class="btn">Read More</a>

                        </div>

                    </div>
                `;
            });

        })
        .catch(error => {
            console.log(error);
        });

};