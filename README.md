# TinyBlocker
 A lightweight adblock for Safari.

## Designed to work perfectly on the top 250 sites (SEMRUSH ANALYTICS)

## Issues:
- Can't pause content blocker on toolbar item click
    - **Current Strategy** involves (when toolbar item clicked):
    - toggle state bool in user defaults app group 
    - reload content blocker and getstateofcontentblocker to refresh
    - In content blocker read state in shared app group user defaults when loaded
    - Render either a complete blocklist or an empty JSON file.


