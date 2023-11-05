$(document).ready(function () {
  const checkedAmenities = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const checkbox = $(this);
    const amenityID = checkbox.data('id');
    const amenityName = checkbox.data('name');

    if (checkbox.is(':checked')) {
      // If the checkbox is checked, store the Amenity ID in the variable
      checkedAmenities[amenityID] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the variable
      delete checkedAmenities[amenityID];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
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
});
