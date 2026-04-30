export interface Testimonial {
  id: string; door: 'A' | 'B' | 'sparks';
  name: string; detail: string; asset: string;
  story: string; quote: string; outcome: string; colour: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'k-brunel',
    door: 'A',
    name: 'K',
    detail: "Wembley · came to us at his mother's urging",
    asset: 'Uncertainty — and twenty-four hours to decide his future',
    story: "K came to us last-minute, at his mother's pleading, uncertain whether to pursue a vocational AAT qualification or go to university. Over the course of a three-hour Individual Learning Plan session, we worked through what he carried, what he wanted, and what was actually possible. It was only near the end that we discovered he had just twenty-four hours to secure his university place. We pivoted immediately — not to advise him, but to reassure him that the choice he'd been circling was already the right one. He applied. He was enrolled. Three years later, he graduated with a First Class Honours in Accountancy from Brunel University.",
    quote: "He didn't need us to choose for him. He needed someone to stop the clock long enough for him to hear what he already knew.",
    outcome: 'First Class Honours, Accountancy — Brunel University',
    colour: '#aa0000',
  },
  {
    id: 'risk-consultant',
    door: 'B',
    name: 'A member',
    detail: "Wembley · twenty years devoted to her children's development",
    asset: 'The degree, the qualification, the expertise — and the confidence that twenty years had quietly eroded',
    story: "She came to us having applied for and been interviewed for her first full-time role in twenty years — a remarkable act of courage that she didn't fully recognise as courage. She had the degree. She had the specialist qualification. What twenty years of devoted motherhood had done was make her doubt whether any of it was still valid. Impostor syndrome after a career break is one of the most corrosive things the system does to women. We were not there to fill a gap in her knowledge — we were there to build a bridge back to her own confidence. We supported her ICT development — PowerPoint, Excel — through her first six months and her first performance appraisal, which she passed. She is now performing in that role as a Risk Assessment consultant. The ICT was never the point. The ICT was the key.",
    quote: "She had the degree. She had the qualification. She just needed someone to remind her that twenty years hadn't cancelled either.",
    outcome: 'Risk Assessment consultant · passed first performance appraisal',
    colour: '#1D9E75',
  },
  {
    id: 'online-security',
    door: 'sparks',
    name: 'A class of 13-year-olds',
    detail: 'Local secondary school · a chance invitation',
    asset: "Their own names and dates of birth — which they'd never thought of as tools",
    story: "A chance invitation to a local secondary school led to an introduction to online security. Claude showed a class of thirteen-year-olds how to use their own initials and dates of birth to create individual, memorable passwords that they could adapt for multiple purposes — data management, social media, account security. What looked like a technical lesson was something else entirely: it was a demonstration that what you already carry — your own identity, your own history — is already a tool. They didn't need to be taught security. They needed to be shown that they were already equipped.",
    quote: "They didn't need to be taught security. They needed to be shown that they were already equipped.",
    outcome: 'A classroom of young people who left knowing their identity is an asset',
    colour: '#fbbf24',
  },
];
