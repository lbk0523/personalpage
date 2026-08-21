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
    description: '사업 전략, 제품 운영, 마케팅과 여러 이해관계가 만나는 역할을 맡고 있습니다.',
  },
  {
    start: '이전',
    title: '게임 콘텐츠 기획',
    description: '콘텐츠와 시스템을 설계하고 실제 서비스에서 운영하는 경험을 쌓았습니다.',
  },
  {
    start: '그 이전',
    title: '게임 서비스와 운영',
    description: '사용자와 라이브 서비스 가까이에서 게임이 실제로 움직이는 방식을 배웠습니다.',
  },
];
