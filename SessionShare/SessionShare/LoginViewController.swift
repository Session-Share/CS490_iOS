//
//  ViewController.swift
//  SessionShare
//
//  Created by Siddharth Madapati on 9/4/22.
//

import UIKit
class LoginViewController: UIViewController {


    let SpotifyClientID = "57ecd291e22142faab9a2841c92d9236"
    let SpotifyRedirectURL = URL(string: "https://localhost:8080/cs490-sessionshare")!
    lazy var configuration = SPTConfiguration(
      clientID: SpotifyClientID,
      redirectURL: SpotifyRedirectURL
    )
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        
    }

    @IBAction func loginToSpotify(_ sender: Any) {
        
        print("Login");
        // TODO: Login to spotify and get backend
        // Maybe segue to a new storyboard where they can enter the details
    }
    
    
}

