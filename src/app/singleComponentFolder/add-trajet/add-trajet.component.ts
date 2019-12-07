import { Component, OnInit} from '@angular/core';
import { Trajet } from './add-trajet.interface';
import {AddtrajetService} from '../../services/singleComponentServices/addtrajet.service';
import {Injectable} from '@angular/core';
import { ServerconfigService} from '../../serverconfig.service';

declare let L;
declare let tomtom: any;
declare let document: any;


let inscription: Trajet = {
  idUser: null,
  departuretime : '',
  traveltimeinseconds : '',
  distanceinmeters: '',
  delaytraffic: '',
  departance : '',
  arrival : ''
};

let iter = 0;
// var iteration = 0;
let routetrajet = []  ; // stocke les informations sur le trajet conducteur

function recordtrajet(data: Trajet) {

  data.departuretime = routetrajet[0].departuretime;
  data.traveltimeinseconds = routetrajet[0].traveltimeinseconds;
  data.distanceinmeters = routetrajet[0].distanceinmeters;
  data.delaytraffic = routetrajet[0].delaytraffic;
  data.departance = routetrajet[0].departance;
  data.arrival = routetrajet[0].arrival;

  console.log(JSON.stringify(data));

}
@Component({
  selector: 'app-add-trajet',
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css', '../../app.component.css']
})

@Injectable()
export class AddTrajetComponent implements OnInit {

