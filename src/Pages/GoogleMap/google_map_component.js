import React, { useEffect, useState } from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import "./MapApi.css";

//--Change API Key here
Geocode.setApiKey("AIzaSyAR1SLhJO5bYL0YXJ5DuQWLLhnav7NX9Fk");

function GoogleMapComponent(props){

  //---Intially set coordinates
  const [coordinates, setCoordinates] = useState({
    address: "",
    area: "",
    street: "",
    locality: "",
    region: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    mapPosition: { lat: 0, long: 0 },
    markerPosition: { lat: 0, long: 0 },
  });
  //---Edit project set draggable as false
  const [draggable,setDraggable] = useState(true);
 
  //---Edit Project functionality check this use Effect
 useEffect(() => {
   //--[check the props]
  //---Add project page check this
  props.updateField1 !== undefined && props.updateField1(coordinates);

  //--project edit page check this 
  props.edit  !== undefined && setDraggable(props.edit);
  props.edit  !== undefined && props.handleAddr !== undefined &&  props.handleAddr(coordinates);
   // eslint-disable-next-line react-hooks/exhaustive-deps  
 }, [coordinates,props.edit]);
 
 //---Google component not able to change with with child components
  useEffect(() => {
    //Need any custom address set custom_address = "paris"
    const custom_address = "";
   
    if(props.map){
      //----If already having the address details pass lat & long to getGeoCode
      const pdata = JSON.parse(localStorage.getItem("project_list_details"));
      const clat = pdata.latitude;
      const clong = pdata.longitude;
      if(clat !== "" && clong !== ""){
        props.edit  !== undefined && setDraggable(props.edit);
      getGeoCode( Number(clat),Number(clong) );
      }
    } else if (custom_address !== undefined && custom_address !== "") {
      //Custom address Details
      // Get latitude & longitude from address.
      Geocode.fromAddress(custom_address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          getGeoCode(lat,lng);
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (navigator.geolocation) {
    //---For picking current location
      navigator.geolocation.getCurrentPosition((position) => {
        let newLat = position.coords.latitude,
          newLng = position.coords.longitude;
          getGeoCode(newLat,newLng);
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area += addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getGeoCode = (newLat,newLng) =>{
    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const addr = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getLocationDeatils(addressArray, "city"),
        area = getArea(addressArray),
        street = getLocationDeatils(addressArray, "street"),
        state = getLocationDeatils(addressArray, "state"),
        zip = getLocationDeatils(addressArray, "postal_code"),
        locality = getLocationDeatils(addressArray, "locality"),
        region = getLocationDeatils(addressArray, "region"),
        country = getLocationDeatils(addressArray, "country");

      //--------changing the coordinates-------
      setCoordinates({
        address: addr ? addr : "",
        area: area ? area : "",
        street: street ? street : "",
        locality: locality ? locality : "",
        region: region ? region : "",
        city: city ? city : "",
        state: state ? state : "",
        country: country,
        zip: zip ? zip : "",
        mapPosition: { lat: newLat, long: newLng },
        markerPosition: { lat: newLat, long: newLng },
      });

    });
  }

//----Common function for getting specific address details
  const getLocationDeatils = (addressArray, type) => {
    let res = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        switch (type) {
          case "street":
            if (
              addressArray[i].types[0] &&
              "street_number" === addressArray[i].types[0]
            ) {
              res = addressArray[i].long_name;
              return res;
            }
            break;
          case "city":
            if (
              addressArray[i].types[0] &&
              "administrative_area_level_1" === addressArray[i].types[0]
            ) {
              res = addressArray[i].long_name;
              return res;
            }
            break;
          case "locality":
            if (
              addressArray[i].types[0] &&
              "route" === addressArray[i].types[0]
            ) {
              res = addressArray[i].long_name;
              return res;
            }
            break;
            case "region":
              if (
                addressArray[i].types[0] &&
                "locality" === addressArray[i].types[0]
              ) {
                res = addressArray[i].long_name;
                return res;
              }
              break;  
          case "state":
            if (
              addressArray[i].types[0] &&
              "administrative_area_level_1" === addressArray[i].types[0]
            ) {
              res = addressArray[i].long_name;
              return res;
            }
            break;
          case "country":
            if (
              addressArray[i].types[0] &&
              "country" === addressArray[i].types[0]
            ) {
              res = addressArray[i].long_name;
              return res;
            }
            break;
          case "postal_code":
            if (
              addressArray[i].types[0] &&
              "postal_code" === addressArray[i].types[0]
            ) {
              res = addressArray[i].long_name;
              return res;
            }
            break;
          default:
        }
      }
    }
  };

//---On marker drag call this function

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    getGeoCode(newLat,newLng);
  };

//---on auto complete function

  const onPlaceSelected = (place) => {
    if (place.address_components !== undefined) {
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = getLocationDeatils(addressArray, "city"),
        area = getArea(addressArray),
        street = getLocationDeatils(addressArray, "street"),
        state = getLocationDeatils(addressArray, "state"),
        zip = getLocationDeatils(addressArray, "postal_code"),
        locality = getLocationDeatils(addressArray, "locality"),
        region = getLocationDeatils(addressArray, "region"),
        country = getLocationDeatils(addressArray, "country"),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();
      // Set these values in the state.
      setCoordinates({
        address: address ? address : "",
        area: area ? area : "",
        locality: locality ? locality : "",
        region: region ? region : "",
        street: street ? street : "",
        city: city ? city : "",
        state: state ? state : "",
        zip: zip ? zip : "",
        country: country,
        mapPosition: { lat: latValue, long: lngValue },
        markerPosition: { lat: latValue, long: lngValue },
      });
    }
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{
          lat: coordinates.mapPosition.lat,
          lng: coordinates.mapPosition.long,
        }}
      >
        {draggable && <Autocomplete
          className="form-control "
          onPlaceSelected={(e) => {
            //---Autocomplete option call this function
            onPlaceSelected(e);
          }}
          placeholder = {"Enter project location"}
          types={[]}
        />}

        <Marker
          draggable={draggable}
          onDragEnd={(e) => {
          //---On Drag location change
            onMarkerDragEnd(e);
          }}
          position={{
            lat: coordinates.mapPosition.lat,
            lng: coordinates.mapPosition.long,
          }}
        >
          <InfoWindow>
            <div>{coordinates.address}</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ))
  );
 
  
  return (
            <div>
              {
                <MapWithAMarker
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAR1SLhJO5bYL0YXJ5DuQWLLhnav7NX9Fk&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div className="loadingElement" />}
                  containerElement={<div className={props.updateField1 !== undefined ? "containerElement1":"containerElement"} />}
                  mapElement={<div className="loadingElement" />}
                />
              
            }
            </div>
        
  );
};

export default GoogleMapComponent;
