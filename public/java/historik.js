function liveswitch()
{
    if(document.location.search.replace(/^.*?\=/,''))
    {
        window.document.location = './index.html?num=' + document.location.search.replace(/^.*?\=/,'');
    }
    else
    {
        window.document.location = './index.html';
    }
}
    