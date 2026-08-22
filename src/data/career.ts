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
    description: '제품, 사업, 마케팅 사이를 오가며 지금 무엇을 먼저 해야 할지 정하는 일을 합니다.',
  },
  {
    start: '이전',
    title: '게임 콘텐츠 기획',
    description: '콘텐츠와 시스템을 만들고, 실제 서비스에서 사람들이 어떻게 반응하는지 가까이서 봤습니다.',
  },
  {
    start: '그 이전',
    title: '게임 서비스와 운영',
    description: '라이브 서비스 현장에서 사용자와 게임이 실제로 움직이는 방식을 처음 배웠습니다.',
  },
];
