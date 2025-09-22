import React, { useEffect, useRef, useState } from "react";
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
  const accuracyCircle = useRef<any | null>(null);
  const placesService = useRef<any | null>(null);
  const placeMarkers = useRef<any[]>([]);
  const infoWindowRef = useRef<any | null>(null);

  const [statusMessage, setStatusMessage] = useState<string>("위치 정보를 요청합니다...");

  // 초기화
  const initMap = () => {
    if (!mapRef.current) return;

    if (!(window.kakao && window.kakao.maps && typeof window.kakao.maps.LatLng === "function")) {
      if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === "function") {
        window.kakao.maps.load(initMap);
        return;
      }
      const t = setInterval(() => {
        if (window.kakao && window.kakao.maps && typeof window.kakao.maps.LatLng === "function") {
          clearInterval(t);
          initMap();
        }
      }, 100);
      return;
    }

    const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
    mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 4,
    });

    // Places 서비스 인스턴스
    placesService.current = new window.kakao.maps.services.Places();

    // 지도에 표시될 인포윈도우 (공용)
    infoWindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 위치 요청 + 주변 연습실 검색
    requestAndMarkMyLocation();
  };

  useEffect(() => {
    const appKey = process.env.REACT_APP_KAKAO_MAP_KEY;
    if (!appKey) {
      console.error("REACT_APP_KAKAO_MAP_KEY가 설정되어 있지 않습니다 (.env 확인 후 개발서버 재시작)");
      return;
    }

    if (window.kakao && window.kakao.maps && typeof window.kakao.maps.LatLng === "function") {
      initMap();
      return;
    }

    const existingScript = Array.from(document.getElementsByTagName("script")).find((s) =>
      s.src?.startsWith(KAKAO_SDK_BASE)
    ) as HTMLScriptElement | undefined;

    if (existingScript) {
      const onLoad = () => {
        if (window.kakao && typeof window.kakao.maps?.load === "function") {
          window.kakao.maps.load(initMap);
        } else {
          initMap();
        }
      };
      existingScript.addEventListener("load", onLoad, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `${KAKAO_SDK_BASE}?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && typeof window.kakao.maps?.load === "function") {
        window.kakao.maps.load(initMap);
      } else {
        initMap();
      }
    };
    script.onerror = (e) => {
      console.error("Kakao SDK 로드 실패", e);
    };
    script.setAttribute("data-kakao-sdk", "true");
    document.head.appendChild(script);

    // cleanup: 컴포넌트 언마운트 시 마커 등 정리
    return () => {
      removeAllPlaceMarkers();
      if (myMarker.current) {
        myMarker.current.setMap(null);
        myMarker.current = null;
      }
      if (accuracyCircle.current) {
        accuracyCircle.current.setMap(null);
        accuracyCircle.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 위치 요청 + 마커 표시 -> 위치 얻으면 주변 "연습실" 검색 실행
  const requestAndMarkMyLocation = () => {
    if (!navigator.geolocation) {
      console.warn("브라우저가 Geolocation을 지원하지 않습니다.");
      setStatusMessage("브라우저가 위치 기능을 지원하지 않습니다.");
      return;
    }

    setStatusMessage("현재 위치를 가져오는 중...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const latlng = { lat: latitude, lng: longitude };
        addOrMoveMyMarker(latlng, accuracy);
        // 위치를 중심으로 연습실 검색 (반경 2km)
        searchPlacesNearby("연습실", latitude, longitude, 2000);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setStatusMessage("현재 위치를 가져오지 못했습니다. 주변 기본 위치로 검색합니다.");
        // 위치 에러 시 기본 중심에서 검색 (예: 서울시청)
        const fallback = { lat: 37.5665, lng: 126.9780 };
        mapInstance.current.setCenter(new window.kakao.maps.LatLng(fallback.lat, fallback.lng));
        searchPlacesNearby("연습실", fallback.lat, fallback.lng, 3000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const addOrMoveMyMarker = (position: { lat: number; lng: number }, accuracyMeters?: number) => {
    if (!mapInstance.current) return;
    if (!(window.kakao && window.kakao.maps && typeof window.kakao.maps.LatLng === "function")) return;

    const latlng = new window.kakao.maps.LatLng(position.lat, position.lng);

    if (myMarker.current) {
      myMarker.current.setPosition(latlng);
    } else {
      myMarker.current = new window.kakao.maps.Marker({
        map: mapInstance.current,
        position: latlng,
        title: "내 위치",
      });
      const info = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:6px;">내 위치</div>`,
      });
      myMarker.current.addListener("click", () => {
        info.open(mapInstance.current, myMarker.current);
      });
    }

    // // 정확도 원 그리기 (옵션)
    // if (accuracyMeters != null) {
    //   if (accuracyCircle.current) {
    //     accuracyCircle.current.setMap(null);
    //     accuracyCircle.current = null;
    //   }
    //   accuracyCircle.current = new window.kakao.maps.Circle({
    //     center: latlng,
    //     radius: accuracyMeters,
    //     strokeWeight: 1,
    //     strokeColor: "#4a7cf7",
    //     strokeOpacity: 0.6,
    //     fillColor: "#4a7cf7",
    //     fillOpacity: 0.12,
    //     map: mapInstance.current,
    //   });
    // }

    mapInstance.current.setCenter(latlng);
  };

  // 기존에 만들어진 장소 마커들 제거
  const removeAllPlaceMarkers = () => {
    placeMarkers.current.forEach((m) => m.setMap && m.setMap(null));
    placeMarkers.current = [];
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
  };

  // 주변 장소 검색 (키워드)
  const searchPlacesNearby = (keyword: string, lat: number, lng: number, radius = 2000) => {
    if (!placesService.current) {
      console.warn("placesService not ready");
      return;
    }

    setStatusMessage(`${keyword} 검색 중...`);
    removeAllPlaceMarkers();

    const center = new window.kakao.maps.LatLng(lat, lng);

    // keywordSearch의 세번째 파라미터로 options를 전달할 수 있음
    // location: 중심 좌표, radius: 반경(m)
    placesService.current.keywordSearch(
      keyword,
      (data: any[], status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setStatusMessage(`${data.length}개의 장소를 찾았습니다.`);
          // 마커 생성
          for (let i = 0; i < data.length; i++) {
            const place = data[i];
            const placeLatLng = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
              map: mapInstance.current,
              position: placeLatLng,
              title: place.place_name,
            });
            // 클릭 시 인포윈도우 열기
            (function (markerCopy, placeCopy) {
              window.kakao.maps.event.addListener(markerCopy, "click", function () {
                const content = `<div style="padding:8px;max-width:200px;">
                    <strong>${placeCopy.place_name}</strong><br/>
                    ${placeCopy.road_address_name || placeCopy.address_name || ""}<br/>
                    <a href="https://map.kakao.com/link/map/${encodeURIComponent(placeCopy.place_name)},${placeCopy.y},${placeCopy.x}" target="_blank" rel="noreferrer">자세히 보기</a>
                  </div>`;
                infoWindowRef.current.setContent(content);
                infoWindowRef.current.open(mapInstance.current, markerCopy);
              });
            })(marker, place);

            placeMarkers.current.push(marker);
          }

          // 결과가 너무 많으면 pagination을 통해 다음 페이지도 로드할 수 있음
          // (여기서는 첫 페이지만 처리)
          // 필요하면 pagination.nextPage() 사용
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          setStatusMessage("검색 결과가 없습니다.");
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          setStatusMessage("검색 중 오류가 발생했습니다.");
        } else if (status === window.kakao.maps.services.Status.INVALID_REQUEST) {
          setStatusMessage("잘못된 요청입니다.");
        } else {
          setStatusMessage("검색 상태: " + status);
        }
      },
      {
        location: center,
        radius,
      }
    );
  };

  // (선택) 외부에서 키워드로 검색하는 함수 노출 가능
  // 예: searchPlacesNearby("댄스 연습실", lat, lng, 3000);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {/* 상태 메시지 표시 (디버그용) */}
      <div style={{ position: "absolute", left: 8, top: 8, padding: 8, background: "white", borderRadius: 6 }}>
        {statusMessage}
      </div>
    </div>
  );
};

export default KakaoMap;
