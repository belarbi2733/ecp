import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Driver} from './map.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DriverService} from './map.service';
declare let L;
declare let tomtom: any;
declare let document:any;
var driverinfo = [];

var iter =0;
var inscrire : Driver = {
    departuretime: '',
    time: '',
    distance: '',
    trafficdelay: '',
    routegeometry: ''}
function recorddriver(data:Driver){
  data.departuretime = driverinfo[0].departuretime;
  data.time = driverinfo[0].traveltimeinseconds;
  data.distance = driverinfo[0].distance;
  data.trafficdelay = driverinfo[0].delaytraffic;
  data.routegeometry= driverinfo[0].routegeometry;
  console.log(JSON.stringify(data));
  

  //console.log(JSON.stringify(data));

}
//var iteration = 0;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation : ViewEncapsulation.None
})


@Injectable()
export class MapComponent implements OnInit {

    
    dataNode: Driver[];
    constructor(private inscrService: DriverService, private router: Router, private http: HttpClient) {
      }
  ngOnInit() {
    
    // Define your product name and version
    tomtom.setProductInfo('EasyCarPool', '1.0.0');
    // Set TomTom keys
    tomtom.key('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');
    tomtom.routingKey('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');
    tomtom.searchKey('fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR');

    
    var formOptions = {
        closeOnMapClick: false,
        position: 'topleft',
        title: null
    };
    var listScrollHandler = null;

      const map = tomtom.L.map('map', {
        key: 'fA5Nk02Fi28EjXN7rH39YW4AOrqrGVnR',
        basePath: '/assets/sdktool/sdk',
        center: [ 52.360306, 4.876935 ],
        zoom: 15,
        source : 'vector'
      });
      
      var routeInputs = tomtom.routeInputs().addTo(map);
var form = document.getElementById('form');
var batchRoutingControl = tomtom.foldable(formOptions).addTo(map).addContent(form);
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
var timepicker = document.querySelector('#date');
//(<HTMLElement>document.querySelector('#date')).style.display = 'none';
timepicker.setAttribute('min', new Date().toISOString());
var offset = new Date().getTimezoneOffset();
var fallback = timepicker.type === 'text';
if (fallback) {
    // no support for datetime-locale, let's show a warning message
    form.classList.add('fallback');
}
// let's add 15 minutes from now to give user some time to fill the form
setDate(new Date(new Date().getTime() + 15 * 60 * 1000));
var arrivalOrDeparture = document.querySelector('select#type');
var submitButton = document.querySelector('input[type=submit]');
var routePoints;
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
var batchRequestsLock = null;
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
var persistentRoute;
function clickFirstListItem() {
    var firstListItem = batchRoutingControl.container.querySelector('.item');
    clearRoutes();
    if (firstListItem) {
        firstListItem.click();
    }
    if (persistentRoute) {
        map.fitBounds(persistentRoute.getBounds(), {padding: [5, 5]});
    }
}
var expandVisibleRows = function(items, firstVisible, lastVisible) {
    
    items.forEach(function(item, index) {
        if (lastVisible < index || index < firstVisible) {
            item.classList.remove('visible');
        } else {
            item.classList.add('visible');
        }
    
    });

};
function updateScrollEvent(data) {

    var results = data.results;

    var list = batchRoutingControl.container.querySelector('ol');
    var items = Array.apply(null, list.querySelectorAll('li.item'));
    var cellHeight = 30;
    var lastVisible;
    var firstVisible;
    
    list.removeEventListener('scroll', listScrollHandler);
    listScrollHandler = function() {
        firstVisible = Math.min(Math.ceil(list.scrollTop / cellHeight) - 1, results.length);
        lastVisible = Math.max(firstVisible + Math.floor(list.clientHeight / cellHeight) + 1, 0);
        var limit = results.length / 2;
        if (lastVisible >= limit && results.length) {
            var lastResult = results[results.length - 1];
            var time = arrivalOrDeparture.value === 'depart at' ? lastResult.from : lastResult.to;
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
    var format = 'yyyy-mm-dd hh:mm';
    var result = {
        traffic: true,
        locations: routePoints,
        computeTravelTimeFor: 'all'
    };
    var param = arrivalOrDeparture.value === 'depart at' ? 'departAt' : 'arriveAt';
    result[param] = formatDate(time).slice(0, format.length).replace('T', ' ');
    return result;
}
// generate time series for batch query
function timeSeries(start) {
    var milisInMinute = 60 * 1000;
    var minutes = 15;
    var timesPerHour = 60 / minutes;
    var hours = 6;
    var numberOfResults = timesPerHour * hours;
    return Array.apply(null, Array(numberOfResults))
        .reduce(function(accumulator) {
            var i = accumulator.length - 1;
            var previous = accumulator[i];
            var current = new Date(previous.getTime() + minutes * milisInMinute);
            return accumulator.concat([current]);
        }, [new Date(start)])
        .map(mapTimeToRoutingElement);
}
function showDetails(result) {
    var from = batchRoutingControl.container.querySelector('.details .from-value');
    var to = batchRoutingControl.container.querySelector('.details .to-value');
    var distance = batchRoutingControl.container.querySelector('.details .distance-value');
    var time = batchRoutingControl.container.querySelector('.details .time-value');
    var delay = batchRoutingControl.container.querySelector('.details .delay-value');
    var live = batchRoutingControl.container.querySelector('.details .live-value');
    var noTraffic = batchRoutingControl.container.querySelector('.details .without-traffic-value');
    from.innerHTML = result.from ? formatTime(result.from) : '--';
    to.innerHTML = result.to ? formatTime(result.to) : '--';
    distance.innerHTML = result.distance ? formatDistance(result.distance) : '--';
    time.innerHTML = result.time ? formatDiff(result.time) : '--';
    delay.innerHTML = result.delay ? formatDiff(result.delay) : '--';
    live.innerHTML = result.liveTraffic ? formatDiff(result.liveTraffic) : '--';
    noTraffic.innerHTML = result.noTraffic ? formatDiff(result.noTraffic) : '--';

    


}
var route;
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
    var previous = batchRoutingControl.container.querySelector('.item.active');
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
    var list = batchRoutingControl.container.querySelector('ol');
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
    var element = tomtom.L.DomUtil.create('li', 'item', list);
    tomtom.L.DomUtil.create('span', 'from', element);
    tomtom.L.DomUtil.create('span', 'date', element);
    var barContainer = tomtom.L.DomUtil.create('div', 'bar-container', element);
    var bar = tomtom.L.DomUtil.create('div', 'bar', barContainer);
    tomtom.L.DomUtil.create('span', 'diff', bar);
    tomtom.L.DomUtil.create('span', 'to', element);
    return element;
}
function createHeader() {
    var header = tomtom.L.DomUtil.create('div', 'header');
    var depart = tomtom.L.DomUtil.create('span', null, header);
    var delay = tomtom.L.DomUtil.create('span', null, header);
    var arrive = tomtom.L.DomUtil.create('span', null, header);
    depart.innerHTML = 'Departure';
    delay.innerHTML = 'Delay';
    arrive.innerHTML = 'Arrive';
    return header;
}
function createDetails() {
    var details = tomtom.L.DomUtil.create('div', 'details');
    var left = L.DomUtil.create('span', 'left column', details);
    var mid = L.DomUtil.create('span', 'mid column', details);
    var right = L.DomUtil.create('span', 'right column', details);
    var travelTimeLabel = L.DomUtil.create('span', 'details-label travel-label', left);
    var liveTrafficLabel = L.DomUtil.create('span', 'details-label live-label', left);
    var withoutTrafficLabel = L.DomUtil.create('span', 'details-label without-traffic-label', left);
    var distanceLabel = L.DomUtil.create('span', 'details-label distance-label', mid);
    var trafficDelayLabel = L.DomUtil.create('span', 'details-label delay-label', mid);
    var departLabel = L.DomUtil.create('span', 'details-label from-label', right);
    var arriveLabel = L.DomUtil.create('span', 'details-label to-label', right);
    liveTrafficLabel.innerHTML = '<span>live traffic:</span>';
    withoutTrafficLabel.innerHTML = '<span>without traffic:</span>';
    trafficDelayLabel.innerHTML = '<span>traffic delay:</span>';
    distanceLabel.innerHTML = '<span>distance:</span>';
    departLabel.innerHTML = '<span>depart at:</span>';
    travelTimeLabel.innerHTML = '<span>travel time:</span>';
    arriveLabel.innerHTML = '<span>arrive at:</span>';
    var travelTimeValue = L.DomUtil.create('span', 'time-value', travelTimeLabel);
    var liveTrafficValue = L.DomUtil.create('span', 'live-value', liveTrafficLabel);
    var withoutTrafficValue = L.DomUtil.create('span', 'without-traffic-value', withoutTrafficLabel);
    var delayValue = L.DomUtil.create('span', 'delay-value', trafficDelayLabel);
    var distanceValue = L.DomUtil.create('span', 'distance-value', distanceLabel);
    var fromValue = L.DomUtil.create('span', 'from-value', departLabel);
    var toValue = L.DomUtil.create('span', 'to-value', arriveLabel);
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
    var list = getOrCreateList();
    var children = list.querySelectorAll('li.item');
    Array.prototype.forEach.call(children, removeNode);
    hideError(list);
    showLoader(list);
}
function createItems(data) {
    var list = getOrCreateList();
    var results = data.results;
    if (!results.length) {
        hideLoader(list);
        return data;
    }
    for (var i = list.childElementCount; i < results.length; i += 1) {
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
var listItemsEventHandlers = {
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
    var items = batchRoutingControl.container.querySelectorAll('ol li.item');
    var results = data.results;
    for (var i = 0; i < results.length; i += 1) {
        var element = items[i];
        var result = results[i];
        var from = element.querySelector('.from');
        var date = element.querySelector('.date');
        var bar = element.querySelector('.bar');
        var to = element.querySelector('.to');

        from.innerHTML = formatTime(result.from);
        to.innerHTML = formatTime(result.to);
        date.classList.add('hidden');
        if (i - 1 in results) {
            var previous = results[i - 1];
            var previousDate = new Date(previous.from);
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
    var HUE = 71, LIGHTNESS = 36;
    return function(result) {
        var ratio = (result.time - min * 0.99) / (max - min * 0.99);
        var hue = HUE * (1 - Math.pow(ratio, 3));
        var light = LIGHTNESS + 20 * ratio;
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

        if (iter <1){

            /*
            donnee.departuretime = record.summary.departureTime ;
            this.donnee.time = record.summary.travelTimeInSeconds ;
            this.donnee.distance = record.summary.lengthInMeters ;
            this.donnee.trafficdelay = record.summary.liveTrafficIncidentsTravelTimeInSeconds -record.summary.noTrafficTravelTimeInSeconds ;
           
            this.DriverService.inscription(donnee);
            //console.log(donnee.time);
            */
            driverinfo.push( {"departuretime" : record.summary.departureTime,
            "traveltimeinseconds" : record.summary.travelTimeInSeconds,
            "distanceinmeters" : record.summary.lengthInMeters,
            "delaytraffic" : record.summary.liveTrafficIncidentsTravelTimeInSeconds -record.summary.noTrafficTravelTimeInSeconds,
            "routegeometry" : record.geometry});//premier élément de route geometry = coordonnées de départ, dernier = arrivée;
            
        
            
            
            //console.log(driverinfo);
            //console.log(JSON.stringify(record.geometry));
            recorddriver(inscrire);
            iter = iter + 1; //comme ça ne stocke que pour le temps demander
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
    var times = results.map(function(record) {
        return record.time;
    });
    var min = Math.min.apply(Math, times);
    var max = Math.max.apply(Math, times);
    return {
        min: min,
        max: max,
        results: results.map(attachColorAndRatio(min, max))
    };
}
function mergeData(previous) {
    return function(current) {
        var results = current.results;
        var max = current.max;
        var min = current.min;
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
        var data = {
            results: results,
            min: min,
            max: max
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
    var now = formatDate(date || new Date());
    timepicker.setAttribute('value', fallback ? now.replace('T', ' ') : now);
}
function formatDistance(meters) {
    var kilometer = 1000;
    var kilometers = Math.round(100 * meters / kilometer) / 100;
    var result = Math.floor(meters % kilometer) + ' m';
    if (kilometers >= 1) {
        result = kilometers + ' km ';
    }
    return result;
}
function formatDiff(seconds) {
    var min = 60;
    var hour = min * 60;
    var day = hour * 24;
    var days = Math.floor(seconds / day);
    var hours = Math.floor((seconds % day) / hour);
    var minutes = Math.floor((seconds % hour) / min);
    var result = Math.floor(seconds % min) + 's';
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