"use client";

import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { v4 as uuidv4 } from "uuid";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MapBoxMap = () => {
  const mapRef = useRef<any>(null);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinate, setSourceCordinate } =
    useContext(SourceCordiContext);
  const { destinationCordinate, setDestinationCordinate } = useContext(
    DestinationCordiContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  const MAPBOX_DRIVNG_ENDPOINT =
    "https://api.mapbox.com/directions/v5/mapbox/driving/";
  const session_token = uuidv4();

  // use to fly to destination markers location
  useEffect(() => {
    if (sourceCordinate) {
      mapRef.current?.flyTo({
        center: [sourceCordinate.lng, sourceCordinate.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinate]);

  // use to fly to source markers destination
  useEffect(() => {
    if (destinationCordinate) {
      mapRef.current?.flyTo({
        center: [destinationCordinate.lng, destinationCordinate.lat],
        duration: 2500,
      });
    }

    if (sourceCordinate && destinationCordinate) {
      getDirectionRoute();
    }
  }, [destinationCordinate]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVNG_ENDPOINT +
        sourceCordinate.lng +
        "," +
        sourceCordinate.lat +
        ";" +
        destinationCordinate.lng +
        "," +
        destinationCordinate.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log("routes", result);
    setDirectionData(result);
  };

  return (
    <div className=" p-5">
      <h2 className=" text-[20px] font-semibold">Map</h2>
      <div className=" rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 550 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className=" absolute bottom-[120px] z-20 right-[20px] hidden md:block">
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapBoxMap;
