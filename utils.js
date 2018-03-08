function search(nameKey, myArray, value1, value2){
    var newArr = [];
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][value1] === nameKey) {
            newArr.push(value2?myArray[i][value2]:myArray[i]);
        }
    }
    return newArr;
}
function createList(myArray, parentElement, listElementType, cls, outputValue){
    var list = document.getElementsByClassName(parentElement)[0];
    for(var i=0; i < myArray.length; i++){
        var listOption = document.createElement(listElementType);
        listOption.className = cls + myArray[i].id;
        listOption.innerHTML = myArray[i][outputValue];
        list.appendChild(listOption);
    }
}
function removeElement(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function getDate(){
    var date = new Date();
    var dateFormat = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    return dateFormat;
}
function generateId(){
    return Date.now();
}