//Map JS
// Initialize and add the map
function initMap() {
    // The location of Singapore
    const Singapore = { lat: 1.290270, lng:  103.851959 };
    // The map, centered at Singapore
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: Singapore,
    });
    // The marker, positioned at Singapore
    const marker = new google.maps.Marker({
      position: Singapore,
      map: map,
    });


    
    //install chrome extension for cors unblock
    //GeoJson file loading
    map.data.loadGeoJson('../files/supermarket_cleaned.json', {idPropertyName: 'storeid'});

    const apiKey = 'AIzaSyC4iZaPWXAnyjm3siO3GaFQ7YhuOIC8KAk';
    const infoWindow = new google.maps.InfoWindow();

    map.data.addListener('click', (event) => {
      const name = event.feature.getProperty('name');
      const position = event.feature.getGeometry().get();
      const street_name = event.feature.getProperty('street_name');
      const block = event.feature.getProperty('blk');
      const unit_no = event.feature.getProperty('unit_no');
      const postal_code = event.feature.getProperty('postal_code');
      const content = `
        <h3>${name}</h3>
        <h6>Located at:</h6>
        <p>${street_name} Block ${block} Postal Code: ${postal_code}</p>
      `;
  
      infoWindow.setContent(content);
      infoWindow.setPosition(position);
      infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
      infoWindow.open(map);
    });
    

    //Search bar
    const options = {
      types: ['address'],
      componentRestrictions: {country: 'sg'},
    };

    var input = document.querySelector(".form-control");

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.setFields(
        ['address_components', 'geometry', 'name']);


    
    //Centers the map
    // Set the origin point when the user selects an address
    const originMarker = new google.maps.Marker({map: map});
    originMarker.setVisible(false);
    let originLocation = map.getCenter();

    autocomplete.addListener('place_changed', async () => {
      originMarker.setVisible(false);
      originLocation = map.getCenter();
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No address available for input: \'' + place.name + '\'');
        return;
      }

      // Recenter the map to the selected address
      originLocation = place.geometry.location;
      map.setCenter(originLocation);
      map.setZoom(16);
      //console.log(place);

      originMarker.setPosition(originLocation);
      originMarker.setVisible(true);

      /*
      // Use the selected address as the origin to calculate distances
      // to each of the store locations
      // need json file to load before continuing to work on this
      const rankedStores = await calculateDistances(map.data, originLocation);
      return;
      */
    });
    
    

}

/*
Geojson file from https://data.gov.sg/dataset/supermarkets 
Reference: https://developers.google.com/codelabs/maps-platform/google-maps-simple-store-locator#3 
Check this one out : -
https://developers.google.com/codelabs/maps-platform/google-maps-simple-store-locator#5

//https://data.gov.sg/dataset/list-of-supermarket-licences 

*/
window.initMap = initMap;
