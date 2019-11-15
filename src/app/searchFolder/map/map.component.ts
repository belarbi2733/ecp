import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    tomtom.setProductInfo('EasyCarPool', '1.0.0');
    // Setting the TomTom keys
    tomtom.routingKey('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');
    tomtom.searchKey('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');

      const map = tomtom.L.map('map', {
        key: 'fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR',
        basePath: '/assets/sdktool/sdk',
        center: [ 52.360306, 4.876935 ],
        zoom: 15,
        source : 'vector'
      });
      
      var unitSelector = tomtom.unitSelector.getHtmlElement(tomtom.globalUnitService);
      var languageSelector = tomtom.languageSelector.getHtmlElement(tomtom.globalLocaleService, 'search');

      var unitRow = document.createElement('div');
      var unitLabel = document.createElement('label');
      unitLabel.innerHTML = 'Unit of measurement';
      unitLabel.appendChild(unitSelector);
      unitRow.appendChild(unitLabel);
      unitRow.className = 'input-container';

      var langRow = document.createElement('div');
      var langLabel = document.createElement('label');
      langLabel.innerHTML = 'Search language';
      langLabel.appendChild(languageSelector);
      langRow.appendChild(langLabel);
      langRow.className = 'input-container';

      tomtom.controlPanel({
          position: 'bottomright',
          title: 'Settings',
          collapsed: true
      })
          .addTo(map)
          .addContent(unitRow)
          .addContent(langRow);

      // Creating route inputs widget
      var routeInputsInstance = tomtom.routeInputs()
          .addTo(map);

      // Creating route widget
      var routeOnMapView = tomtom.routeOnMap({
          generalMarker: {draggable: true}
      }).addTo(map);

      // Creating route summary widget
      var routeSummaryInstance = tomtom.routeSummary({
          size: [240, 230],
          position: 'topleft',
          
      }) .addTo(map)
         

      // Connecting the route inputs widget with the route widget
      routeInputsInstance.on(routeInputsInstance.Events.LocationsFound, function(eventObject) {
          routeOnMapView.draw(eventObject.points);
          
          
          
      });
      routeInputsInstance.on(routeInputsInstance.Events.LocationsCleared, function(eventObject) {
          routeSummaryInstance.hide();
          routeOnMapView.draw(eventObject.points);
          
      });

      // Connecting the route widget with the route summary widget
      routeOnMapView.on(routeOnMapView.Events.RouteChanged, function(eventObject) {
          routeSummaryInstance.updateSummaryData(eventObject.object);
          //console.log('ici cest bon');
          //window.alert('routechanged');
          
          
      });
      // Update the searchbox inputs when the user drag the markers
      routeOnMapView.on(routeOnMapView.Events.MarkerDragEnd, function(eventObject) {
          var location = eventObject.markerIndex === 0 ? routeInputsInstance.searchBoxes[0] :
              routeInputsInstance.searchBoxes.slice(-1)[0];
          location.setResultData(eventObject.object);
      });
  }

}
