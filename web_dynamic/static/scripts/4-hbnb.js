$(document).ready(function () {
  const checkedAmenities = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const checkbox = $(this);
    const amenityID = checkbox.data('id');
    const amenityName = checkbox.data('name');

    if (checkbox.is(':checked')) {
      checkedAmenities[amenityID] = amenityName;
    } else {
      delete checkedAmenities[amenityID];
    }

    const amenitiesList = Object.values(checkedAmenities).join(', ');
    $('#checked_amenities').text(amenitiesList);
  });

  // Check the API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').toggleClass('available');
    } else {
      $('#api_status').toggleClass('circle');
    }
  });

  // Handle button click
  $('button').click(function () {
    // Create an array of checked amenity IDs
    const amenityIDs = Object.keys(checkedAmenities);

    // Send a new POST request to places_search with the list of checked amenity IDs
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: amenityIDs }),
      contentType: 'application/json',
      success: function (data) {
        // Loop through the result and create article tags for places
        const placesSection = $('.places');
        placesSection.empty(); // Clear existing content

        data.forEach(function (place) {
          const placeArticle = $('<article>');
          placeArticle.html(`
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          `);
          placesSection.append(placeArticle);
        });
      },
    });
  });
});
