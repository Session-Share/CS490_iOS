//
//  QueueViewController.swift
//  SessionShare
//
//  Created by Ethan Lee on 4/13/22.
//

import UIKit

class QueueViewController: UIViewController {

    @IBOutlet weak var songTableView: UITableView!
    let songs = ["Song 1", "Song 2", "Song 3"]
    override func viewDidLoad() {
        super.viewDidLoad()
        songTableView.delegate = self
        songTableView.dataSource = self
        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    

}

extension QueueViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return songs.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "songCell", for: indexPath)
        cell.textLabel?.text = songs[indexPath.row]
        return cell
    }
}
