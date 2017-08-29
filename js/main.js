

/* todos
    - visit button not working 
    - align visit, delete buttons to right
    - use different save format in order to modify local bookmarks 
      with json interface (without converting to js array and looping)
*/

// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(event)
{
    // Get from values
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    const bookmark = {
        name : siteName,
        url: siteUrl
    }

    if(!validateForm(siteName, siteUrl))
        return false;

    /*
        // Local storage usage test (only store strings)
        localStorage.setItem('test', 'Hello');
        console.log(localStorage.getItem('test'));  // Hello
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));  // null 
    */

    if(localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        // convert js array into JSON string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        // convert JSON string into js object
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    console.log('Info: Saved bookmark ' + JSON.stringify(bookmark));

    fetchBookmarks();

    // clear the form
    document.getElementById('myForm').reset();

    // Prevent form from submitting
    event.preventDefault();
}

//
function fetchBookmarks()
{
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';

    for(let bookmark of bookmarks) {
        const name = bookmark.name;    
        const url = bookmark.url;

        console.log(url);
        
        bookmarksResults.innerHTML += 
            '<li class="list-group-item">'+
            '  <h4>'+name+
            '   <a class="btn btn-success" target="_blank" ' +
            '      href="'+url+'">Visit</a> ' + 
            '   <a onclick="deleteBookmark(\''+name+'\')" ' + 
            '      class="btn btn-danger" href="#">Delete</a> ' +
            '  </h4>'+
            '</li>';

        // bookmarksResults.innerHTML += '<div class="well">'+
        //                             '<h3>'+name+
        //                             ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
        //                             ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        //                             '</h3>'+
        //                             '</div>';                                    
    }

}

function deleteBookmark(bookmarkName)
{
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));        
    for(let i = 0; i < bookmarks.length; i++) {       
        if(bookmarks[i].name === bookmarkName) {            
            bookmarks.splice(i, 1); // remove i th elem from array
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            fetchBookmarks();
            break;
        }
    }           
}

function validateForm(siteName, siteUrl) 
{    
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    // URL regex validation    
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const urlRegex = new RegExp(expression);
    if(!siteUrl.match(urlRegex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}



/*
console.log(bookmarks);
 */