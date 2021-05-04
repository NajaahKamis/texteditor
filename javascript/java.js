//HOMEPAGE FUNCTIONS
//Creating New File
function createFunction(){
    var newTitle = document.getElementById('newFile').value;
    if (newTitle.trim() === ""){
        document.getElementById("fileNameError").innerHTML = "*Please enter a valid file name";

    }else{
        localStorage.setItem("title", newTitle);
        window.location.href = "editor.html";
    }
}
//Retrieved Saved File
function openFunction(){
   var getTitle = document.getElementById("titleSelect").value
   console.log(getTitle);
   if (getTitle == ""){
       document.getElementById("selectFileError").innerHTML = "*No file selected"
   }else{
       if(confirm("Open this document?  " + getTitle)){
       localStorage.setItem("title", getTitle);
       window.location.href = "editor.html";
        } 
   } 
}

//EDITOR PAGE FUNCTIONS
//TOOLBAR FUNCTIONS
//Select font family
function fontFunction() {
    var font = document.getElementById("fontSelect").value;
    document.execCommand("fontName",false,font);
}
//Select font size
function sizeFunction() {
    var size = document.getElementById("sizeSelect").value;
    document.execCommand("fontSize",false, size);
}
//Open New File Button
var checkSave;//to check if file is unsaved or not before opening new file
function openNewFunction(){
    if (checkSave === false){
        if (confirm("File has not been saved. Do you want to save changes?")){
            saveFunction();
        }
        window.location.href = "index.html";
    }else {
        window.location.href = "index.html";
    }


}

//DATE FUNCTION
var fullDate;
function timeFunction(){
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    fullDate = time + "   " + date;
    var lastSave = document.getElementById('lastSave');
    lastSave.innerHTML = "";
    lastSave.appendChild( document.createTextNode("Last Saved: "+ fullDate));
}

//WORD COUNT FUNCTION
function wordCount(str) {
    return str.trim().split(/\s+/).length;
}
function displayWordCount() {
    var text = document.getElementById('textArea');
    var count = wordCount(text.innerText);

    if (text.innerText.trim() === ""){
        count = count - 1;
    }
    
    var p = document.getElementById('wordCount')
    p.innerHTML = "";
    p.appendChild(document.createTextNode("Words: " + count));
    var unsave = document.getElementById("title");
    document.getElementById('title').innerHTML = localStorage.getItem('title') + "  (unsaved)";
    checkSave = false;
}

//LOCAL STORAGE
//Check if local storage is supported
function checkStorageSupport(){
    if(typeof(Storage) !== "undefined"){
        return(true);
    }
    else{
        alert("Web Storage Is NOT Supported!");
        return(false);
    }
}

//Save button function
function saveFunction(){
    if(checkStorageSupport() == true){
        var textArea = document.getElementById("textArea");
        var title = localStorage.getItem('title');
        if(textArea.innerHTML.trim() === "" ) {
            alert("Nothing to save!");
        }else{
            localStorage.setItem('"'+ title +'"', textArea.innerHTML);
            timeFunction();
            localStorage.setItem("date", String(fullDate));
            alert("Document '"+ title + "' saved!");

            var savedList = `
            "${title}"  ${fullDate}
            `
            localStorage.setItem("savedList", savedList);
            localStorage.setItem("savedTitle", title);
            document.getElementById('title').innerHTML = localStorage.getItem('savedTitle');
            checkSave = true;
        }
    }
}




