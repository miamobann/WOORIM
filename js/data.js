/* WOORIM 공용 데이터 (기획 브리프 4·5장 확정 데이터) */
window.WOORIM = {
  parts: {
    1: { ko: "버번 & 달콤함", en: "Classic & Sweet", img: "lineup-part1", alt: "밝은 오크 선반 위에 놓인 Cask No.01~04 상자와 티백" },
    2: { ko: "오버 앤 오크", en: "Rich & Heavy", img: "lineup-part2", alt: "어두운 숙성고의 오크통 위에 놓인 Cask No.05~08 상자와 티백" },
    3: { ko: "과일 & 화려함", en: "Fruity & Finish", img: "lineup-part3", alt: "금빛 보케가 비치는 검은 대리석 위의 Cask No.09~12 상자와 티백" }
  },

  lineup: [
    { no: "01", part: 1, nameKo: "버번 마차", nameEn: "Bourbon Express", tagColor: "#D9A82B", tagText: "#FFFFFF", signature: false,
      flavor: "거칠고 달콤한 옥수수 향과 캐러멜, 활기찬 야생의 맛.",
      desc: "소주에 타면 단숨에 묵직한 아메리칸 버번의 활기를 불어넣는 기본 타격감 베이스." },
    { no: "02", part: 1, nameKo: "호밀밭의 파수꾼", nameEn: "Rye & Pepper", tagColor: "#D2552B", tagText: "#FFFFFF", signature: false,
      flavor: "알싸한 호밀(Rye) 특유의 스파이시함과 허브, 정향, 가벼운 시나몬.",
      desc: "달기만 한 술이 지겨울 때, 찌르는 듯한 타격감과 스파이시한 끝맛을 더해주는 블렌딩 치트키." },
    { no: "03", part: 1, nameKo: "켄터키의 목공소", nameEn: "Vanilla Oak", tagColor: "#E6CF97", tagText: "#7A4A12", signature: true,
      flavor: "갓 구운 토스트, 부드러운 바닐라 빈, 그을린 참나무의 달콤하고 고소한 풍미.",
      desc: "모든 위스키의 은은하고 부드러운 뼈대를 잡아주는 '블렌딩 필수 베이스'이자 최고의 입문용 티백." },
    { no: "04", part: 1, nameKo: "단풍나무 숲의 밤", nameEn: "Maple Honey", tagColor: "#A8602A", tagText: "#FFFFFF", signature: false,
      flavor: "메이플 시럽, 꿀, 버터스카치의 녹진하고 따뜻한 단맛.",
      desc: "도수가 독하게 느껴질 때 단맛을 주입하는 티백. 보드카나 탄산수와 섞어 하이볼로 즐기기에 최적." },
    { no: "05", part: 2, nameKo: "하이랜드의 아침", nameEn: "Heathy Malt", tagColor: "#9C86B8", tagText: "#FFFFFF", signature: false,
      flavor: "고소한 보리(몰트)의 풍미, 가벼운 들꽃, 야생 꿀과 풀 향기.",
      desc: "스코틀랜드 하이랜드 싱글 몰트 특유의 자연스럽고 향긋한 몰트감을 베이스 술에 입혀주는 티백." },
    { no: "06", part: 2, nameKo: "이중 생활", nameEn: "Double Wood", tagColor: "#6B4A2E", tagText: "#FFFFFF", signature: false,
      flavor: "진득한 오크 향 뒤에 밀려오는 가벼운 과일과 견과류의 복합적인 맛.",
      desc: "한 번 쓰고 버려진 캐스크가 아닌, 깊은 오크 숙성의 레이어를 두 겹으로 얹어 깊이를 주는 티백." },
    { no: "07", part: 2, nameKo: "아일라의 모닥불", nameEn: "Islay Peat", tagColor: "#3F3D3B", tagText: "#FFFFFF", signature: true,
      flavor: "타오르는 장작, 소독약(메디컬), 짭조름한 바닷바람과 짙은 스모크.",
      desc: "\"이게 바로 위스키지!\" 소주 한 잔을 단숨에 아일라섬의 거친 바닷가로 보내버리는 열혈 마니아들을 위한 피트 티백." },
    { no: "08", part: 2, nameKo: "숲속의 은신처", nameEn: "Forest & Moss", tagColor: "#2F5235", tagText: "#FFFFFF", signature: false,
      flavor: "젖은 흙, 소나무, 이끼, 가벼운 가죽 향이 어우러진 대지의 풍미.",
      desc: "피트(No.07)는 조금 부담스럽지만, 자연의 깊고 묵직한 스모키함과 차분함을 느끼고 싶을 때 더하는 음유시인 같은 티백." },
    { no: "09", part: 3, nameKo: "야생 과수원", nameEn: "Orchard Breeze", tagColor: "#7FA845", tagText: "#FFFFFF", signature: false,
      flavor: "싱그러운 청사과, 서양배, 시트러스(오렌지 필)의 화사함.",
      desc: "무겁고 어두운 술을 단숨에 청량하고 산뜻한 과일 위스키로 바꿔주는 하이볼 블렌딩 최적화 티백." },
    { no: "10", part: 3, nameKo: "포도밭 그 사나이", nameEn: "Ruby Port", tagColor: "#B0283A", tagText: "#FFFFFF", signature: false,
      flavor: "잘 익은 붉은 포도, 라즈베리, 달콤한 포트 와인의 깊고 화려한 아로마.",
      desc: "끈적하고 화려한 붉은 과일의 흔적을 입혀주는 포트 캐스크 풍미로, 술의 색까지 붉게 물들이는 비주얼 담당." },
    { no: "11", part: 3, nameKo: "연말의 만찬", nameEn: "Christmas Spice", tagColor: "#B5652F", tagText: "#FFFFFF", signature: false,
      flavor: "시나몬, 육두구, 흑설탕, 말린 오렌지와 진저.",
      desc: "스파이시하면서도 크리스마스 케이크 같은 화려한 향으로 평범한 술자리를 연말 파티로 만드는 분위기 전환용 티백." },
    { no: "12", part: 3, nameKo: "스페이사이드의 축제", nameEn: "Sherry & Berry", tagColor: "#6A1E2C", tagText: "#FFFFFF", signature: true,
      flavor: "셰리 와인 오크통의 건포도, 무화과, 흑설탕, 다크 초콜릿의 농밀하고 묵직한 달콤함.",
      desc: "\"셰리 폭탄(Sherry Bomb)\"이라 불리는 꾸덕하고 깊은 풍미의 정점. 마니아들이 가장 사랑하는 깊고 붉은 스페이사이드 스타일의 완성이자 끝판왕 티백." }
  ],

  aging: [
    { time: "1분", metaphor: "쇼츠 2편", grade: "NAS", gradeEn: "No Age Statement", color: "#EBD39C",
      note: "가볍고 프레시한 아로마. 탄산수를 부어 하이볼로 마시기 가장 좋은 상태." },
    { time: "5분", metaphor: "드립 커피 한 잔", grade: "12년산", gradeEn: "12 Years Old", color: "#DCA859",
      note: "베이스 알코올의 쓴맛은 잡히고, 바닐라와 오크 향이 황금 밸런스를 이루는 시점." },
    { time: "15분", metaphor: "샤워 시간", grade: "18년산", gradeEn: "18 Years Old", color: "#C8812A",
      note: "묵직한 바디감과 깊은 스모키함. 온더락(얼음)으로 천천히 음미하기 좋은 깊이." },
    { time: "하룻밤", metaphor: "숙면 시간", grade: "30년산", gradeEn: "30 Years Old", color: "#7A4A12",
      note: "소주병에 티백을 넣고 냉장고에 하룻밤 방치. 극강의 오크 추출물로 위스키 고인물도 눈감고 마시면 속아 넘어가는 마스터피스." }
  ],

  hashtags: ["#5분이면12년산", "#우려먹는위스키", "#나만의블렌디드", "#티백하이볼", "#천사의몫챌린지"]
};
