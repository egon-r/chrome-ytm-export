# YTM Export
A chrome extension to download youtube music playlist metadata as JSON.  

## Usage
- Navigate to any youtube music playlist, the URL should start with `https://music.youtube.com/playlist`
- Open the YTM Export extension and click on "Download"
- Wait until the script scrolls to the bottom of your playlist

## Output
```
{
  "playlist_data": {
    "playlist_title": "All",
    "songs": [
      {
        "ytWatchParam": "watch?v=abc1234",
        "title": "title",
        "artist": "artist",
        "album": "album"
      },
      {
        "ytWatchParam": "watch?v=abc1234",
        "title": "title",
        "artist": "artist",
        "album": "album"
      },
      ...
      ...
    ]
  }
}
```

## Install
1. Clone the repository
2. Navigate to [chrome://extensions/](chrome://extensions/)
3. Enable Developer Mode and click `Load unpacked` 
4. Select the directory containing `manifest.json`