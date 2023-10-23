export interface PlatformType {
  id: number;
  image: string;
  name: string;
}

const platforms: PlatformType[] = [
  {
    id: 1,
    image: "/images/icon-github.svg",
    name: "Github",
  },
  {
    id: 2,
    image: "/images/icon-frontend-mentor.svg",
    name: "Frontend Mentor",
  },
  {
    id: 3,
    image: "/images/icon-twitter.svg",
    name: "Twitter",
  },
  {
    id: 4,
    image: "/images/icon-linkedin.svg",
    name: "LinkedIn",
  },

  {
    id: 5,
    image: "/images/icon-youtube.svg",
    name: "Youtube",
  },
  {
    id: 6,
    image: "/images/icon-facebook.svg",
    name: "Facebook",
  },
  {
    id: 7,
    image: "/images/icon-twitch.svg",
    name: "Twitch",
  },
  {
    id: 8,
    image: "/images/icon-devto.svg",
    name: "Dev.to",
  },
  {
    id: 9,
    image: "/images/icon-codewars.svg",
    name: "Codewars",
  },
  {
    id: 10,
    image: "/images/icon-codepen.svg",
    name: "Codepen",
  },
  {
    id: 11,
    image: "/images/icon-freecodecamp.svg",
    name: "freeCodeCamp",
  },
  {
    id: 12,
    image: "/images/icon-gitlab.svg",
    name: "GitLab",
  },
  {
    id: 13,
    image: "/images/icon-hashnode.svg",
    name: "Hashnode",
  },
  {
    id: 14,
    image: "/images/icon-stack-overflow.svg",
    name: "Stack Overflow",
  },
];

export default platforms;
