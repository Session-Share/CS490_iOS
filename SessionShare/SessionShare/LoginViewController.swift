//
//  ViewController.swift
//  SessionShare
//
//  Created by Siddharth Madapati on 9/4/22.
//

import UIKit
import SocketIO


class LoginViewController: UIViewController {

    @IBOutlet weak var spotifyUsername: UITextField!
    @IBOutlet weak var spotifyPassword: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
        
    struct loginResponse: Decodable {
        let access_token: String
        let refresh_token: String
    }
    
    @IBAction func loginToSpotify(_ sender: Any) {
        if ((spotifyPassword == nil) || (spotifyUsername == nil)) {
            print("Error No Password or Username")
            
            // Code to create a popup warning a user that they need to fill in their username and password
            
            let uialert = UIAlertController(title: "Error", message: "Both Spotify username and password are needed", preferredStyle: UIAlertController.Style.alert);
            
            uialert.addAction(UIAlertAction(title: "Okay", style: UIAlertAction.Style.default, handler: nil));
               
            self.present(uialert, animated: true, completion: nil);
            return;
        }
//        print("Attempting to login");
//
//        let url = URL(string: "https://localhost:8080/api/login/create")!
//
//        let session = URLSession(configuration: URLSessionConfiguration.default, delegate: self, delegateQueue: nil)
//
//        let task = session.dataTask(with: url, completionHandler: { (data, response, error) in
//            print(response!)
//        })
//
//        task.resume()
//
        
        
    }
    
}

extension LoginViewController: URLSessionDelegate {
    public func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
       //Trust the certificate even if not valid
       let urlCredential = URLCredential(trust: challenge.protectionSpace.serverTrust!)

       completionHandler(.useCredential, urlCredential)
    }
}

