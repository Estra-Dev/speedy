import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const sessionToken = uuidv4();
const MAP_BOX_RETRIEVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

const AutoCompleteAddress = () => {
  const [source, setSource] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDestination] = useState<any>();

  const { sourceCordinate, setSourceCordinate } =
    useContext(SourceCordiContext);
  const { destinationCordinate, setDestinationCordinate } = useContext(
    DestinationCordiContext
  );

  const getAddressList = async () => {
    setAddressList("");

    // const query = sourceChange ? source : destination;
    console.log("source", source);
    try {
      const res = await fetch("/api/search-address?q=" + source, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      // console.log("res", result);
      setAddressList(result);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setAddressList([]);
    }
  };
  console.log("addre", addressList);

  const getDestinationAddress = async () => {
    setAddressList("");

    // const query = sourceChange ? source : destination;
    console.log("destinaiton", destination);
    const res = await fetch("/api/search-address?q=" + destination, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    // console.log("res", result);
    setAddressList(result);
  };

  useEffect(() => {
    if (source?.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        getAddressList();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        getDestinationAddress();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [destination]);

  const onSourceAddressClick = async (item: any) => {
    setSource(item.place_name);
    setSourceChange(false);
    setAddressList([]);

    const res = await fetch(
      MAP_BOX_RETRIEVE_URL +
        item.properties.mapbox_id +
        "?session_token=" +
        sessionToken +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setSourceCordinate({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log("resu", result);
  };

  const onDestinationAddress = async (item: any) => {
    setDestination(item.place_name);
    setDestinationChange(false);
    setAddressList([]);

    setDestination(item.place_name);
    setDestinationChange(false);
    setAddressList([]);

    const res = await fetch(
      MAP_BOX_RETRIEVE_URL +
        item.properties.mapbox_id +
        "?session_token=" +
        sessionToken +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();

    setDestinationCordinate({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log("dest:", result);
  };

  return (
    <form className=" mt-5">
      <div className=" relative">
        <label htmlFor="wherefrom" className=" text-gray-400">
          Where From?
        </label>
        <input
          type="text"
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
            setDestinationChange(false);
          }}
          className=" w-full border-[1px] rounded-lg p-1 bg-white focus:border-amber-400 outline-none"
          value={source || ""}
        />
        {addressList?.features && sourceChange ? (
          <div className=" shadow-md p-1 rounded-md w-full bg-white  z-50 absolute">
            {addressList?.features.map((item: any, index: number) => (
              <h2
                key={index}
                className=" p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSourceAddressClick(item);
                }}
              >
                {item.place_name}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className=" mt-3 relative">
        <label htmlFor="whereto" className=" text-gray-400">
          Where To?
        </label>
        <input
          type="text"
          value={destination || ""}
          onChange={(e) => {
            setDestination(e.target.value);
            setSourceChange(false);
            setDestinationChange(true);
          }}
          className=" w-full border-[1px] rounded-lg p-1 bg-white focus:border-amber-400 outline-none"
        />
        {addressList?.features && destinationChange ? (
          <div className=" shadow-md p-1 rounded-md w-full bg-white absolute">
            {addressList?.features.map((item: any, index: number) => (
              <h2
                key={index}
                className=" p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onDestinationAddress(item);
                }}
              >
                {item.place_name}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default AutoCompleteAddress;
