export function setObjectArrayToLocalStorage(name, arrayToSet)
{
    const input = arrayToSet.map(element => {
        return JSON.stringify(element)
    });
    localStorage.setItem(name, input);
}

export function getObjectArrayFromLocalStorage(name)
{
    let output = ((localStorage.getItem(name).split("{")))
    output = (output.slice(1,output.length))
    output = output.map(element => {
    if(element[element.length-1]==",")
    {
        return JSON.parse("{" + element.slice(0,element.length-1))
    }
    else{
        return JSON.parse("{" + element)
    }
});
    return output;
}

