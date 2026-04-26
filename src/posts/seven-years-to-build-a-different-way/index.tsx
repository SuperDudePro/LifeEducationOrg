import type { LifeEducationPost } from "../../content/postTypes";
import lifeEducationPlaneBuilding from "./images/life-education-plane-building.png";
import lifeEducationHallwayToOpenRoad from "./images/life-education-hallway-to-open-road.png";
import lifeEducationMapPassportsSpanish from "./images/life-education-map-passports-spanish.png";
import lifeEducationRoadschoolRuins from "./images/life-education-roadschool-ruins.png";

type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "figure"; image: string; alt: string };

const postBlocks: PostBlock[] = [
  {
    "type": "paragraph",
    "text": "I’m Will."
  },
  {
    "type": "paragraph",
    "text": "I’m a high school teacher. I’m an old dad. I have two high school juniors, a four-year-old, and a two-year-old."
  },
  {
    "type": "paragraph",
    "text": "Teaching is my third career. I started in finance, moved to IT, and then eventually made my way into education, with a lot of odd in-between stops along the way. But I’m old, so even with all that moving around, I’ve still been teaching for more than two decades."
  },
  {
    "type": "paragraph",
    "text": "When I first started teaching, school seemed mostly okay."
  },
  {
    "type": "paragraph",
    "text": "That was partly because I didn’t have kids of my own yet. I didn’t know enough to know better. And the kids I was teaching were usually pretty far behind, so when I helped them catch up, it felt like the system was doing something useful."
  },
  {
    "type": "paragraph",
    "text": "Not great. Not inspiring. Not exactly the Academy in ancient Athens."
  },
  {
    "type": "paragraph",
    "text": "But okay-ish."
  },
  {
    "type": "paragraph",
    "text": "Then my own kids started school in the United States."
  },
  {
    "type": "paragraph",
    "text": "That changed things."
  },
  {
    "type": "paragraph",
    "text": "I knew pretty quickly that something wasn’t right. Not in the “this teacher is annoying” way. Not in the “this homework assignment is dumb” way. Those things are always going to happen. I mean wrong in the deeper way. Wrong in the structure. Wrong in the assumptions. Wrong in what the system rewards and what it slowly grinds out of kids."
  },
  {
    "type": "paragraph",
    "text": "But what could I do?"
  },
  {
    "type": "paragraph",
    "text": "Mostly, I tried to reduce the damage."
  },
  {
    "type": "paragraph",
    "text": "Help at home. Fill in the gaps. Explain what school failed to explain. Push back where I could. Teach them how to think outside the machinery. Try to get them through it with the ability to think clearly and take care of themselves."
  },
  {
    "type": "paragraph",
    "text": "That became the goal."
  },
  {
    "type": "paragraph",
    "text": "Not excellence. Not school success as defined by school. Not a perfect résumé full of activities nobody would do unless adults had turned childhood into a competitive paperwork exercise."
  },
  {
    "type": "paragraph",
    "text": "Just this: get them through with their minds intact."
  },
  {
    "type": "paragraph",
    "text": "Every year that passed, I became more convinced that the system was mostly pointless for the kind of life I want my kids to be able to live. And now that my older kids are upperclassmen in high school, post-Covid, I don’t have much doubt left."
  },
  {
    "type": "paragraph",
    "text": "We’re facing a disaster."
  },
  {
    "type": "paragraph",
    "text": "I know that sounds dramatic. I also know people outside schools say dramatic things about schools all the time. The difference is that I’m not outside. I’ve been inside for a long time. Long enough to see what’s changed, what hasn’t changed, and what’s become impossible to ignore."
  },
  {
    "type": "figure",
    "image": lifeEducationHallwayToOpenRoad,
    "alt": "An empty school hallway fading into an open desert road with a father and two young children walking away from the building."
  },
  {
    "type": "paragraph",
    "text": "The good news is that I’m lucky."
  },
  {
    "type": "paragraph",
    "text": "I’m about seven years from retirement. By then, my youngest kids will be around nine and eleven. The plan is to slow travel — first through the United States and North America, and then farther out into the world."
  },
  {
    "type": "paragraph",
    "text": "The kids have three passports from three countries on three continents, including the European Union."
  },
  {
    "type": "paragraph",
    "text": "So we have some moving around to do."
  },
  {
    "type": "paragraph",
    "text": "For me, this solves one enormous problem: middle school and high school in the United States."
  },
  {
    "type": "paragraph",
    "text": "But it creates another problem."
  },
  {
    "type": "paragraph",
    "text": "If I’m going to step away from the standard path, I need something better than a vague freedom fantasy. “We’ll travel and learn from the world” sounds nice, but so do a lot of things people say right before they make a mess."
  },
  {
    "type": "paragraph",
    "text": "I need a real system."
  },
  {
    "type": "paragraph",
    "text": "A system that can prove what they’ve learned. A system that teaches what I think actually matters. A system that lets them go as far as they want in any direction they want. A system that prepares them not just for college, or work, or tests, but for being functional human beings almost anywhere in the world."
  },
  {
    "type": "paragraph",
    "text": "That’s what this project is about."
  },
  {
    "type": "paragraph",
    "text": "The Life Education Project is my attempt to build that system before we need it."
  },
  {
    "type": "figure",
    "image": lifeEducationMapPassportsSpanish,
    "alt": "A wooden desk with a world map, passports from different regions, a notebook labeled “systems and experiments,” and Spanish children’s dictionaries."
  },
  {
    "type": "paragraph",
    "text": "My four-year-old daughter is starting preschool at a dual-language school. They begin with about 90 percent Spanish and gradually add more English over time. That’s close to ideal for us. I can teach her a lot. I can’t teach her Spanish the way immersion can."
  },
  {
    "type": "paragraph",
    "text": "She’s mostly excited to go to school and have friends."
  },
  {
    "type": "paragraph",
    "text": "Which is fair."
  },
  {
    "type": "paragraph",
    "text": "She’s four. Friends are the curriculum."
  },
  {
    "type": "paragraph",
    "text": "But if it works, both younger kids may become conversationally fluent in Spanish before we ever begin the bigger travel plan. That matters. Not because Spanish is a résumé decoration. Because language changes how you move through the world. It gives you more places where you’re not just standing outside, smiling politely, and hoping someone switches to English."
  },
  {
    "type": "paragraph",
    "text": "So the clock is running."
  },
  {
    "type": "paragraph",
    "text": "We have seven years to build the systems that will let us travel the world and help these kids become capable, curious, resilient people who can thrive in more than one kind of place."
  },
  {
    "type": "paragraph",
    "text": "The opportunity is magnificent."
  },
  {
    "type": "paragraph",
    "text": "The need is urgent."
  },
  {
    "type": "paragraph",
    "text": "The stakes are precious."
  },
  {
    "type": "paragraph",
    "text": "And I’m not pretending I’m fearless. I’m as conditioned as anyone else to worry about breaking away. I’m as conditioned as anyone else to soften every criticism of the system with twelve disclaimers and a group hug. I know the script."
  },
  {
    "type": "paragraph",
    "text": "Be practical. Don’t be extreme. Don’t mess up your kids. Stay inside the lines. Sure, the system has problems, but what are you going to do?"
  },
  {
    "type": "paragraph",
    "text": "Well."
  },
  {
    "type": "paragraph",
    "text": "This is what I’m going to do."
  },
  {
    "type": "paragraph",
    "text": "This blog will document the process: the plans, the experiments, the doubts, the failures, the curriculum, the travel preparation, the language learning, the books, the tools, the systems, the reconsiderations, and the parts where I realize I was wrong."
  },
  {
    "type": "paragraph",
    "text": "Especially those parts."
  },
  {
    "type": "paragraph",
    "text": "I have no illusions that this will go smoothly. I don’t think we’re going to float around the world in some glowing educational montage while everyone learns Mandarin by osmosis and develops perfect emotional regulation."
  },
  {
    "type": "paragraph",
    "text": "I expect setbacks. I expect confusion. I expect to overbuild some things and underprepare for others. I expect to discover that some of my strongest opinions are only half right."
  },
  {
    "type": "paragraph",
    "text": "Fine."
  },
  {
    "type": "paragraph",
    "text": "That’s part of the point."
  },
  {
    "type": "paragraph",
    "text": "The goal isn’t to build a perfect childhood. That’s another trap. The goal is to build a better way to grow up than the one currently being offered. Freer. Less harsh. More honest. More useful. More human."
  },
  {
    "type": "paragraph",
    "text": "A way that takes learning seriously without turning childhood into compliance training."
  },
  {
    "type": "paragraph",
    "text": "A way that helps kids become who they are instead of spending thirteen years teaching them how to survive systems they didn’t choose."
  },
  {
    "type": "figure",
    "image": lifeEducationRoadschoolRuins,
    "alt": "A father kneeling with two young children beside old stone ruins near a camper van, using the world as the classroom."
  },
  {
    "type": "paragraph",
    "text": "That’s the journey."
  },
  {
    "type": "paragraph",
    "text": "You’re welcome to follow along."
  },
  {
    "type": "paragraph",
    "text": "Comments, suggestions, questions, warnings, criticism, and useful arguments are all welcome."
  },
  {
    "type": "paragraph",
    "text": "We’re building the plane before takeoff."
  },
  {
    "type": "paragraph",
    "text": "Not ideal."
  },
  {
    "type": "paragraph",
    "text": "But better than pretending the bus is going somewhere worth going."
  }
];

