(function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let breedLis = [];

    function fetchImages(imageContainer) {
        imageContainer.innerHTML = '<p>Loading images...</p>';
        fetch(imgUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                return response.json();
            })
            .then(data => {
                imageContainer.innerHTML = '';
                data.message.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.onerror = () => {
                        img.style.display = 'none';
                    };
                    imageContainer.appendChild(img);
                });
            })
            .catch(error => {
                imageContainer.innerHTML = '<p>Error loading images: ' + error.message + '</p>';
            });
    }

    function fetchBreeds(breedList, breedDropdown) {
        breedList.innerHTML = '<li>Loading breeds...</li>';
        breedDropdown.disabled = true;
        fetch(breedUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch breeds');
                }
                return response.json();
            })
            .then(data => {
                breedList.innerHTML = '';
                const breeds = Object.keys(data.message);
                breeds.forEach(breed => {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    breedList.appendChild(li);
                    breedLis.push(li);
                });
                breedDropdown.disabled = false;
            })
            .catch(error => {
                breedList.innerHTML = '<li>Error loading breeds: ' + error.message + '</li>';
                breedDropdown.disabled = true;
            });
    }

    function setupEvents(breedList, breedDropdown) {
        breedList.addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                event.target.style.color = event.target.style.color === 'red' ? '' : 'red';
            }
        });

        breedDropdown.addEventListener('change', function() {
            const selectedLetter = breedDropdown.value;
            breedLis.forEach(li => {
                li.style.display = li.textContent.startsWith(selectedLetter) ? 'list-item' : 'none';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const imageContainer = document.getElementById('dog-image-container');
        const breedList = document.getElementById('dog-breeds');
        const breedDropdown = document.getElementById('breed-dropdown');

        fetchImages(imageContainer);
        fetchBreeds(breedList, breedDropdown);
        setupEvents(breedList, breedDropdown);
    });
})();
