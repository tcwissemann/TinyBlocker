//
//  AppDelegate.swift
//  TinyBlocker
//
//  Created by Thomas Wissemann on 1/18/24.
//

import Cocoa
import SafariServices
import os.log

@main
class AppDelegate: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Override point for customization after application launch.
        let sharedUserDefaults = UserDefaults(suiteName: "group.Personal_Team_4H8FFXXPM4.sharedgroup")
        sharedUserDefaults?.set(false, forKey: "tinyBlockerState")
        
        sharedUserDefaults?.synchronize()
    }
    

    
    //check this out!!!!!
    @IBAction func viewOnGithub(_ sender: NSMenuItem) {
        NSWorkspace.shared.open(URL(string: "https://github.com/tcwissemann/TinyBlocker")!)
    }
}
