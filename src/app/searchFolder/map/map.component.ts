import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {Driver} from './map.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DriverService} from '../../services/map.service';
import {parcour} from './tourne.json';
import {Key} from './TomTomKeys';


declare let L;
declare let tomtom: any;
declare let document: any;
let dep: string;
let arr: string;
let driverinfo = [];

let iter;

let driver: Driver = {
  idUser: null,
  nbrePlaces: null,
  detourMax: null,
  choix: null,
  departuretime: '',
  time: '',
  distance: '',
  trafficdelay: '',
  departure: '',
  arrival: '',
  departureAddress: '',
  arrivalAddress: ''};

function recordDriver(data: Driver) {
  data.nbrePlaces = driverinfo[0].nbrePlaces;
  data.detourMax = driverinfo[0].detourMax;
  data.choix = driverinfo[0].choix;
  data.departuretime = driverinfo[1].departuretime;
  data.time = driverinfo[1].traveltimeinseconds;
  data.distance = driverinfo[1].distance;
  data.trafficdelay = driverinfo[1].delaytraffic;
  data.departure = driverinfo[1].routegeometry.coordinates[0];
  data.arrival = driverinfo[1].routegeometry.coordinates[driverinfo[1].routegeometry.coordinates.length - 1];
  // acces au dernier element => longueur - 1
  data.departureAddress = driverinfo[1].departureAddress;
  data.arrivalAddress = driverinfo[1].arrivalAddress;
  console.log(JSON.stringify(data));


  // console.log(JSON.stringify(data));

}
// var iteration = 0;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../../app.component.css'],
  encapsulation : ViewEncapsulation.None
})


@Injectable()
export class MapComponent implements OnInit {

  @Output() messageToEmit = new EventEmitter<Object>();


  nbrePlaces = null;
  detour = null;
  statutVoiture = false;
  choix = null;

