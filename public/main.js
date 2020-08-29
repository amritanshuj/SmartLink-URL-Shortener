const urlForm = document.getElementById('url-form');
const originalUrl = document.getElementById('paste-url');
const uniqueName = document.getElementById('unique-name');
const confirmationShow = document.getElementById('confirmationShow');
const status = document.getElementById('status');

const formSubmit = e => {
    e.preventDefault();
    
    fetch('/createShortLink', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl : originalUrl.value,
          unique_name : uniqueName.value
        })
    })
    .then(data => data.json())
    .then(response => {
        if(!response.ok){
            confirmationShow.innerHTML = `<div id="res_link"> ${response.error} </div>`;
        }
        else {
            confirmationShow.innerHTML = `<div id="res_link">Hurray! The link can now be visited 
            through:&ensp;<br> <a target="_blank" 
            href=${response.shortUrl} rel = "noopener noreferer" > 
            <i class="fas fa-link fa-xs"></i>&nbsp;${response.shortUrl} </a></div>`;
        }
    })
    .catch(err => {
        console.log('oops', err);
        confirmationShow.innerHTML = `<div id="res_link">Network error, retry :( </div>`
    })
};

urlForm.addEventListener('submit', formSubmit);
