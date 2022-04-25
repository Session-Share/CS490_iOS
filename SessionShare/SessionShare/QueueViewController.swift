//
//  QueueViewController.swift
//  SessionShare
//
//  Created by Ethan Lee on 4/13/22.
//

import UIKit

var songs = [["As It Was", "Harry Styles"], ["First Class", "Jack Harlow"], ["Heat Waves", "Glass Animals"]]
//var songs: [[String]]!
class QueueViewController: UIViewController {

    @IBOutlet weak var songTableView: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self, selector: #selector(loadList), name: NSNotification.Name(rawValue: "load"), object: nil)

        songTableView.delegate = self
        songTableView.dataSource = self
        songTableView.reloadData()
    }
    
    
    
    func addSong(song: String, artist: String) {
        print("Adding song")
        if ((songs) == nil) {
            songs = [[song, artist]]
        }
        else {
            songs.append([song, artist])
        }
        print(songs)
    }
    
    @objc func loadList(notification: NSNotification){
        //load data here
        self.songTableView.reloadData()
    }

}

extension QueueViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if ((songs) != nil) {
        return songs.count
        }
        return 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "songCell", for: indexPath) as! QueueSongTableViewCell
        cell.artistLabel.text = songs[indexPath.row][1]
        cell.songLabel.text = songs[indexPath.row][0]
        return cell
    }
}