  constructor(private driverService: DriverService) {
    driver.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  save() {

    // console.log(this.nom);
    // console.log(this.volume);
    driverinfo.push({nbrePlaces : this.nbrePlaces, detourMax: this.detour, choix: this.choix});

  }

  ngOnInit() {

    this.driverService.setupVoiture(driver)
      .then((statut: boolean) => {
      this.statutVoiture = statut;
      console.log(statut);
    })
      .catch((err) => {
        console.error(err);
    });

    let what = this.messageToEmit;
    const service = this.driverService;
    // Define your product name and version

    tomtom.key(Key);
    tomtom.routingKey(Key);
    tomtom.searchKey(Key);

    const formOptions = {
      closeOnMapClick: false,
      position: 'topleft',
      title: null
    };
    let listScrollHandler = null;

    const map = tomtom.L.map('map', {
      key: Key,
      basePath: '/assets/sdktool/sdk',
      center: [ 52.360306, 4.876935 ],
      zoom: 15,
      source : 'vector'
    });

    const routeInputs = tomtom.routeInputs().addTo(map);
    const form = document.getElementById('form');
    const batchRoutingControl = tomtom.foldable(formOptions).addTo(map).addContent(form);
    window.addEventListener('resize', function() {
      batchRoutingControl.unfold();
      if (listScrollHandler) {
        // run after css animation
        setTimeout(listScrollHandler, 250);
      }
    });

    function buildPopupMessage(summary) {
      return [
        'Distance: ' + tomtom.unitFormatConverter.formatDistance(summary.lengthInMeters),
        'Estimated travel time: ' + tomtom.unitFormatConverter.formatTime(summary.travelTimeInSeconds),
        'Traffic delay: ' + tomtom.unitFormatConverter.formatTime(summary.trafficDelayInSeconds)
      ].join('<br/>');
    }
    function bindPopups(feature, layer) {
      layer.on('mouseover', function(e) {
        L.popup()
          .setLatLng(e.latlng)
          .setContent(buildPopupMessage(feature.properties.summary))
          .openOn(map);
      });
    }

// let's move this to the bottom of topright
    map.zoomControl.setPosition('topright');
// fill datepicker with current time...
    const timepicker = document.querySelector('#date');
// (<HTMLElement>document.querySelector('#date')).style.display = 'none';
    timepicker.setAttribute('min', new Date().toISOString());
    const offset = new Date().getTimezoneOffset();
    const fallback = timepicker.type === 'text';
    if (fallback) {
      // no support for datetime-locale, let's show a warning message
      form.classList.add('fallback');
    }
// let's add 15 minutes from now to give user some time to fill the form
    setDate(new Date(new Date().getTime() + 15 * 60 * 1000));
    const arrivalOrDeparture = document.querySelector('select#type');
    const submitButton = document.querySelector('input[type=submit]');
    let routePoints;
    routeInputs.on(routeInputs.Events.LocationsFound, function(event) {
      if (!event.points[0] || !event.points[1]) {
        routePoints = null;
      } else {

        iter = 0;
        driverinfo = [];
        routePoints = event.points;
        tomtom.reverseGeocode({position: [routePoints[0].lat, routePoints[0].lon]})
          .go(function(response) {
            if (response && response.address && response.address.freeformAddress) {
              // console.log(JSON.stringify(response.address.freeformAddress));
              dep = response.address.freeformAddress;
            }
          });
        tomtom.reverseGeocode({position: [routePoints[1].lat, routePoints[1].lon]})
          .go(function(resp) {
            if (resp && resp.address && resp.address.freeformAddress) {
              // console.log(JSON.stringify(resp.address.freeformAddress));
              arr = resp.address.freeformAddress;
            }
          });
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
    PagingError.prototype = new Error();
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
      const firstListItem = batchRoutingControl.container.querySelector('.item');
      clearRoutes();
      if (firstListItem) {
        firstListItem.click();
      }
      if (persistentRoute) {
        map.fitBounds(persistentRoute.getBounds(), {padding: [5, 5]});
      }
    }
    const expandVisibleRows = function(items, firstVisible, lastVisible) {

      items.forEach(function(item, index) {
        if (lastVisible < index || index < firstVisible) {
          item.classList.remove('visible');
        } else {
          item.classList.add('visible');
        }

      });

    };
    function updateScrollEvent(data) {

      const results = data.results;

      const list = batchRoutingControl.container.querySelector('ol');
      const items = Array.apply(null, list.querySelectorAll('li.item'));
      const cellHeight = 30;
      let lastVisible;
      let firstVisible;

      list.removeEventListener('scroll', listScrollHandler);
      listScrollHandler = function() {
        firstVisible = Math.min(Math.ceil(list.scrollTop / cellHeight) - 1, results.length);
        lastVisible = Math.max(firstVisible + Math.floor(list.clientHeight / cellHeight) + 1, 0);
        const limit = results.length / 2;
        if (lastVisible >= limit && results.length) {
          const lastResult = results[results.length - 1];
          // const time = arrivalOrDeparture.value === 'depart at' ? lastResult.from : lastResult.to;
          // requestNextPage(time, data);
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
            .then(updateListElements);
          // .then(unlockBatchRequests, handleBatchRequestError);

        } catch (err) {
          handleBatchRequestError(err);
        }
      }

// Create a new request
    function request(date) {
      console.log (iter);

      // L.clear();
      //////////////////////////////
      if (batchRequestsLock === 'submit') {
        // we don't care if there's another page downloaded
        return;
      }
      batchRequestsLock = 'submit';
      //if (iter < 2) {
        try {
          ///////////////////////////////////////////////
          clearList();
          batch(timeSeries (date))
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
      }//}
    function mapTimeToRoutingElement(time) {
      const format = 'yyyy-mm-dd hh:mm';
      const result = {
        traffic: true,
        locations: routePoints,
        computeTravelTimeFor: 'all'
      };
      const param = arrivalOrDeparture.value === 'depart at' ? 'departAt' : 'arriveAt';
      result[param] = formatDate(time).slice(0, format.length).replace('T', ' ');
      return result;
    }
// generate time series for batch query
    function timeSeries(start) {
      const milisInMinute = 60 * 1000;
      const minutes = 15;
      const timesPerHour = 60 / minutes;
      const hours = 6;
      const numberOfResults = 0;
      return Array.apply(null, Array(numberOfResults))
        .reduce(function(accumulator) {
          const i = accumulator.length - 1;
          const previous = accumulator[i];
          const current = new Date(previous.getTime() + minutes * milisInMinute);
          return accumulator.concat([current]);
        }, [new Date(start)])
        .map(mapTimeToRoutingElement);
    }
    function showDetails(result) {
      const from = batchRoutingControl.container.querySelector('.details .from-value');
      const to = batchRoutingControl.container.querySelector('.details .to-value');
      const distance = batchRoutingControl.container.querySelector('.details .distance-value');
      const time = batchRoutingControl.container.querySelector('.details .time-value');
      const delay = batchRoutingControl.container.querySelector('.details .delay-value');
      const live = batchRoutingControl.container.querySelector('.details .live-value');
      const noTraffic = batchRoutingControl.container.querySelector('.details .without-traffic-value');
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
      // console.log (JSON.stringify(result.route));
      // console.log (typeof(result.route));
      route = tomtom.L.geoJson(result.route, {color: result.color}).addTo(map);
    }
    function onRowClick(result) {
      const previous = batchRoutingControl.container.querySelector('.item.active');
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
      const element = tomtom.L.DomUtil.create('li', 'item', list);
      tomtom.L.DomUtil.create('span', 'from', element);
      tomtom.L.DomUtil.create('span', 'date', element);
      const barContainer = tomtom.L.DomUtil.create('div', 'bar-container', element);
      const bar = tomtom.L.DomUtil.create('div', 'bar', barContainer);
      tomtom.L.DomUtil.create('span', 'diff', bar);
      tomtom.L.DomUtil.create('span', 'to', element);
      return element;
    }
    function createHeader() {
      const header = tomtom.L.DomUtil.create('div', 'header');
      const depart = tomtom.L.DomUtil.create('span', null, header);
      const delay = tomtom.L.DomUtil.create('span', null, header);
      const arrive = tomtom.L.DomUtil.create('span', null, header);
      depart.innerHTML = 'Departure';
      delay.innerHTML = 'Delay';
      arrive.innerHTML = 'Arrive';
      return header;
    }
    function createDetails() {
      const details = tomtom.L.DomUtil.create('div', 'details');
      const left = L.DomUtil.create('span', 'left column', details);
      const mid = L.DomUtil.create('span', 'mid column', details);
      const right = L.DomUtil.create('span', 'right column', details);
      const travelTimeLabel = L.DomUtil.create('span', 'details-label travel-label', left);
      const liveTrafficLabel = L.DomUtil.create('span', 'details-label live-label', left);
      const withoutTrafficLabel = L.DomUtil.create('span', 'details-label without-traffic-label', left);
      const distanceLabel = L.DomUtil.create('span', 'details-label distance-label', mid);
      const trafficDelayLabel = L.DomUtil.create('span', 'details-label delay-label', mid);
      const departLabel = L.DomUtil.create('span', 'details-label from-label', right);
      const arriveLabel = L.DomUtil.create('span', 'details-label to-label', right);
      liveTrafficLabel.innerHTML = '<span>live traffic:</span>';
      withoutTrafficLabel.innerHTML = '<span>without traffic:</span>';
      trafficDelayLabel.innerHTML = '<span>traffic delay:</span>';
      distanceLabel.innerHTML = '<span>distance:</span>';
      departLabel.innerHTML = '<span>depart at:</span>';
      travelTimeLabel.innerHTML = '<span>travel time:</span>';
      arriveLabel.innerHTML = '<span>arrive at:</span>';
      const travelTimeValue = L.DomUtil.create('span', 'time-value', travelTimeLabel);
      const liveTrafficValue = L.DomUtil.create('span', 'live-value', liveTrafficLabel);
      const withoutTrafficValue = L.DomUtil.create('span', 'without-traffic-value', withoutTrafficLabel);
      const delayValue = L.DomUtil.create('span', 'delay-value', trafficDelayLabel);
      const distanceValue = L.DomUtil.create('span', 'distance-value', distanceLabel);
      const fromValue = L.DomUtil.create('span', 'from-value', departLabel);
      const toValue = L.DomUtil.create('span', 'to-value', arriveLabel);
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
      const list = getOrCreateList();
      const children = list.querySelectorAll('li.item');
      Array.prototype.forEach.call(children, removeNode);
      hideError(list);
      showLoader(list);
    }
    function createItems(data) {
      const list = getOrCreateList();
      const results = data.results;

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
    const listItemsEventHandlers = {
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
      const items = batchRoutingControl.container.querySelectorAll('ol li.item');
      const results = data.results;
      for (let i = 0; i < results.length; i += 1) {
        const element = items[i];
        const result = results[i];
        const from = element.querySelector('.from');
        const date = element.querySelector('.date');
        const bar = element.querySelector('.bar');
        const to = element.querySelector('.to');

        from.innerHTML = formatTime(result.from);
        to.innerHTML = formatTime(result.to);
        date.classList.add('hidden');
        if (i - 1 in results) {
          const previous = results[i - 1];
          const previousDate = new Date(previous.from);
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
      const HUE = 71, LIGHTNESS = 36;
      return function(result) {
        const ratio = (result.time - min * 0.99) / (max - min * 0.99);
        const hue = HUE * (1 - Math.pow(ratio, 3));
        const light = LIGHTNESS + 20 * ratio;
        result.color = 'hsl(' + Math.round(hue) + ', 91%, ' + light + '%)';
        result.ratio = ratio;
        return result;
      };
    }



    function prepareData(data) {
      const results = data.filter(function(record) {
        return typeof record.error === 'undefined';
      }).map(function(record) {
        const feature = record.features[0];
        return {
          summary: feature.properties.summary,
          geometry: feature.geometry
        };
      }).map(function(record) {

        console.log(iter)
        if (iter < 1) {
          console.log(iter)
          driverinfo.push( {departuretime : record.summary.departureTime,
            traveltimeinseconds : record.summary.travelTimeInSeconds,
            distanceinmeters : record.summary.lengthInMeters,
            delaytraffic : record.summary.liveTrafficIncidentsTravelTimeInSeconds - record.summary.noTrafficTravelTimeInSeconds,
            routegeometry : record.geometry,
            departureAddress : dep,
            arrivalAddress : arr
          }); // premier élément de route geometry = coordonnées de départ, dernier = arrivée;




          console.log(driverinfo);
          // console.log(JSON.stringify(record.geometry));

          recordDriver(driver);
          service.matchDriverTrajetforTournee(driver)
            .then((outputJson) => {
              console.log(JSON.stringify(Object.keys(outputJson).length));
              let idDriver = outputJson['parcours'][0];
              //console.log(idDriver);
              what.emit(outputJson);
              var cle = 0;

                for (var it = 1; it < 20; it++){
                  if (typeof window['Route'+it] !== 'undefined') {
                    window['Route'+it].clear();
                    delete window['Route'+it];
                    console.log(it);
                  }
                }
              for (var i = 1; i < Object.keys(outputJson).length - 1; i++){


                window['Route' + i] = new tomtom.routeOnMap({
                  serviceOptions: {
                    traffic: false
                }})

                window["Route"+i].addTo(map).draw([{lat: outputJson['passager' + i][1], lng: outputJson['passager' + i][2]}, {lat: outputJson['passager' + (i+1)][1], lng: outputJson['passager' + (i+1)][2]}]);

                console.log (window["Route"+i]);
              }

              //let idTrajet = outputJson['passager' + i][0];
              //const point = [outputJson['passager' + i][2], outputJson['passager' + i][1]];  // indice 2 => longitude indice 1 => latitude
            })
            .catch((err) => {
              console.error(err);
            });

          // service.findMiniTrajet(driver);
          iter ++;
          // comme ça ne stocke que pour le temps demander
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
      const times = results.map(function(record) {
        return record.time;
      });
      const min = Math.min.apply(Math, times);
      const max = Math.max.apply(Math, times);
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
        const data = {
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
      const now = formatDate(date || new Date());
      timepicker.setAttribute('value', fallback ? now.replace('T', ' ') : now);
    }
    function formatDistance(meters) {
      const kilometer = 1000;
      const kilometers = Math.round(100 * meters / kilometer) / 100;
      let result = Math.floor(meters % kilometer) + ' m';
      if (kilometers >= 1) {
        result = kilometers + ' km ';
      }
      return result;
    }
    function formatDiff(seconds) {
      const min = 60;
      const hour = min * 60;
      const day = hour * 24;
      const days = Math.floor(seconds / day);
      const hours = Math.floor((seconds % day) / hour);
      const minutes = Math.floor((seconds % hour) / min);
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

  seeSubmit() {
    return this.statutVoiture;
  }
}
