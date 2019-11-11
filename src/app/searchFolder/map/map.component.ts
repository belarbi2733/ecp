import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = tt.map({
      key:'IXJ9JJzlzyRAsBuhy8wESw33Q8b2esZ5',
      container:'map',
      center: [ 50.4542,3.9567 ],
      style:'tomtom://vector/1/basic-main'
    });
    map.addControl(new tt.NavigationControl())
  }

}
