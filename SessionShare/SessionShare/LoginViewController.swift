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
        print("Attempting to login");

        // TODO: Make call to login backend.
        // Maybe segue to the session storyboard on success

        /* Format to make a call to the backend
           base url = "http://localhost:8080/api/
           Ensure that URLReques is expecting a JSON response as all the backend APIs are RESTFUL
         */
//        let url = URL(string: "http://localhost:8080/api/login/create")!
//        var request = URLRequest(url: url)
//        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//        let task = URLSession.shared.dataTask(with: url) { data, response, error in
//            if let data = data {
//                if let loginResponse = try? JSONDecoder().decode([loginResponse].self, from: data) {
//                    print(loginResponse)
//                } else {
//                    print("Invalid Response")
//                }
//            } else if let error = error {
//                print("HTTP Request Failed \(error)")
//            }
//        }
//        task.resume();
        
        
        
        
    }
    
}

