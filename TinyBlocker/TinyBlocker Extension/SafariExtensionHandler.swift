//
//  SafariExtensionHandler.swift
//  TinyBlocker Extension
//
//  Created by Thomas Wissemann on 1/18/24.
//

import Foundation
import SafariServices
import os.log
import SafariServices.SFContentBlockerManager

class SafariExtensionHandler: SFSafariExtensionHandler {

    override func beginRequest(with context: NSExtensionContext) {
        let request = context.inputItems.first as? NSExtensionItem
        
        let profile: UUID?
        if #available(iOS 17.0, macOS 14.0, *) {
            profile = request?.userInfo?[SFExtensionProfileKey] as? UUID
        } else {
            profile = request?.userInfo?["profile"] as? UUID
        }
        
        os_log(.default, "The extension received a request for profile: %@", profile?.uuidString ?? "none")
    }
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        page.getPropertiesWithCompletionHandler { properties in
            os_log(.default, "The extension received a message (%@) from a script injected into (%@) with userInfo (%@)", messageName, String(describing: properties?.url), userInfo ?? [:])
        }
    }

    override func toolbarItemClicked(in window: SFSafariWindow) {
        // Toggle the state
        let appGroupIdentifier = "group.Personal_Team_4H8FFXXPM4.sharedgroup"
        let sharedUserDefaults = UserDefaults(suiteName: appGroupIdentifier)
        
        let currentState = sharedUserDefaults?.bool(forKey: "tinyBlockerState") ?? true
        
        sharedUserDefaults?.set(!currentState, forKey: "tinyBlockerState")
        
        os_log("toolbaritemclicked changed state to %d", currentState)
        // Update toolbar item
        let imageName = currentState ? "ToolbarItemIcon.pdf" : "disabled.pdf"
        window.getToolbarItem { (toolbarItem) in
            toolbarItem?.setImage(NSImage(named: NSImage.Name(imageName)))
        }
        
        self.updateContentBlocker()
        
        sharedUserDefaults?.synchronize()
    }

    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        validationHandler(true, "")
    }
    
    
    func updateContentBlocker() {
        SFContentBlockerManager.reloadContentBlocker(withIdentifier: "WiseDev.TinyBlocker.Blocker") { error in
            if let error = error {
                os_log("Error reloading content blocker: %@", error.localizedDescription)
            } else {
                self.refreshState()
                os_log(.default, "Content blocker reloaded successfully")
            }
        }
    }
    
    func refreshState() {
        SFContentBlockerManager.getStateOfContentBlocker(withIdentifier: "WiseDev.TinyBlocker.Blocker", completionHandler: { (state, error) in
            if let error = error {
                    print("Error retrieving content blocker state:")
                    print("Localized description: \(error.localizedDescription)")
            } else if let state = state {
                print("Updated ContentBlockerState - \(state.isEnabled )")
            } else {
                print("cb state NIL")
            }
        })
    }
}

// https://stackoverflow.com/questions/66891960/swift-how-to-reload-content-blocker
