//
//  SearchViewController.swift
//  SessionShare
//
//  Created by Ethan Lee on 4/10/22.
//

import UIKit

class SearchViewController: UIViewController {

    @IBOutlet weak var searchBar: UISearchBar!
    @IBOutlet weak var tableView: UITableView!
    let data = [["As It Was", "Harry Styles"], ["First Class", "Jack Harlow"], ["Heat Waves", "Glass Animals"], ["Thousand Miles", "The Kid LAROI"], ["INDUSTRY BABY", "Lil Nas X"], ["Heat Waves", "Glass Animals"], ["Stay", "Justin Beiber"]]
    var filteredData: [[String]]!
    override func viewDidLoad() {
        super.viewDidLoad()
        filteredData = data
        tableView.delegate = self
        tableView.dataSource = self
        searchBar.delegate = self
    
        tableView.reloadData()
    }
    

}

extension SearchViewController: UITableViewDelegate, UITableViewDataSource
{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filteredData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "searchCell", for: indexPath) as! SearchCellTableViewCell
        cell.songLabel.text = filteredData[indexPath.row][0]
        cell.artistLabel.text = filteredData[indexPath.row][1]
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let vc = QueueViewController()
        vc.addSong(song: filteredData[indexPath.row][0], artist: filteredData[indexPath.row][1])
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "load"), object: nil)
        self.dismiss(animated: true, completion: nil)
        
    }
}

extension SearchViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        filteredData = []
        if searchText ==  ""
        {
            filteredData = data
        }
        for i in data {
            let word = i[0]
            if word.uppercased().contains(searchText.uppercased()) {
                filteredData.append(i)
            }
        }
        self.tableView.reloadData()
    }
}

extension SearchViewController: URLSessionDelegate {
    public func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
       //Trust the certificate even if not valid
       let urlCredential = URLCredential(trust: challenge.protectionSpace.serverTrust!)

       completionHandler(.useCredential, urlCredential)
    }
}
