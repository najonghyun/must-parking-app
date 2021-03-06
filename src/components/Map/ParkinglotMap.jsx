import React, { useEffect, useRef, useState } from "react";
import Map from "./Map";
import SearchPage from "./SearchPage";
import MapSizeController from "./MapSizeController";
import GpsController from "./GpsController";
import styled from "@emotion/styled";

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function ParkinglotMap({ userid, userpassword }) {
  const map = useRef(null);
  const ps = useRef(null);
  const [parkinglot, setParkingLot] = useState([]);
  const [user, setUser] = useState({});
  const [openParkingList, setOpenParkingList] = useState(false);
  const [userPosition, setUserPosition] = useState({
    la: 35.8242238,
    lo: 127.1479532,
  });

  useEffect(() => {
    function error() {
      alert("Sorry, no position available.");
    }
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          la: position.coords.latitude,
          lo: position.coords.longitude,
        });
      },
      error,
      options
    );
  }, [user, userid, userpassword]);
  return (
    <MapContainer>
      <SearchPage ps={ps} setUserPosition={setUserPosition} />
      <Map
        map={map}
        ps={ps}
        setParkingLot={setParkingLot}
        userPosition={userPosition}
      />
      <MapSizeController map={map} />
      <GpsController setUserPosition={setUserPosition} />
    </MapContainer>
  );
}

export default ParkinglotMap;
