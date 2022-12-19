document.getElementById("exportPlaylistJson").addEventListener("click", async () => {
    chrome.tabs.query({active: true}).then(tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "get_playlist_data"
        }).then(response => {
            console.log(response)
            downloadObjectAsJson(response, response.playlist_data.playlist_title)
        })
    })
})

function downloadObjectAsJson(exportObj, exportName){
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}