import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState<string>("");
  const [latLong, setLatLong] = useState<string>("");
  const [isFindLocation, setIsFindLocation] = useState<boolean>(false);

  const success = (position: GeolocationPosition): void => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setIsFindLocation(false);
  };

  const error = (): void => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindLocation(false);
  };

  const trackLocationHandler = (): void => {
    setIsFindLocation(true);
    !navigator.geolocation
      ? setLocationErrorMsg("Your browser not supported geolocation")
      : navigator.geolocation.getCurrentPosition(success, error);
  };

  return {
    latLong,
    locationErrorMsg,
    isFindLocation,
    trackLocationHandler,
  };
};

export default useTrackLocation;
