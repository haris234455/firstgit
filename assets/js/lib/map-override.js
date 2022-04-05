/* eslint-disable */
var styles = [ {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#e9e9e9"
    }, {
        "lightness": 17
    } ]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#f5f5f5"
    }, {
        "lightness": 20
    } ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {
        "color": "#ffffff"
    }, {
        "lightness": 17
    } ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {
        "color": "#ffffff"
    }, {
        "lightness": 29
    }, {
        "weight": 0.2
    } ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#ffffff"
    }, {
        "lightness": 18
    } ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#ffffff"
    }, {
        "lightness": 16
    } ]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#f5f5f5"
    }, {
        "lightness": 21
    } ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#dedede"
    }, {
        "lightness": 21
    } ]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [ {
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }, {
        "lightness": 16
    } ]
}, {
    "elementType": "labels.text.fill",
    "stylers": [ {
        "saturation": 36
    }, {
        "color": "#333333"
    }, {
        "lightness": 40
    } ]
}, {
    "elementType": "labels.icon",
    "stylers": [ {
        "visibility": "off"
    } ]
}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [ {
        "color": "#f2f2f2"
    }, {
        "lightness": 19
    } ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [ {
        "color": "#fefefe"
    }, {
        "lightness": 20
    } ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [ {
        "color": "#fefefe"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    } ]
} ];

window.set_stores = function( data ) {
    find_directions = false;
    markersCoords.length = 0;
    addresses.length = 0;

    if ( data.you ) {
        markersCoords.push( { lat: data.you.lat, lng: data.you.lng, id: 0, address: '', marker_colour: '' } );
        find_directions = true;
    }

    for ( i = 0; i < data.stores.length; i++ ) {
        markersCoords.push( { lat: data.stores[ i ].lat, lng: data.stores[ i ].lng, id: data.stores[ i ].store_id, address: data.stores[ i ].summary, marker_colour: data.stores[ i ].pin_icon } );
        addresses.push( { id: data.stores[ i ].store_id, address: data.stores[ i ].summary, distance: data.stores[ i ].distance, website: data.stores[ i ].website, marker_colour: data.stores[ i ].pin_icon } );
    }

    show_addresses();
    add_markers();
}

window.show_addresses = function() {
    var html = "";
    var directions = "";
    for ( i = 0; i < addresses.length; i++ ) {
        var website = "";
        var pin_colour = "";
        website = "<div class='store_website'><a href='" + addresses[ i ].website + "' target='_blank'>" + addresses[ i ].website + "</a></div>";
        if ( addresses[ i ].marker_colour != "main" ) {
            pin_colour = " style='background-image:url(\"/apps/store-locator/markers/" + addresses[ i ].marker_colour + "2.png\")' ";
        }
        html = html + "<li " + pin_colour + " onmouseover='hoverStart(" + addresses[ i ].id + ")' onmouseout='hoverStop(" + addresses[ i ].id + ")'><div class='distance'>" + addresses[ i ].distance + "</div><a class='no-ajaxy' href='#' onclick='focus_and_popup(" + addresses[ i ].id + "); return false;'>" + addresses[ i ].address + "</a>" + website + directions + "</li>";
    }
    if ( addresses.length == 0 ) {
        html = "<li><div class='no_stores_found'>" + noStoresFound + "</div></li>";
    }
    $( ".addresses ul" ).html( html );
    fixURLS();
}


window.initialize = function() {
    mainIcon = "{{ 'ico-marker.png' | asset_url }}";
    youIcon = "{{ 'ico-marker-user.png' | asset_url }}";

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    geocoder = new google.maps.Geocoder();
    infoPopup = new google.maps.InfoWindow( {
        content: '',
        maxWidth: 330
    } );
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng( 40.740884, -1153.961248 ),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    };
    map = new google.maps.Map( document.getElementById( 'store_map' ), mapOptions );

    end_directions();

    add_markers();

    $( 'select[id^=custom_field_]' ).change( codeAddress );
    $( 'input[id^=search_filter_]' ).change( codeAddress );

    $( '#address_search' ).keypress( function( e ) {
        if ( e.which == 13 ) {
            codeAddress();
        }
    } );
    fixURLS();
}
/* eslint-enable */
