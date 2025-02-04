import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit  {
  data: any[] = []; // Holds the grid data
  columns: string[] = []; // Holds column names dynamically
  searchText: string = ''; // Text entered in the search box
  sortColumn: string = ''; // Current column used for sorting
  sortDirection: 'asc' | 'desc' = 'asc'; // Sorting direction
  currentPage: number = 1; // Current page number
  iPP: number = 5; // Rows per page

  ngOnInit() {
    // Sample dynamic data
    this.data = [
      { name: 'a', age: 25, city: 'New York' },
      { name: 'b', age: 30, city: 'Los Angeles' },
      { name: 'c', age: 22, city: 'Chicago' },
      { name: 'd', age: 22, city: 'Chicago' }
      // { name: 'John', age: 25, city: 'New York' },
      // { name: 'Jane', age: 30, city: 'Los Angeles' },
      // { name: 'David', age: 22, city: 'Chicago' },
      // { name: 'Emma', age: 28, city: 'San Francisco' },
      // { name: 'Mike', age: 35, city: 'Houston' },
      // { name: 'Sara', age: 40, city: 'Seattle' },
      // { name: 'Tom', age: 32, city: 'Austin' }
    ];

    // Dynamically set column names from data
    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
  }

  // Get filtered data based on the searchText
  getFilteredData() {
    const filteredData = this.data.filter(row => {
      return Object.values(row).join(' ').toLowerCase().includes(this.searchText.toLowerCase());
    });
    return this.sortDataArray(filteredData);
  }

  // Sort data based on column and direction
  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  // Sort the filtered data array
  sortDataArray(data: any[]) {
    // return data;
    if (!this.sortColumn) return data;
    return data.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      const direction = this.sortDirection === 'asc' ? 1 : -1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * direction;
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * direction;
      }
      return 0;
    });
  }

}
