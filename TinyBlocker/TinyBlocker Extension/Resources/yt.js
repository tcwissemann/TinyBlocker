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
    const ads = document.querySelectorAll('ytd-search-pyv-renderer, ytd-ad-slot-renderer, div[id="player-ads"]');
    
    if (ads.length > 0) {
        ads.forEach(ad => ad.remove());
        console.log(`Removed ${ads.length} ad videos from page view`);
    }
}

function bypassInterstitial() {
    const elements = document.querySelectorAll('ytp-ad-image, ytp-ad-action-interstitial-background, video-ads, ytp-ad-module, ytp-ad-overlay-slot');
    
    if (elements.length > 0) {
        elements.forEach(element => element.remove());
        console.log(`Removed ${elements.length} interstital elements from page view`);
    }
}

setInterval(skipAds, 100);
setInterval(removeAds, 200);
setInterval(bypassInterstitial, 300);

//<div class="ytp-ad-timed-pie-countdown-container ytp-ad-timed-pie-countdown-container-upper-right" id="timed-pie-countdown:19" style=""><svg class="ytp-ad-timed-pie-countdown" viewBox="0 0 20 20"><circle class="ytp-ad-timed-pie-countdown-background" r="10" cx="10" cy="10"></circle><circle class="ytp-ad-timed-pie-countdown-inner ytp-ad-timed-pie-countdown-inner-light" r="5" cx="10" cy="10" style="stroke-dasharray: 25.453714, 32;"></circle><circle class="ytp-ad-timed-pie-countdown-outer ytp-ad-timed-pie-countdown-outer-light" r="10" cx="10" cy="10"></circle></svg></div>


