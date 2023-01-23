export default function Logo({ className, ...props }: { className?: string }) {
  return (
    <svg
      height='5rem'
      viewBox='0 0 350 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        d='M15.3682 75.6738C13.8857 75.6738 12.5718 75.3145 11.4263 74.5957C10.2808 75.3145 9.21387 75.6738 8.22559 75.6738C7.25977 75.6738 6.4624 75.584 5.8335 75.4043C5.20459 75.2471 4.6543 75.0225 4.18262 74.7305C3.2168 74.1465 2.73389 73.4165 2.73389 72.5405C2.73389 72.0913 2.85742 71.6982 3.10449 71.3613C3.59863 71.7432 4.22754 71.9341 4.99121 71.9341C6.99023 71.9341 8.37158 71.0806 9.13525 69.3735V52.8984C9.13525 51.8877 8.92188 51.1128 8.49512 50.5737C7.82129 49.6978 6.66455 48.8667 5.0249 48.0806C6.52979 47.3843 7.51807 46.7778 7.98975 46.2612C8.75342 45.3853 9.13525 44.4082 9.13525 43.3301V29.1123C8.37158 27.3828 6.99023 26.5181 4.99121 26.5181C4.22754 26.5181 3.59863 26.709 3.10449 27.0908C2.85742 26.7539 2.73389 26.3721 2.73389 25.9453C2.73389 25.4961 2.85742 25.0806 3.10449 24.6987C3.37402 24.3169 3.7334 23.9912 4.18262 23.7217C5.21582 23.0928 6.39502 22.7783 7.72021 22.7783C9.06787 22.7783 10.3032 23.1489 11.4263 23.8901C12.5942 23.1489 13.897 22.7783 15.3345 22.7783C16.9067 22.7783 18.2769 23.1938 19.4448 24.0249C21.938 22.9692 24.4199 22.4414 26.8906 22.4414C29.3613 22.4414 31.6074 22.6885 33.6289 23.1826C35.6729 23.6543 37.5146 24.3281 39.1543 25.2041C42.7256 27.0908 44.9492 29.5391 45.8252 32.5488C46.3193 34.2109 47.3862 35.4463 49.0259 36.2549C47.2065 37.5127 46.0835 38.9502 45.6567 40.5674C44.7134 44.1162 42.8042 46.4297 39.9292 47.5078C44.1519 48.6758 46.9033 51.4385 48.1836 55.7959C48.6328 57.3457 49.6997 58.6147 51.3843 59.603C49.6548 60.5688 48.498 62.0288 47.9141 63.9829C47.3301 65.937 46.2969 67.7002 44.8145 69.2725C43.3545 70.8223 41.6475 72.1025 39.6934 73.1133C35.9199 75.0449 31.6636 76.0107 26.9243 76.0107C24.0942 76.0107 21.5674 75.5054 19.3438 74.4946C18.1758 75.2808 16.8506 75.6738 15.3682 75.6738ZM27.834 45.8906C29.8105 45.8906 31.2144 45.4189 32.0454 44.4756C32.9214 43.5098 33.3594 41.8477 33.3594 39.4893V31.7065C33.3594 30.3364 32.6406 29.1797 31.2031 28.2363C29.9453 27.4053 28.7773 26.9897 27.6992 26.9897C26.6436 26.9897 25.7676 27.1245 25.0713 27.394C24.3975 27.6411 23.791 27.9893 23.252 28.4385C22.1064 29.3818 21.5337 30.5161 21.5337 31.8413V45.8906H27.834ZM35.2798 27.7646C36.0435 29.4717 36.4253 31.9648 36.4253 35.2441C36.4253 40.0732 36.1108 43.2065 35.4819 44.644C36.4253 44.4644 37.2227 43.5547 37.874 41.915C38.1211 41.3086 38.3008 40.6685 38.4131 39.9946C38.5479 39.3208 38.6489 38.8042 38.7163 38.4448C38.8062 38.063 38.9297 37.7373 39.0869 37.4678C39.4238 36.9062 40.0303 36.4795 40.9062 36.1875C40.0078 35.8955 39.4463 35.5811 39.2217 35.2441C38.9297 34.8623 38.6938 34.166 38.5142 33.1553C38.3345 32.1445 38.1211 31.3247 37.874 30.6958C37.627 30.0444 37.3574 29.5166 37.0654 29.1123C36.5039 28.3037 35.9087 27.8545 35.2798 27.7646ZM12.3696 66.0718C13.4927 65.645 14.1104 64.1738 14.2227 61.6582C14.3574 59.1426 14.4248 55.6611 14.4248 51.2139C14.4248 46.7666 14.4136 43.813 14.3911 42.353C14.3911 40.8706 14.3799 39.6802 14.3574 38.7817C14.29 36.1313 14.0317 34.5366 13.5825 33.9976C13.1558 33.436 12.7515 33.0654 12.3696 32.8857C12.3696 40.7021 12.2349 45.1494 11.9653 46.2275C11.6509 47.126 10.8872 47.7661 9.67432 48.1479C11.022 48.6196 11.7856 49.1924 11.9653 49.8662C12.2349 50.9443 12.3696 54.8862 12.3696 61.6919V66.0718ZM21.5337 66.2065C21.5337 67.7788 22.1289 69.0703 23.3193 70.0811C24.4648 71.0244 25.835 71.4961 27.4297 71.4961C28.9795 71.4961 30.2822 71.1592 31.3379 70.4854C33.3594 69.1602 34.3701 67.644 34.3701 65.937V56.0654C34.3701 54.0215 33.7075 52.4829 32.3823 51.4497C31.2593 50.5737 29.7881 50.1357 27.9688 50.1357H21.5337V66.2065ZM36.6274 51.1802C37.1665 52.3931 37.436 55.2007 37.436 59.603C37.436 65.1733 37.2339 68.4414 36.8296 69.4072C37.3013 69.3174 37.7842 68.7446 38.2783 67.689C38.7725 66.6333 39.1206 65.5439 39.3228 64.4209C39.5249 63.2979 39.6597 62.5342 39.7271 62.1299C39.8169 61.7256 39.9404 61.3662 40.0977 61.0518C40.457 60.3779 41.0635 59.895 41.917 59.603C40.5693 59.1763 39.772 58.3228 39.5249 57.0425C39.3003 55.7622 39.0757 54.7739 38.8511 54.0776C38.6265 53.3813 38.3906 52.8311 38.1436 52.4268C37.7168 51.708 37.2114 51.2925 36.6274 51.1802ZM78.0342 71.7993C75.9902 74.4946 72.9243 75.8423 68.8364 75.8423C63.8501 75.8423 60.1104 74.3486 57.6172 71.3613C56.5391 70.0811 55.7979 68.6548 55.3936 67.0825C55.1689 66.1392 54.7759 65.4204 54.2144 64.9263C53.6528 64.4097 52.9565 63.9492 52.1255 63.5449C53.7427 62.8037 54.8994 61.4111 55.5957 59.3672C56.3369 57.2109 57.5723 55.6499 59.3018 54.6841C61.166 53.6733 63.2212 53.1455 65.4673 53.1006C67.7134 53.0332 69.3755 52.9546 70.4536 52.8647C71.5317 52.7749 72.4863 52.6289 73.3174 52.4268C74.8672 52.0674 76.0801 51.4048 76.9561 50.439V45.3853C76.9561 43.1616 76.4956 41.5332 75.5747 40.5C74.6763 39.4668 73.2949 38.9502 71.4307 38.9502C69.5889 38.9502 68.2188 39.2983 67.3203 39.9946C66.4443 40.6685 66.0063 41.5781 66.0063 42.7236C66.0063 44.4756 66.9048 45.3291 68.7017 45.2842C68.3423 47.0361 67.3989 47.9121 65.8716 47.9121C65.4224 47.9121 64.9844 47.8335 64.5576 47.6763V47.7773C64.5576 48.3613 64.8271 48.7319 65.3662 48.8892C64.8047 49.7427 63.8613 50.1582 62.5361 50.1357C61.2109 50.1133 60.1777 49.4058 59.4365 48.0132C59.0996 48.103 58.7065 48.1479 58.2573 48.1479C57.8306 48.1479 57.3477 48.002 56.8086 47.71C56.292 47.418 55.8765 47.0137 55.562 46.4971C56.6851 45.8232 57.3701 44.7788 57.6172 43.3638C57.8867 41.6343 59.2681 39.8823 61.7612 38.1079C64.771 35.9741 68.6118 34.9072 73.2837 34.9072C81.0327 34.9072 85.7607 37.2881 87.4678 42.0498C88.0293 43.6445 88.3101 45.5312 88.3101 47.71V50.439C88.3101 51.5396 88.5796 52.438 89.1187 53.1343C89.6802 53.8306 90.6235 54.4033 91.9487 54.8525C90.5337 55.5039 89.624 56.0879 89.2197 56.6045C88.6133 57.3906 88.3101 58.2891 88.3101 59.2998V69.4072C88.9614 71.0918 89.8936 71.9341 91.1064 71.9341C91.8701 71.9341 92.499 71.7432 92.9932 71.3613C93.3076 71.7881 93.4648 72.3271 93.4648 72.9785C93.4648 73.6074 93.1392 74.2139 92.4878 74.7979C91.8589 75.3818 90.9043 75.6738 89.624 75.6738C88.3438 75.6738 87.1533 75.3145 86.0527 74.5957C85.0869 75.3145 84.2222 75.6738 83.4585 75.6738C82.7173 75.6738 82.0659 75.5952 81.5044 75.438C80.9653 75.3032 80.46 75.0786 79.9883 74.7642C78.9326 74.0679 78.2812 73.0796 78.0342 71.7993ZM80.1567 66.0718C81.4595 65.5552 82.1445 63.0732 82.2119 58.626C82.2119 57.6826 82.2119 56.6045 82.2119 55.3916C82.2119 54.1787 82.2007 53.1455 82.1782 52.292C82.1782 51.416 82.167 50.585 82.1445 49.7988C82.0547 46.9688 81.7964 45.2842 81.3696 44.7451C80.9429 44.1836 80.5386 43.813 80.1567 43.6333V66.0718ZM67.7246 63.6797C67.7246 64.623 67.8257 65.5439 68.0278 66.4424C68.23 67.3408 68.5332 68.127 68.9375 68.8008C69.8359 70.2158 71.105 70.9233 72.7446 70.9233C73.98 70.9233 75.002 70.418 75.8105 69.4072C76.5742 68.4189 76.9561 67.1499 76.9561 65.6001V54.6167C75.5186 55.4478 73.6768 56.0205 71.4307 56.335C68.96 56.7168 67.7246 59.165 67.7246 63.6797ZM62.6709 71.2603C62.8955 71.103 63.0078 70.9009 63.0078 70.6538C63.0078 70.3169 62.8506 69.8452 62.5361 69.2388C61.4131 67.1724 60.8516 65.4766 60.8516 64.1514C60.8516 62.8262 60.8965 61.8716 60.9863 61.2876C61.0986 60.7036 61.2334 60.2095 61.3906 59.8052C61.5703 59.3784 61.7612 59.0078 61.9634 58.6934C62.188 58.3789 62.3789 58.0981 62.5361 57.8511C62.8281 57.3345 62.9741 56.9863 62.9741 56.8066C62.9741 56.6045 62.873 56.436 62.6709 56.3013C61.75 56.728 61.0762 57.2334 60.6494 57.8174C59.8857 58.8506 59.3242 60.187 58.9648 61.8267C58.875 62.2983 58.0889 62.8711 56.6064 63.5449C58.0439 64.1963 58.8301 64.769 58.9648 65.2632C59.7285 67.936 60.9639 69.9351 62.6709 71.2603ZM104.044 74.5957C103.011 75.3145 101.832 75.6738 100.506 75.6738C99.1812 75.6738 98.2153 75.3706 97.6089 74.7642C97.0249 74.1353 96.7329 73.54 96.7329 72.9785C96.7329 72.2373 96.8564 71.6982 97.1035 71.3613C97.5977 71.7432 98.2266 71.9341 98.9902 71.9341C100.428 71.9341 101.36 71.2378 101.787 69.8452V59.3672C101.787 58.3789 101.573 57.6602 101.146 57.2109C100.495 56.4697 99.3384 55.6948 97.6763 54.8862C99.2485 54.1675 100.248 53.5947 100.675 53.168C101.416 52.4268 101.787 51.5171 101.787 50.439V45.52C101.787 43.6108 101.135 42.5776 99.8325 42.4204C99.4507 42.3755 98.9678 42.353 98.3838 42.353C97.7998 42.353 97.2607 42.5439 96.7666 42.9258C96.4521 42.499 96.2949 42.061 96.2949 41.6118C96.2949 41.1401 96.4072 40.6235 96.6318 40.062C96.8789 39.478 97.2383 38.9277 97.71 38.4111C98.9004 37.1982 100.271 36.5918 101.82 36.5918C103.393 36.5918 104.695 36.8389 105.729 37.333C106.964 35.9404 108.222 35.2441 109.502 35.2441C110.782 35.2441 111.669 35.5474 112.164 36.1538C112.658 36.7378 112.905 37.6475 112.905 38.8828V42.0498C114.073 39.9609 115.667 38.3101 117.689 37.0972C119.71 35.8618 121.855 35.2441 124.124 35.2441C126.393 35.2441 128.212 35.5474 129.582 36.1538C130.975 36.7378 132.12 37.5801 133.019 38.6807C134.771 40.8594 135.646 44.0264 135.646 48.1816V50.4053C135.646 51.4834 135.882 52.2583 136.354 52.73C137.05 53.4487 138.185 54.1675 139.757 54.8862C138.072 55.7173 137.017 56.3462 136.59 56.7729C135.961 57.4692 135.646 58.3115 135.646 59.2998V69.8452C136.073 71.2378 137.005 71.9341 138.443 71.9341C139.207 71.9341 139.835 71.7432 140.33 71.3613C140.577 71.6982 140.7 72.1924 140.7 72.8438C140.7 73.4951 140.397 74.1353 139.791 74.7642C139.207 75.3706 138.297 75.6738 137.062 75.6738C135.826 75.6738 134.703 75.3257 133.692 74.6294C132.794 75.3257 131.738 75.6738 130.525 75.6738C129.335 75.6738 128.268 75.3369 127.325 74.6631C126.336 75.3369 125.281 75.6738 124.158 75.6738C123.035 75.6738 122.147 75.3931 121.496 74.8315C120.845 74.27 120.519 73.4614 120.519 72.4058C120.519 71.9116 120.688 71.5186 121.024 71.2266C121.541 71.6309 122.058 71.833 122.574 71.833C123.562 71.833 124.27 71.2827 124.697 70.1821V50.1021C124.697 45.7446 123.63 43.2178 121.496 42.5215C120.8 42.2969 120.047 42.1846 119.239 42.1846C118.43 42.1846 117.678 42.353 116.981 42.6899C116.285 43.0044 115.656 43.4536 115.095 44.0376C113.859 45.3403 113.129 46.8901 112.905 48.687V70.1821C113.332 71.2827 114.039 71.833 115.027 71.833C115.544 71.833 116.061 71.6309 116.577 71.2266C116.914 71.5186 117.083 72.0576 117.083 72.8438C117.083 73.6074 116.757 74.27 116.105 74.8315C115.454 75.3931 114.589 75.6738 113.511 75.6738C112.456 75.6738 111.49 75.3369 110.614 74.6631C109.76 75.3369 108.716 75.6738 107.48 75.6738C106.245 75.6738 105.1 75.3145 104.044 74.5957ZM127.931 66.0718C129.054 65.645 129.672 64.1738 129.784 61.6582C129.919 59.1426 129.986 56.7729 129.986 54.5493C129.986 52.3257 129.896 50.4951 129.717 49.0576C129.537 47.5977 129.279 46.4634 128.942 45.6548C128.605 44.8237 128.201 44.2285 127.729 43.8691C127.28 43.4873 126.786 43.1616 126.247 42.8921C127.1 44.9136 127.594 46.7554 127.729 48.4175C127.864 50.0796 127.931 51.6855 127.931 53.2354V66.0718ZM106.941 58.626C106.964 57.8848 106.975 57.2671 106.975 56.7729C106.998 56.2563 107.009 55.8408 107.009 55.5264C107.009 55.2119 107.009 54.8975 107.009 54.583C107.009 54.2461 106.998 53.8081 106.975 53.269C106.975 52.73 106.964 52.1348 106.941 51.4834C106.941 50.832 106.919 50.1919 106.874 49.563C106.807 48.0132 106.706 46.9463 106.571 46.3623C106.301 45.0596 105.785 44.1611 105.021 43.667V45.8569C105.021 49.6304 104.931 51.854 104.751 52.5278C104.594 53.1792 104.325 53.6733 103.943 54.0103C103.583 54.3472 103.044 54.6392 102.326 54.8862C103.673 55.3579 104.437 55.9194 104.617 56.5708C104.886 57.6489 105.021 60.0747 105.021 63.8481V66.0381C106.054 65.3643 106.649 63.9941 106.807 61.9277C106.896 60.4678 106.941 59.3672 106.941 58.626ZM166.104 70.0811C166.53 69.6318 166.867 69.0703 167.114 68.3965C167.361 67.7002 167.485 66.9814 167.485 66.2402C167.485 65.4766 167.44 64.7803 167.35 64.1514C167.507 63.8145 167.934 63.5562 168.63 63.3765C169.327 63.1743 169.787 63.0732 170.012 63.0732C170.865 63.0732 171.55 63.3989 172.067 64.0503C172.583 64.6792 172.842 65.5664 172.842 66.7119C172.842 67.835 172.505 68.9468 171.831 70.0474C171.18 71.1479 170.304 72.125 169.203 72.9785C166.755 74.8877 163.902 75.8423 160.646 75.8423C154.446 75.8423 150.336 73.4951 148.314 68.8008C147.573 67.0713 147.203 64.9038 147.203 62.2983V58.188C147.203 57.1323 146.046 56.0205 143.732 54.8525C146.046 53.5273 147.203 51.7417 147.203 49.4956V45.52C147.203 42.9595 146.158 41.6792 144.069 41.6792C143.306 41.6792 142.677 41.8701 142.183 42.252C141.868 41.8252 141.711 41.3872 141.711 40.938C141.711 40.4663 141.79 39.9609 141.947 39.4219C142.126 38.8604 142.43 38.355 142.856 37.9058C143.935 36.7378 145.608 36.3335 147.876 36.6929V35.6147C147.876 33.2563 148.472 31.1787 149.662 29.3818C150.718 27.7646 151.65 26.9561 152.458 26.9561C153.29 26.9561 153.93 27.2368 154.379 27.7983C154.761 26.0239 155.266 24.7437 155.895 23.9575C156.524 23.1714 157.422 22.7783 158.59 22.7783V36.8276H169.54C169.72 37.187 169.81 37.7935 169.81 38.647C169.81 39.478 169.484 40.1519 168.833 40.6685C168.181 41.1626 167.395 41.4097 166.474 41.4097H158.59V64.2188C158.59 68.127 159.478 70.418 161.252 71.0918C161.769 71.2715 162.319 71.3613 162.903 71.3613C163.509 71.3613 164.082 71.2603 164.621 71.0581C165.183 70.8335 165.677 70.5078 166.104 70.0811ZM150.437 66.0718C151.493 65.3979 152.088 63.9941 152.223 61.8604C152.312 60.333 152.357 59.1426 152.357 58.2891C152.38 57.4355 152.391 56.7505 152.391 56.2339C152.414 55.6948 152.425 55.2793 152.425 54.9873V53.6396C152.425 52.9883 152.414 52.1572 152.391 51.1465C152.391 50.1133 152.38 49.0015 152.357 47.811C152.357 46.5981 152.335 45.4414 152.29 44.3408C152.223 41.6904 152.122 40.0732 151.987 39.4893C151.717 38.1865 151.201 37.2881 150.437 36.7939V47.3057C150.437 50.4277 150.381 52.0786 150.269 52.2583C150.179 52.438 150.1 52.6514 150.033 52.8984C149.831 53.5723 149.067 54.1338 147.742 54.583C149.089 55.0547 149.853 55.6274 150.033 56.3013C150.302 57.3794 150.437 59.9062 150.437 63.8818V66.0718ZM204.074 64.8252C204.568 63.8818 205.478 63.4102 206.803 63.4102C207.701 63.4102 208.397 63.7808 208.892 64.522C209.296 65.106 209.498 65.8247 209.498 66.6782C209.498 67.5093 209.285 68.3516 208.858 69.2051C208.431 70.0586 207.847 70.8335 207.106 71.5298C206.365 72.2261 205.511 72.8438 204.545 73.3828C203.602 73.9219 202.591 74.3711 201.513 74.7305C199.29 75.4717 196.976 75.8423 194.573 75.8423C192.169 75.8423 189.912 75.4492 187.801 74.6631C185.712 73.8545 183.915 72.7314 182.41 71.2939C179.468 68.4639 177.671 64.5781 177.02 59.6367C176.862 58.5361 176.604 57.75 176.245 57.2783C175.571 56.4473 174.459 55.6499 172.909 54.8862C174.863 54.0103 176.11 52.6064 176.649 50.6748C176.806 50.1357 176.93 49.5967 177.02 49.0576C177.581 45.1045 179.58 41.7354 183.017 38.9502C186.341 36.2549 190.058 34.9072 194.168 34.9072C198.436 34.9072 202.131 36.4121 205.253 39.4219C208.487 42.5215 210.104 46.3286 210.104 50.8433C210.104 51.0005 210.093 51.1577 210.071 51.3149C210.071 51.4722 210.082 51.6182 210.104 51.7529C210.149 52.0449 210.329 52.2134 210.644 52.2583C211.048 52.7749 211.25 53.3252 211.25 53.9092C211.25 55.2568 210.531 56.0542 209.094 56.3013C208.734 56.3687 208.173 56.4585 207.409 56.5708L188.407 59.603V62.8374C188.407 65.4429 189.193 67.5093 190.766 69.0366C192.248 70.4966 194.124 71.2266 196.392 71.2266C198.795 71.2266 200.727 70.7324 202.187 69.7441C203.557 68.8008 204.242 67.5654 204.242 66.0381C204.242 65.6787 204.186 65.2744 204.074 64.8252ZM198.178 53.9429V44.5093C198.178 43.0269 197.886 41.9375 197.302 41.2412C196.269 40.0508 195.247 39.4556 194.236 39.4556C193.225 39.4556 192.383 39.6128 191.709 39.9272C191.035 40.2192 190.451 40.6909 189.957 41.3423C188.924 42.7124 188.407 44.8462 188.407 47.7437V55.5264L198.178 53.9429ZM203.164 53.1006V52.0562C203.164 47.8784 202.816 45.3516 202.12 44.4756C201.805 44.0938 201.457 43.813 201.075 43.6333V53.4375L203.164 53.1006ZM182.916 66.0718C183.23 65.8247 183.387 65.5439 183.387 65.2295C183.387 64.7354 183.286 64.1064 183.084 63.3428C182.163 59.8164 181.703 57.3682 181.703 55.998C181.703 54.6055 181.748 53.5273 181.837 52.7637C181.927 51.9775 182.051 51.1914 182.208 50.4053C182.478 48.8779 182.77 47.5303 183.084 46.3623C183.286 45.5986 183.387 45.082 183.387 44.8125C183.387 44.2734 183.23 43.8804 182.916 43.6333C181.972 44.7563 181.253 46.2612 180.759 48.1479C180.265 50.0347 179.861 51.6968 179.546 53.1343C179.434 53.7407 178.771 54.3247 177.559 54.8862C178.771 55.4478 179.434 56.0093 179.546 56.5708C180.377 60.3667 181.062 62.7812 181.602 63.8145C182.141 64.8477 182.579 65.6001 182.916 66.0718ZM221.93 74.5957C220.897 75.3145 219.718 75.6738 218.393 75.6738C217.067 75.6738 216.102 75.3706 215.495 74.7642C214.911 74.1353 214.619 73.54 214.619 72.9785C214.619 72.2373 214.743 71.6982 214.99 71.3613C215.484 71.7432 216.113 71.9341 216.876 71.9341C218.314 71.9341 219.246 71.2378 219.673 69.8452V59.6367C219.673 58.6035 219.471 57.8398 219.066 57.3457C218.348 56.4697 217.18 55.6387 215.562 54.8525C218.303 53.5947 219.673 51.6631 219.673 49.0576V45.52C219.673 43.6108 219.021 42.5776 217.719 42.4204C217.337 42.3755 216.854 42.353 216.27 42.353C215.686 42.353 215.147 42.5439 214.653 42.9258C214.338 42.499 214.181 42.061 214.181 41.6118C214.181 41.1401 214.293 40.6235 214.518 40.062C214.765 39.478 215.136 38.9277 215.63 38.4111C216.798 37.1982 218.157 36.5918 219.707 36.5918C221.279 36.5918 222.582 36.8389 223.615 37.333C224.85 35.9404 226.175 35.2441 227.59 35.2441C229.792 35.2441 230.892 36.457 230.892 38.8828V43.4985C233.138 37.9731 236.709 35.2104 241.606 35.2104C243.807 35.2104 245.593 35.8843 246.963 37.2319C248.378 38.6021 249.085 40.5 249.085 42.9258V43.3975C249.085 43.5547 249.063 43.8804 249.018 44.3745C248.973 44.8462 248.984 45.3291 249.052 45.8232C249.142 46.3174 249.276 46.7217 249.456 47.0361C249.703 47.5078 250.164 47.8784 250.837 48.1479C250.68 48.7544 250.31 49.3047 249.726 49.7988C249.164 50.2705 248.535 50.5063 247.839 50.5063H247.199C246.323 51.6069 245.099 52.3818 243.526 52.8311C243.077 52.9658 242.583 53.0332 242.044 53.0332C241.527 53.0332 241.067 52.9209 240.663 52.6963C240.281 52.4492 240.067 52.1909 240.022 51.9214C240.449 51.7192 240.663 51.3149 240.663 50.7085V50.54C240.483 50.585 240.326 50.6074 240.191 50.6074H239.854C239.113 50.6074 238.439 50.3267 237.833 49.7651C237.249 49.2036 236.867 48.4961 236.687 47.6426C237.9 47.6875 238.956 47.2383 239.854 46.2949C240.663 45.4639 241.067 44.6104 241.067 43.7344C241.067 41.668 240.168 40.6348 238.372 40.6348C236.822 40.6348 235.261 41.8701 233.688 44.3408C232.206 46.6094 231.274 48.9565 230.892 51.3823V69.6094C231.139 70.3955 231.521 70.9795 232.038 71.3613C232.554 71.7432 233.262 71.9341 234.16 71.9341C235.059 71.9341 235.755 71.7432 236.249 71.3613C236.496 71.6982 236.62 72.1924 236.62 72.8438C236.62 73.4951 236.316 74.1353 235.71 74.7642C235.126 75.3706 234.126 75.6738 232.711 75.6738C231.319 75.6738 229.982 75.292 228.702 74.5283C227.804 75.292 226.714 75.6738 225.434 75.6738C224.154 75.6738 222.986 75.3145 221.93 74.5957ZM224.828 58.626C224.85 57.8623 224.861 57.2222 224.861 56.7056C224.884 56.189 224.895 55.7734 224.895 55.459V54.5493C224.895 54.2124 224.884 53.7856 224.861 53.269C224.861 52.73 224.85 52.1348 224.828 51.4834C224.828 50.8096 224.816 50.1582 224.794 49.5293C224.659 47.1934 224.401 45.6997 224.019 45.0483C223.66 44.3745 223.289 43.9141 222.907 43.667V45.8569C222.907 49.6304 222.817 51.854 222.638 52.5278C222.48 53.1792 222.211 53.6733 221.829 54.0103C221.47 54.3247 220.931 54.6055 220.212 54.8525C221.56 55.3242 222.323 55.897 222.503 56.5708C222.772 57.6489 222.907 60.0747 222.907 63.8481V66.0381C223.94 65.3643 224.524 63.9941 224.659 61.9277C224.771 60.4678 224.828 59.3672 224.828 58.626Z'
        fill='#F7F6F6'
      />
      <g clipPath='url(#clip0_25_2045)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M330.345 9.74262C330.345 14.888 326.356 19.1018 321.302 19.4605L318.055 27.8528L330.303 32.8442C331.932 32.0033 333.905 31.8535 335.736 32.5997C339.058 33.9535 340.654 37.7438 339.3 41.0657C337.946 44.3876 334.156 45.983 330.834 44.6292C328.786 43.7948 327.395 42.0346 326.945 40.0291L315.197 35.2411L301.639 70.286C296.532 90.6545 309.109 86.4622 321.685 82.2699C319.743 81.2686 318.685 80.6759 317.355 79.0224C323.423 78.0538 326.952 75.9236 333.593 68.1973C334.647 77.7885 332.633 83.0009 324.933 92.0126C324.99 90.0915 324.971 90.0542 324.479 89.0424C324.322 88.7194 324.117 88.2971 323.85 87.6825C317.355 92.0126 306.531 95.2596 296.789 95.2596C291.092 96.261 288.684 97.4111 285.587 98.8906L285.587 98.8906C284.854 99.2407 284.082 99.6093 283.219 99.9987C282.928 100.13 282.59 99.955 282.529 99.6415C282.433 99.1455 282.345 98.6736 282.261 98.2205C281.44 93.8172 280.952 91.193 276.222 85.517C268.234 77.3995 264.958 68.3763 265.396 61.7017C264.828 61.5609 264.355 62.1833 263.612 63.161C263.007 63.9561 262.224 64.9862 261.066 66.0318C260.541 56.7847 263.092 50.2367 270.808 43.299C270.104 51.7794 271.126 55.5 275.138 60.6192C275.221 60.6736 275.304 60.7274 275.385 60.7799L275.386 60.7803C276.694 61.6303 277.5 62.1543 269.726 59.5367C274.01 73.4598 283.742 80.6929 289.041 71.7391L306.698 31.7777L294.725 26.898C293.002 28.0179 290.777 28.3038 288.729 27.4695C285.407 26.1157 283.812 22.3253 285.166 19.0034C286.519 15.6816 290.31 14.0861 293.632 15.4399C295.463 16.1862 296.769 17.6728 297.346 19.4131L309.901 24.5296L313.492 16.403C311.859 14.6609 310.86 12.3185 310.86 9.74262C310.86 4.36192 315.222 0 320.602 0C325.983 0 330.345 4.36192 330.345 9.74262ZM316.84 9.74262C316.84 11.8203 318.525 13.5047 320.602 13.5047C322.68 13.5047 324.364 11.8203 324.364 9.74262C324.364 7.6649 322.68 5.98058 320.602 5.98058C318.525 5.98058 316.84 7.6649 316.84 9.74262ZM324.708 2.56174C317.46 -0.000203031 312.109 8.73909 313.705 12.9902C309.051 6.00632 317.461 -2.40276 324.708 2.56174ZM294.22 17.3184C291.96 16.0595 285.025 19.2189 286.643 23.8135C283.824 19.2189 289.831 13.2124 294.22 17.3184ZM313.688 21.8112L313.617 21.975C304.969 44.9568 299.616 56.1555 294.031 67.8393C293.146 69.6904 292.256 71.5536 291.345 73.4778C296.065 59.5447 300.909 47.7931 313.688 21.8112ZM262.827 61.7031C260.999 60.0647 262.848 51.7143 269.409 45.6492C263.848 53.4522 262.303 60.0241 262.827 61.7031Z'
          fill='#F7F6F6'
        />
      </g>
      <defs>
        <clipPath id='clip0_25_2045'>
          <rect
            width='100'
            height='100'
            fill='white'
            transform='translate(250)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
