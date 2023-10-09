import L from "leaflet";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/images/marker-icon-2x.png";
import React from "react";
import type {Tables} from "~/database.types";

interface MapProps {
  walks: Tables<'walks'>[];
}

const myIcon = L.icon({
  iconUrl: "marker.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export function Map({walks}: MapProps) {
  return (
    <MapContainer
      className="is-hidden-mobile"
      center={{lat: 50.3155646, lng: 5.009682}}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>'
        url="https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png"
        tileSize={256}
        maxZoom={18}
      />
      {walks.map((walk, index) => {
        return (
          <Marker
            icon={myIcon}
            key={index}
            title={walk.locality}
            alt={walk.locality}
            position={[walk.latitude, walk.longitude]}
          >
            <Popup>
              {walk.locality} ({walk.entity})
              <br/>
              <a href={`#walk-${walk.id}`}>Détails</a>{" "}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
