function mediumTest() {
    let joinWall = document.getElementById("gateway-content");
    let contentFilter = document.querySelector(".css-gx5sib");
    let cnnBanner = document.querySelector(".ad-slot-header__wrapper");
    let cnnAdContainer = document.querySelector(".zone__ads");
    
    if (cnnBanner) {
        cnnBanner.style.display = "none";
    }
    //Check if the element exists before trying to modify its style
    if (joinWall) {
        joinWall.style.display = "none";
    }
    
    if(contentFilter) {
        contentFilter.style.opacity = "0%";
    }
    
    if(cnnAdContainer) {
        cnnAdContainer.style.display = "none";
    }
}

function addScroll() {
    let windowElement = document.querySelector('.css-mcm29f');
    
    if (windowElement) {
        windowElement.style.overflow = "scroll";
    }
}

function removeAds() {
    let ads = document.querySelectorAll(".rad-ad-wrapper");
    console.log(ads);
    if (ads.length > 0) {
        ads.forEach(ad => {
            console.log(ad);
            ad.style.display = "none";
            console.log("remove ads working on nyt");
        });
    }
}

setInterval(mediumTest, 100);
setInterval(addScroll, 200);
setTimeout(() => {
    removeAds();
}, 5000);
