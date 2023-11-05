$(document).ready(function() {
    const selectedAmenities = [];

    $("input[type='checkbox']").change(function() {
        const amenityId = $(this).data("id");
        const amenityName = $(this).data("name");

        if ($(this).is(":checked")) {
            selectedAmenities.push(amenityId);
        } else {
            selectedAmenities = selectedAmenities.filter(function(id) {
                return id !== amenityId;
            });
        }

        $("div.amenities h4").html(selectedAmenities.join(', '));
    });
});
