import React from 'react';

const stars = {
  star0: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="104"
      height="100"
      viewBox="0 0 104 100"
      fill="none"
    >
      <path
        d="M40.6429 31.4201L52.0003 6.79728L63.3577 31.4201L67.9907 29.2831L63.3577 31.4201C64.6836 34.2946 67.4077 36.2738 70.5512 36.6465L97.4786 39.8392L77.5705 58.2496C75.2464 60.3988 74.2058 63.6012 74.8228 66.7061L80.1074 93.3021L56.4461 80.0575C53.6839 78.5113 50.3167 78.5113 47.5544 80.0575L23.8932 93.3021L29.1777 66.7061C29.7947 63.6012 28.7542 60.3988 26.4301 58.2496L6.52199 39.8392L33.4493 36.6465C36.5929 36.2738 39.317 34.2946 40.6429 31.4201Z"
        stroke="#FEE502"
        stroke-width="10.2042"
      />
    </svg>
  ),
  star1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.6251 29.7675L46.9968 7.28166L48.9833 2.97501C50.4129 -0.124473 54.8181 -0.124488 56.2477 2.975L58.2342 7.28166L68.6059 29.7675C69.1886 31.0307 70.3857 31.9005 71.7672 32.0643L96.3576 34.9799L101.067 35.5383C104.457 35.9402 105.818 40.1297 103.312 42.4472L99.8301 45.6673L81.6498 62.4798C80.6285 63.4243 80.1712 64.8317 80.4423 66.1961L85.2683 90.484L86.1926 95.1357C86.8578 98.4835 83.294 101.073 80.3155 99.4056L76.177 97.0891L54.5693 84.994C53.3554 84.3145 51.8756 84.3145 50.6618 84.994L29.0539 97.0891L24.9155 99.4056C21.9371 101.073 18.3732 98.4835 19.0385 95.1357L19.9628 90.4839L24.7887 66.1961C25.0599 64.8317 24.6026 63.4243 23.5812 62.4798L5.40089 45.6672L1.91895 42.4472C-0.58706 40.1297 0.774207 35.9402 4.16379 35.5383L8.87351 34.9799L33.4638 32.0643C34.8453 31.9005 36.0424 31.0307 36.6251 29.7675ZM45.8911 34.0415L52.6155 19.463L59.3399 34.0415C61.409 38.5272 65.6601 41.6158 70.5657 42.1975L86.5087 44.0878L74.7217 54.9881C71.0948 58.3421 69.471 63.3396 70.4338 68.1848L73.5626 83.9316L59.5534 76.0898C55.2429 73.677 49.9882 73.6769 45.6776 76.0898L31.6684 83.9316L34.7972 68.1848C35.76 63.3396 34.1362 58.3421 30.5094 54.9881L25.4982 50.3539V43.2844L34.6653 42.1975C39.5709 41.6159 43.822 38.5273 45.8911 34.0415Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.8673 29.7675L47.239 7.28166L49.2255 2.97501C50.6551 -0.124473 55.0603 -0.124488 56.4899 2.975L58.4764 7.28166L68.8481 29.7675C69.4308 31.0307 70.6279 31.9005 72.0094 32.0643L96.5999 34.9799L101.309 35.5383C104.699 35.9402 106.06 40.1297 103.554 42.4472L100.072 45.6673L81.892 62.4798C80.8706 63.4243 80.4134 64.8317 80.6845 66.1961L85.5104 90.484L86.4348 95.1357C87.1 98.4835 83.5361 101.073 80.5577 99.4056L76.4192 97.0891L54.8115 84.994C53.5976 84.3145 52.1178 84.3145 50.9039 84.994L29.2961 97.0891L25.1577 99.4056C22.1793 101.073 18.6154 98.4835 19.2806 95.1357L20.205 90.4839L25.0309 66.1961C25.302 64.8317 24.8448 63.4243 23.8234 62.4798L5.64307 45.6672L2.16114 42.4472C-0.344873 40.1297 1.01639 35.9402 4.40598 35.5383L9.1157 34.9799L33.706 32.0643C35.0875 31.9005 36.2846 31.0307 36.8673 29.7675ZM46.1333 34.0415L52.8577 19.463L59.5821 34.0415C61.6512 38.5272 65.9023 41.6158 70.8079 42.1975L86.7509 44.0878L74.9638 54.9881C71.337 58.3421 69.7132 63.3396 70.676 68.1848L73.8048 83.9316L59.7956 76.0898C55.4851 73.677 50.2304 73.6769 45.9198 76.0898L32.5402 83.5791V80.7626L35.0394 68.1848C35.8257 64.2276 34.8867 60.1688 32.5402 56.9867V42.4782L34.9075 42.1975C39.8131 41.6159 44.0642 38.5273 46.1333 34.0415Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star3: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.4822 7.28166L36.1105 29.7675C35.5278 31.0307 34.3306 31.9005 32.9491 32.0643L8.35881 34.9799L3.6491 35.5383C0.25957 35.9402 -1.1017 40.1297 1.40428 42.4472L4.88622 45.6672L23.0666 62.4798C24.0879 63.4243 24.5452 64.8317 24.274 66.1961L19.4481 90.4839L18.5238 95.1357C17.8586 98.4835 21.4224 101.073 24.4009 99.4056L28.5392 97.0891L50.1471 84.994C51.361 84.3145 52.8407 84.3145 54.0546 84.994L75.6623 97.0891L79.8008 99.4056C82.7793 101.073 86.3431 98.4835 85.6779 95.1357L84.7536 90.484L79.9277 66.1961C79.6565 64.8317 80.1138 63.4243 81.1351 62.4798L99.3154 45.6673L102.797 42.4472C105.303 40.1297 103.942 35.9402 100.553 35.5383L95.843 34.9799L71.2525 32.0643C69.8711 31.9005 68.6739 31.0307 68.0912 29.7675L57.7195 7.28166L55.7331 2.975C54.3034 -0.124488 49.8982 -0.124473 48.4686 2.97501L46.4822 7.28166ZM52.1008 19.463L45.3765 34.0415C43.9654 37.1007 41.5394 39.5101 38.5832 40.9176V79.7729L45.163 76.0898C49.4735 73.6769 54.7282 73.677 59.0387 76.0898L73.048 83.9316L69.9191 68.1848C68.9563 63.3396 70.5801 58.3421 74.207 54.9881L85.994 44.0878L70.0511 42.1975C65.1454 41.6158 60.8943 38.5272 58.8252 34.0415L52.1008 19.463Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star4: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.7814 29.7675L47.1531 7.28166L49.1395 2.97501C50.5691 -0.124473 54.9743 -0.124488 56.404 2.975L58.3904 7.28166L68.7621 29.7675C69.3448 31.0307 70.542 31.9005 71.9234 32.0643L96.5139 34.9799L101.223 35.5383C104.613 35.9402 105.974 40.1297 103.468 42.4472L99.9863 45.6673L81.806 62.4798C80.7847 63.4243 80.3274 64.8317 80.5986 66.1961L85.4245 90.484L86.3488 95.1357C87.014 98.4835 83.4502 101.073 80.4717 99.4056L76.3332 97.0891L54.7255 84.994C53.5116 84.3145 52.0318 84.3145 50.818 84.994L29.2101 97.0891L25.0718 99.4056C22.0933 101.073 18.5295 98.4835 19.1947 95.1357L20.119 90.4839L24.9449 66.1961C25.2161 64.8317 24.7588 63.4243 23.7375 62.4798L5.55712 45.6672L2.07518 42.4472C-0.430799 40.1297 0.930468 35.9402 4.31999 35.5383L9.02971 34.9799L33.62 32.0643C35.0015 31.9005 36.1987 31.0307 36.7814 29.7675ZM46.0539 34.0273L52.7717 19.463L59.4961 34.0415C61.5652 38.5272 65.8163 41.6158 70.722 42.1975L86.6649 44.0878L74.8779 54.9881C71.251 58.3421 69.6272 63.3396 70.59 68.1848L73.7189 83.9316L59.7096 76.0898C55.4722 73.7179 50.3223 73.6776 46.0539 75.9692V34.0273Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star5: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="104"
      height="100"
      viewBox="0 0 104 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.3962 7.28166L36.0245 29.7675C35.4418 31.0307 34.2447 31.9005 32.8632 32.0643L8.27287 34.9799L3.56316 35.5383C0.173632 35.9402 -1.18764 40.1297 1.31835 42.4472L4.80028 45.6672L22.9806 62.4798C24.0019 63.4243 24.4592 64.8317 24.1881 66.1961L19.3622 90.4839L18.4379 95.1357C17.7726 98.4835 21.3365 101.073 24.3149 99.4056L28.4533 97.0891L50.0611 84.994C51.275 84.3145 52.7548 84.3145 53.9687 84.994L75.5764 97.0891L79.7149 99.4056C82.6933 101.073 86.2572 98.4835 85.592 95.1357L84.6676 90.484L79.8417 66.1961C79.5706 64.8317 80.0278 63.4243 81.0492 62.4798L99.2295 45.6673L102.711 42.4472C105.217 40.1297 103.856 35.9402 100.467 35.5383L95.7571 34.9799L71.1666 32.0643C69.7851 31.9005 68.588 31.0307 68.0053 29.7675L57.6336 7.28166L55.6471 2.975C54.2175 -0.124488 49.8123 -0.124473 48.3827 2.97501L46.3962 7.28166ZM52.0969 19.6407V74.2804C54.4608 74.294 56.8221 74.8972 58.9528 76.0898L72.962 83.9316L69.8332 68.1848C68.8704 63.3396 70.4942 58.3421 74.121 54.9881L85.9081 44.0878L69.9651 42.1975C65.0595 41.6158 60.8084 38.5272 58.7393 34.0415L52.0969 19.6407Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star6: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="101"
      viewBox="0 0 105 101"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.6251 29.9452L46.9968 7.45939L48.9833 3.15274C50.4129 0.0532576 54.8181 0.0532491 56.2477 3.15274L58.2342 7.45939L68.6059 29.9452C69.1886 31.2084 70.3857 32.0782 71.7672 32.242L96.3576 35.1576L101.067 35.716C104.457 36.1179 105.818 40.3074 103.312 42.6249L99.8301 45.845L81.6498 62.6576C80.6284 63.6021 80.1712 65.0094 80.4423 66.3739L85.2683 90.6617L86.1926 95.3134C86.8578 98.6612 83.2939 101.251 80.3155 99.5833L76.177 97.2668L54.5693 85.1717C53.3554 84.4922 51.8756 84.4922 50.6617 85.1717L29.0539 97.2669L24.9155 99.5833C21.9371 101.251 18.3732 98.6613 19.0385 95.3134L19.9628 90.6616L24.7887 66.3739C25.0598 65.0094 24.6026 63.6021 23.5812 62.6576L5.40087 45.8449L1.91895 42.6249C-0.587054 40.3074 0.774205 36.1179 4.16378 35.716L8.8735 35.1576L33.4638 32.242C34.8453 32.0782 36.0424 31.2084 36.6251 29.9452ZM59.4973 76.2363C59.516 76.2467 59.5347 76.2571 59.5534 76.2676L73.5626 84.1093L70.4338 68.3625C69.471 63.5173 71.0948 58.5198 74.7216 55.1658L86.5087 44.2655L70.5657 42.3752C65.7813 41.808 61.6195 38.8561 59.4973 34.5491V76.2363Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star7: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.739 6.72745L36.3673 29.2133C35.7846 30.4765 34.5875 31.3463 33.206 31.5101L8.6157 34.4257L3.90598 34.9841C0.516395 35.386 -0.844873 39.5755 1.66114 41.893L5.14307 45.113L23.3234 61.9256C24.3448 62.8701 24.802 64.2775 24.5309 65.6419L19.705 89.9297L18.7806 94.5815C18.1154 97.9293 21.6793 100.519 24.6577 98.8514L28.7961 96.5349L50.4039 84.4398C51.6178 83.7603 53.0976 83.7603 54.3115 84.4398L75.9192 96.5349L80.0577 98.8514C83.0361 100.519 86.6 97.9293 85.9348 94.5815L85.0104 89.9298L80.1845 65.6419C79.9134 64.2775 80.3706 62.8701 81.392 61.9256L99.5723 45.113L103.054 41.893C105.56 39.5755 104.199 35.386 100.809 34.9841L96.0999 34.4257L71.5094 31.5101C70.1279 31.3463 68.9308 30.4765 68.3481 29.2133L57.9764 6.72745L55.9899 2.42081C54.5603 -0.67868 50.1551 -0.67868 48.7255 2.42081L46.739 6.72745ZM66.0393 79.3104L73.3048 83.3774L70.176 67.6306C69.2132 62.7853 70.837 57.7879 74.4638 54.4339L86.2509 43.5336L70.3079 41.6433C68.8095 41.4656 67.372 41.054 66.0393 40.4402V79.3104Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star8: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.5382 29.7812L46.9099 7.29532L48.8964 2.98868C50.326 -0.110809 54.7311 -0.110809 56.1608 2.98868L58.1473 7.29532L68.519 29.7812C69.1017 31.0444 70.2988 31.9142 71.6803 32.0779L96.2707 34.9935L100.98 35.5519C104.37 35.9538 105.731 40.1434 103.225 42.4608L99.7431 45.6809L81.5629 62.4935C80.5415 63.438 80.0843 64.8453 80.3554 66.2098L85.1813 90.4977L86.1056 95.1493C86.7709 98.4972 83.207 101.086 80.2286 99.4193L76.0901 97.1027L54.4823 85.0077C53.2685 84.3282 51.7887 84.3282 50.5748 85.0077L28.967 97.1028L24.8286 99.4193C21.8501 101.086 18.2863 98.4972 18.9515 95.1493L19.8758 90.4976L24.7018 66.2098C24.9729 64.8453 24.5156 63.438 23.4943 62.4935L5.31395 45.6808L1.83202 42.4608C-0.673963 40.1434 0.687304 35.9538 4.07683 35.5519L8.78655 34.9935L33.3769 32.0779C34.7584 31.9142 35.9555 31.0444 36.5382 29.7812ZM73.0099 83.6845L73.4757 83.9453L73.0099 81.6012V83.6845ZM73.0099 56.7825C73.4956 56.1498 74.038 55.5536 74.6347 55.0018L86.4217 44.1015L73.0099 42.5113V56.7825Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star9: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.1531 7.29532L36.7814 29.7812C36.1987 31.0444 35.0015 31.9142 33.62 32.0779L9.02971 34.9935L4.31999 35.5519C0.930468 35.9538 -0.430799 40.1434 2.07518 42.4608L5.55712 45.6808L23.7375 62.4935C24.7588 63.438 25.2161 64.8453 24.9449 66.2098L20.119 90.4976L19.1947 95.1493C18.5295 98.4972 22.0933 101.086 25.0718 99.4193L29.2101 97.1028L50.818 85.0077C52.0318 84.3282 53.5116 84.3282 54.7255 85.0077L76.3332 97.1027L80.4717 99.4193C83.4502 101.086 87.014 98.4972 86.3488 95.1493L85.4245 90.4977L80.5986 66.2098C80.3274 64.8453 80.7847 63.438 81.806 62.4935L99.9863 45.6809L103.468 42.4608C105.974 40.1434 104.613 35.9538 101.223 35.5519L96.5139 34.9935L71.9234 32.0779C70.542 31.9142 69.3448 31.0444 68.7621 29.7812L58.3904 7.29532L56.404 2.98868C54.9743 -0.110809 50.5691 -0.110809 49.1395 2.98868L47.1531 7.29532ZM80.0529 50.216L86.6649 44.1015L80.0529 43.3175V50.216Z"
        fill="#FEE502"
      />
    </svg>
  ),
  star10: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="100"
      viewBox="0 0 105 100"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.7784 29.7812L47.1501 7.29532L49.1366 2.98868C50.5662 -0.110809 54.9714 -0.110809 56.4011 2.98868L58.3875 7.29532L68.7592 29.7812C69.3419 31.0444 70.539 31.9142 71.9205 32.0779L96.511 34.9935L101.221 35.5519C104.61 35.9538 105.971 40.1434 103.465 42.4608L99.9834 45.6809L81.8031 62.4935C80.7817 63.438 80.3245 64.8453 80.5956 66.2098L85.4216 90.4977L86.3459 95.1493C87.0111 98.4972 83.4473 101.086 80.4688 99.4193L76.3303 97.1027L54.7226 85.0077C53.5087 84.3282 52.0289 84.3282 50.8151 85.0077L29.2072 97.1028L25.0688 99.4193C22.0904 101.086 18.5265 98.4972 19.1918 95.1493L20.1161 90.4976L24.942 66.2098C25.2131 64.8453 24.7558 63.438 23.7345 62.4935L5.55419 45.6808L2.07225 42.4608C-0.433729 40.1434 0.927538 35.9538 4.31706 35.5519L9.02678 34.9935L33.6171 32.0779C34.9986 31.9142 36.1957 31.0444 36.7784 29.7812Z"
        fill="#FEE502"
      />
    </svg>
  )
};

const PartialStars = ({ level, width = '120px', height = '120px' }) => {
  const Star = stars[`star${level}`];
  return Star && React.cloneElement(Star, { width, height }); // svg 복제 후 width, height 속성 추가
};

export default PartialStars;
