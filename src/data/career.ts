export type CareerItem = {
  start: string;
  end?: string;
  title: string;
  organization?: string;
  description?: string;
  href?: string;
};

export const career: CareerItem[] = [
  {
    start: '2025.04',
    end: '현재',
    title: '출시와 사업 PM',
    organization: '드림에이지',
    description: '출시를 앞둔 게임에서 개발·마케팅·운영의 조건을 한 계획으로 맞춥니다.',
    href: '/work/archetype-land-of-exile-launch/',
  },
  {
    start: '2020.01',
    end: '2024.04',
    title: '전투 콘텐츠 기획',
    organization: '세컨드다이브',
    description: 'MMORPG의 전투 경험을 구성하는 캐릭터·몬스터·던전·레이드를 기획했습니다.',
    href: '/work/ares-combat-content-design/',
  },
  {
    start: '2016.03',
    end: '2019.11',
    title: '글로벌 라이브 사업 PM',
    organization: '넥슨코리아',
    description: '사업 PM으로서 글로벌 론칭 이후, 지역별 사용자 반응을 살피며 서비스와 사업 운영을 경험했습니다.',
    href: '/work/global-live-service-operations/',
  },
];
