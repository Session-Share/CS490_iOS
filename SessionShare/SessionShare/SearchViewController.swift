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
    let data = ["Artist 1", "Artist 2", "Artist 3"]
    var filteredData: [String]!
    override func viewDidLoad() {
        super.viewDidLoad()
        filteredData = data
        tableView.delegate = self
        tableView.dataSource = self
        searchBar.delegate = self
    }
    

}

extension SearchViewController: UITableViewDelegate, UITableViewDataSource
{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filteredData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "searchCell", for: indexPath)
        cell.textLabel?.text = filteredData[indexPath.row]
        return cell
    }
}

extension SearchViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        filteredData = []
        if searchText ==  ""
        {
            filteredData = data
        }
        for word in data {
            if word.uppercased().contains(searchText.uppercased()) {
                filteredData.append(word)
            }
        }
        self.tableView.reloadData()
    }
}
