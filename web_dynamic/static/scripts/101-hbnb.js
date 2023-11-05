$(document).ready(function () {
  const checkedAmenities = {};
  const checkedCitiesStates = {};
  let reviewsVisible = false;

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const checkbox = $(this);
    const id = checkbox.data('id');
    const type = checkbox.data('type');

    if (checkbox.is(':checked')) {
      checkedCitiesStates[id] = type;
    } else {
      delete checkedCitiesStates[id];
    }

    const locations = Object.values(checkedCitiesStates).join(', ');
    $('#locations').text(locations);
  });

  // Handle button click
  $('button').click(function () {
    const amenityIDs = Object.keys(checkedAmenities);
    const locationIDs = Object.keys(checkedCitiesStates);

    // Send a new POST request to places_search with the list of checked amenity IDs, location IDs, and other parameters
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: amenityIDs, locations: locationIDs }),
      contentType: 'application/json',
      success: function (data) {
        const placesSection = $('.places');
        placesSection.empty();

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

  $('#showReviews').click(function () {
    if (reviewsVisible) {
      $('.review').remove();
      $('#showReviews').text('show');
      reviewsVisible = false;
    } else {
      $.ajax({
        type: 'GET',
        url: 'http://your-review-api-url',
        success: function (data) {
          data.forEach(function (review) {
            const reviewElement = $('<div class="review">');
            reviewElement.text(review.text);
            $('.reviews').append(reviewElement);
          });
        },
      });
      $('#showReviews').text('hide');
      reviewsVisible = true;
    }
  });
});
