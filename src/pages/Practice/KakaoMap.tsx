import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import myMarkerImg from "../../assets/Practice/myPlace.svg";
import practiceMarker from "../../assets/Practice/practiceRoom.svg";
import PlaceInfo from "./PlaceInfo"; // styled-components로 만든 팝업 컴포넌트
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
  const [statusMessage, setStatusMessage] = useState<string>("위치 정보를 요청합니다...");

  const fetchPracticeRooms = async (lat: number, lng: number, radius = 0.5) => {
    try {
      const response = await axiosInstance.get(`/practice-rooms/info/surround`, {
        params: { latitude: lat, longitude: lng, radius },
      });
      console.log("[응답 데이터]", response.data);

      if (response.data.code === 200 && response.data.data?.practiceRooms) {
        response.data.data.practiceRooms.forEach((room: any) =>
          console.log(`- ${room.name} (${room.latitude}, ${room.longitude})`)
        );
        return response.data.data.practiceRooms;
      } else {
        console.warn("응답 형식이 예상과 다름:", response.data);
      }
    } catch (err: any) {
      console.error("[연습실 목록 불러오기 실패]:", err.message || err);
    }

    return [];
  };

  // ✅ 내 API에서 받은 연습실 마커 표시 + 주소 변환
  const showPracticeRoomMarkers = (rooms: any[]) => {
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

      // ✅ 클릭 시 주소 변환 후 CustomOverlay 표시
      window.kakao.maps.event.addListener(marker, "click", () => {
        geocoder.coord2Address(room.longitude, room.latitude, (result:any, status:string) => {
          const address =
            status === window.kakao.maps.services.Status.OK
              ? result[0].road_address?.address_name ||
                result[0].address?.address_name ||
                "주소 정보를 찾을 수 없습니다."
              : `위도: ${room.latitude}, 경도: ${room.longitude}`;

          const container = document.createElement("div");
          const root = createRoot(container);

          root.render(
            <PlaceInfo
              name={room.name}
              address={address}
              url={`https://map.kakao.com/link/to/${encodeURIComponent(room.name)},${room.latitude},${room.longitude}`}
            />
          );

          if (overlayRef.current) overlayRef.current.setMap(null);

          overlayRef.current = new window.kakao.maps.CustomOverlay({
            content: container,
            position: pos,
            yAnchor: 1.5,
            zIndex: 10,
          });

          overlayRef.current.setMap(mapInstance.current);
        });
      });

      placeMarkers.current.push(marker);
    });
  };

  // 지도 초기화
  const initMap = () => {
    if (!mapRef.current) return;

    const appKey = process.env.REACT_APP_KAKAO_MAP_KEY;
    if (!appKey) {
      console.error("REACT_APP_KAKAO_MAP_KEY가 설정되어 있지 않습니다.");
      return;
    }

    const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
    mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 4,
    });

    // Places 서비스 생성
    placesService.current = new window.kakao.maps.services.Places();

    // 지도 이동 시 재검색
    window.kakao.maps.event.addListener(mapInstance.current, "dragend", async () => {
      const center = mapInstance.current.getCenter();
      await searchPlacesNearby("연습실", center.getLat(), center.getLng(), 2000);
      const rooms = await fetchPracticeRooms(center.getLat(), center.getLng());
      showPracticeRoomMarkers(rooms);
    });

    // 위치 요청
    requestAndMarkMyLocation();
  };

  useEffect(() => {
    const appKey = process.env.REACT_APP_KAKAO_MAP_KEY;
    if (!appKey) return;

    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `${KAKAO_SDK_BASE}?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(initMap);
    };
    document.head.appendChild(script);

    return () => {
      if (myMarker.current) myMarker.current.setMap(null);
      if (overlayRef.current) overlayRef.current.setMap(null);
    };
  }, []);

  // 내 위치 요청 및 마커 표시
  const requestAndMarkMyLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage("브라우저가 위치 기능을 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        addOrMoveMyMarker({ lat: latitude, lng: longitude });

        // ✅ 카카오 + 내 API 둘 다 검색
        await searchPlacesNearby("연습실", latitude, longitude, 2000);
        const rooms = await fetchPracticeRooms(latitude, longitude);
        showPracticeRoomMarkers(rooms);
      },
      async () => {
        const fallback = { lat: 37.5665, lng: 126.9780 };
        mapInstance.current.setCenter(new window.kakao.maps.LatLng(fallback.lat, fallback.lng));

        await searchPlacesNearby("연습실", fallback.lat, fallback.lng, 3000);
        const rooms = await fetchPracticeRooms(fallback.lat, fallback.lng);
        showPracticeRoomMarkers(rooms);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // 내 위치 마커
  const addOrMoveMyMarker = (position: { lat: number; lng: number }) => {
    if (!mapInstance.current) return;
    const latlng = new window.kakao.maps.LatLng(position.lat, position.lng);
    const myMarkerImage = new window.kakao.maps.MarkerImage(
      myMarkerImg,
      new window.kakao.maps.Size(40, 40),
      { offset: new window.kakao.maps.Point(20, 20) }
    );

    if (myMarker.current) {
      myMarker.current.setPosition(latlng);
    } else {
      myMarker.current = new window.kakao.maps.Marker({
        map: mapInstance.current,
        position: latlng,
        image: myMarkerImage,
      });
    }

    mapInstance.current.setCenter(latlng);
  };

  // 기존 마커 삭제
  const removeAllPlaceMarkers = () => {
    placeMarkers.current.forEach((m) => m.setMap && m.setMap(null));
    placeMarkers.current = [];
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }
  };

  // ✅ 카카오맵 Places API 검색 (주소 변환 포함)
  const searchPlacesNearby = (keyword: string, lat: number, lng: number, radius = 2000) => {
    return new Promise<void>((resolve) => {
      if (!placesService.current) return resolve();

      setStatusMessage(`${keyword} 검색 중...`);
      removeAllPlaceMarkers();

      const center = new window.kakao.maps.LatLng(lat, lng);
      const practiceMarkerImage = new window.kakao.maps.MarkerImage(
        practiceMarker,
        new window.kakao.maps.Size(38, 38),
        { offset: new window.kakao.maps.Point(19, 38) }
      );

      const geocoder = new window.kakao.maps.services.Geocoder();

      placesService.current.keywordSearch(
        keyword,
        (data: any[], status: any) => {
          if (status !== window.kakao.maps.services.Status.OK) {
            setStatusMessage("검색 결과가 없습니다.");
            return resolve();
          }

          setStatusMessage(`${data.length}개의 장소를 찾았습니다.`);

          data.forEach((place) => {
            const placeLatLng = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
              map: mapInstance.current,
              position: placeLatLng,
              title: place.place_name,
              image: practiceMarkerImage,
            });

            // ✅ 클릭 시 도로명 주소 변환 후 표시
            window.kakao.maps.event.addListener(marker, "click", function () {
              geocoder.coord2Address(place.x, place.y, function (result:any, status:string) {
                const address =
                  status === window.kakao.maps.services.Status.OK
                    ? result[0].road_address?.address_name ||
                      result[0].address?.address_name ||
                      "주소 정보를 찾을 수 없습니다."
                    : place.road_address_name || place.address_name;

                const container = document.createElement("div");
                const root = createRoot(container);

                root.render(
                  <PlaceInfo
                    name={place.place_name}
                    address={address}
                    url={place.place_url}
                  />
                );

                if (overlayRef.current) overlayRef.current.setMap(null);

                overlayRef.current = new window.kakao.maps.CustomOverlay({
                  content: container,
                  position: marker.getPosition(),
                  yAnchor: 1.5,
                  zIndex: 10,
                });

                overlayRef.current.setMap(mapInstance.current);
              });
            });

            placeMarkers.current.push(marker);
          });
          resolve();
        },
        { location: center, radius }
      );
    });
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 8,
          padding: 8,
          color: "white",
        }}
      >
        {statusMessage}
      </div>
    </div>
  );
};

export default KakaoMap;
