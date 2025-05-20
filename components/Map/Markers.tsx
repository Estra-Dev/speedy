import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl/mapbox";

const Markers = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinate, setSourceCordinate } =
    useContext(SourceCordiContext);
  const { destinationCordinate, setDestinationCordinate } = useContext(
    DestinationCordiContext
  );
  return (
    <div>
      <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="./com.png" className=" w-[20px] h-[15px]" />
      </Marker>

      {/* Source marker */}
      {sourceCordinate.length != 0 ? (
        <Marker
          longitude={sourceCordinate?.lng}
          latitude={sourceCordinate?.lat}
          anchor="bottom"
        >
          <img src="./com.png" className=" w-[20px] h-[15px]" />
        </Marker>
      ) : null}

      {/* Destination marker */}
      {destinationCordinate.length != 0 ? (
        <Marker
          longitude={destinationCordinate?.lng}
          latitude={destinationCordinate?.lat}
          anchor="bottom"
        >
          <img src="./com.png" className=" w-[20px] h-[15px]" />
        </Marker>
      ) : null}
    </div>
  );
};

export default Markers;
