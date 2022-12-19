chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === "get_playlist_data") {
        (async () => {
            await scrollThroughPlaylist()
            console.log("done scrolling")
            const playlistData = getPlaylistData()
            console.log("found " + playlistData.songs.length + " songs!")
            sendResponse({playlist_data: playlistData})
        })()
    }
    return true // keeps the message channel open until async sendResponse()
})


async function scrollThroughPlaylist() {
    let songCounts = [0]
    songCounts.push(getPlaylistData().songs.length)

    while (songCounts[0] < songCounts[1]) {
        console.log(songCounts)
        await new Promise(resolve => setTimeout(resolve, 500))
        document.getElementsByTagName("ytmusic-playlist-shelf-renderer")[0].scrollIntoView({
            behavior: "smooth",
            block: "end"
        })
        await new Promise(resolve => setTimeout(resolve, 3500))

        songCounts.push(getPlaylistData().songs.length)
        songCounts.shift()
    }
}


function getPlaylistData() {
    let playlistData = []

    const playlistTitle = document.getElementsByClassName("metadata")[0].getElementsByTagName("h2")[0].innerText
    const playlistContent = document.getElementById("contents")
    const playlistItems = playlistContent.getElementsByTagName("ytmusic-responsive-list-item-renderer")
    for(item of playlistItems) {
        try {
            const titleElement = item.getElementsByClassName("title")[0].getElementsByTagName("a")[0]
            const secondaryColumns = item.getElementsByClassName("secondary-flex-columns")[0].getElementsByClassName("flex-column")
            const ytWatchParam = titleElement.getAttribute("href").split("&", 1)[0]
            const title = titleElement.innerText
            const artist = secondaryColumns[0].innerText
            const album = secondaryColumns[1].innerText
            playlistData.push({
                ytWatchParam: ytWatchParam,
                title: title,
                artist: artist,
                album: album
            })
        } catch (e) {
            console.error(e)
        }
    }

    return {
        playlist_title: playlistTitle,
        songs: playlistData
    }
}