  constructor(private addtrajetservice: AddtrajetService, private servUrl: ServerconfigService) {
    inscription.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  ngOnInit() {
    const service = this.addtrajetservice; // Pour pouvoir utiliser le service dans les functions;

    // Define your product name and version
    tomtom.setProductInfo('EasyCarPool', '1.0.0');
    // Set TomTom keys
    tomtom.key('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');
    tomtom.routingKey('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');
    tomtom.searchKey('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');


    let formOptions = {
      closeOnMapClick: false,
      position: 'topleft',
      title: null
    };
    let listScrollHandler = null;

    const map = tomtom.L.map('map', {
      key: 'fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR',
      basePath: '/assets/sdktool/sdk',
      center: [50.8504500, 4.3487800],
      zoom: 10,
      source: 'vector'
    });

    let routeInputs = tomtom.routeInputs().addTo(map);
    let form = document.getElementById('form');
    let batchRoutingControl = tomtom.foldable(formOptions).addTo(map).addContent(form);
    window.addEventListener('resize', function() {
      batchRoutingControl.unfold();
      if (listScrollHandler) {
        // run after css animation
        setTimeout(listScrollHandler, 250);
      }
    });
    // let's move this to the bottom of topright
    map.zoomControl.setPosition('topright');
    // fill datepicker with current time...
    let timepicker = document.querySelector('#date');
    // (<HTMLElement>document.querySelector('#date')).style.display = 'none';
    timepicker.setAttribute('min', new Date().toISOString());
    let offset = new Date().getTimezoneOffset();
    let fallback = timepicker.type === 'text';
    if (fallback) {
      // no support for datetime-locale, let's show a warning message
      form.classList.add('fallback');
    }
    // let's add 15 minutes from now to give user some time to fill the form
    setDate(new Date(new Date().getTime() + 10 * 60 * 1000));
    let arrivalOrDeparture = document.querySelector('select#type');
    let submitButton = document.querySelector('input[type=submit]');
    let routePoints;
    routeInputs.on(routeInputs.Events.LocationsFound, function(event) {
      if (!event.points[0] || !event.points[1]) {
        routePoints = null;
      } else {
        routePoints = event.points;
      }
      submitButton.disabled = !routePoints;
    });

    // add submit handler to form
    submitButton.addEventListener('click', function() {
      this.setAttribute('disabled', 'disabled');
      request(getDate());
    });

    let batchRequestsLock = null;

    function unlockBatchRequests() {
      batchRequestsLock = null;
      submitButton.removeAttribute('disabled');
    }

    function PagingError() {
      this.message = 'Form submitted while next page request';
    }

    PagingError.prototype = new Error;

    function handleBatchRequestError(err) {
      if (err instanceof PagingError) {
        // handling race condition, nothing wrong happened
        return;
      }
      console.error(err);
      clearList();
      showError(getOrCreateList());
      unlockBatchRequests();
    }

    let persistentRoute;

    function clickFirstListItem() {
      let firstListItem = batchRoutingControl.container.querySelector('.item');
      clearRoutes();
      if (firstListItem) {
        firstListItem.click();
      }
      if (persistentRoute) {
        map.fitBounds(persistentRoute.getBounds(), {padding: [5, 5]});
      }
    }

    let expandVisibleRows = function(items, firstVisible, lastVisible) {

      items.forEach(function(item, index) {
        if (lastVisible < index || index < firstVisible) {
          item.classList.remove('visible');
        } else {
          item.classList.add('visible');
        }

      });

    };

    function updateScrollEvent(data) {

      let results = data.results;

      let list = batchRoutingControl.container.querySelector('ol');
      let items = Array.apply(null, list.querySelectorAll('li.item'));
      let cellHeight = 30;
      let lastVisible;
      let firstVisible;

      list.removeEventListener('scroll', listScrollHandler);
      listScrollHandler = function() {
        firstVisible = Math.min(Math.ceil(list.scrollTop / cellHeight) - 1, results.length);
        lastVisible = Math.max(firstVisible + Math.floor(list.clientHeight / cellHeight) + 1, 0);
        let limit = results.length / 2;
        if (lastVisible >= limit && results.length) {
          let lastResult = results[results.length - 1];
          let time = arrivalOrDeparture.value === 'depart at' ? lastResult.from : lastResult.to;
          requestNextPage(time, data);
        }
        expandVisibleRows(items, firstVisible, lastVisible);
      };
      list.addEventListener('scroll', listScrollHandler);
      listScrollHandler();

      return data;

    }

    function requestNextPage(date, previousData) {
      if (batchRequestsLock) {
        return;
      }
      batchRequestsLock = 'page';
      try {

        batch(timeSeries(date))
          .then(function(data) {
            // batchRequestsLock can be changed in the meantime
            if (batchRequestsLock === 'submit') {
              // let's jump straight to the end of this chain
              throw new PagingError();
            }
            return data;
          })
          .then(prepareData)
          .then(mergeData(previousData))
          .then(createItems)
          .then(updateScrollEvent)
          .then(updateListElements)
          .then(unlockBatchRequests, handleBatchRequestError);

      } catch (err) {
        handleBatchRequestError(err);
      }
    }

    // Create a new request
    function request(date) {
      if (batchRequestsLock === 'submit') {
        // we don't care if there's another page downloaded
        return;
      }
      batchRequestsLock = 'submit';
      try {
        clearList();
        batch(timeSeries(date))
          .then(function(data) {
            // handle the data here
            // we have this fake handler just for the docs purpose
            // this is more like a no-op
            return data;
          })
          .then(prepareData)
          .then(createItems)
          .then(updateScrollEvent)
          .then(updateListElements)
          .then(clickFirstListItem)
          .then(unlockBatchRequests, handleBatchRequestError);

      } catch (err) {
        handleBatchRequestError(err);
      }
    }

    function mapTimeToRoutingElement(time) {
      let format = 'yyyy-mm-dd hh:mm';
      let result = {
        traffic: true,
        locations: routePoints,
        computeTravelTimeFor: 'all'
      };
      let param = arrivalOrDeparture.value === 'depart at' ? 'departAt' : 'arriveAt';
      result[param] = formatDate(time).slice(0, format.length).replace('T', ' ');
      return result;
    }

    // generate time series for batch query
    function timeSeries(start) {
      let milisInMinute = 60 * 1000;
      let minutes = 15;
      let timesPerHour = 60 / minutes;
      let hours = 6;
      let numberOfResults = timesPerHour * hours;
      return Array.apply(null, Array(numberOfResults))
        .reduce(function(accumulator) {
          let i = accumulator.length - 1;
          let previous = accumulator[i];
          let current = new Date(previous.getTime() + minutes * milisInMinute);
          return accumulator.concat([current]);
        }, [new Date(start)])
        .map(mapTimeToRoutingElement);
    }

    function showDetails(result) {
      let from = batchRoutingControl.container.querySelector('.details .from-value');
      let to = batchRoutingControl.container.querySelector('.details .to-value');
      let distance = batchRoutingControl.container.querySelector('.details .distance-value');
      let time = batchRoutingControl.container.querySelector('.details .time-value');
      let delay = batchRoutingControl.container.querySelector('.details .delay-value');
      let live = batchRoutingControl.container.querySelector('.details .live-value');
      let noTraffic = batchRoutingControl.container.querySelector('.details .without-traffic-value');
      from.innerHTML = result.from ? formatTime(result.from) : '--';
      to.innerHTML = result.to ? formatTime(result.to) : '--';
      distance.innerHTML = result.distance ? formatDistance(result.distance) : '--';
      time.innerHTML = result.time ? formatDiff(result.time) : '--';
      delay.innerHTML = result.delay ? formatDiff(result.delay) : '--';
      live.innerHTML = result.liveTraffic ? formatDiff(result.liveTraffic) : '--';
      noTraffic.innerHTML = result.noTraffic ? formatDiff(result.noTraffic) : '--';
    }

    let route;

    function drawRoute(result) {
      if (route) {
        map.removeLayer(route);
      }
      if (!result || !result.route) {
        return;
      }
      route = tomtom.L.geoJson(result.route, {color: result.color}).addTo(map);
    }

    function onRowClick(result) {
      let previous = batchRoutingControl.container.querySelector('.item.active');
      if (previous) {
        previous.classList.remove('active');
      }
      if (persistentRoute) {
        map.removeLayer(persistentRoute);
      }
      if (previous === this || !result || !result.route) {
        return;
      }
      this.classList.add('active');
      persistentRoute = tomtom.L.geoJson(result.route, {
        opacity: 0.5,
        weight: 10,
        color: result.color
      })
        .addTo(map)
        .on('mouseover', showDetails.bind(null, result))
        .on('mouseout', showDetails);
    }

    function onRowMouseOver(result) {
      drawRoute(result);
      showDetails(result);
    }

    function clearRoutes() {
      if (route) {
        map.removeLayer(route);
      }
      if (persistentRoute) {
        map.removeLayer(persistentRoute);
      }
    }

    function getOrCreateList() {
      let list = batchRoutingControl.container.querySelector('ol');
      if (list) {
        return list;
      }
      list = tomtom.L.DomUtil.create('ol', 'list');
      batchRoutingControl.addContent(createHeader());
      batchRoutingControl.addContent(list);
      batchRoutingControl.addContent(createDetails());
      return list;
    }

    function createRow(list) {
      let element = tomtom.L.DomUtil.create('li', 'item', list);
      tomtom.L.DomUtil.create('span', 'from', element);
      tomtom.L.DomUtil.create('span', 'date', element);
      let barContainer = tomtom.L.DomUtil.create('div', 'bar-container', element);
      let bar = tomtom.L.DomUtil.create('div', 'bar', barContainer);
      tomtom.L.DomUtil.create('span', 'diff', bar);
      tomtom.L.DomUtil.create('span', 'to', element);
      return element;
    }

    function createHeader() {
      let header = tomtom.L.DomUtil.create('div', 'header');
      let depart = tomtom.L.DomUtil.create('span', null, header);
      let delay = tomtom.L.DomUtil.create('span', null, header);
      let arrive = tomtom.L.DomUtil.create('span', null, header);
      depart.innerHTML = 'Departure';
      delay.innerHTML = 'Delay';
      arrive.innerHTML = 'Arrive';
      return header;
    }

    function createDetails() {
      let details = tomtom.L.DomUtil.create('div', 'details');
      let left = L.DomUtil.create('span', 'left column', details);
      let mid = L.DomUtil.create('span', 'mid column', details);
      let right = L.DomUtil.create('span', 'right column', details);
      let travelTimeLabel = L.DomUtil.create('span', 'details-label travel-label', left);
      let liveTrafficLabel = L.DomUtil.create('span', 'details-label live-label', left);
      let withoutTrafficLabel = L.DomUtil.create('span', 'details-label without-traffic-label', left);
      let distanceLabel = L.DomUtil.create('span', 'details-label distance-label', mid);
      let trafficDelayLabel = L.DomUtil.create('span', 'details-label delay-label', mid);
      let departLabel = L.DomUtil.create('span', 'details-label from-label', right);
      let arriveLabel = L.DomUtil.create('span', 'details-label to-label', right);
      liveTrafficLabel.innerHTML = '<span>live traffic:</span>';
      withoutTrafficLabel.innerHTML = '<span>without traffic:</span>';
      trafficDelayLabel.innerHTML = '<span>traffic delay:</span>';
      distanceLabel.innerHTML = '<span>distance:</span>';
      departLabel.innerHTML = '<span>depart at:</span>';
      travelTimeLabel.innerHTML = '<span>travel time:</span>';
      arriveLabel.innerHTML = '<span>arrive at:</span>';
      let travelTimeValue = L.DomUtil.create('span', 'time-value', travelTimeLabel);
      let liveTrafficValue = L.DomUtil.create('span', 'live-value', liveTrafficLabel);
      let withoutTrafficValue = L.DomUtil.create('span', 'without-traffic-value', withoutTrafficLabel);
      let delayValue = L.DomUtil.create('span', 'delay-value', trafficDelayLabel);
      let distanceValue = L.DomUtil.create('span', 'distance-value', distanceLabel);
      let fromValue = L.DomUtil.create('span', 'from-value', departLabel);
      let toValue = L.DomUtil.create('span', 'to-value', arriveLabel);
      travelTimeValue.innerHTML = '--';
      liveTrafficValue.innerHTML = '--';
      withoutTrafficValue.innerHTML = '--';
      delayValue.innerHTML = '--';
      distanceValue.innerHTML = '--';
      fromValue.innerHTML = '--';
      toValue.innerHTML = '--';
      return details;
    }


    function showError(list) {
      list.classList.add('empty', 'error');
    }

    function hideError(list) {
      list.classList.remove('error');
    }

    function showLoader(list) {
      list.classList.remove('empty');
      batchRoutingControl.unfold();
    }

    function hideLoader(list) {
      list.classList.add('empty');
      batchRoutingControl.unfold();
    }

    function clearList() {
      let list = getOrCreateList();
      let children = list.querySelectorAll('li.item');
      Array.prototype.forEach.call(children, removeNode);
      hideError(list);
      showLoader(list);
    }

    function createItems(data) {
      let list = getOrCreateList();
      let results = data.results;
      if (!results.length) {
        hideLoader(list);
        return data;
      }
      for (let i = list.childElementCount; i < results.length; i += 1) {
        createRow(list);
      }
      return data;
    }

    function removeNode(node) {
      while (node.firstElementChild) {
        removeNode(node.firstElementChild);
      }
      node.parentElement.removeChild(node);
    }

    let listItemsEventHandlers = {
      mouseover: [],
      mouseout: [],
      click: []
    };

    function updateHandler(element, event, index, handler) {
      if (index in listItemsEventHandlers[event]) {
        element.removeEventListener(event, listItemsEventHandlers[event][index]);
      }
      listItemsEventHandlers[event][index] = handler;
      element.addEventListener(event, handler);
    }

    function updateListElements(data) {
      let items = batchRoutingControl.container.querySelectorAll('ol li.item');
      let results = data.results;
      for (let i = 0; i < results.length; i += 1) {
        let element = items[i];
        let result = results[i];
        let from = element.querySelector('.from');
        let date = element.querySelector('.date');
        let bar = element.querySelector('.bar');
        let to = element.querySelector('.to');

        from.innerHTML = formatTime(result.from);
        to.innerHTML = formatTime(result.to);
        date.classList.add('hidden');
        if (i - 1 in results) {
          let previous = results[i - 1];
          let previousDate = new Date(previous.from);
          previousDate.setDate(previousDate.getDate() + 1);
          if (previousDate.getDate() === result.from.getDate()) {
            date.innerHTML = result.from.toDateString();
            date.classList.remove('hidden');
          }
        }
        bar.style.width = 50 * result.ratio + '%';
        bar.style.backgroundColor = result.color;
        updateHandler(element, 'click', i, onRowClick.bind(element, result));
        updateHandler(element, 'mouseout', i, onRowMouseOver.bind(element, {}));
        updateHandler(element, 'mouseover', i, onRowMouseOver.bind(element, result));
      }
    }

    function batch(request) {
      return tomtom.routing(request).go();
    }

    function attachColorAndRatio(min, max) {
      let HUE = 71, LIGHTNESS = 36;
      return function(result) {
        let ratio = (result.time - min * 0.99) / (max - min * 0.99);
        let hue = HUE * (1 - Math.pow(ratio, 3));
        let light = LIGHTNESS + 20 * ratio;
        result.color = 'hsl(' + Math.round(hue) + ', 91%, ' + light + '%)';
        result.ratio = ratio;
        return result;
      };
    }


    function prepareData(data) {

      var results = data.filter(function(record) {
        return typeof record.error === 'undefined';
      }).map(function(record) {
        var feature = record.features[0];
        return {
          summary: feature.properties.summary,
          geometry: feature.geometry
        };
      }).map(function(record) {

        if (iter < 1) {

          routetrajet.push({
            departuretime: record.summary.departureTime,
            traveltimeinseconds: record.summary.travelTimeInSeconds,
            distanceinmeters: record.summary.lengthInMeters,
            delaytraffic: record.summary.liveTrafficIncidentsTravelTimeInSeconds - record.summary.noTrafficTravelTimeInSeconds,
            departance: record.geometry.coordinates[1],
            arrival: record.geometry.coordinates[record.geometry.coordinates.length - 1]
          }); // premier élément de route geometry = coordonnées de départ, dernier = arrivée

          // AddColis(colis);
          // console.log(JSON.stringify(routecolis));
          // console.log(JSON.stringify(routecolis[0].nom));
          recordtrajet(inscription);
          service.addtrajet(inscription);


          iter = iter + 1; // comme ça ne stocke que pour le temps demander


        }

        return {
          from: new Date(record.summary.departureTime),
          to: new Date(record.summary.arrivalTime),
          liveTraffic: record.summary.liveTrafficIncidentsTravelTimeInSeconds,
          noTraffic: record.summary.noTrafficTravelTimeInSeconds,
          delay: record.summary.trafficDelayInSeconds,
          distance: record.summary.lengthInMeters,
          time: record.summary.travelTimeInSeconds,
          route: record.geometry
        };

      });


      let times = results.map(function(record) {
        return record.time;
      });
      let min = Math.min.apply(Math, times);
      let max = Math.max.apply(Math, times);
      return {
        min,
        max,
        results: results.map(attachColorAndRatio(min, max))
      };
    }

    function mergeData(previous) {
      return function(current) {
        let results = current.results;
        let max = current.max;
        let min = current.min;
        if (previous) {
          if (typeof previous.max !== 'undefined') {
            max = Math.max(previous.max, max);
          }
          if (typeof previous.min !== 'undefined') {
            min = Math.min(previous.min, min);
          }
          if (Array.isArray(previous.results)) {
            results = previous.results.concat(current.results);
          }
        }
        results = results.map(attachColorAndRatio(min, max));
        let data = {
          results,
          min,
          max
        };
        return data;
      };
    }

    function pad(num) {
      return (num >= 10 ? '' : '0') + String(num);
    }

    function getDate() {
      if (fallback) {
        return new Date(timepicker.value.replace(/-/g, '/'));
      }
      return new Date(timepicker.valueAsNumber + offset * 60 * 1000);
    }

    function setDate(date) {
      let now = formatDate(date || new Date());
      timepicker.setAttribute('value', fallback ? now.replace('T', ' ') : now);
    }

    function formatDistance(meters) {
      let kilometer = 1000;
      let kilometers = Math.round(100 * meters / kilometer) / 100;
      let result = Math.floor(meters % kilometer) + ' m';
      if (kilometers >= 1) {
        result = kilometers + ' km ';
      }
      return result;
    }

    function formatDiff(seconds) {
      let min = 60;
      let hour = min * 60;
      let day = hour * 24;
      let days = Math.floor(seconds / day);
      let hours = Math.floor((seconds % day) / hour);
      let minutes = Math.floor((seconds % hour) / min);
      let result = Math.floor(seconds % min) + 's';
      if (minutes) {
        result = minutes + 'm ' + result;
      }
      if (hours) {
        result = hours + 'h ' + result;
      }
      if (days) {
        result = days + 'd ' + result;
      }
      return result;
    }

    function formatTime(date) {
      return pad(date.getHours()) + ':' + pad(date.getMinutes());
    }

    function formatDate(date) {
      return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes());
    }


  }
}
