function msn_feed() {
    let stubborn_ads = document.getElementById("promotions");
    console.log(stubborn_ads);
    
//    if (stubborn_ads.length > 0) {
//        stubborn_ads.forEach(ad => {
//            console.log(ad);
//            ad.style.display = "none";
//            console.log("remove ads working on msn");
//        });
//    }
}

document.addEventListener("DOMContentLoaded", function() {
    intervalId = setInterval(function() {
        msn_feed();
        console.log("runnign");
    }, 1000);
});
