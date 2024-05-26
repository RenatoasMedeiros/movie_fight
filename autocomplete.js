const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue }) => {
    root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
        </div>
    </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async event => {
        const movies = await fetchData(event.target.value);
        if (!movies.length) {
            dropdown.classList.remove('is-active')
            return; //we return because we don't need to keep processing nothing
        }
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let movie of movies) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(movie);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active'); // to close the dropdown
                input.value = inputValue(movie);
                onOptionSelect(movie);
            });

            resultsWrapper.appendChild(option);
        }
    };
    input.addEventListener('input', debounce(onInput, 700));

    document.addEventListener('click', event => {
        //console.log(event.target); // with this console.log we can see here the user clicked on the hole document
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active'); // to close the dropdown
        }
    })
};