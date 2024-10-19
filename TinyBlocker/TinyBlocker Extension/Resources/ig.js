function instaFeedAds() {
    // Remove iframes outside the body
    document.querySelectorAll('iframe').forEach(iframe => {
        if (iframe.id === 'watch-iframe') {
            return; // Skip this iframe
        }
        if (iframe.closest('body') === null) {
            iframe.remove();
        }
    });

    // Remove elements with target="_blank" or links that navigate away from the site
    document.querySelectorAll('a').forEach(link => {
        if (link.target === '_blank' || !link.href.includes('myflixerz.to')) {
            if (!link.closest('#content-episodes')) {
                link.remove();
            }
        }
    });
}

setInterval(instaFeedAds, 100);
