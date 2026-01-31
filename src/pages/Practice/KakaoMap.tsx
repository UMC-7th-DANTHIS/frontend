import React, { useEffect, useRef, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import myMarkerImg from "../../assets/Practice/myPlace.svg";
import practiceMarker from "../../assets/Practice/practiceRoom.svg";
import PlaceInfo from "./PlaceInfo";
import axiosInstance from "../../api/axios-instance";

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAO_SDK_BASE = "https://dapi.kakao.com/v2/maps/sdk.js";

const KakaoMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const myMarker = useRef<any | null>(null);
  const placesService = useRef<any | null>(null);
  const placeMarkers = useRef<any[]>([]);
  const overlayRef = useRef<any | null>(null);
  const [statusMessage] = useState("위치 정보를 요청합니다...");

 const fetchPracticeRooms = useCallback(
  async (lat: number, lng: number, radius = 0.5) => {
    try {
      const response = await axiosInstance.get(`/practice-rooms/info/surround`, {
        params: { latitude: lat, longitude: lng, radius },
      });
      if (response.data.code === 200 && response.data.data?.practiceRooms) {
        return response.data.data.practiceRooms;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },
  []
);


  const moveCenterWithOffset = (lat: number, lng: number, offsetX = 0, offsetY = 0) => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
    const projection = map.getProjection();
    const point = projection.pointFromCoords(
      new window.kakao.maps.LatLng(lat, lng)
    );
    point.x += offsetX;
    point.y -= offsetY;
    map.panTo(projection.coordsFromPoint(point));
  };

  const showPracticeRoomMarkers = useCallback((rooms: any[]) => {
    if (!mapInstance.current) return;

    const markerImg = new window.kakao.maps.MarkerImage(
      practiceMarker,
      new window.kakao.maps.Size(38, 38),
      { offset: new window.kakao.maps.Point(19, 38) }
    );

     const geocoder = new window.kakao.maps.services.Geocoder();

    rooms.forEach((room) => {
      const pos = new window.kakao.maps.LatLng(room.latitude, room.longitude);

      const marker = new window.kakao.maps.Marker({
        map: mapInstance.current,
        position: pos,
        title: room.name,
        image: markerImg,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        geocoder.coord2Address(room.longitude, room.latitude, (result: any, status: string) => {
          const address =
            status === window.kakao.maps.services.Status.OK
              ? result[0].road_address?.address_name ||
                result[0].address?.address_name ||
                "주소 정보를 찾을 수 없습니다."
              : "주소 정보를 찾을 수 없습니다.";

          const container = document.createElement("div");
          container.style.pointerEvents = "none";
          const root = createRoot(container);

          root.render(
            <PlaceInfo
              name={room.name}
              address={address}
              url={`https://map.kakao.com/link/to/${encodeURIComponent(
                room.name
              )},${room.latitude},${room.longitude}`}
            />
          );

          overlayRef.current?.setMap(null);

          overlayRef.current = new window.kakao.maps.CustomOverlay({
            content: container,
            position: pos,
            yAnchor: 1,
            zIndex: 10,
          });

          overlayRef.current.setMap(mapInstance.current);

          setTimeout(() => {
            const overlayHeight = container.offsetHeight || 200;
            moveCenterWithOffset(room.latitude, room.longitude, 0, overlayHeight / 2 + 40);
          }, 0);
        });
      });

      placeMarkers.current.push(marker);
    });
  }, []);
   const initMap = useCallback(() => {
    if (!mapRef.current) return;

    mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 4,
    });

    placesService.current = new window.kakao.maps.services.Places();

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const latlng = new window.kakao.maps.LatLng(latitude, longitude);

      if (!myMarker.current) {
        myMarker.current = new window.kakao.maps.Marker({
          map: mapInstance.current,
          image: new window.kakao.maps.MarkerImage(
            myMarkerImg,
            new window.kakao.maps.Size(40, 40),
            { offset: new window.kakao.maps.Point(20, 20) }
          ),
        });
      }

      myMarker.current.setPosition(latlng);
      mapInstance.current.setCenter(latlng);

      const rooms = await fetchPracticeRooms(latitude, longitude);
      showPracticeRoomMarkers(rooms);
    });
  }, [fetchPracticeRooms, showPracticeRoomMarkers]);

  useEffect(() => {
    // const removeAllPlaceMarkers = () => {
    //   placeMarkers.current.forEach((m) => m.setMap(null));
    //   placeMarkers.current = [];
    //   if (overlayRef.current) {
    //     overlayRef.current.setMap(null);
    //     overlayRef.current = null;
    //   }
    // };

    // const searchPlacesNearby = (keyword: string, lat: number, lng: number, radius = 2000) => {
    //   return new Promise<void>((resolve) => {
    //     if (!placesService.current) return resolve();

    //     setStatusMessage(`${keyword} 검색 중...`);
    //     removeAllPlaceMarkers();

    //     const center = new window.kakao.maps.LatLng(lat, lng);
    //     const markerImage = new window.kakao.maps.MarkerImage(
    //       practiceMarker,
    //       new window.kakao.maps.Size(38, 38),
    //       { offset: new window.kakao.maps.Point(19, 38) }
    //     );

    //     const geocoder = new window.kakao.maps.services.Geocoder();

    //     placesService.current.keywordSearch(
    //       keyword,
    //       (data: any[], status: any) => {
    //         if (status !== window.kakao.maps.services.Status.OK) {
    //           setStatusMessage("검색 결과가 없습니다.");
    //           return resolve();
    //         }

    //         setStatusMessage(`${data.length}개의 장소를 찾았습니다.`);

    //         data.forEach((place) => {
    //           const marker = new window.kakao.maps.Marker({
    //             map: mapInstance.current,
    //             position: new window.kakao.maps.LatLng(place.y, place.x),
    //             title: place.place_name,
    //             image: markerImage,
    //           });

    //           window.kakao.maps.event.addListener(marker, "click", () => {
    //             geocoder.coord2Address(place.x, place.y, (result: any, status: string) => {
    //               const address =
    //                 status === window.kakao.maps.services.Status.OK
    //                   ? result[0].road_address?.address_name ||
    //                     result[0].address?.address_name ||
    //                     "주소 정보를 찾을 수 없습니다."
    //                   : "주소 정보를 찾을 수 없습니다.";

    //               const container = document.createElement("div");
    //               const root = createRoot(container);

    //               root.render(
    //                 <PlaceInfo
    //                   name={place.place_name}
    //                   address={address}
    //                   url={place.place_url}
    //                 />
    //               );

    //               if (overlayRef.current) overlayRef.current.setMap(null);

    //               overlayRef.current = new window.kakao.maps.CustomOverlay({
    //                 content: container,
    //                 position: marker.getPosition(),
    //                 yAnchor: 1.5,
    //                 zIndex: 10,
    //               });

    //               overlayRef.current.setMap(mapInstance.current);
    //             });
    //           });

    //           placeMarkers.current.push(marker);
    //         });

    //         resolve();
    //       },
    //       { location: center, radius }
    //     );
    //   });
    // };

    // const requestAndMarkMyLocation = () => {
    //   if (!navigator.geolocation) return;

    //   navigator.geolocation.getCurrentPosition(async (pos) => {
    //     const { latitude, longitude } = pos.coords;
    //     const latlng = new window.kakao.maps.LatLng(latitude, longitude);

    //     if (!myMarker.current) {
    //       myMarker.current = new window.kakao.maps.Marker({
    //         map: mapInstance.current,
    //         image: new window.kakao.maps.MarkerImage(
    //           myMarkerImg,
    //           new window.kakao.maps.Size(40, 40),
    //           { offset: new window.kakao.maps.Point(20, 20) }
    //         ),
    //       });
    //     }

    //     myMarker.current.setPosition(latlng);
    //     mapInstance.current.setCenter(latlng);

    //     await searchPlacesNearby("연습실", latitude, longitude);
    //     const rooms = await fetchPracticeRooms(latitude, longitude);
    //     showPracticeRoomMarkers(rooms);
    //   });
    // };

    const appKey = process.env.REACT_APP_KAKAO_MAP_KEY;
    if (!appKey) return;

    if (window.kakao?.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `${KAKAO_SDK_BASE}?appkey=${appKey}&autoload=false&libraries=services`;
      script.onload = () => window.kakao.maps.load(initMap);
      document.head.appendChild(script);
    }

    return () => {
      myMarker.current?.setMap(null);
      overlayRef.current?.setMap(null);
    };
  }, [initMap]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", left: 8, top: 8, color: "white" }}>
        {statusMessage}
      </div>
    </div>
  );
};

export default KakaoMap;
