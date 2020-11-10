liveswitch()
{
    window.document.location = './index.html?num=' + document.location.search.replace(/^.*?\=/,'')
}