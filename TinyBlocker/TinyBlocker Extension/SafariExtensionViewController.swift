//
//  SafariExtensionViewController.swift
//  TinyBlocker Extension
//
//  Created by Thomas Wissemann on 1/18/24.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
