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
    start: '2026',
    end: '현재',
    title: '게임 사업 PM',
    description: '제품·사업·마케팅을 함께 보며 무엇을 먼저 할지 정합니다.',
  },
  {
    start: '이전',
    title: '게임 콘텐츠 기획',
    description: '콘텐츠와 시스템을 만들며, 서비스에서 사람들이 어떻게 반응하는지 가까이서 봤습니다.',
  },
  {
    start: '그 이전',
    title: '게임 서비스 운영',
    description: '라이브 서비스를 운영하며 사용자와 게임이 어떻게 움직이는지 배웠습니다.',
  },
];