function PostBody() {
  return (
    <>
      {postBlocks.map((block, index) => {
        if (block.type === "figure") {
          return (
            <figure className="post-figure" key={`figure-${index}`}>
              <img src={block.image} alt={block.alt} loading="lazy" decoding="async" />
            </figure>
          );
        }

        return <p key={`paragraph-${index}`}>{block.text}</p>;
      })}
    </>
  );
}

const post: LifeEducationPost = {
  slug: "seven-years-to-build-a-different-way",
  title: "Seven Years to Build a Different Way",
  excerpt: "I’m a high school teacher, an old dad, and a father of four. After more than two decades inside American education, I don’t think the system can give my youngest kids what they need. So I’m building something else: a life education system that can travel, prove learning, protect curiosity, and help them become capable human beings.",
  publishedAt: "2026-04-26",
  displayDate: "April 26, 2026",
  status: "Featured",
  topic: "Founding Notes",
  tags: ["LifeEducation", "Worldschooling", "Parenting", "The Floor"],
  heroImage: lifeEducationPlaneBuilding,
  heroAlt: "A father and two children working together on an unfinished airplane, surrounded by maps, plans, and learning notes.",
  cardImage: lifeEducationPlaneBuilding,
  cardAlt: "A father and two children working together on an unfinished airplane, surrounded by maps, plans, and learning notes.",
  body: <PostBody />,
};

export default post;
