let adMap = {}; // Define adMap at a higher scope

function setPlayerToDefault() {
    const video = document.getElementById('content-video-player');
    const videoPlayer = document.querySelector('.ContentPlayer__videoPlayer');
    const customControls = document.querySelector('.ControlsContainer');
    const playBackControlsOverlay = document.querySelector('.PlaybackControlsOverPlayer');
    const adPlayer = document.querySelector('.AdPlayer');
    const introPlayer = document.querySelector('.IntroPlayer');
    const adTimer = document.querySelector('.AdUnitView__adBar__timer');
    const adUnitView = document.querySelector('.AdUnitView');
    const timeline = document.querySelector('.Timeline');
    
    

    
//    if (adUnitView && adUnitView.style.display != "none") {
//            
//        console.log('detected an ad');
//        let duration = convertTimestampToSeconds(adTimer.innerHTML);
//        try {
//            let updatedTimeStamp = video.currentTime + duration;
//            video.currentTime = updatedTimeStamp;
//            adUnitView.style.display = "none";
//            video.currentTime += 15;
//            video.currentTime -= 15;
//            //location.reload();
//        } catch { }
//    }
    if(videoPlayer) {
        try {
            videoPlayer.setAttribute('controls', true);
        } catch { }
    }
    
    if(customControls) {
        try {
            customControls.style.display = "none";
            //removeFirstChild();
        } catch { }
        
    }
    
    if(adPlayer) {
        try {
            //adPlayer.remove();
        } catch { }
    }
    
    if(introPlayer) {
        try {
            introPlayer.style.display = "none";
        } catch { }
    }
    if(playBackControlsOverlay) {
        try {
            playBackControlsOverlay.style.display = "none";
        } catch { }
    }
}



function parseAdBreaks() {
    const adBreaksTimeline = document.querySelector('.TimelineAdBreaks');
    const percentValues = [];
    
    if (adBreaksTimeline) {
        console.log('adbreaktimeline');
    }
    
    var children = adBreaksTimeline.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        
        const style = child.getAttribute('style');
        console.log(style);
        // Extract the float value from the style attribute
        const match = style.match(/left:\s*([\d.]+)%/);
        if (match) {
            const floatValue = parseFloat(match[1]);
            percentValues.push(floatValue);
        }
    }
    
    console.log(percentValues);
    
    let secondValues = percentsToSecondsArray(percentValues);
    adMap = countOccurrences(secondValues);
    
    console.log(adMap);
    return adMap;
}

function percentsToSecondsArray(percentValues) {
    const video = document.getElementById('content-video-player');
    const secondValues = [];
    for (let i = 0; i < percentValues.length; i++) {
        let percentValue = percentValues[i];
        let truePercent = percentValue * .01;
        let secondValue = video.duration * truePercent;
        secondValues.push(secondValue);
    }
    
    return secondValues;
}

function countOccurrences(secondValues) {
    const occurrenceMap = {};

    // Iterate through the array of float values
    secondValues.forEach(floatValue => {
        // If the float value is not already a key in the dictionary, initialize its count to 1
        if (!(floatValue in occurrenceMap)) {
            occurrenceMap[floatValue] = 1;
        } else {
            // If the float value is already a key, increment its count
            occurrenceMap[floatValue]++;
        }
    });

    return occurrenceMap;
}

function convertTimestampToSeconds(timestamp) {
   const [minutes, seconds] = timestamp.split(':').map(num => parseInt(num));
   const totalSeconds = (minutes * 60) + seconds;
   return totalSeconds;
}

function simulateEscapeKeyPress() {
    const event = new KeyboardEvent('keydown', {
        key: 'Escape'
    });
    document.dispatchEvent(event);
}

function simulateskip() {
    //someway to skip to next episode
}

function autoPlay() {
    //someway to get around autoplay
}


function sweep() {
    try {
        if (Object.keys(adMap).length === 0) { // Check if adMap is empty
            parseAdBreaks(); // Parse ad breaks if not already parsed
        }
        // Check if adMap is not empty
        if (adMap && Object.keys(adMap).length > 0) {
            skipAds();
            test();
             // Skip ads based on the parsed ad breaks
        } else {
            console.log('adMap is empty or undefined');
        }
    } catch { }
}


function main() {
    if (window.location.href.includes("www.hulu.com/watch")) {
        console.log('hulu window found');
        setInterval(setPlayerToDefault, 2000);
        setInterval(sweep, 1000);
        
    }
}

function test() {
    console.log('other test', adMap);
}

function skipAds() {
    const video = document.getElementById('content-video-player');
    for (const key in adMap) {
        console.log('for loop reached');
        if (Object.hasOwnProperty.call(adMap, key)) {
            const value = adMap[key];
            // Check if the current time matches the ad key
            console.log(`Ad found at ${key} with duration ${adDuration}`);
            // Check if the current time is within the ad break time range
            if (video.currentTime >= key && video.currentTime < key + value * 15) {
                video.currentTime = video.currentTime + value * 15; // Skip to the end of the ad break (MAYBE SWITCH KEY TO CURRENTTIME).
                video.currentTime -= video.currentTime - key;
                video.currentTime += 15;
                video.currentTime -= 15;
                console.log('Ad skipped');
                break;
            }
        }
    }
}


main();

