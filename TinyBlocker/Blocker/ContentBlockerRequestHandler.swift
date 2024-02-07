//
//  ContentBlockerRequestHandler.swift
//  Blocker
//
//  Created by Thomas Wissemann on 1/18/24.
//
//blocks most popular advertising, tracking, analytics and social advertising services
//test with "https://d3ward.github.io/toolz/adblock"

import Foundation
import os.log

class ContentBlockerRequestHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        let appGroupIdentifier = "group.Personal_Team_4H8FFXXPM4.sharedgroup"
        let sharedUserDefaults = UserDefaults(suiteName: appGroupIdentifier)

        let currentState = sharedUserDefaults?.bool(forKey: "tinyBlockerState") ?? true

        os_log("content blocking enabled %d", currentState)
        
        let attachment = NSItemProvider(contentsOf: Bundle.main.url(forResource: "blockerList", withExtension: "json"))!
        let attachment_disabled = NSItemProvider(contentsOf: Bundle.main.url(forResource: "blockerListDisabled", withExtension: "json"))!
    
        let item = NSExtensionItem()
        
        if (!currentState) {
            item.attachments = [attachment]
        } else {
            item.attachments = [attachment_disabled]
        }
        context.completeRequest(returningItems: [ item ], completionHandler: nil)
    }
}
