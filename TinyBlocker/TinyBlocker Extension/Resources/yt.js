function skipAds() {
    const ad = document.querySelector('.ad-showing');
    
    if (ad) {
        console.log('Detected a youtube ad!');
        document.querySelectorAll('video').forEach(video => {
            try {
                video.currentTime = video.duration;
                console.log('Skipped an ad video!');
            } catch {}
        });
    }
    
    const skipbtn = document.querySelector("button.ytp-ad-skip-button-modern");
    
    if (skipbtn) {
        skipbtn.click();
        console.log('Clicked skip button!');
    }
}

function removeAds() {
    const ads = document.querySelectorAll('ytd-search-pyv-renderer, ytd-ad-slot-renderer, div[id="player-ads"], ytp-ad-image, ytp-ad-action-interstitial-background');
    
    if (ads.length > 0) {
        ads.forEach(ad => ad.remove());
        console.log(`Removed ${ads.length} ad videos from page view`);
    }
}

setInterval(skipAds, 100);
setInterval(removeAds, 200);
