var markers = [
   
   ];

fetch("https://corona.askbhunte.com/api/v1/hospitals")
   .then(response => response.json())
   .then(data => {
      data.data.forEach(function(inf) {
         console.log(inf);
         markers.push({
            coords:{lat:inf.location.coordinates[0],lng:inf.location.coordinates[1]},content:'<p>' + inf.name + '</p>' + '<p>' + 'Number of bed available: ' + inf.capacity.beds+ '</p>' + '<p>' + 'Contact Number:' + inf.phone+ '</p>'
         });
         
      });
      

   })
   .catch(function(error) {
      console.error("Something went wrong with retrieving the data");
      console.error(error);
   });



function initMap() {

   var map = new google.maps.Map(document.getElementById("map"), {
      center: {lat:27.7172,lng:85.3240},
      zoom:8
   });

   console.log(markers.length);
   for(let i=0;i<markers.length;i++){
      console.log(markers[i]);
      addMarker(markers[i]);
      
   }


   function addMarker(props) {
      var marker = new google.maps.Marker({
         position:props.coords,
         map:map,
         icon:'https://img.icons8.com/emoji/2x/hospital-emoji.png'
      });

   var infoWindow = new google.maps.InfoWindow({
      content:props.content
   });

   marker.addListener('click', function() {
      infoWindow.open(map,marker);
   });
   }

}
console.log(data)





