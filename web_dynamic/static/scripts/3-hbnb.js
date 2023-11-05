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

  // Request places from the front-end
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      // Loop through the results and create article tags representing places
      const placesSection = $('.places');

      for (const place of data) {
        const placeArticle = $('<article>');

        const titleBox = $('<div class="title_box">');
        titleBox.append(`<h2>${place.name}</h2>`);
        titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);

        const information = $('<div class="information">');
        information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>`);
        information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
        information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);

        const description = $('<div class="description">');
        description.html(place.description);

        placeArticle.append(titleBox);
        placeArticle.append(information);
        placeArticle.append(description);

        placesSection.append(placeArticle);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error loading places:', error);
    }
  });
});
